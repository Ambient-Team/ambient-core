# Agent examples

## minimal_worker.py

Registers a platform-style tool (`demo_echo`), runs the `analyst` profile with `skip_maestro=True` (synthesis prompt only), and prints observation tool ids. Uses `catalog_refs` on `AgentRunContext` so the synthesis prompt includes policy hints.

```bash
cd ambient-core
pip install -e .
python examples/agents/minimal_worker.py
```

- Runtime API: [docs/AGENTS.md](../../docs/AGENTS.md)
- Production checklist: [docs/agent-security.md](../../docs/agent-security.md)
- Governed metadata: [docs/governed-data.md](../../docs/governed-data.md)

For live Maestro, remove `skip_maestro=True` and start Maestro per [docs/inference-layer.md](../../docs/inference-layer.md).
