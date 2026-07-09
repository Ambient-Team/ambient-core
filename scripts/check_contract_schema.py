#!/usr/bin/env python3
"""CI gate: validate contracts against the contract meta-schema and conventions.

Checks (see docs/CONVENTIONS.md):

- Each contract under contracts/*.yaml validates structurally against
  contracts/schema/contract-v1.json (top-level keys, product keys, columns shape).
- The major version in each filename (-vMAJOR.yaml) matches product.version major.
- Backward compatibility: vs the previous committed version of the same file, no
  schema column is removed or retyped unless the major version is bumped. Files
  with no committed baseline (new or renamed) are skipped.

Run: python scripts/check_contract_schema.py
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTRACTS = ROOT / "contracts"
META = CONTRACTS / "schema" / "contract-v1.json"

FILENAME_VERSION = re.compile(r"-v(\d+)\.yaml$")


def _load_yaml(path: Path) -> object:
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def _major(version: object):
    if version is None:
        return None
    return str(version).strip().split(".")[0]


def validate_structure(doc: object, label: str, meta: dict) -> list:
    errors = []
    if not isinstance(doc, dict):
        return [f"{label}: root must be a mapping"]
    for key in meta.get("required", []):
        if key not in doc:
            errors.append(f"{label}: missing top-level key {key!r}")
    product = doc.get("product")
    if isinstance(product, dict):
        for key in ("name", "version", "owner"):
            if not product.get(key):
                errors.append(f"{label}: product missing {key!r}")
    schema = doc.get("schema")
    if not isinstance(schema, dict):
        errors.append(f"{label}: schema must be a mapping")
    else:
        cols = schema.get("columns")
        if cols is not None:
            if not isinstance(cols, list) or not cols:
                errors.append(f"{label}: schema.columns must be a non-empty list when present")
            else:
                for col in cols:
                    if not isinstance(col, dict) or not col.get("name") or not col.get("type"):
                        errors.append(f"{label}: every column needs a name and type")
                        break
    return errors


def check_filename_version(path: Path, doc: object) -> list:
    m = FILENAME_VERSION.search(path.name)
    if not m:
        return [f"{path.name}: filename must end with -v<MAJOR>.yaml"]
    file_major = m.group(1)
    version = doc.get("product", {}).get("version") if isinstance(doc, dict) else None
    doc_major = _major(version)
    if doc_major is not None and doc_major != file_major:
        return [f"{path.name}: filename major v{file_major} != product.version major {doc_major}"]
    return []


def _columns(doc: object) -> dict:
    if not isinstance(doc, dict):
        return {}
    schema = doc.get("schema", {})
    cols = list(schema.get("columns") or [])
    for table in schema.get("primary_tables") or []:
        if isinstance(table, dict):
            cols.extend(table.get("columns") or [])
    out = {}
    for col in cols:
        if isinstance(col, dict) and col.get("name"):
            out[str(col["name"])] = str(col.get("type", ""))
    return out


def check_backward_compat(path: Path, doc: object) -> list:
    rel = path.relative_to(ROOT).as_posix()
    try:
        prev = subprocess.run(
            ["git", "show", f"HEAD:{rel}"],
            cwd=ROOT, capture_output=True, text=True,
        )
    except OSError:
        return []
    if prev.returncode != 0 or not prev.stdout.strip():
        return []
    old_doc = yaml.safe_load(prev.stdout)
    old_cols = _columns(old_doc)
    new_cols = _columns(doc)
    old_major = _major(old_doc.get("product", {}).get("version")) if isinstance(old_doc, dict) else None
    new_major = _major(doc.get("product", {}).get("version")) if isinstance(doc, dict) else None
    if old_major != new_major:
        return []
    errors = []
    for name, old_type in old_cols.items():
        if name not in new_cols:
            errors.append(f"{path.name}: column {name!r} removed without major bump")
        elif new_cols[name] != old_type:
            errors.append(f"{path.name}: column {name!r} retyped without major bump")
    return errors


def main() -> int:
    if not META.is_file():
        print(f"missing meta-schema: {META}", file=sys.stderr)
        return 1
    meta = json.loads(META.read_text(encoding="utf-8"))
    errors = []
    files = sorted(CONTRACTS.glob("*.yaml"))
    if not files:
        print("no contracts found", file=sys.stderr)
        return 1
    for path in files:
        doc = _load_yaml(path)
        errors.extend(validate_structure(doc, path.name, meta))
        errors.extend(check_filename_version(path, doc))
        errors.extend(check_backward_compat(path, doc))
    if errors:
        for err in errors:
            print(f"contract schema error: {err}", file=sys.stderr)
        return 1
    print(f"OK: {len(files)} contracts validate against contract-v1 meta-schema")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
