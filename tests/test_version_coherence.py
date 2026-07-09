"""The Maestro app version is single-sourced from ambient_inference.__version__."""

from __future__ import annotations

import re
from pathlib import Path

import ambient_inference


def test_version_is_nonempty():
    assert ambient_inference.__version__


def test_app_version_matches_package():
    from main import app

    assert app.version == ambient_inference.__version__


def test_pyproject_uses_dynamic_version():
    text = (Path(__file__).resolve().parents[1] / "pyproject.toml").read_text(encoding="utf-8")
    assert 'dynamic = ["version"]' in text
    assert re.search(r'attr\s*=\s*"ambient_inference.__version__"', text)
