"""Catalog field typing (SSOT for pipeline coercion and manifest export)."""

from __future__ import annotations

import re
from typing import Any

CATALOG_FIELD_TYPES = frozenset(
    {
        "string",
        "id",
        "enum",
        "integer",
        "decimal",
        "date",
        "timestamp",
        "boolean",
        "currency",
    }
)

FREQUENCY_ORDER = {
    "daily": 0,
    "weekly": 1,
    "monthly": 2,
    "quarterly": 3,
    "annual": 4,
    "yearly": 4,
}

FIELD_COVERAGE_UPLOAD = "upload"
FIELD_COVERAGE_ENUMERATED = "enumerated"


def infer_field_coverage(option: dict, *, catalog_option_key: str = "") -> str:
    """Whether measured inputs must appear as mappable columns (enumerated) or upload/document."""
    raw = str(option.get("fieldCoverage") or "").strip().lower()
    if raw in (FIELD_COVERAGE_UPLOAD, FIELD_COVERAGE_ENUMERATED):
        return raw
    key = str(catalog_option_key or "")
    template = str(option.get("template") or "")
    fmt = str(option.get("format") or "")
    if template == "Financial Statement Template":
        return FIELD_COVERAGE_UPLOAD
    if template == "Transactional Data Template":
        return FIELD_COVERAGE_ENUMERATED
    if fmt == "Software" and (option.get("fields") or []):
        return FIELD_COVERAGE_ENUMERATED
    if option.get("segment") and (option.get("fields") or []):
        return FIELD_COVERAGE_ENUMERATED
    if ".operations_summary" in key or key.startswith("HcProvider") or ".investment_banking." in key:
        return FIELD_COVERAGE_ENUMERATED
    if key.startswith("retail.operations.") or key.startswith("retail.financial."):
        return FIELD_COVERAGE_ENUMERATED
    if template == "Document" and fmt == "Document":
        return FIELD_COVERAGE_UPLOAD
    return FIELD_COVERAGE_UPLOAD


def infer_grain_for_frequency(frequency: str) -> str:
    f = str(frequency or "monthly").strip().lower()
    if f == "daily":
        return "day"
    if f == "weekly":
        return "week"
    if f == "quarterly":
        return "quarter"
    if f in ("annual", "yearly"):
        return "quarter"
    return "month"


def strictest_linked_metric_frequency(
    option: dict,
    metric_id_to_metric: dict[int, dict],
) -> str:
    strictest: int | None = None
    label = "monthly"
    for mid in option.get("metricIds") or []:
        metric = metric_id_to_metric.get(int(mid))
        if not metric:
            continue
        freq = str(metric.get("frequency") or "monthly").strip().lower()
        rank = FREQUENCY_ORDER.get(freq)
        if rank is None:
            continue
        if strictest is None or rank < strictest:
            strictest = rank
            label = freq
    return label


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
    """Legacy kind: date | id | enum | number | string (used where manifest types absent)."""
    return spark_coerce_kind(infer_catalog_field_type(field_name))


def infer_catalog_field_type(field_name: str) -> str:
    norm = normalize_field_name(field_name)
    tokens = set(norm.split("_"))
    if tokens & _DATE_TOKENS or norm.endswith("_date") or norm == "date":
        return "date"
    if tokens & _ID_TOKENS or norm.endswith("_id"):
        return "id"
    if tokens & _ENUM_TOKENS:
        return "enum"
    if "currency" in norm or norm.endswith("_usd"):
        return "currency"
    if any(t in norm for t in _NUMERIC_HINTS):
        return "decimal"
    if any(t in norm for t in ("rate", "pct", "percent", "ratio", "margin")):
        return "decimal"
    if norm.endswith("_count") or norm == "count":
        return "integer"
    return "string"


def spark_coerce_kind(catalog_type: str) -> str:
    t = str(catalog_type or "string").strip().lower()
    if t in ("decimal", "integer", "currency"):
        return "number"
    if t in ("date", "timestamp"):
        return "date"
    return "string"


def field_entry_name(entry: str | dict[str, Any]) -> str:
    if isinstance(entry, dict):
        return str(entry.get("name") or "").strip()
    return str(entry or "").strip()


def normalize_field_entry(entry: str | dict[str, Any]) -> dict[str, Any]:
    if isinstance(entry, dict):
        name = field_entry_name(entry)
        ftype = str(entry.get("type") or infer_catalog_field_type(name)).strip().lower()
        if ftype not in CATALOG_FIELD_TYPES:
            ftype = infer_catalog_field_type(name)
        out: dict[str, Any] = {"name": name, "type": ftype}
        if "nullable" in entry:
            out["nullable"] = bool(entry["nullable"])
        if entry.get("format"):
            out["format"] = str(entry["format"])
        if entry.get("unit"):
            out["unit"] = str(entry["unit"])
        if entry.get("description"):
            out["description"] = str(entry["description"])
        return out
    name = str(entry or "").strip()
    return {"name": name, "type": infer_catalog_field_type(name)}


def normalize_field_entries(fields: list[Any] | None) -> list[dict[str, Any]]:
    if not fields:
        return []
    return [normalize_field_entry(f) for f in fields if field_entry_name(f)]


def field_type_map(entries: list[Any] | None) -> dict[str, str]:
    out: dict[str, str] = {}
    for row in normalize_field_entries(entries):
        name = row["name"]
        out[name] = str(row["type"])
        out[normalize_field_name(name)] = str(row["type"])
    return out


def input_excluded_from_field_list(
    name: str,
    exact: set[str],
    patterns: list[re.Pattern],
) -> bool:
    lower = str(name or "").strip().lower()
    if lower in exact:
        return True
    return any(p.search(lower) for p in patterns)


def is_value_field_for_unpivot_field(entry: str | dict[str, Any]) -> bool:
    row = normalize_field_entry(entry) if not isinstance(entry, dict) or "type" not in entry else entry
    ftype = str(row.get("type") or infer_catalog_field_type(field_entry_name(row)))
    return ftype in ("decimal", "integer", "currency")


def is_value_field_for_unpivot(field_name: str) -> bool:
    """Fields to unpivot into tenant-metrics value rows."""
    return spark_coerce_kind(infer_catalog_field_type(field_name)) == "number"


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
