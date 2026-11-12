"""Structured results for metric evaluation (value plus optional null reason)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Final

ZERO_DENOMINATOR: Final = "zero_denominator"
MISSING_INPUT: Final = "missing_input"
NULL_OPERAND: Final = "null_operand"

ALLOWED_NULL_REASONS: frozenset[str] = frozenset(
    {ZERO_DENOMINATOR, MISSING_INPUT, NULL_OPERAND}
)


@dataclass(frozen=True, slots=True)
class EvalResult:
    """Outcome of evaluating one metric expression."""

    value: float | None
    null_reason: str | None = None

    def __post_init__(self) -> None:
        if self.value is not None and self.null_reason is not None:
            raise ValueError("null_reason must be absent when value is set")
        if self.value is None and self.null_reason is not None:
            if self.null_reason not in ALLOWED_NULL_REASONS:
                raise ValueError(f"unknown null_reason {self.null_reason!r}")
