"""Maestro inference core — routing, council, and model gateway.

Single source of truth for the package version (pyproject reads this via
[tool.setuptools.dynamic]). The supported public API is enumerated in ``__all__`` and
resolved lazily so that ``import ambient_inference`` stays light (no httpx/sqlalchemy
import unless a heavy symbol is actually used). The public surface is contract-tested by
tests/test_public_api.py — changing it is a deliberate, reviewed event.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

__version__ = "0.2.3"

# public name -> submodule it lives in
_PUBLIC = {
    "MaestroOrchestrator": "orchestrator",
    "Router": "router",
    "CouncilEngine": "council",
    "ModelGateway": "gateway",
    "GatewayError": "gateway",
    "ModelRegistry": "registry",
    "RunStore": "store",
    "CreateRunRequest": "schemas",
    "RunRecord": "schemas",
    "RunEvent": "schemas",
    "RunEventType": "schemas",
    "RunStatus": "schemas",
    "ChatMessage": "schemas",
    "MessageRole": "schemas",
    "RoutingPlan": "schemas",
    "ModelProvenance": "schemas",
}

__all__ = ["__version__", *sorted(_PUBLIC)]


def __getattr__(name: str):
    module = _PUBLIC.get(name)
    if module is None:
        raise AttributeError(f"module 'ambient_inference' has no attribute {name!r}")
    import importlib

    mod = importlib.import_module(f"ambient_inference.{module}")
    return getattr(mod, name)


def __dir__():
    return sorted(__all__)


if TYPE_CHECKING:  # pragma: no cover - for type checkers/IDEs only
    from ambient_inference.council import CouncilEngine
    from ambient_inference.gateway import GatewayError, ModelGateway
    from ambient_inference.orchestrator import MaestroOrchestrator
    from ambient_inference.registry import ModelRegistry
    from ambient_inference.router import Router
    from ambient_inference.schemas import (
        ChatMessage,
        CreateRunRequest,
        MessageRole,
        ModelProvenance,
        RoutingPlan,
        RunEvent,
        RunEventType,
        RunRecord,
        RunStatus,
    )
    from ambient_inference.store import RunStore
