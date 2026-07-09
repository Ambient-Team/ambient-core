from __future__ import annotations

import asyncio
from collections.abc import Awaitable, Callable

from ambient_inference.gateway import ModelGateway
from ambient_inference.schemas import (
    ChatMessage,
    RunArtifact,
    RunEvent,
    RunEventType,
    RoutingPlan,
)

EventCallback = Callable[[RunEvent], Awaitable[None]]


_SYNTHESIS_SYSTEM = """You are the chair of a model council. Merge the draft answers into one clear,
accurate response. Note disagreements briefly. Cite drafts as [draft:MODEL_ID] where helpful."""


class CouncilEngine:
    def __init__(self, gateway: ModelGateway) -> None:
        self._gateway = gateway

    async def aclose(self) -> None:
        """Release the underlying model gateway's HTTP client."""
        await self._gateway.aclose()

    async def execute(
        self,
        plan: RoutingPlan,
        messages: list[ChatMessage],
        *,
        run_id: str,
        emit: EventCallback,
    ) -> RunArtifact:
        if plan.strategy == "vote":
            raise NotImplementedError("vote council strategy is reserved for a future milestone")
        if plan.strategy == "single":
            return await self._single(plan, messages, run_id=run_id, emit=emit)
        if plan.strategy == "parallel_draft_synthesize":
            return await self._parallel_synthesize(plan, messages, run_id=run_id, emit=emit)
        raise ValueError(f"Unsupported council strategy: {plan.strategy}")

    async def _single(
        self,
        plan: RoutingPlan,
        messages: list[ChatMessage],
        *,
        run_id: str,
        emit: EventCallback,
    ) -> RunArtifact:
        model_id = plan.primary_model_id
        if not model_id:
            raise ValueError("Routing plan missing primary_model_id")
        await emit(
            RunEvent(
                type=RunEventType.model_start,
                run_id=run_id,
                payload={"model_id": model_id, "step": "single"},
            )
        )
        result = await self._gateway.complete(
            model_id,
            messages,
            step="single",
            fallback_chain=plan.fallback_chain,
        )
        return RunArtifact(content=result.content, provenance=[result.provenance])

    async def _parallel_synthesize(
        self,
        plan: RoutingPlan,
        messages: list[ChatMessage],
        *,
        run_id: str,
        emit: EventCallback,
    ) -> RunArtifact:
        draft_ids = plan.draft_model_ids
        if len(draft_ids) < 1:
            raise ValueError("parallel_draft_synthesize requires draft_model_ids")
        synthesizer_id = plan.synthesizer_model_id
        if not synthesizer_id:
            raise ValueError("parallel_draft_synthesize requires synthesizer_model_id")

        async def one_draft(model_id: str) -> tuple[str, str, object]:
            await emit(
                RunEvent(
                    type=RunEventType.model_start,
                    run_id=run_id,
                    payload={"model_id": model_id, "step": "draft"},
                )
            )
            result = await self._gateway.complete(
                model_id,
                messages,
                step="draft",
                draft_id=model_id,
                fallback_chain=plan.fallback_chain,
            )
            await emit(
                RunEvent(
                    type=RunEventType.draft_complete,
                    run_id=run_id,
                    payload={"model_id": model_id, "draft_id": model_id},
                )
            )
            return model_id, result.content, result.provenance

        draft_results = await asyncio.gather(*[one_draft(mid) for mid in draft_ids])
        drafts = {mid: content for mid, content, _ in draft_results}
        provenance = [p for _, _, p in draft_results]

        draft_block = "\n\n".join(f"### Draft [{mid}]\n{content}" for mid, content, _ in draft_results)
        synth_messages = [
            ChatMessage(role="system", content=_SYNTHESIS_SYSTEM),
            *messages,
            ChatMessage(
                role="user",
                content=f"Synthesize these council drafts:\n\n{draft_block}",
            ),
        ]
        await emit(
            RunEvent(
                type=RunEventType.model_start,
                run_id=run_id,
                payload={"model_id": synthesizer_id, "step": "synthesize"},
            )
        )
        synth = await self._gateway.complete(
            synthesizer_id,
            synth_messages,
            step="synthesize",
            fallback_chain=plan.fallback_chain,
        )
        provenance.append(synth.provenance)
        await emit(
            RunEvent(
                type=RunEventType.synthesis_complete,
                run_id=run_id,
                payload={"model_id": synthesizer_id},
            )
        )
        return RunArtifact(content=synth.content, provenance=provenance, drafts=drafts)
