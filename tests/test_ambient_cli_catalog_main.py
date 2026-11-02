"""ambient_cli.catalog main delegates to the reference catalog generator script."""

from __future__ import annotations

import runpy
import sys
from pathlib import Path

import pytest

from ambient_cli import catalog as catalog_module


def test_catalog_main_invokes_generator_script(monkeypatch: pytest.MonkeyPatch) -> None:
    captured: dict[str, object] = {}

    def fake_run_path(script: str, *, run_name: str) -> None:
        captured["script"] = script
        captured["run_name"] = run_name

    monkeypatch.setattr(runpy, "run_path", fake_run_path)
    monkeypatch.setattr(sys, "argv", ["ambient-catalog-generate", "--help"])
    catalog_module.main()
    script = Path(str(captured["script"]))
    assert script.name == "generate_reference_catalog.py"
    assert captured["run_name"] == "__main__"
    assert str(script) == sys.argv[0]
