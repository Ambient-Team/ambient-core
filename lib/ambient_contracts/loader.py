"""Load YAML data product contracts."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

from ambient_contracts.paths import resolve_contracts_dir


@dataclass
class ContractLoader:
    """Load YAML data product contracts from contracts/ (checkout or bundled package data)."""

    contracts_dir: Path | None = field(default=None)

    def __post_init__(self) -> None:
        if self.contracts_dir is None:
            self.contracts_dir = resolve_contracts_dir()

    def __repr__(self) -> str:
        return f"ContractLoader(contracts_dir={self.contracts_dir!r})"

    @staticmethod
    def _safe_contract_name(contract_file: str) -> str:
        """Reject path traversal and absolute paths in contract file names."""
        name = str(contract_file).strip()
        if not name:
            raise ValueError("contract file name must be non-empty")
        path = Path(name)
        if path.is_absolute() or path.anchor:
            raise ValueError(f"absolute contract paths are not allowed: {contract_file!r}")
        parts = path.parts
        if any(part in ("", ".", "..") for part in parts):
            raise ValueError(f"path traversal is not allowed in contract file: {contract_file!r}")
        if any(sep in name for sep in ("\\", "\0")):
            raise ValueError(f"invalid contract file name: {contract_file!r}")
        return name

    def resolve_path(self, contract_file: str) -> Path:
        assert self.contracts_dir is not None
        safe_name = self._safe_contract_name(contract_file)
        candidates = [self.contracts_dir / safe_name]
        for root in (
            Path.cwd(),
            Path.cwd().parent,
            Path.cwd().parent.parent,
        ):
            candidates.append(root / "contracts" / safe_name)
            candidates.append(root / "ambient-core" / "contracts" / safe_name)
        candidates.append(Path("/Workspace/Contracts") / safe_name)
        for path in candidates:
            resolved = path.resolve()
            # Ensure the resolved file stays under its intended contracts root.
            try:
                resolved.relative_to(path.parent.resolve())
            except ValueError as exc:
                raise ValueError(
                    f"contract path escapes contracts directory: {contract_file!r}"
                ) from exc
            if resolved.is_file():
                return resolved
        raise FileNotFoundError(f"Contract file not found: {contract_file}")

    def load(self, contract_file: str) -> dict[str, Any]:
        path = self.resolve_path(contract_file)
        with path.open("r", encoding="utf-8") as handle:
            return yaml.safe_load(handle)

    def enforce_bronze_lineage(self, contract: dict[str, Any]) -> None:
        """Verify contract declares required Bronze provenance columns."""
        required = {"_bronze_run_id", "_bronze_row_hash"}
        contract_columns = set(contract.get("lineage", {}).get("provenance_columns", []))
        partition_key = contract.get("schema", {}).get("partition_key")

        org_covered = "_bronze_org_id" in contract_columns or partition_key == "_bronze_org_id"
        if not org_covered:
            raise RuntimeError(
                "Bronze contract must declare _bronze_org_id in provenance_columns "
                "or schema.partition_key"
            )

        missing = required - contract_columns
        if missing:
            raise RuntimeError(
                f"Bronze contract lineage missing required provenance columns: {missing}"
            )

    def assert_required_columns(
        self,
        df_columns: set[str],
        contract: dict[str, Any],
        context: str,
    ) -> None:
        """Raise if required schema columns from contract are absent."""
        schema_cols = contract.get("schema", {}).get("columns", [])
        required = {
            col["name"]
            for col in schema_cols
            if col.get("required") and not str(col["name"]).startswith("#")
        }
        missing = required - df_columns
        if missing:
            raise RuntimeError(f"{context}: missing required contract columns: {missing}")
