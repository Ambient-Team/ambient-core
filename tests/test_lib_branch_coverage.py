"""Exercise remaining lib/ branch arcs for full branch coverage."""

from __future__ import annotations

import json
import sys
from collections.abc import Iterator
from pathlib import Path
from unittest.mock import MagicMock

import pytest
from pyspark.sql import SparkSession

from ambient_pipeline.bronze_catalog_map import filter_raw_uploads, resolve_mapping_spec
from ambient_pipeline.catalog_field_rules import strictest_linked_metric_frequency
from ambient_pipeline.catalog_loader import load_metric_by_numeric_id
from ambient_pipeline.colab_bootstrap import find_platform_root
from ambient_pipeline.colab_smoke import run_colab_smoke
from ambient_pipeline.join_guards import assert_unique_keys, log_left_join_audit
from ambient_pipeline.pandas_provenance import PandasBronzeStamper
from ambient_pipeline.perf import PipelinePerfRecorder
from ambient_pipeline.runner import PipelineRunConfig, run_local_pipeline
import ambient_pipeline.secrets as secrets_module
from ambient_pipeline.secrets import _try_dbutils_secret
from tests.dict_helpers import JsonDict


def test_resolve_mapping_spec_preserves_preset_catalog_option_key() -> None:
    def fetcher(_org: str, _src: str) -> JsonDict:
        return {
            "catalogOptionKey": "FirestoreKey",
            "name": "From Firestore",
            "latestUpload": {"mapping": {"date": "Date"}},
        }

    spec = resolve_mapping_spec(
        org_id="org-1",
        mapping_json=None,
        catalog_option_key="PresetKey",
        source_id="src-1",
        gcs_path="gs://bucket/bronze/org-1/src-1/x.csv",
        catalog_manifest_version="3",
        firestore_fetcher=fetcher,
    )
    assert spec.catalog_option_key == "PresetKey"
    assert spec.catalog_field_to_csv_header["date"] == "Date"


def test_filter_raw_uploads_org_scope_only(spark: SparkSession) -> None:
    df = spark.createDataFrame(
        [("org-a", "run-1", "gs://b/p1", 1), ("org-b", "run-1", "gs://b/p1", 2)],
        ["_bronze_org_id", "_bronze_run_id", "_bronze_source_path", "value"],
    )
    rows = filter_raw_uploads(df, "org-a", "", "").collect()
    assert len(rows) == 1
    assert rows[0]["value"] == 1


def test_strictest_frequency_skips_looser_second_metric() -> None:
    option = {"metricIds": [1, 2]}
    metrics = {1: {"frequency": "daily"}, 2: {"frequency": "monthly"}}
    assert strictest_linked_metric_frequency(option, metrics) == "daily"


def test_load_metric_returns_none_without_manifest_file(tmp_path: Path) -> None:
    (tmp_path / "industries").mkdir()
    assert load_metric_by_numeric_id(404, tmp_path) is None


def test_load_metric_from_manifest_when_pack_metrics_miss_id(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "pack_a"
    pack.mkdir(parents=True)
    (pack / "metrics.yaml").write_text(
        "metrics:\n  other:\n    id: 1\n    name: Other\n",
        encoding="utf-8",
    )
    manifest = {"version": 1, "metrics": [{"id": 90210, "name": "Manifest only"}]}
    (tmp_path / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    metric = load_metric_by_numeric_id(90210, tmp_path)
    assert metric is not None
    assert metric.get("name") == "Manifest only"


class _DriveRootWithNestedMarker:
    def __init__(self, drive: Path, nested: Path) -> None:
        self._drive = drive
        self._nested = nested

    def is_dir(self) -> bool:
        return self._drive.is_dir()

    def __truediv__(self, key: str) -> Path:
        return self._drive / key

    def iterdir(self) -> Iterator[Path]:
        yield self._nested


def test_colab_bootstrap_skips_non_directory_drive_children(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    drive = tmp_path / "drive"
    drive.mkdir()
    platform = drive / "ambient-core"
    (platform / "ambient_pipeline").mkdir(parents=True)
    (platform / "data").mkdir()
    (drive / "notes.txt").write_text("not a directory", encoding="utf-8")

    class _DriveWithFileChild:
        def __init__(self, root: Path) -> None:
            self._root = root

        def is_dir(self) -> bool:
            return self._root.is_dir()

        def __truediv__(self, key: str) -> Path:
            return self._root / key

        def iterdir(self) -> Iterator[Path]:
            yield self._root / "notes.txt"
            yield self._root / "ambient-core"

    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (_DriveWithFileChild(drive),),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "nowhere",
    )
    assert find_platform_root() == platform.resolve()


def test_colab_bootstrap_finds_nested_drive_marker(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    drive = tmp_path / "drive"
    drive.mkdir()
    nested_parent = drive / "nested"
    nested_parent.mkdir()
    platform = nested_parent / "ambient-core"
    (platform / "ambient_pipeline").mkdir(parents=True)
    (platform / "data").mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (_DriveRootWithNestedMarker(drive, nested_parent),),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "nowhere",
    )
    assert find_platform_root() == platform.resolve()


class _DriveListingRaisesOSError:
    def __init__(self, path: Path) -> None:
        self._path = path

    def is_dir(self) -> bool:
        return self._path.is_dir()

    def __truediv__(self, key: str) -> Path:
        return self._path / key

    def iterdir(self) -> Iterator[Path]:
        raise OSError("permission denied")


def test_colab_bootstrap_drive_iterdir_oserror_falls_back(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    drive = tmp_path / "drive"
    drive.mkdir()
    marker = drive / "ambient-core"
    (marker / "ambient_pipeline").mkdir(parents=True)
    (marker / "data").mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (_DriveListingRaisesOSError(drive),),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: marker,
    )
    assert find_platform_root() == marker.resolve()


def test_colab_bootstrap_lib_install_layout_adds_repo_root_candidate(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    repo = tmp_path / "ambient-core"
    module_file = repo / "lib" / "ambient_pipeline" / "colab_bootstrap.py"
    module_file.parent.mkdir(parents=True)
    module_file.write_text("# stub\n", encoding="utf-8")
    (repo / "ambient_pipeline").mkdir()
    (repo / "data").mkdir()
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.__file__", str(module_file))
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES", ())
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: tmp_path / "elsewhere",
    )
    assert find_platform_root() == repo.resolve()


def test_colab_bootstrap_parent_candidate_skips_lib_grandparent(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch,
) -> None:
    module_file = tmp_path / "pkg" / "colab_bootstrap.py"
    module_file.parent.mkdir(parents=True)
    module_file.write_text("# stub\n", encoding="utf-8")
    platform = tmp_path / "ambient-core"
    (platform / "ambient_pipeline").mkdir(parents=True)
    (platform / "data").mkdir()
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.__file__", str(module_file))
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES", ())
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: platform,
    )
    assert find_platform_root() == platform.resolve()


def test_colab_smoke_skips_required_check_when_no_required_columns(
    tmp_path: Path,
) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    contract = """\
product:
  name: Optional-only smoke
  version: 1
schema:
  tables:
    - id: marketing_spend
      table: raw.marketing_spend
      file: Allmanufacturingds-marketing-spend.csv
      columns:
        - { name: date, type: string, required: false }
        - { name: spend, type: double, required: false }
"""
    (contracts / "manufacturing-demo-raw-v1.yaml").write_text(
        contract, encoding="utf-8"
    )
    raw = tmp_path / "data" / "raw"
    raw.mkdir(parents=True)
    (tmp_path / "data" / "processed").mkdir()
    (tmp_path / "ambient_pipeline").mkdir()
    raw.joinpath("Allmanufacturingds-marketing-spend.csv").write_text(
        "date,spend\n2024-01-01,1.0\n",
        encoding="utf-8",
    )
    result = run_colab_smoke(tmp_path, org_id="org", run_id="run-no-required")
    assert result.bronze_tables.get("marketing_spend") == 1


def test_colab_smoke_inventory_without_value_column_skips_sum_kpi(
    tmp_path: Path,
) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    contract = """\
product:
  name: Inventory optional value
  version: 1
schema:
  tables:
    - id: inventory_records
      table: raw.inventory_records
      file: Allmanufacturingds-inventory-records.csv
      columns:
        - { name: date, type: string, required: true }
        - { name: sku, type: string, required: true }
        - { name: quantity_on_hand, type: double, required: false }
        - { name: inventory_value, type: double, required: false }
"""
    (contracts / "manufacturing-demo-raw-v1.yaml").write_text(
        contract, encoding="utf-8"
    )
    raw = tmp_path / "data" / "raw"
    raw.mkdir(parents=True)
    (tmp_path / "data" / "processed").mkdir()
    (tmp_path / "ambient_pipeline").mkdir()
    raw.joinpath("Allmanufacturingds-inventory-records.csv").write_text(
        "date,sku,quantity_on_hand\n2024-01-01,A1,2\n",
        encoding="utf-8",
    )
    result = run_colab_smoke(tmp_path, org_id="org", run_id="run-inv-optional-value")
    assert result.gold_kpis.get("inventory_row_count") == 1
    assert "inventory_value_sum" not in result.gold_kpis


def test_colab_smoke_optional_kpi_branches(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    src = Path(__file__).resolve().parents[1] / "contracts" / "manufacturing-demo-raw-v1.yaml"
    (contracts / src.name).write_text(src.read_text(encoding="utf-8"), encoding="utf-8")
    raw = tmp_path / "data" / "raw"
    raw.mkdir(parents=True)
    (tmp_path / "data" / "processed").mkdir()
    (tmp_path / "ambient_pipeline").mkdir()
    raw.joinpath("Allmanufacturingds-marketing-spend.csv").write_text(
        "date,channel,spend,new_customers\n2024-01-01,web,25.0,0\n",
        encoding="utf-8",
    )
    result = run_colab_smoke(tmp_path, org_id="org", run_id="run-kpi-branches")
    assert result.gold_kpis.get("marketing_spend_sum") == 25.0
    assert result.gold_kpis.get("marketing_spend_per_new_customer") is None


def test_colab_smoke_bank_kpi_skips_missing_cash_balance_column(tmp_path: Path) -> None:
    from tests.test_colab_smoke_run_tmp import _seed_demo_tree

    _seed_demo_tree(tmp_path)
    bank = tmp_path / "data" / "raw" / "Allmanufacturingds-bank-statements.csv"
    bank.write_text("date,amount\n2024-01-01,-10.0\n", encoding="utf-8")
    result = run_colab_smoke(tmp_path, org_id="org", run_id="run-bank-kpi")
    assert result.gold_kpis.get("bank_current_cash_balance_last") is None


def test_join_guards_unique_keys_accepts_distinct_rows(spark: SparkSession) -> None:
    df = spark.createDataFrame([("a", 1), ("b", 2)], ["key", "value"])
    assert_unique_keys(df, "key", "distinct_ok")


def test_join_guards_audit_logs_zero_delta_without_warn(
    spark: SparkSession, capsys: pytest.CaptureFixture[str]
) -> None:
    left = spark.createDataFrame([("x",)], ["id"])
    right = spark.createDataFrame([("x",)], ["id"])
    joined = left.join(right, "id", "left")
    log_left_join_audit(left, right, joined, "id", "one_to_one")
    out = capsys.readouterr().out
    assert "delta=0" in out
    assert "WARN" not in out


def test_pandas_bronze_stamper_honors_explicit_ingestion_ts() -> None:
    stamper = PandasBronzeStamper(
        run_id="r",
        org_id="o",
        ingestion_ts="2020-01-01T00:00:00Z",
    )
    assert stamper.ingestion_ts == "2020-01-01T00:00:00Z"


def test_perf_collect_spark_metrics_without_accumulator_updates(
    spark: SparkSession, monkeypatch: pytest.MonkeyPatch
) -> None:
    recorder = PipelinePerfRecorder(spark)
    stage = MagicMock(spec=[])  # no accumulatorUpdates
    tracker = MagicMock()
    tracker.getStageInfos.return_value = [stage]
    status = MagicMock(return_value=tracker)
    monkeypatch.setattr(recorder.spark.sparkContext, "statusTracker", status)
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["spill_bytes"] == 0


def test_perf_collect_spark_metrics_ignores_unrelated_accumulators(
    spark: SparkSession, monkeypatch: pytest.MonkeyPatch
) -> None:
    recorder = PipelinePerfRecorder(spark)

    class Metric:
        def __init__(self, name: str, value: int) -> None:
            self.name = name
            self.value = value

    class Stage:
        def accumulatorUpdates(self) -> list[Metric]:
            return [Metric("executor runtime", 99)]

    tracker = MagicMock()
    tracker.getStageInfos.return_value = [Stage()]
    status = MagicMock(return_value=tracker)
    monkeypatch.setattr(recorder.spark.sparkContext, "statusTracker", status)
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["shuffle_read_bytes"] == 0
    assert metrics["spill_bytes"] == 0


def test_perf_collect_spark_metrics_counts_shuffle_read(
    spark: SparkSession, monkeypatch: pytest.MonkeyPatch
) -> None:
    recorder = PipelinePerfRecorder(spark)

    class Metric:
        def __init__(self, name: str, value: int) -> None:
            self.name = name
            self.value = value

    class Stage:
        def accumulatorUpdates(self) -> list[Metric]:
            return [Metric("Shuffle Read (Remote)", 11)]

    tracker = MagicMock()
    tracker.getStageInfos.return_value = [Stage()]
    status = MagicMock(return_value=tracker)
    monkeypatch.setattr(recorder.spark.sparkContext, "statusTracker", status)
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["shuffle_read_bytes"] == 11


def test_perf_collect_spark_metrics_counts_spill_accumulator(
    spark: SparkSession, monkeypatch: pytest.MonkeyPatch
) -> None:
    recorder = PipelinePerfRecorder(spark)

    class Metric:
        def __init__(self, name: str, value: int) -> None:
            self.name = name
            self.value = value

    class Stage:
        def accumulatorUpdates(self) -> list[Metric]:
            return [
                Metric("shuffle write bytes", 3),
                Metric("memory spill bytes", 7),
            ]

    tracker = MagicMock()
    tracker.getStageInfos.return_value = [Stage()]
    status = MagicMock(return_value=tracker)
    monkeypatch.setattr(recorder.spark.sparkContext, "statusTracker", status)
    metrics = recorder._collect_spark_metrics()  # noqa: SLF001
    assert metrics["spill_bytes"] == 7
    assert metrics["shuffle_write_bytes"] == 3


def test_pipeline_run_config_defaults_follow_optimize_flag() -> None:
    off = PipelineRunConfig(base_dir=Path("/tmp/ambient-off"), optimize=False)
    assert off.cache_silver is False
    assert off.apply_skew_salt is False
    explicit = PipelineRunConfig(
        base_dir=Path("/tmp/ambient-on"),
        optimize=False,
        cache_silver=True,
        apply_skew_salt=True,
    )
    assert explicit.cache_silver is True
    assert explicit.apply_skew_salt is True


def test_run_local_pipeline_without_silver_cache(
    spark: SparkSession, tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setenv("AMBIENT_PII_SALT", "unit-test-salt")
    metrics = tmp_path / "metrics.csv"
    metrics.write_text(
        "metric_id,name,industry,value\n"
        "re-noi,Net Operating Income,Real Estate,120000.0\n"
        "re-ads,Annual Debt Service,Real Estate,80000.0\n",
        encoding="utf-8",
    )
    cfg = PipelineRunConfig(
        base_dir=tmp_path / "lake",
        run_id="run-no-cache",
        optimize=False,
    )
    out = run_local_pipeline(spark, str(metrics), cfg)
    assert out["stages"]["gold"]["output_rows"] >= 1


def test_try_dbutils_secret_falls_back_when_pyspark_dbutils_raises(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    mock_dbutils = MagicMock(
        secrets=MagicMock(get=lambda **_kw: "notebook-dbutils")
    )
    monkeypatch.setitem(secrets_module.__dict__, "dbutils", mock_dbutils)
    monkeypatch.setattr(
        "pyspark.sql.SparkSession.getActiveSession",
        lambda: object(),
    )

    class BrokenDBUtils:
        def __init__(self, _spark: object) -> None:
            raise RuntimeError("dbutils unavailable")

    fake_dbutils_mod = MagicMock()
    fake_dbutils_mod.DBUtils = BrokenDBUtils
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_dbutils_mod)
    assert _try_dbutils_secret("scope", "key") == "notebook-dbutils"


def test_try_dbutils_secret_skips_pyspark_when_no_active_session(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    mock_dbutils = MagicMock(
        secrets=MagicMock(get=lambda **_kw: "notebook-dbutils")
    )
    monkeypatch.setitem(secrets_module.__dict__, "dbutils", mock_dbutils)
    monkeypatch.setattr("pyspark.sql.SparkSession.getActiveSession", lambda: None)
    assert _try_dbutils_secret("scope", "key") == "notebook-dbutils"


def test_try_dbutils_secret_pyspark_path_when_session_active(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    class FakeSecrets:
        def get(self, scope: str, key: str) -> str:
            return "from-pyspark-dbutils"

    class FakeDBUtils:
        def __init__(self, _spark: object) -> None:
            self.secrets = FakeSecrets()

    fake_dbutils_mod = MagicMock()
    fake_dbutils_mod.DBUtils = FakeDBUtils
    monkeypatch.setitem(sys.modules, "pyspark.dbutils", fake_dbutils_mod)
    monkeypatch.setattr(
        "pyspark.sql.SparkSession.getActiveSession",
        lambda: object(),
    )
    assert _try_dbutils_secret("scope", "key") == "from-pyspark-dbutils"

