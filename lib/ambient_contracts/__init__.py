"""Data-product contract loaders and validation for Ambient Core.

Public API:

- ``ContractLoader`` — load YAML contracts from a checkout or bundled wheel data.
- ``validate_all_contracts`` — structural validation used by CI and ``validate-contracts``.
- ``__version__`` — package version (must match release tag ``vX.Y.Z``).
"""

from ambient_contracts.loader import ContractLoader
from ambient_contracts.validate import validate_all_contracts

__version__ = "0.3.11"

__all__ = ["ContractLoader", "validate_all_contracts", "__version__"]
