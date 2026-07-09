from __future__ import annotations

import pytest

pytest_plugins = ["spark_fixtures"]

from ambient_inference.gateway import CompletionResult, ModelGateway
from ambient_inference.registry import ModelRegistry
from ambient_inference.schemas import ChatMessage, MessageRole, ModelProvenance


@pytest.fixture(autouse=True)
def _isolate_run_store(monkeypatch, tmp_path):
    """Point Maestro's default run store at a throwaway SQLite file per test.

    Without this, tests that build the Maestro app (which defaults to
    ``sqlite:///./maestro_runs.db``) write to the git-tracked run store at the
    repo root and dirty the working tree.
    """
    monkeypatch.setenv(
        "MAESTRO_DATABASE_URL", f"sqlite:///{tmp_path / 'maestro_test_runs.db'}"
    )


class FakeGateway(ModelGateway):
    """Gateway that returns deterministic text without HTTP."""

    def __init__(self, registry: ModelRegistry, responses: dict[str, str] | None = None) -> None:
        super().__init__(registry, client=None)
        self._responses = responses or {}
        self.calls: list[str] = []

    async def complete(
        self,
        model_id: str,
        messages: list[ChatMessage],
        *,
        step: str,
        draft_id: str | None = None,
        json_mode: bool = False,
        fallback_chain: list[str] | None = None,
    ) -> CompletionResult:
        self.calls.append(model_id)
        if json_mode and model_id.endswith("1.5b-instruct"):
            content = (
                '{"task_type": "research_qa", "complexity": "medium", '
                '"needs_reasoning": true, "needs_long_context": false}'
            )
        else:
            content = self._responses.get(model_id, f"answer-from-{model_id}")
        return CompletionResult(
            content=content,
            provenance=ModelProvenance(model_id=model_id, step=step, draft_id=draft_id),
        )

    async def aclose(self) -> None:
        return None


@pytest.fixture
def registry() -> ModelRegistry:
    return ModelRegistry()


@pytest.fixture
def sample_messages() -> list[ChatMessage]:
    return [
        ChatMessage(
            role=MessageRole.user,
            content="Compare renewable vs gas peaker economics for grid balancing.",
        )
    ]
