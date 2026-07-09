from __future__ import annotations

import os
from dataclasses import dataclass

from ambient_inference.council import CouncilEngine
from ambient_inference.gateway import ModelGateway
from ambient_inference.orchestrator import MaestroOrchestrator
from ambient_inference.registry import ModelRegistry
from ambient_inference.router import Router
from ambient_inference.store import RunStore


@dataclass(frozen=True)
class Settings:
    api_key: str | None
    database_url: str
    use_classifier: bool


settings = Settings(
    api_key=os.environ.get("AMBIENT_MAESTRO_API_KEY"),
    database_url=os.environ.get(
        "MAESTRO_DATABASE_URL",
        "sqlite:///./maestro_runs.db",
    ),
    use_classifier=os.environ.get("MAESTRO_USE_CLASSIFIER", "true").lower() == "true",
)

_orchestrator: MaestroOrchestrator | None = None
_store: RunStore | None = None
_registry: ModelRegistry | None = None


def build_orchestrator() -> MaestroOrchestrator:
    registry = ModelRegistry()
    gateway = ModelGateway(registry)
    store = RunStore(settings.database_url)
    router = Router(registry, gateway, use_classifier=settings.use_classifier)
    council = CouncilEngine(gateway)
    return MaestroOrchestrator(router, council, store)


def init_app_state() -> MaestroOrchestrator:
    global _orchestrator, _store, _registry
    _registry = ModelRegistry()
    gateway = ModelGateway(_registry)
    _store = RunStore(settings.database_url)
    router = Router(_registry, gateway, use_classifier=settings.use_classifier)
    council = CouncilEngine(gateway)
    _orchestrator = MaestroOrchestrator(router, council, _store)
    return _orchestrator


def get_orchestrator() -> MaestroOrchestrator:
    if _orchestrator is None:
        raise RuntimeError("Maestro not initialized")
    return _orchestrator


def get_registry() -> ModelRegistry:
    if _registry is None:
        raise RuntimeError("Maestro not initialized")
    return _registry


def get_store() -> RunStore:
    if _store is None:
        raise RuntimeError("Maestro not initialized")
    return _store
