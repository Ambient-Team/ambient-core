"""ambient-catalog-generate CLI wrapper main()."""

from __future__ import annotations

from ambient_cli import catalog as catalog_cli


def test_catalog_main_invokes_generator(monkeypatch) -> None:
    calls: list[str] = []

    def fake_run_path(path: str, run_name: str) -> None:
        calls.append(path)

    monkeypatch.setattr(catalog_cli.runpy, "run_path", fake_run_path)
    catalog_cli.main()
    assert calls
    assert calls[0].endswith("generate_reference_catalog.py")
