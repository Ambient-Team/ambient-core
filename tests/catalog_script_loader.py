"""Load scripts/generate_reference_catalog.py as a module for tests."""

from __future__ import annotations

import importlib.util
import types
from functools import lru_cache
from pathlib import Path


@lru_cache(maxsize=1)
def load_generate_reference_catalog() -> types.ModuleType:
    path = Path(__file__).resolve().parents[1] / "scripts" / "generate_reference_catalog.py"
    spec = importlib.util.spec_from_file_location("generate_reference_catalog", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"cannot load {path}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod
