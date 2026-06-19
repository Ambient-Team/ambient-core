# OpenClaw integration (example)

This folder documents how an **external assistant shell** (for example [OpenClaw](https://github.com/openclaw/openclaw)) can use Ambient Core **without** taking a package dependency on OpenClaw in this repo.

## Pattern

1. **Pin ambient-core** at a release tag in your deployment image or venv.
2. **Run Maestro** (`services/maestro` or Docker) with open-weight backends configured ([docs/inference-layer.md](../../../docs/inference-layer.md)).
3. **Expose manifests** to the assistant:
   - `lib/ambient_agent/tool_definitions.yaml` — tool names and parameter shapes for planning.
   - `lib/ambient_agent/agent_profiles.yaml` — which tools and Maestro modes each agent type uses.
4. **Orchestrate** either:
   - Call `ambient_agent.run_plan_execute(...)` from a small Python sidecar the assistant invokes, or
   - POST to Maestro `/v1/runs` directly for synthesis-only turns after your shell runs tools locally.

## Boundaries

- Core ships **catalog**, **contracts**, and **Maestro** tools only.
- OpenClaw (or any UI) keeps **credentials**, **tenant context**, and **custom tools** in its own process; use `ambient_agent.register_tool()` in a platform worker if those tools must share the core executor.

## Related

- [docs/AGENTS.md](../../../docs/AGENTS.md)
- [docs/INTEGRATING.md](../../../docs/INTEGRATING.md)
- [docs/governed-data.md](../../../docs/governed-data.md)
- [docs/agent-security.md](../../../docs/agent-security.md)
