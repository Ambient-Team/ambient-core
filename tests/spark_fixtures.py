"""Shared Spark session for tests — skips when local Spark cannot start."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
HADOOP_HOME = ROOT / ".hadoop_home"

SPARK_TESTS_ENABLED = (
    os.environ.get(
        "AMBIENT_SPARK_TESTS",
        "1" if sys.platform != "win32" else "0",
    )
    == "1"
)


def create_local_spark(app_name: str = "pytest-ambient"):
    from pyspark.sql import SparkSession

    os.environ.setdefault("PYSPARK_PYTHON", sys.executable)
    os.environ.setdefault("PYSPARK_DRIVER_PYTHON", sys.executable)
    if HADOOP_HOME.is_dir():
        os.environ.setdefault("HADOOP_HOME", str(HADOOP_HOME))
        bin_path = str(HADOOP_HOME / "bin")
        if bin_path not in os.environ.get("PATH", ""):
            os.environ["PATH"] = f"{bin_path};{os.environ.get('PATH', '')}"
    return (
        SparkSession.builder.appName(app_name)
        .master("local[1]")
        .config("spark.ui.enabled", "false")
        .config("spark.sql.shuffle.partitions", "2")
        .getOrCreate()
    )


@pytest.fixture(scope="session")
def spark():
    if not SPARK_TESTS_ENABLED:
        pytest.skip("Spark tests disabled — set AMBIENT_SPARK_TESTS=1 to force")
    try:
        session = create_local_spark()
        yield session
    except Exception as exc:
        pytest.skip(f"Spark session unavailable: {exc}")
    finally:
        try:
            session.stop()  # type: ignore[misc]
        except Exception:
            pass
