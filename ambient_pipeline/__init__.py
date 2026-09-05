"""ambient-core pipeline helpers — free Colab / pandas happy path.

Spark and Delta helpers also ship under ``lib/ambient_pipeline/`` for optional
local lakehouse runs. They are not required for the Colab Bronze→Silver→Gold path.
Databricks / Unity Catalog integrations are commercial-platform optional.
"""

from pkgutil import extend_path

__path__ = extend_path(__path__, __name__)

from ambient_pipeline.pandas_provenance import REQUIRED_BRONZE_COLS, PandasBronzeStamper

__all__ = [
    "PandasBronzeStamper",
    "REQUIRED_BRONZE_COLS",
]
