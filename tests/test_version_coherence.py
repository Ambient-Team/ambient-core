"""Package version is single-sourced from ambient_contracts.__version__."""

from __future__ import annotations

import re
from pathlib import Path

import ambient_contracts


def test_version_is_nonempty():
    assert ambient_contracts.__version__


def test_pyproject_uses_dynamic_version():
    text = (Path(__file__).resolve().parents[1] / "pyproject.toml").read_text(encoding="utf-8")
    assert 'dynamic = ["version"]' in text
    assert re.search(r'attr\s*=\s*"ambient_contracts.__version__"', text)
