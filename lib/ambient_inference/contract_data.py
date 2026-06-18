"""Bundled data-product contracts shipped with the package."""

from __future__ import annotations

from importlib import resources


def maestro_run_contract_path():
    """Traversable path to maestro-run-v1.yaml inside the installed package."""
    return resources.files("ambient_inference").joinpath("contracts", "maestro-run-v1.yaml")


def read_maestro_run_contract() -> str:
    return maestro_run_contract_path().read_text(encoding="utf-8")
