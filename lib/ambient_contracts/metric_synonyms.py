"""Catalog metric synonym normalization and lookup."""

from __future__ import annotations

import re
from typing import Any


def normalize_synonym(label: str) -> str:
    """Normalize a human-readable metric label for index keys.

    Args:
        label: Raw label or synonym string.

    Returns:
        Lowercase string with collapsed whitespace.

    Raises:
        None: This callable does not raise.

    Example:
        >>> normalize_synonym("  Days Sales   Outstanding  ")
        'days sales outstanding'
    """
    return re.sub(r"\s+", " ", str(label or "").strip().lower())


def merge_also_known_as(
    metric: dict[str, Any],
    catalog_key: str,
    overlay: dict[str, Any] | None,
) -> list[str]:
    """Merge explicit, overlay, and fallback synonyms for one metric record.

    Args:
        metric: Catalog metric dict from the generator.
        catalog_key: Expanded catalog metric key.
        overlay: Optional ``catalog/metric_also_known_as.yaml`` content.

    Returns:
        Deduplicated list of display synonyms.

    Raises:
        None: This callable does not raise.

    Example:
        >>> merge_also_known_as({"name": "Free Cash Flow"}, "x.core.free_cash_flow", None)
        ['Free Cash Flow']
    """
    combined: list[str] = []
    explicit = metric.get("alsoKnownAs") or []
    if isinstance(explicit, list):
        combined.extend(str(x).strip() for x in explicit if str(x).strip())
    if overlay:
        bkey = str(metric.get("benchmarkKey") or "").strip()
        if bkey:
            combined.extend(_list_from_overlay(overlay.get("byBenchmarkKey"), bkey))
        combined.extend(_list_from_overlay(overlay.get("byCatalogKey"), catalog_key))
    if not combined:
        name = str(metric.get("name") or "").strip()
        if name:
            combined.append(name)
    return _dedupe_preserve(combined)


def build_synonym_index(
    metrics: dict[str, dict[str, Any]],
    *,
    industry: str | None = None,
) -> dict[str, str]:
    """Build a normalized synonym to catalogMetricKey map.

    Args:
        metrics: Expanded catalog metrics keyed by catalogMetricKey.
        industry: When set, only metrics for this industry pack are indexed.

    Returns:
        Mapping from normalized synonym to catalogMetricKey.

    Raises:
        ValueError: When a synonym maps to more than one metric in the scope.

    Example:
        >>> build_synonym_index({}, industry="Healthcare")
        {}
    """
    index: dict[str, str] = {}
    for key, metric in metrics.items():
        if industry is not None and str(metric.get("industry", "")) != industry:
            continue
        aliases = metric.get("alsoKnownAs") or []
        if not isinstance(aliases, list):
            continue
        for alias in [str(a) for a in aliases]:
            norm = normalize_synonym(alias)
            if not norm:
                continue
            if norm in index and index[norm] != key:
                raise ValueError(
                    f"synonym {alias!r} maps to both {index[norm]!r} and {key!r} "
                    f"in industry {industry!r}"
                )
            index[norm] = key
    return index


def validate_synonyms_globally(metrics: dict[str, dict[str, Any]]) -> None:
    """Validate that alsoKnownAs synonyms do not collide within any industry pack.

    Args:
        metrics: Expanded catalog metrics keyed by catalogMetricKey.

    Returns:
        None.

    Raises:
        ValueError: When any industry pack contains a duplicate synonym.

    Example:
        >>> validate_synonyms_globally({})
    """
    industries = {str(m.get("industry", "")) for m in metrics.values()}
    for ind in sorted(industries):
        if not ind:
            continue
        build_synonym_index(metrics, industry=ind)


def resolve_metric_by_name(
    metrics: dict[str, dict[str, Any]],
    query: str,
    *,
    industry: str | None = None,
    index: dict[str, str] | None = None,
) -> str | None:
    """Resolve a human label or slug to a catalogMetricKey.

    Args:
        metrics: Expanded catalog metrics keyed by catalogMetricKey.
        query: Human-readable label, synonym, or slug fragment.
        industry: Optional industry scope when labels repeat across packs.
        index: Optional precomputed synonym index for the industry scope.

    Returns:
        Matching catalogMetricKey, or None when no match exists.

    Raises:
        ValueError: When building the synonym index detects a duplicate synonym.

    Example:
        >>> resolve_metric_by_name({}, "CFO", industry="Healthcare") is None
        True
    """
    want = normalize_synonym(query)
    if not want:
        return None
    if industry is not None:
        idx = index if index is not None else build_synonym_index(metrics, industry=industry)
    else:
        if index is None:
            for ind in {str(m.get("industry", "")) for m in metrics.values()}:
                if not ind:
                    continue
                try:
                    found = resolve_metric_by_name(metrics, query, industry=ind)
                except ValueError:
                    continue
                if found:
                    return found
            idx = {}
        else:
            idx = index
    if want in idx:
        return idx[want]
    scoped = metrics
    if industry is not None:
        scoped = {
            k: v for k, v in metrics.items() if str(v.get("industry", "")) == industry
        }
    underscored = want.replace(" ", "_")
    for key in scoped:
        if key == underscored or key.endswith("." + underscored):
            return key
    for key, metric in scoped.items():
        primary = normalize_synonym(str(metric.get("name") or ""))
        if primary == want:
            return key
    return None


def _list_from_overlay(bucket: Any, lookup: str) -> list[str]:
    if not isinstance(bucket, dict):
        return []
    raw = bucket.get(lookup)
    if not raw:
        return []
    if isinstance(raw, list):
        return [str(x).strip() for x in raw if str(x).strip()]
    return [str(raw).strip()] if str(raw).strip() else []


def _dedupe_preserve(items: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for item in items:
        key = item.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(item)
    return out