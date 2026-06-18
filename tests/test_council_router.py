from __future__ import annotations

import pytest

from ambient_inference.council import CouncilEngine
from ambient_inference.router import Router
from ambient_inference.schemas import CreateRunRequest, ChatMessage

from conftest import FakeGateway, registry, sample_messages


@pytest.mark.asyncio
async def test_router_council_research_plan(registry, sample_messages):
    gateway = FakeGateway(registry)
    router = Router(registry, gateway, use_classifier=False)
    request = CreateRunRequest(mode="council_research", messages=sample_messages)
    plan = await router.plan(request)
    assert plan.strategy == "parallel_draft_synthesize"
    assert len(plan.draft_model_ids) == 2
    assert plan.synthesizer_model_id == "llama-3.3-70b-instruct"


@pytest.mark.asyncio
async def test_router_classifier_overrides_task_type(registry, sample_messages):
    gateway = FakeGateway(registry)
    router = Router(registry, gateway, use_classifier=True)
    request = CreateRunRequest(mode="council_research", messages=sample_messages)
    plan = await router.plan(request)
    assert plan.task_type == "research_qa"
    assert plan.classifier_used is True
    assert "qwen2.5-1.5b-instruct" in gateway.calls


@pytest.mark.asyncio
async def test_council_parallel_synthesize(registry, sample_messages):
    gateway = FakeGateway(
        registry,
        {
            "qwen2.5-32b-instruct": "draft A",
            "deepseek-r1-distill-qwen-14b": "draft B",
            "llama-3.3-70b-instruct": "final merged",
        },
    )
    router = Router(registry, gateway, use_classifier=False)
    plan = await router.plan(CreateRunRequest(mode="council_research", messages=sample_messages))
    council = CouncilEngine(gateway)
    events = []

    async def emit(event):
        events.append(event.type.value)

    artifact = await council.execute(plan, sample_messages, run_id="test-run", emit=emit)
    assert artifact.content == "final merged"
    assert artifact.drafts["qwen2.5-32b-instruct"] == "draft A"
    assert "draft_complete" in events
    assert "synthesis_complete" in events


@pytest.mark.asyncio
async def test_orchestrator_persists_run(registry, sample_messages, tmp_path):
    from ambient_inference.orchestrator import MaestroOrchestrator
    from ambient_inference.store import RunStore

    gateway = FakeGateway(
        registry,
        {
            "qwen2.5-32b-instruct": "d1",
            "deepseek-r1-distill-qwen-14b": "d2",
            "llama-3.3-70b-instruct": "done",
        },
    )
    router = Router(registry, gateway, use_classifier=False)
    db_url = f"sqlite:///{tmp_path / 'runs.db'}"
    store = RunStore(db_url)
    orch = MaestroOrchestrator(router, CouncilEngine(gateway), store)
    record = await orch.run(CreateRunRequest(mode="council_research", messages=sample_messages, org_id="org-1"))
    assert record.status.value == "completed"
    assert record.artifact is not None
    assert record.artifact.content == "done"
    stored = store.get_run(record.run_id)
    assert stored is not None
    assert stored.org_id == "org-1"
    assert len(store.list_events(record.run_id)) >= 3
