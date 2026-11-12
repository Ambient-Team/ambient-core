"""Open-source reference calculator: turn declared formulas + inputs into metric values.

This package closes the input -> Gold loop in Ambient Core. Metric definitions in the
catalogue carry a machine-readable ``calc`` block (``expr`` + declared ``inputs``); this
engine evaluates them deterministically and safely (no Python ``eval``), resolving
metric-to-metric dependencies in topological order. A production platform may use this
directly or reimplement against the same spec.
"""

from ambient_calc.engine import (
    CalcError,
    compute_all,
    compute_all_results,
    compute_metric,
    compute_metric_result,
    formula_names,
    safe_eval,
    safe_eval_result,
    slug_of,
)
from ambient_calc.results import (
    MISSING_INPUT,
    NULL_OPERAND,
    ZERO_DENOMINATOR,
    EvalResult,
)

__all__ = [
    "CalcError",
    "EvalResult",
    "MISSING_INPUT",
    "NULL_OPERAND",
    "ZERO_DENOMINATOR",
    "compute_all",
    "compute_all_results",
    "compute_metric",
    "compute_metric_result",
    "formula_names",
    "safe_eval",
    "safe_eval_result",
    "slug_of",
]
