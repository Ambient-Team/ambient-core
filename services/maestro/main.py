from __future__ import annotations

import asyncio
import hmac
from contextlib import asynccontextmanager
from typing import Annotated, AsyncIterator

from fastapi import Depends, FastAPI, Header, HTTPException, Request
from fastapi.responses import StreamingResponse

from ambient_inference import __version__ as AMBIENT_VERSION
from ambient_inference.orchestrator import MaestroOrchestrator
from ambient_inference.registry import ModelRegistry
from ambient_inference.schemas import CreateRunRequest, RunEvent, RunRecord
from ambient_inference.store import RunStore

from deps import get_orchestrator, get_registry, get_store, init_app_state, settings
from middleware import MaxRequestBodyMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    orchestrator = init_app_state()
    app.state.orchestrator = orchestrator
    yield
    await orchestrator.aclose()


app = FastAPI(title="Ambient Maestro", version=AMBIENT_VERSION, lifespan=lifespan)
app.add_middleware(MaxRequestBodyMiddleware, max_bytes=settings.max_request_body_bytes)


def _api_key_matches(provided: str, expected: str) -> bool:
    try:
        return hmac.compare_digest(provided.encode("utf-8"), expected.encode("utf-8"))
    except ValueError:
        return False


def _check_api_key(
    request: Request,
    x_api_key: Annotated[str | None, Header(alias="X-Api-Key")] = None,
) -> None:
    expected = settings.api_key
    if not expected:
        return
    provided = x_api_key or request.headers.get("Authorization", "").removeprefix("Bearer ").strip()
    if not _api_key_matches(provided, expected):
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/ready")
def ready(registry: Annotated[ModelRegistry, Depends(get_registry)]) -> dict[str, object]:
    configured = sum(1 for mid in registry.ids() if registry.get(mid).resolve_base_url())
    return {"status": "ready", "models": len(registry.ids()), "backends_configured": configured}


@app.get("/v1/models")
def list_models(
    _: Annotated[None, Depends(_check_api_key)],
    registry: Annotated[ModelRegistry, Depends(get_registry)],
) -> list[dict]:
    return [m.model_dump() for m in registry.list_public()]


@app.post("/v1/runs", response_model=RunRecord)
async def create_run(
    body: CreateRunRequest,
    _: Annotated[None, Depends(_check_api_key)],
    orchestrator: Annotated[MaestroOrchestrator, Depends(get_orchestrator)],
    x_org_id: Annotated[str | None, Header(alias="X-Org-Id")] = None,
) -> RunRecord:
    if x_org_id and not body.org_id:
        body = body.model_copy(update={"org_id": x_org_id})
    if body.stream:
        raise HTTPException(status_code=400, detail="Use POST /v1/runs/stream for SSE")
    return await orchestrator.run(body)


@app.post("/v1/runs/stream")
async def create_run_stream(
    body: CreateRunRequest,
    _: Annotated[None, Depends(_check_api_key)],
    orchestrator: Annotated[MaestroOrchestrator, Depends(get_orchestrator)],
    x_org_id: Annotated[str | None, Header(alias="X-Org-Id")] = None,
) -> StreamingResponse:
    if x_org_id and not body.org_id:
        body = body.model_copy(update={"org_id": x_org_id})

    queue: asyncio.Queue[RunEvent | None] = asyncio.Queue()

    async def fanout(event: RunEvent) -> None:
        orchestrator.store.append_event(event)
        await queue.put(event)

    async def runner() -> None:
        try:
            await orchestrator.run(body, emit_override=fanout)
        finally:
            await queue.put(None)

    asyncio.create_task(runner())

    async def event_generator() -> AsyncIterator[str]:
        while True:
            item = await queue.get()
            if item is None:
                break
            yield f"data: {item.model_dump_json()}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")


@app.get("/v1/runs/{run_id}", response_model=RunRecord)
def get_run(
    run_id: str,
    _: Annotated[None, Depends(_check_api_key)],
    store: Annotated[RunStore, Depends(get_store)],
) -> RunRecord:
    record = store.get_run(run_id)
    if not record:
        raise HTTPException(status_code=404, detail="Run not found")
    return record


@app.get("/v1/runs/{run_id}/events")
async def get_run_events(
    run_id: str,
    _: Annotated[None, Depends(_check_api_key)],
    store: Annotated[RunStore, Depends(get_store)],
) -> StreamingResponse:
    if not store.get_run(run_id):
        raise HTTPException(status_code=404, detail="Run not found")

    async def replay() -> AsyncIterator[str]:
        for event in store.list_events(run_id):
            yield f"data: {event.model_dump_json()}\n\n"

    return StreamingResponse(replay(), media_type="text/event-stream")
