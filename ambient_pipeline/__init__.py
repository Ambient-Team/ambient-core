"""ambient-core pipeline helpers — free Colab / pandas happy path.

Spark and Delta helpers also ship under ``lib/ambient_pipeline/`` for optional
local lakehouse runs. They are not required for the Colab Bronze→Silver→Gold path.
Databricks / Unity Catalog integrations are commercial-platform optional.
"""

from __future__ import annotations

from pkgutil import extend_path
from typing import Any

__path__ = extend_path(__path__, __name__)

__all__ = [
    "PandasBronzeStamper",
    "REQUIRED_BRONZE_COLS",
]

_LAZY_EXPORTS = {
    "PandasBronzeStamper": ("ambient_pipeline.pandas_provenance", "PandasBronzeStamper"),
    "REQUIRED_BRONZE_COLS": ("ambient_pipeline.pandas_provenance", "REQUIRED_BRONZE_COLS"),
}


def __getattr__(name: str) -> Any:
    target = _LAZY_EXPORTS.get(name)
    if target is None:
        raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
    module_name, attr = target
    from importlib import import_module

    value = getattr(import_module(module_name), attr)
    globals()[name] = value
    return value
