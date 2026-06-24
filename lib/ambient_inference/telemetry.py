from __future__ import annotations

import json
import logging
import sys

from ambient_inference.schemas import RunRecord, RunStatus

logger = logging.getLogger("ambient_inference.maestro")


def log_run_summary(record: RunRecord) -> None:
    """Emit one JSONL line per run (maestro_run_complete) for routing/council tuning."""
    plan = record.routing_plan
    artifact = record.artifact
    provenance = []
    if artifact and artifact.provenance:
        provenance = [
            {
                "model_id": p.model_id,
                "step": p.step,
                "latency_ms": p.latency_ms,
                "prompt_tokens": p.prompt_tokens,
                "completion_tokens": p.completion_tokens,
            }
            for p in artifact.provenance
        ]

    summary = {
        "event": "maestro_run_complete",
        "run_id": record.run_id,
        "org_id": record.org_id,
        "mode": record.mode,
        "status": record.status.value if isinstance(record.status, RunStatus) else record.status,
        "task_type": plan.task_type if plan else None,
        "strategy": plan.strategy if plan else None,
        "classifier_used": plan.classifier_used if plan else None,
        "error": record.error,
        "provenance": provenance,
    }
    line = json.dumps(summary, default=str)
    logger.info(line)
    print(line, file=sys.stdout, flush=True)
