"""Package version is single-sourced from ambient_contracts.__version__."""

from __future__ import annotations

import re
from pathlib import Path

import ambient_contracts


def test_version_is_nonempty() -> None:
    assert ambient_contracts.__version__


def test_pyproject_uses_dynamic_version() -> None:
    text = (Path(__file__).resolve().parents[1] / "pyproject.toml").read_text(encoding="utf-8")
    assert 'dynamic = ["version"]' in text
    assert re.search(r'attr\s*=\s*"ambient_contracts.__version__"', text)


def test_readme_acknowledgements_version_matches_package() -> None:
    """README documents the same __version__ as ambient_contracts (release guard)."""
    readme = (Path(__file__).resolve().parents[1] / "README.md").read_text(encoding="utf-8")
    match = re.search(
        r"- \*\*Package metadata `__version__`:\*\* `([^`]+)`",
        readme,
    )
    assert match, "README acknowledgements missing documented package __version__"
    assert match.group(1) == ambient_contracts.__version__
