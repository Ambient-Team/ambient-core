"""Spark performance instrumentation helpers."""

from __future__ import annotations

import json
import platform
import time
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from pyspark.sql import DataFrame, SparkSession


@dataclass
class StageMetrics:
    """Collected metrics for a pipeline stage."""

    run_id: str
    stage: str
    volume_gb: float
    wall_seconds: float
    input_rows: int = 0
    output_rows: int = 0
    shuffle_read_bytes: int = 0
    shuffle_write_bytes: int = 0
    spill_bytes: int = 0
    plan_excerpt: str = ""
    environment: str = ""

    def to_dict(self) -> dict[str, Any]:
        return {
            "run_id": self.run_id,
            "stage": self.stage,
            "volume_gb": self.volume_gb,
            "wall_seconds": self.wall_seconds,
            "input_rows": self.input_rows,
            "output_rows": self.output_rows,
            "shuffle_read_bytes": self.shuffle_read_bytes,
            "shuffle_write_bytes": self.shuffle_write_bytes,
            "spill_bytes": self.spill_bytes,
            "plan_excerpt": self.plan_excerpt[:2000],
            "environment": self.environment,
            "recorded_at": datetime.now(timezone.utc).isoformat(),
        }


@dataclass
class PipelinePerfRecorder:
    """Capture Spark plans and stage metrics; append to Delta or CSV."""

    spark: SparkSession
    run_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    volume_gb: float = 0.0
    output_path: str | None = None
    _rows: list[dict[str, Any]] = field(default_factory=list, repr=False)

    def __repr__(self) -> str:
        return f"PipelinePerfRecorder(run_id={self.run_id!r}, volume_gb={self.volume_gb})"

    @staticmethod
    def capture_plan(df: DataFrame, label: str = "") -> str:
        """Return formatted physical plan for *df*."""
        try:
            plan = df._jdf.queryExecution().toString()  # noqa: SLF001
        except Exception:
            plan = df.explain(mode="formatted") or ""
        prefix = f"[{label}] " if label else ""
        return f"{prefix}{plan}"

    def _environment_label(self) -> str:
        return json.dumps(
            {
                "platform": platform.platform(),
                "python": platform.python_version(),
                "spark_master": self.spark.sparkContext.master,
            }
        )

    def _collect_spark_metrics(self) -> dict[str, int]:
        """Aggregate shuffle/spill from completed Spark stages."""
        shuffle_read = shuffle_write = spill = 0
        try:
            status = self.spark.sparkContext.statusTracker()
            for stage in status.getStageInfos():
                metrics = stage.accumulatorUpdates() if hasattr(stage, "accumulatorUpdates") else []
                for metric in metrics:
                    name = getattr(metric, "name", str(metric))
                    value = int(getattr(metric, "value", 0) or 0)
                    if "shuffle read" in name.lower():
                        shuffle_read += value
                    elif "shuffle write" in name.lower():
                        shuffle_write += value
                    elif "spill" in name.lower():
                        spill += value
        except Exception:
            pass
        return {
            "shuffle_read_bytes": shuffle_read,
            "shuffle_write_bytes": shuffle_write,
            "spill_bytes": spill,
        }

    def record_stage(
        self,
        stage: str,
        df: DataFrame | None = None,
        *,
        input_rows: int = 0,
        output_rows: int = 0,
        wall_seconds: float | None = None,
        plan_label: str = "",
    ) -> StageMetrics:
        """Record metrics for a pipeline stage."""
        plan = self.capture_plan(df, plan_label) if df is not None else ""
        spark_metrics = self._collect_spark_metrics()
        metrics = StageMetrics(
            run_id=self.run_id,
            stage=stage,
            volume_gb=self.volume_gb,
            wall_seconds=wall_seconds or 0.0,
            input_rows=input_rows,
            output_rows=output_rows,
            shuffle_read_bytes=spark_metrics["shuffle_read_bytes"],
            shuffle_write_bytes=spark_metrics["shuffle_write_bytes"],
            spill_bytes=spark_metrics["spill_bytes"],
            plan_excerpt=plan,
            environment=self._environment_label(),
        )
        self._rows.append(metrics.to_dict())
        return metrics

    def timed_action(
        self,
        stage: str,
        df: DataFrame,
        action: str = "count",
        *,
        input_rows: int = 0,
        plan_label: str = "",
    ) -> tuple[int, StageMetrics]:
        """Run an action on *df* and record wall time + metrics."""
        start = time.perf_counter()
        if action == "count":
            output_rows = df.count()
        else:
            output_rows = df.count()
        elapsed = time.perf_counter() - start
        metrics = self.record_stage(
            stage,
            df,
            input_rows=input_rows,
            output_rows=output_rows,
            wall_seconds=elapsed,
            plan_label=plan_label,
        )
        return output_rows, metrics

    def flush(self) -> None:
        """Persist collected rows to Delta table or CSV fallback."""
        if not self._rows:
            return

        if self.output_path:
            path = Path(self.output_path)
            if path.suffix == ".csv":
                self._write_csv(path)
            else:
                self._write_delta(self.output_path)
        else:
            default = Path(".scale_test/gold/pipeline_perf")
            self._write_delta(str(default.resolve()))

    def _write_delta(self, path: str) -> None:
        rows_df = self.spark.createDataFrame(self._rows)
        (
            rows_df.write.format("delta")
            .mode("append")
            .option("mergeSchema", "true")
            .save(path)
        )

    def _write_csv(self, path: Path) -> None:
        import csv

        path.parent.mkdir(parents=True, exist_ok=True)
        write_header = not path.exists()
        with path.open("a", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(self._rows[0].keys()))
            if write_header:
                writer.writeheader()
            writer.writerows(self._rows)


def create_local_spark(
    app_name: str = "ambient-pipeline",
    shuffle_partitions: int = 8,
) -> SparkSession:
    """Build a local SparkSession with Delta Lake extensions."""
    import os
    import sys
    from pathlib import Path

    from delta import configure_spark_with_delta_pip

    os.environ.setdefault("PYSPARK_PYTHON", sys.executable)
    os.environ.setdefault("PYSPARK_DRIVER_PYTHON", sys.executable)

    root = Path(__file__).resolve().parents[2]
    hadoop_home = root / ".hadoop_home"
    if hadoop_home.is_dir() and not os.environ.get("HADOOP_HOME"):
        os.environ["HADOOP_HOME"] = str(hadoop_home)
        bin_path = str(hadoop_home / "bin")
        if bin_path not in os.environ.get("PATH", ""):
            os.environ["PATH"] = f"{bin_path};{os.environ.get('PATH', '')}"

    builder = (
        SparkSession.builder.appName(app_name)
        .master("local[1]")
        .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
        .config(
            "spark.sql.catalog.spark_catalog",
            "org.apache.spark.sql.delta.catalog.DeltaCatalog",
        )
        .config("spark.sql.adaptive.enabled", "true")
        .config("spark.sql.adaptive.skewJoin.enabled", "true")
        .config("spark.sql.shuffle.partitions", str(shuffle_partitions))
        .config("spark.driver.memory", "4g")
        .config("spark.ui.enabled", "false")
    )
    return configure_spark_with_delta_pip(builder).getOrCreate()
