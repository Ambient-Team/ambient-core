"""Minimal field typing aligned with catalog/runtime inferFieldRule patterns."""

from __future__ import annotations

import re

_DATE_TOKENS = frozenset(
    {
        "date",
        "transaction_date",
        "posted_date",
        "effective_date",
        "period_start",
        "period_end",
        "harvest_date",
    }
)
_ID_TOKENS = frozenset({"id", "code", "identifier", "ref", "property_id", "vehicle_id"})
_ENUM_TOKENS = frozenset({"status", "stage", "type", "method", "period", "channel", "grade"})
_NUMERIC_HINTS = (
    "amount", "cost", "revenue", "price", "total", "count", "hours", "beds", "volume",
)


def normalize_field_name(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", str(name or "").lower()).strip("_")


def infer_field_type(field_name: str) -> str:
    norm = normalize_field_name(field_name)
    tokens = set(norm.split("_"))
    if tokens & _DATE_TOKENS or norm.endswith("_date") or norm == "date":
        return "date"
    if tokens & _ID_TOKENS or norm.endswith("_id"):
        return "id"
    if tokens & _ENUM_TOKENS:
        return "enum"
    if any(t in norm for t in _NUMERIC_HINTS):
        return "number"
    if any(t in norm for t in ("rate", "pct", "percent", "ratio", "margin")):
        return "number"
    return "string"


def is_value_field_for_unpivot(field_name: str) -> bool:
    """Fields to unpivot into tenant-metrics value rows."""
    kind = infer_field_type(field_name)
    return kind in ("number",)


def coerce_numeric_string(raw: str) -> str:
    """Strip currency formatting for parsing (mirrors client validateCsvUpload)."""
    s = str(raw or "").strip()
    if not s:
        return ""
    s = re.sub(r"[$,\s]", "", s)
    if s.startswith("(") and s.endswith(")"):
        s = f"-{s[1:-1]}"
    return s


def parse_float_from_cell(raw: str) -> float | None:
    cleaned = coerce_numeric_string(raw)
    if not cleaned:
        return None
    try:
        return float(cleaned)
    except ValueError:
        return None
