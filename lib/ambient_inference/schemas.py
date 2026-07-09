from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal
from uuid import uuid4

from pydantic import BaseModel, Field


def utcnow() -> datetime:
    """Current UTC time as a naive datetime.

    Kept naive (tzinfo stripped) to match the naive timestamps stored in the
    SQLite/Postgres ``DateTime`` columns, while avoiding the deprecated
    ``datetime.utcnow()`` on Python 3.12+.
    """
    return datetime.now(timezone.utc).replace(tzinfo=None)


class MessageRole(str, Enum):
    system = "system"
    user = "user"
    assistant = "assistant"


class ChatMessage(BaseModel):
    role: MessageRole
    content: str


class RunConstraints(BaseModel):
    max_cost_tier: Literal["low", "medium", "high"] | None = None


class CreateRunRequest(BaseModel):
    mode: str = "council_research"
    messages: list[ChatMessage]
    stream: bool = False
    org_id: str | None = None
    constraints: RunConstraints | None = None


class ModelProvenance(BaseModel):
    model_id: str
    step: str
    latency_ms: float | None = None
    prompt_tokens: int | None = None
    completion_tokens: int | None = None
    draft_id: str | None = None


class RoutingPlan(BaseModel):
    mode: str
    task_type: str
    strategy: str
    draft_model_ids: list[str] = Field(default_factory=list)
    synthesizer_model_id: str | None = None
    primary_model_id: str | None = None
    fallback_chain: list[str] = Field(default_factory=list)
    classifier_used: bool = False


class RunStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"


class RunArtifact(BaseModel):
    content: str
    provenance: list[ModelProvenance] = Field(default_factory=list)
    drafts: dict[str, str] = Field(default_factory=dict)


class RunRecord(BaseModel):
    run_id: str = Field(default_factory=lambda: str(uuid4()))
    org_id: str | None = None
    mode: str
    status: RunStatus = RunStatus.pending
    routing_plan: RoutingPlan | None = None
    artifact: RunArtifact | None = None
    error: str | None = None
    created_at: datetime = Field(default_factory=utcnow)
    updated_at: datetime = Field(default_factory=utcnow)


class RunEventType(str, Enum):
    routing_plan = "routing_plan"
    model_start = "model_start"
    token = "token"
    draft_complete = "draft_complete"
    synthesis_complete = "synthesis_complete"
    error = "error"
    done = "done"


class RunEvent(BaseModel):
    type: RunEventType
    run_id: str
    payload: dict[str, Any] = Field(default_factory=dict)


class ClassifierResult(BaseModel):
    task_type: str = "general_chat"
    complexity: Literal["low", "medium", "high"] = "medium"
    needs_reasoning: bool = False
    needs_long_context: bool = False


class ModelPublicView(BaseModel):
    id: str
    family: str
    license: str
    capabilities: list[str]
    context_tokens: int
    cost_tier: str
