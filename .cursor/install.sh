#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap for Ambient Core.
# Creates the project virtualenv at .venv and installs the package with all extras.
set -euo pipefail

cd "$(dirname "$0")/.."

# python3.12-venv provides ensurepip, required to create the virtualenv.
# The default base image lacks it; guard so re-runs (and snapshot boots) are no-ops.
if ! python3 -c "import ensurepip" >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq python3.12-venv
fi

if [ ! -x .venv/bin/python ]; then
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

python -m pip install --upgrade pip
pip install -e ".[all]"

echo "Ambient Core environment ready: $(python --version), $(java -version 2>&1 | head -n1)"
