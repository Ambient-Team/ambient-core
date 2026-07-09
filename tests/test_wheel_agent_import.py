"""Wheel install must not require ambient_pipeline for ambient_agent."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def test_import_ambient_agent_without_ambient_pipeline_on_path() -> None:
    repo = Path(__file__).resolve().parents[1]
    lib = repo / "lib"
    code = """
import sys
for name in list(sys.modules):
    if name == "ambient_pipeline" or name.startswith("ambient_pipeline."):
        del sys.modules[name]
import ambient_agent
from ambient_agent.executor import execute
assert "ambient_pipeline" not in sys.modules
"""
    env = {"PYTHONPATH": str(lib)}
    # Drop repo pythonpath from pytest so only lib/ is used (no ambient_pipeline package path).
    proc = subprocess.run(
        [sys.executable, "-c", code],
        cwd=repo,
        env={**dict(__import__("os").environ), **env},
        capture_output=True,
        text=True,
        check=False,
    )
    assert proc.returncode == 0, proc.stderr or proc.stdout
