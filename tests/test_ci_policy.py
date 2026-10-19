"""Regression tests for scripts/ci-policy.mjs (Node policy checker)."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / "scripts" / "ci-policy.mjs"
POLICY_TEST = ROOT / "scripts" / "ci-policy.test.mjs"


@pytest.fixture(scope="module")
def node() -> str:
    path = shutil.which("node")
    if not path:
        pytest.skip("node not installed")
    return path


def test_ci_policy_script_passes(node: str) -> None:
    result = subprocess.run(
        [node, str(POLICY)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout


def test_ci_policy_node_tests_pass(node: str) -> None:
    result = subprocess.run(
        [node, "--test", str(POLICY_TEST)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stderr or result.stdout
