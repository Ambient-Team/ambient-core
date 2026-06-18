"""Bronze raw_file_uploads → catalog-mapped tenant-metrics rows for raw_metrics."""

from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from typing import Any

from pyspark.sql import DataFrame
from pyspark.sql import functions as F
from pyspark.sql.types import DoubleType, StringType, TimestampType

from ambient_pipeline.catalog_field_rules import infer_field_type, is_value_field_for_unpivot
from ambient_pipeline.catalog_loader import load_data_option, load_manifest_version
from ambient_pipeline.provenance import BronzeProvenanceStamper

_MAX_MAPPING_JSON_LEN = 32768
_MAPPING_VERSION = "1.0"


@dataclass
class MappingSpec:
    catalog_field_to_csv_header: dict[str, str]
    catalog_option_key: str
    source_id: str
    source_name: str
    industry: str
    catalog_manifest_version: str
    mapping_version: str = _MAPPING_VERSION


def parse_source_id_from_gcs_path(gcs_path: str, org_id: str) -> str | None:
    if not gcs_path or not org_id:
        return None
    match = re.search(rf"bronze/{re.escape(org_id)}/([^/]+)/", gcs_path.replace("\\", "/"))
    return match.group(1) if match else None


def parse_mapping_json(raw: str | dict[str, Any] | None) -> dict[str, str]:
    if raw is None or raw == "":
        return {}
    if isinstance(raw, dict):
        parsed = raw
    else:
        parsed = json.loads(str(raw))
    if not isinstance(parsed, dict):
        raise ValueError("mapping_json must be a JSON object")
    out: dict[str, str] = {}
    for key, val in parsed.items():
        k = str(key).strip()
        v = str(val).strip() if val is not None else ""
        if k and v:
            out[k] = v
    return out


def mapping_json_hash(mapping: dict[str, str]) -> str:
    payload = json.dumps(mapping, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:16]


def stable_metric_id(
    org_id: str,
    catalog_option_key: str,
    field_name: str,
    period_key: str = "",
) -> str:
    seed = f"{org_id}|{catalog_option_key}|{field_name}|{period_key}"
    return hashlib.sha256(seed.encode("utf-8")).hexdigest()[:32]


def resolve_mapping_spec(
    *,
    org_id: str,
    mapping_json: str | dict[str, Any] | None,
    catalog_option_key: str,
    source_id: str,
    gcs_path: str,
    catalog_manifest_version: str,
    firestore_fetcher: Any | None = None,
) -> MappingSpec:
    mapping = parse_mapping_json(mapping_json)
    resolved_source_id = source_id.strip() or (
        parse_source_id_from_gcs_path(gcs_path, org_id) or ""
    )
    resolved_catalog_key = catalog_option_key.strip()

    if (not mapping or not resolved_catalog_key) and firestore_fetcher and resolved_source_id:
        doc = firestore_fetcher(org_id, resolved_source_id)
        if doc:
            if not mapping:
                mapping = parse_mapping_json(doc.get("latestUpload", {}).get("mapping"))
            if not resolved_catalog_key:
                resolved_catalog_key = str(doc.get("catalogOptionKey") or "").strip()
            source_name = str(doc.get("name") or resolved_source_id)
        else:
            source_name = resolved_source_id
    else:
        source_name = resolved_source_id

    option = load_data_option(resolved_catalog_key) if resolved_catalog_key else None
    industry = str((option or {}).get("industry") or "Unknown")
    if option and option.get("name"):
        source_name = str(option["name"])

    manifest_ver = catalog_manifest_version.strip() or load_manifest_version()

    return MappingSpec(
        catalog_field_to_csv_header=mapping,
        catalog_option_key=resolved_catalog_key,
        source_id=resolved_source_id,
        source_name=source_name,
        industry=industry,
        catalog_manifest_version=manifest_ver,
    )


def apply_column_mapping(df: DataFrame, mapping: dict[str, str]) -> DataFrame:
    """Rename CSV headers to catalog field names ({catalogField: csvHeader})."""
    out = df
    for catalog_field, csv_header in mapping.items():
        if csv_header in out.columns:
            out = out.withColumnRenamed(csv_header, catalog_field)
    return out


def coerce_mapped_columns(df: DataFrame, field_names: list[str]) -> DataFrame:
    """Apply catalog field typing after rename (date / numeric / string)."""
    out = df
    for field in field_names:
        if field not in out.columns:
            continue
        kind = infer_field_type(field)
        col = F.col(field)
        if kind == "date":
            out = out.withColumn(
                field,
                F.coalesce(
                    F.to_date(col),
                    F.to_date(col.cast("string"), "M/d/yyyy"),
                    F.to_date(col.cast("string"), "yyyy-MM-dd"),
                    F.to_date(col.cast("string"), "dd-MMM-yyyy"),
                ),
            )
        elif kind == "number":
            as_str = F.trim(F.regexp_replace(col.cast("string"), r"[$,\s]", ""))
            normalized = (
                F.when(
                    as_str.rlike(r"^\(.*\)$"),
                    F.concat(F.lit("-"), F.regexp_replace(as_str, r"^\(|\)$", "")),
                ).otherwise(as_str)
            )
            out = out.withColumn(
                field,
                F.when(normalized == "", F.lit(None).cast(DoubleType())).otherwise(
                    normalized.cast(DoubleType())
                ),
            )
        else:
            out = out.withColumn(field, col.cast(StringType()))
    return out


def filter_raw_uploads(df: DataFrame, org_id: str, run_id: str, gcs_path: str) -> DataFrame:
    scoped = df.filter(F.col("_bronze_org_id") == org_id)
    if gcs_path:
        scoped = scoped.filter(F.col("_bronze_source_path") == gcs_path)
    elif run_id:
        scoped = scoped.filter(F.col("_bronze_run_id") == run_id)
    return scoped


def _date_column_name(mapped_columns: list[str]) -> str | None:
    for col in mapped_columns:
        if infer_field_type(col) == "date":
            return col
    return None


def unpivot_to_tenant_metrics(
    df: DataFrame,
    spec: MappingSpec,
    org_id: str,
    *,
    default_type: str = "Operational",
) -> DataFrame:
    mapped_fields = [f for f in spec.catalog_field_to_csv_header if f in df.columns]
    value_fields = [f for f in mapped_fields if is_value_field_for_unpivot(f)]
    if not value_fields:
        raise ValueError("No numeric catalog fields available to unpivot after mapping")

    date_col = _date_column_name(mapped_fields)
    work = df
    if date_col and date_col in work.columns:
        work = work.withColumn("_period_key", F.date_format(F.col(date_col), "yyyy-MM-dd"))
        work = work.withColumn("_recorded_at", F.col(date_col).cast(TimestampType()))
    else:
        work = work.withColumn("_period_key", F.lit(""))
        work = work.withColumn("_recorded_at", F.current_timestamp())

    stack_parts: list[str] = []
    for field in value_fields:
        safe = field.replace("`", "")
        stack_parts.append(f"'{safe}'")
        stack_parts.append(f"`{safe}`")

    stack_expr = f"stack({len(value_fields)}, {', '.join(stack_parts)})"
    long_df = work.select(
        F.expr(stack_expr).alias("name", "value"),
        F.col("_period_key"),
        F.col("_recorded_at"),
    )

    metric_id_expr = F.sha2(
        F.concat_ws(
            "|",
            F.lit(org_id),
            F.lit(spec.catalog_option_key),
            F.col("name"),
            F.col("_period_key"),
        ),
        256,
    )
    long_df = (
        long_df.withColumn("metric_id", F.substring(metric_id_expr, 1, 32))
        .withColumn("org_id", F.lit(org_id))
        .withColumn("industry", F.lit(spec.industry))
        .withColumn("type", F.lit(default_type))
        .withColumn("unit", F.lit(None).cast(StringType()))
        .withColumn("status", F.lit("Active"))
        .withColumn("datasource", F.lit(spec.source_name))
        .withColumn("recorded_at", F.col("_recorded_at"))
        .drop("_period_key", "_recorded_at")
    )
    return long_df


def stamp_lineage_columns(
    df: DataFrame,
    spec: MappingSpec,
    *,
    ingestion_status: str,
    ingestion_status_reason: str | None,
    source_type: str,
    source_path: str,
    run_id: str,
    org_id: str,
    ingestion_ts: str,
) -> DataFrame:
    stamper = BronzeProvenanceStamper(
        run_id=run_id,
        org_id=org_id,
        source_type=source_type,
        source_path=source_path or "manual_entry",
        ingestion_ts=ingestion_ts,
    )
    stamped = stamper.stamp(df)
    return (
        stamped.withColumn("_mapping_version", F.lit(spec.mapping_version))
        .withColumn("_source_type", F.lit(source_type))
        .withColumn("_catalog_source_id", F.lit(spec.catalog_option_key))
        .withColumn("_catalog_manifest_version", F.lit(spec.catalog_manifest_version))
        .withColumn("_ingestion_status", F.lit(ingestion_status))
        .withColumn("_ingestion_status_reason", F.lit(ingestion_status_reason))
        .withColumn(
            "_mapping_json_hash",
            F.lit(mapping_json_hash(spec.catalog_field_to_csv_header)),
        )
    )


def append_firestore_lineage_event(
    org_id: str,
    source_id: str,
    *,
    run_id: str,
    status: str,
    rows_written: int,
    gcs_path: str,
) -> None:
    """Append server-side mapping lineage to dataSources history."""
    if not org_id or not source_id:
        return
    try:
        import firebase_admin
        from firebase_admin import credentials, firestore

        from ambient_pipeline.secrets import get_secret
        import os
        import tempfile

        if not firebase_admin._apps:
            sa_json_str = get_secret("ambient-systems", "firebase_service_account")
            with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as handle:
                handle.write(sa_json_str)
                sa_path = handle.name
            cred = credentials.Certificate(sa_path)
            firebase_admin.initialize_app(cred)
            os.unlink(sa_path)

        db = firestore.client()
        db.collection("organizations").document(org_id).collection("dataSources").document(
            source_id
        ).collection("history").add(
            {
                "action": "bronze_catalog_map",
                "run_id": run_id,
                "status": status,
                "rows_written": rows_written,
                "gcs_path": gcs_path,
                "note": "Databricks 01c catalog mapping completed.",
            }
        )
    except Exception:
        return


def fetch_firestore_data_source(org_id: str, source_id: str) -> dict[str, Any] | None:
    """Read organizations/{orgId}/dataSources/{sourceId} using Firebase Admin + secret scope."""
    try:
        import os
        import tempfile

        import firebase_admin
        from firebase_admin import credentials, firestore

        from ambient_pipeline.secrets import get_secret

        if not firebase_admin._apps:
            sa_json_str = get_secret("ambient-systems", "firebase_service_account")
            with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as handle:
                handle.write(sa_json_str)
                sa_path = handle.name
            cred = credentials.Certificate(sa_path)
            firebase_admin.initialize_app(cred)
            os.unlink(sa_path)

        db = firestore.client()
        snap = (
            db.collection("organizations")
            .document(org_id)
            .collection("dataSources")
            .document(source_id)
            .get()
        )
        return snap.to_dict() if snap.exists else None
    except Exception:
        return None
