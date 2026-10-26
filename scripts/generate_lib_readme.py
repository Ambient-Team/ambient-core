#!/usr/bin/env python3
"""Generate lib/README.md public API index from package docstrings and __all__."""

from __future__ import annotations

import argparse
import importlib
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
OUTPUT = LIB / "README.md"

HEADER = """# Ambient Core Python packages (`lib/`)

This file is **generated** from installed package docstrings and ``__all__`` exports.
Do not edit by hand — run ``python scripts/generate_lib_readme.py`` (or ``--check`` in CI).

"""

PACKAGES: tuple[tuple[str, tuple[str, ...]], ...] = (
    (
        "ambient_contracts",
        ("ContractLoader", "validate_all_contracts", "__version__"),
    ),
    (
        "ambient_calc",
        ("CalcError", "compute_all", "compute_metric", "formula_names", "safe_eval", "slug_of"),
    ),
    (
        "ambient_cli",
        ("ambient_cli.catalog.main",),
    ),
        (
        "ambient_pipeline",
        (
            "PandasBronzeStamper",
            "REQUIRED_BRONZE_COLS",
            "BronzeProvenanceStamper",
            "ContractLoader",
            "MappingSpec",
            "PiiPseudonymizer",
            "SilverValidator",
            "apply_column_mapping",
            "bronze_to_tenant_metrics",
            "catalog_types_for_option",
            "coerce_mapped_columns",
            "contract_column_catalog_map",
            "resolve_mapping_spec",
            "links_for_contract_file",
            "stamp_lineage_columns",
            "unpivot_to_tenant_metrics",
        ),
    ),
)

EXTRA_MODULES = {
    "ambient_pipeline": [
        ("ambient_pipeline.runner", ("run_local_pipeline", "run_pipeline_from_config", "PipelineRunConfig")),
        ("ambient_pipeline.colab_smoke", ("run_colab_smoke", "SmokeResult")),
        ("ambient_pipeline.pipeline_logging", ("log_pipeline_event",)),
    ],
}


def _summary_for(obj: Any) -> str:
    doc = getattr(obj, "__doc__", None) or ""
    line = doc.strip().split("\n")[0].strip()
    return line if line else "(no summary)"


def _package_doc(pkg_name: str) -> str:
    mod = importlib.import_module(pkg_name)
    doc = (mod.__doc__ or "").strip().split("\n\n")[0].replace("\n", " ")
    return doc or pkg_name


def _resolve_symbol(pkg_name: str, name: str) -> Any:
    if name.count(".") >= 2:
        mod_name, attr = name.rsplit(".", 1)
        mod = importlib.import_module(mod_name)
        return getattr(mod, attr)
    mod = importlib.import_module(pkg_name)
    return getattr(mod, name)


def render() -> str:
    sys.path.insert(0, str(LIB))
    lines = [HEADER]
    for pkg_name, symbols in PACKAGES:
        lines.append(f"## `{pkg_name}`\n")
        lines.append(f"{_package_doc(pkg_name)}\n")
        lines.append("### Public API\n")
        seen: set[str] = set()
        for symbol in symbols:
            if symbol in seen:
                continue
            seen.add(symbol)
            if "." in symbol:
                obj = _resolve_symbol(pkg_name, symbol)
                label = symbol
            else:
                obj = _resolve_symbol(pkg_name, symbol)
                label = f"`{symbol}`"
            lines.append(f"- {label} — {_summary_for(obj)}\n")
        for mod_name, extra_syms in EXTRA_MODULES.get(pkg_name, []):
            mod = importlib.import_module(mod_name)
            short = mod_name.split(".")[-1]
            lines.append(f"\n### `{short}` module\n")
            for sym in extra_syms:
                if sym in seen:
                    continue
                seen.add(sym)
                obj = getattr(mod, sym)
                lines.append(f"- `{sym}` — {_summary_for(obj)}\n")
        lines.append("\n")
    return "".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="Fail if README drifted")
    args = parser.parse_args()
    content = render()
    if args.check:
        if not OUTPUT.is_file():
            print(f"ERROR: missing {OUTPUT}", file=sys.stderr)
            return 1
        if OUTPUT.read_text(encoding="utf-8") != content:
            print("ERROR: lib/README.md is out of date — run generate_lib_readme.py", file=sys.stderr)
            return 1
        print("OK: lib/README.md matches generated API index")
        return 0
    OUTPUT.write_text(content, encoding="utf-8")
    print(f"OK: wrote {OUTPUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
