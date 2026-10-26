#!/usr/bin/env bash
# Mirror PR CI locally when GitHub Actions billing is unavailable.
# Usage: bash scripts/run_local_pr_ci.sh  (from repo root, .venv active)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export AMBIENT_SPARK_TESTS="${AMBIENT_SPARK_TESTS:-1}"
echo "=== local PR CI $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
cp contracts/*.yaml lib/ambient_contracts/bundled/
git diff --exit-code lib/ambient_contracts/bundled/
validate-contracts
python scripts/harden_catalog_data_options.py --check
python scripts/generate_reference_catalog.py --check --strict-data-option-inputs
python scripts/check_crosswalk.py
python scripts/check_catalog_hygiene.py
python scripts/check_naming.py
python scripts/check_contract_schema.py
python scripts/check_formulas.py
python scripts/check_metric_inputs.py
python scripts/check_phi.py
python scripts/check_markdown_prose.py
python scripts/check_doc_links.py
python scripts/check_quality_static.py
python scripts/check_coverage.py
pip wheel . -w dist --no-deps
node scripts/ci-policy.mjs
node --test scripts/ci-policy.test.mjs
echo "=== OK: local PR CI passed ==="
