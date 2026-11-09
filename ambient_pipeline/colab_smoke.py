"""Deprecated shim — see :mod:`ambient_pipeline.notebook_smoke` in ``lib/``."""

from __future__ import annotations

import sys
from pathlib import Path

_lib = Path(__file__).resolve().parents[1] / "lib"
if _lib.is_dir() and str(_lib) not in sys.path:
    sys.path.insert(0, str(_lib))

from ambient_pipeline.notebook_smoke import *  # noqa: F403
