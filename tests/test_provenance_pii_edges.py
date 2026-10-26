"""Small behavior tests for provenance and PII helpers."""

from __future__ import annotations

from pyspark.sql import functions as F

from ambient_pipeline.pii import PiiPseudonymizer, hmac_sha256_hex, pseudonymize_string
from ambient_pipeline.provenance import BronzeProvenanceStamper


def test_bronze_provenance_repr_and_required_columns() -> None:
    stamper = BronzeProvenanceStamper(run_id="run-1", org_id="org-1", source_type="csv_upload")
    assert "BronzeProvenanceStamper" in repr(stamper)
    assert "_bronze_row_hash" in stamper.required_columns()


def test_bronze_provenance_uses_org_id_column_when_present(spark) -> None:
    df = spark.createDataFrame([("org-row", 1.0)], ["org_id", "value"])
    stamper = BronzeProvenanceStamper(
        run_id="run-1",
        org_id="org-fallback",
        source_type="csv_upload",
    )
    row = stamper.stamp(df).collect()[0]
    assert row["_bronze_org_id"] == "org-row"


def test_bronze_provenance_blank_source_path_defaults_to_manual(spark) -> None:
    stamper = BronzeProvenanceStamper(
        run_id="run-1",
        org_id="org-1",
        source_type="csv_upload",
        source_path="",
    )
    row = stamper.stamp(spark.createDataFrame([(1,)], ["value"])).collect()[0]
    assert row["_bronze_source_path"] == "manual_entry"


def test_pii_pseudonymizer_eq_rejects_other_types() -> None:
    pii = PiiPseudonymizer(salt="s", transform_ts="t")
    assert pii != object()


def test_pseudonymize_string_matches_hmac_helper() -> None:
    assert pseudonymize_string("pepper", "plain-text") == hmac_sha256_hex("pepper", "plain-text")
    assert pseudonymize_string("pepper", None) == hmac_sha256_hex("pepper", None)


def test_pseudonymize_column_udf_executes_hmac(spark) -> None:
    pii = PiiPseudonymizer(salt="pepper", transform_ts="2026-01-01T00:00:00Z")
    out = spark.createDataFrame([(1,)], ["id"]).select(
        pii.pseudonymize_column(F.lit("plain-text")).alias("hashed")
    )
    assert out.collect()[0]["hashed"] == hmac_sha256_hex("pepper", "plain-text")
