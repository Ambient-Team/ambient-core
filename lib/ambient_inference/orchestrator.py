from __future__ import annotations

import logging

from ambient_inference.council import CouncilEngine, EventCallback
from ambient_inference.gateway import GatewayError
from ambient_inference.router import Router
from ambient_inference.schemas import (
    CreateRunRequest,
    RunEvent,
    RunEventType,
    RunRecord,
    RunStatus,
)
from ambient_inference.store import RunStore
from ambient_inference.telemetry import log_run_summary

logger = logging.getLogger(__name__)


class MaestroOrchestrator:
    def __init__(
        self,
        router: Router,
        council: CouncilEngine,
        store: RunStore,
    ) -> None:
        self._router = router
        self._council = council
        self._store = store

    @property
    def store(self) -> RunStore:
        """Public access to the run store (events, run records)."""
        return self._store

    async def aclose(self) -> None:
        """Release inference resources (model gateway HTTP client)."""
        await self._council.aclose()

    async def _mark_failed(
        self,
        record: RunRecord,
        exc: Exception,
        emit: EventCallback,
    ) -> None:
        record.status = RunStatus.failed
        record.error = str(exc)
        self._store.update_run(record.run_id, status=RunStatus.failed, error=str(exc))
        await emit(
            RunEvent(
                type=RunEventType.error,
                run_id=record.run_id,
                payload={"message": str(exc)},
            )
        )
        await emit(
            RunEvent(
                type=RunEventType.done,
                run_id=record.run_id,
                payload={"status": "failed"},
            )
        )

    async def run(
        self,
        request: CreateRunRequest,
        emit_override: EventCallback | None = None,
    ) -> RunRecord:
        record = RunRecord(
            org_id=request.org_id,
            mode=request.mode,
            status=RunStatus.pending,
        )
        self._store.create_run(record)

        async def default_emit(event: RunEvent) -> None:
            self._store.append_event(event)

        emit = emit_override or default_emit

        try:
            self._store.update_run(record.run_id, status=RunStatus.running)
            plan = await self._router.plan(request)
            record.routing_plan = plan
            self._store.update_run(record.run_id, routing_plan=plan)
            await emit(
                RunEvent(
                    type=RunEventType.routing_plan,
                    run_id=record.run_id,
                    payload=plan.model_dump(),
                )
            )
            artifact = await self._council.execute(
                plan,
                request.messages,
                run_id=record.run_id,
                emit=emit,
            )
            record.artifact = artifact
            record.status = RunStatus.completed
            self._store.update_run(
                record.run_id,
                status=RunStatus.completed,
                artifact=artifact,
            )
            await emit(
                RunEvent(
                    type=RunEventType.done,
                    run_id=record.run_id,
                    payload={"status": "completed"},
                )
            )
        except (GatewayError, ValueError, KeyError) as exc:
            # Expected operational failures (backend down, bad config/plan).
            logger.warning("run %s failed: %s", record.run_id, exc)
            await self._mark_failed(record, exc, emit)
        except Exception as exc:  # defensive: never leave a run stuck "running"
            logger.error(
                "run %s failed with unexpected error", record.run_id, exc_info=True
            )
            await self._mark_failed(record, exc, emit)
        refreshed = self._store.get_run(record.run_id)
        final = refreshed or record
        log_run_summary(final)
        return final
