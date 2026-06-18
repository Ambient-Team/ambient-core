"""
Lightweight agent runtime (open extension point).

SaaS-specific orchestration and tenant agents belong in downstream application repositories.
Maestro (`ambient_inference`) owns multi-model inference; this package holds neutral boundaries
and future shared primitives for agentic workflows on top of governed data.

See docs/AGENTS.md in the repository root.
"""

from ambient_agent.boundaries import AgentRunContext, InferenceClient

__all__ = ["AgentRunContext", "InferenceClient"]
