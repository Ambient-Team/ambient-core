"""Bootstrap ambient_pipeline imports for local Jupyter notebooks (OSS path)."""

from __future__ import annotations

import sys
from pathlib import Path


def find_repo_root(start: Path | None = None) -> Path | None:
    """Walk upward until a directory containing ``lib/ambient_pipeline`` is found."""
    here = (start or Path.cwd()).resolve()
    candidates = [here, *here.parents]
    # Also try relative to this module (lib/ambient_pipeline/ → repo root).
    candidates.append(Path(__file__).resolve().parents[2])
    seen: set[Path] = set()
    for root in candidates:
        if root in seen:
            continue
        seen.add(root)
        if (root / "lib" / "ambient_pipeline").is_dir():
            return root
    return None


def ensure_pipeline_on_path(start: Path | None = None) -> Path | None:
    """Add ``<repo>/lib`` to ``sys.path`` so ``import ambient_pipeline`` works.

    Prefer the git checkout ``lib/`` package home. Does **not** look under
    ``databricks/lib`` or ``ambient-systems-platform`` paths.
    """
    root = find_repo_root(start)
    if root is None:
        return None
    lib_dir = root / "lib"
    lib_str = str(lib_dir)
    if lib_str not in sys.path:
        sys.path.insert(0, lib_str)
    return root


def apply_spark_tuning(spark, extra: tuple[tuple[str, str], ...] = ()) -> None:
    """Set AQE / common Spark SQL knobs when the runtime allows."""
    defaults = (
        ("spark.sql.adaptive.enabled", "true"),
        ("spark.sql.adaptive.coalescePartitions.enabled", "true"),
        ("spark.sql.adaptive.skewJoin.enabled", "true"),
    )
    for key, val in (*defaults, *extra):
        try:
            spark.conf.set(key, val)
        except Exception as exc:  # noqa: BLE001 — optional on restricted runtimes
            print(f"[spark conf] skipped {key}: {type(exc).__name__}: {exc}")
