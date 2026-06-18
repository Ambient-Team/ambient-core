"""Neutral boundaries between governed data, Maestro inference, and app-specific agents."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Mapping, Protocol, runtime_checkable


@runtime_checkable
class InferenceClient(Protocol):
    """Minimal surface for calling Maestro (or a compatible gateway) from an orchestrator."""

    def complete(self, request: Mapping[str, Any]) -> Mapping[str, Any]:
        """Return a provider-normalized response mapping (e.g. choices, usage, run metadata)."""


@dataclass(frozen=True)
class AgentRunContext:
    """
    Identifiers and policy hints for an agent run.

    Intentionally excludes tenant secrets and vendor credentials — inject those in the
    application layer when building requests.
    """

    run_id: str
    contract_refs: tuple[str, ...] = ()
    catalog_refs: tuple[str, ...] = ()
    metadata: Mapping[str, str] = field(default_factory=dict)
