"""Open-source reference calculator: turn declared formulas + inputs into metric values.

This package closes the input -> Gold loop in the open core. Metric definitions in the
catalogue carry a machine-readable ``calc`` block (``expr`` + declared ``inputs``); this
engine evaluates them deterministically and safely (no Python ``eval``), resolving
metric-to-metric dependencies in topological order. A production platform may use this
directly or reimplement against the same spec.
"""

from ambient_calc.engine import (
    CalcError,
    compute_all,
    compute_metric,
    formula_names,
    safe_eval,
    slug_of,
)

__all__ = [
    "CalcError",
    "compute_all",
    "compute_metric",
    "formula_names",
    "safe_eval",
    "slug_of",
]
