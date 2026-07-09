from __future__ import annotations

import json
from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, String, Text, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

from ambient_inference.schemas import RunArtifact, RunEvent, RunRecord, RunStatus, RoutingPlan


class Base(DeclarativeBase):
    pass


class RunRow(Base):
    __tablename__ = "runs"

    run_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    org_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    mode: Mapped[str] = mapped_column(String(64))
    status: Mapped[str] = mapped_column(String(32))
    routing_plan_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    artifact_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime)
    updated_at: Mapped[datetime] = mapped_column(DateTime)


class RunEventRow(Base):
    __tablename__ = "run_events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    run_id: Mapped[str] = mapped_column(String(36), index=True)
    event_type: Mapped[str] = mapped_column(String(64))
    payload_json: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime)


class RunStore:
    def __init__(self, database_url: str) -> None:
        self._engine = create_engine(database_url, future=True)
        Base.metadata.create_all(self._engine)
        self._session_factory = sessionmaker(self._engine, expire_on_commit=False)

    def create_run(self, record: RunRecord) -> RunRecord:
        with self._session() as session:
            row = RunRow(
                run_id=record.run_id,
                org_id=record.org_id,
                mode=record.mode,
                status=record.status.value,
                routing_plan_json=None,
                artifact_json=None,
                error=None,
                created_at=record.created_at,
                updated_at=record.updated_at,
            )
            session.add(row)
            session.commit()
        return record

    def update_run(
        self,
        run_id: str,
        *,
        status: RunStatus | None = None,
        routing_plan: RoutingPlan | None = None,
        artifact: RunArtifact | None = None,
        error: str | None = None,
    ) -> None:
        with self._session() as session:
            row = session.get(RunRow, run_id)
            if not row:
                return
            if status is not None:
                row.status = status.value
            if routing_plan is not None:
                row.routing_plan_json = routing_plan.model_dump_json()
            if artifact is not None:
                row.artifact_json = artifact.model_dump_json()
            if error is not None:
                row.error = error
            row.updated_at = datetime.utcnow()
            session.commit()

    def get_run(self, run_id: str) -> RunRecord | None:
        with self._session() as session:
            row = session.get(RunRow, run_id)
            if not row:
                return None
            return self._row_to_record(row)

    def append_event(self, event: RunEvent) -> None:
        with self._session() as session:
            session.add(
                RunEventRow(
                    run_id=event.run_id,
                    event_type=event.type.value,
                    payload_json=json.dumps(event.payload),
                    created_at=datetime.utcnow(),
                )
            )
            session.commit()

    def list_events(self, run_id: str) -> list[RunEvent]:
        with self._session() as session:
            stmt = (
                select(RunEventRow)
                .where(RunEventRow.run_id == run_id)
                .order_by(RunEventRow.id.asc())
            )
            rows = session.scalars(stmt).all()
            from ambient_inference.schemas import RunEventType

            return [
                RunEvent(
                    type=RunEventType(row.event_type),
                    run_id=row.run_id,
                    payload=json.loads(row.payload_json),
                )
                for row in rows
            ]

    def _session(self) -> Session:
        return self._session_factory()

    def _row_to_record(self, row: RunRow) -> RunRecord:
        routing = None
        if row.routing_plan_json:
            routing = RoutingPlan.model_validate_json(row.routing_plan_json)
        artifact = None
        if row.artifact_json:
            artifact = RunArtifact.model_validate_json(row.artifact_json)
        return RunRecord(
            run_id=row.run_id,
            org_id=row.org_id,
            mode=row.mode,
            status=RunStatus(row.status),
            routing_plan=routing,
            artifact=artifact,
            error=row.error,
            created_at=row.created_at,
            updated_at=row.updated_at,
        )
