"""Open-source data product contracts — loaders and validation."""

from ambient_contracts.loader import ContractLoader
from ambient_contracts.validate import validate_all_contracts

__version__ = "0.3.8"

__all__ = ["ContractLoader", "validate_all_contracts", "__version__"]
