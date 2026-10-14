#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap for Ambient Core.
# This repo has no Maven or Gradle build. Dependencies come from pyproject.toml
# (setuptools). CI declares JDK 17 for local PySpark 3.5; pin that JDK here.
set -euo pipefail

cd "$(dirname "$0")/.."

export DEBIAN_FRONTEND=noninteractive

if ! python3 -c "import ensurepip" >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq python3.12-venv
fi

# Match .github/workflows/ci.yml java-version (Temurin 17 on Actions).
# Ubuntu's OpenJDK 17 is the same major version and does not need a secret.
JAVA17_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
if [ ! -x "${JAVA17_HOME}/bin/java" ]; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq openjdk-17-jdk
fi

if [ ! -x "${JAVA17_HOME}/bin/java" ]; then
  echo "JDK 17 was not installed at ${JAVA17_HOME}" >&2
  exit 1
fi

if update-alternatives --list java 2>/dev/null | grep -qx "${JAVA17_HOME}/bin/java"; then
  sudo update-alternatives --set java "${JAVA17_HOME}/bin/java"
fi
if update-alternatives --list javac 2>/dev/null | grep -qx "${JAVA17_HOME}/bin/javac"; then
  sudo update-alternatives --set javac "${JAVA17_HOME}/bin/javac"
fi

# Login shells (install/start use bash -l) must see JAVA_HOME without rc-file edits.
sudo tee /etc/profile.d/ambient-core-java.sh >/dev/null <<EOF
export JAVA_HOME=${JAVA17_HOME}
export PATH="\$JAVA_HOME/bin:\$PATH"
EOF
sudo chmod 644 /etc/profile.d/ambient-core-java.sh

export JAVA_HOME="${JAVA17_HOME}"
export PATH="${JAVA_HOME}/bin:${PATH}"

if [ ! -x .venv/bin/python ]; then
  python3 -m venv .venv
fi

# shellcheck disable=SC1091
source .venv/bin/activate

python -m pip install --upgrade pip
pip install -e ".[all]"

# Byte-compile the packages. There is no Maven/Gradle compile step.
python -m compileall -q lib ambient_pipeline

echo "Ambient Core environment ready: $(python --version); JAVA_HOME=${JAVA_HOME}; $(java -version 2>&1 | head -n 1)"
