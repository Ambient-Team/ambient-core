"""Validate contract YAML structure (CI gate)."""

from __future__ import annotations

from pathlib import Path

import yaml

from ambient_contracts.paths import resolve_contracts_dir

REQUIRED_TOP_LEVEL = {"product", "schema", "lineage", "governance"}
REQUIRED_PRODUCT = {"name", "version", "owner"}


def validate_contract_doc(doc: object, label: str) -> list[str]:
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

    firestore = doc.get("firestore")
    if isinstance(firestore, dict):
        paths = firestore.get("paths")
        if isinstance(paths, list) and len(paths) > 0:
            consumption = doc.get("consumption_contract")
            allowed = None
            if isinstance(consumption, dict):
                allowed = consumption.get("allowed_paths")
            if not isinstance(allowed, list) or len(allowed) == 0:
                errors.append(
                    f"{label}: firestore.paths is non-empty but "
                    "consumption_contract.allowed_paths is missing or empty"
                )

    return errors


def validate_contract_file(path: Path) -> list[str]:
    with path.open("r", encoding="utf-8") as handle:
        doc = yaml.safe_load(handle)
    return validate_contract_doc(doc, path.name)


def validate_all_contracts(contracts_dir: Path | None = None) -> list[str]:
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
    import sys

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
