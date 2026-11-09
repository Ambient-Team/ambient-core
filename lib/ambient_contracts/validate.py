"""Validate data-product contract YAML structure (CI gate and ``validate-contracts`` CLI)."""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from ambient_contracts.paths import resolve_contracts_dir


def contract_store_section(doc: dict[str, Any]) -> dict[str, Any] | None:
    """Return store config from ``store`` (preferred) or deprecated legacy key.

    Args:
        doc: Parsed contract document.

    Returns:
        Store section mapping when present, else ``None``.

    Raises:
        None: This callable does not raise.

    Example:
        >>> contract_store_section({"store": {"paths": []}})
    """
    store = doc.get("store")
    if isinstance(store, dict):
        return store
    legacy = doc.get("firestore")
    if isinstance(legacy, dict):
        return legacy
    return None

REQUIRED_TOP_LEVEL = {"product", "schema", "lineage", "governance"}
REQUIRED_PRODUCT = {"name", "version", "owner"}


def validate_contract_doc(doc: object, label: str) -> list[str]:
    """Validate one parsed contract document; return human-readable error strings.

    Args:
        doc: object.
        label: str.

    Returns:
        list[str].

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_contract_doc(...)
    """
    errors: list[str] = []
    if not isinstance(doc, dict):
        return [f"{label}: root must be a mapping"]

    missing = REQUIRED_TOP_LEVEL - set(doc.keys())
    if missing:
        errors.append(f"{label}: missing top-level keys: {sorted(missing)}")

    product = doc.get("product", {})
    if not isinstance(product, dict):
        errors.append(f"{label}: product must be a mapping")
    else:
        pm = REQUIRED_PRODUCT - set(product.keys())
        if pm:
            errors.append(f"{label}: product missing keys: {sorted(pm)}")

    lineage = doc.get("lineage", {})
    if isinstance(lineage, dict) and "provenance_columns" in lineage:
        cols = lineage.get("provenance_columns")
        if not cols:
            errors.append(
                f"{label}: lineage.provenance_columns must be non-empty when declared"
            )

    store = contract_store_section(doc)
    if isinstance(store, dict):
        paths = store.get("paths")
        if isinstance(paths, list) and len(paths) > 0:
            consumption = doc.get("consumption_contract")
            allowed = None
            if isinstance(consumption, dict):
                allowed = consumption.get("allowed_paths")
            if not isinstance(allowed, list) or len(allowed) == 0:
                errors.append(
                    f"{label}: store.paths is non-empty but "
                    "consumption_contract.allowed_paths is missing or empty"
                )

    return errors


def validate_contract_file(path: Path) -> list[str]:
    """Load and validate a single contract YAML file.

    Args:
        path: Path.

    Returns:
        list[str].

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_contract_file(...)
    """
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    return validate_contract_doc(doc, path.name)


def validate_all_contracts(contracts_dir: Path | None = None) -> list[str]:
    """Validate every ``*.yaml`` contract in the resolved contracts directory.

    Args:
        contracts_dir: Path | None.

    Returns:
        list[str].

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_all_contracts(...)
    """
    directory = contracts_dir or resolve_contracts_dir()
    if not directory.is_dir():
        return [f"contracts directory not found: {directory}"]
    yaml_files = sorted(directory.glob("*.yaml"))
    if not yaml_files:
        return ["no contract YAML files found"]
    errors: list[str] = []
    for path in yaml_files:
        errors.extend(validate_contract_file(path))
    return errors


def main() -> int:
    """Main.

    Args:
        None.

    Returns:
        int.

    Raises:
        None: This callable does not raise.

    Example:
        >>> main()
    """
    import argparse
    import sys

    argparse.ArgumentParser(
        description="Validate Ambient Core data-product contract YAML files.",
    ).parse_args()

    errors = validate_all_contracts()
    if errors:
        for err in errors:
            print(f"ERROR: {err}", file=sys.stderr)
        return 1
    directory = resolve_contracts_dir()
    count = len(list(directory.glob("*.yaml")))
    print(f"OK: validated {count} contract(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
