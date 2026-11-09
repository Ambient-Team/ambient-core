"""Bootstrap ambient_pipeline imports for local Jupyter notebooks (OSS path)."""

from __future__ import annotations

import os
import sys
from pathlib import Path
from typing import Protocol


def find_repo_root(start: Path | None = None) -> Path | None:
    """Walk upward until a directory containing ``lib/ambient_pipeline`` is found.

    Args:
        start: Path | None.

    Returns:
        Path | None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> find_repo_root(...)
    """
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

    Args:
        start: Path | None.

    Returns:
        Path | None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> ensure_pipeline_on_path(...)
    """
    root = find_repo_root(start)
    if root is None:
        return None
    lib_dir = root / "lib"
    lib_str = str(lib_dir)
    if lib_str not in sys.path:
        sys.path.insert(0, lib_str)
    return root


FOLDER_MARKERS = (
    "Ambient-Systems-Platform",
    "ambient-core",
)


def find_checkout_root(explicit: str | Path | None = None) -> Path:
    """Return a checkout root containing ``ambient_pipeline/`` and ``data/``.

    Args:
        explicit: Optional path or ``PLATFORM_ROOT`` override.

    Returns:
        Resolved repository root.

    Raises:
        FileNotFoundError: When no matching checkout exists.

    Example:
        >>> find_checkout_root("/path/to/ambient-core")
    """
    if explicit is None:
        env_root = os.environ.get("PLATFORM_ROOT", "").strip()
        if env_root:
            explicit = env_root

    if explicit:
        root = Path(explicit).expanduser().resolve()
        if not (root / "ambient_pipeline").is_dir():
            raise FileNotFoundError(f"explicit root missing ambient_pipeline/: {root}")
        return root

    seen: set[str] = set()
    candidates: list[Path] = []
    here = Path(__file__).resolve()
    if len(here.parents) >= 2:
        candidates.append(here.parents[1])
    if len(here.parents) >= 3 and here.parents[1].name == "lib":
        candidates.append(here.parents[2])
    candidates.extend([Path.cwd(), Path.cwd().parent])

    for root in candidates:
        root = root.resolve()
        key = str(root)
        if key in seen:
            continue
        seen.add(key)
        if (root / "ambient_pipeline").is_dir() and (root / "data").is_dir():
            return root

    raise FileNotFoundError(
        "Could not find ambient-core checkout root. "
        "Set PLATFORM_ROOT to your clone or run from the repository directory."
    )


def ensure_checkout_on_path(root: Path | None = None) -> Path:
    """Insert checkout ``ambient_pipeline`` and ``lib`` on ``sys.path``.

    Args:
        root: Optional checkout root; discovered when omitted.

    Returns:
        Resolved checkout root used for ``sys.path`` updates.

    Raises:
        FileNotFoundError: When ``root`` is omitted and discovery fails.

    Example:
        >>> ensure_checkout_on_path()
    """
    root = root or find_checkout_root()
    root_str = str(root)
    if root_str not in sys.path:
        sys.path.insert(0, root_str)
    lib = root / "lib"
    if lib.is_dir() and str(lib) not in sys.path:
        sys.path.insert(0, str(lib))
    return root


# Deprecated names kept for notebooks and ambient-systems-platform imports.
find_platform_root = find_checkout_root
ensure_package_on_path = ensure_checkout_on_path

__all__ = [
    "apply_spark_tuning",
    "ensure_checkout_on_path",
    "ensure_package_on_path",
    "ensure_pipeline_on_path",
    "find_checkout_root",
    "find_platform_root",
    "find_repo_root",
]

class _SparkConf(Protocol):
    def set(self, key: str, value: str) -> None: ...


class _SparkSession(Protocol):
    conf: _SparkConf


def apply_spark_tuning(
    spark: _SparkSession, extra: tuple[tuple[str, str], ...] = ()
) -> None:
    """Set AQE / common Spark SQL knobs when the runtime allows.

    Args:
        spark: _SparkSession.
        extra: tuple[tuple[str, str], ...].

    Returns:
        None.

    Raises:
        None: This callable does not raise.

    Example:
        >>> apply_spark_tuning(...)
    """
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
