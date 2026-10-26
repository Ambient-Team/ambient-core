"""Shared Spark session for tests — skips when local Spark cannot start."""

from __future__ import annotations

import os
import sys
from pathlib import Path
from typing import TYPE_CHECKING

import pytest

if TYPE_CHECKING:
    from pyspark.sql import SparkSession

ROOT = Path(__file__).resolve().parents[1]
HADOOP_HOME = ROOT / ".hadoop_home"

SPARK_TESTS_ENABLED = (
    os.environ.get(
        "AMBIENT_SPARK_TESTS",
        "1" if sys.platform != "win32" else "0",
    )
    == "1"
)


def create_local_spark(app_name: str = "pytest-ambient") -> SparkSession:
    """Local Spark with Delta (matches ``ambient_pipeline.perf.create_local_spark``)."""
    from ambient_pipeline.perf import create_local_spark as _delta_spark

    return _delta_spark(app_name, shuffle_partitions=2)


@pytest.fixture(scope="session")
def spark():
    if not SPARK_TESTS_ENABLED:
        pytest.skip("Spark tests disabled — set AMBIENT_SPARK_TESTS=1 to force")
    session: SparkSession | None = None
    try:
        session = create_local_spark()
        yield session
    except Exception as exc:
        pytest.skip(f"Spark session unavailable: {exc}")
    finally:
        if session is not None:
            try:
                session.stop()
            except Exception:
                pass
