# Integrator examples

Scripts for platform teams wiring **in-process** catalog/crosswalk tools (Dec **v0.3.12** train).

## builtin_tools_walkthrough.py

Registers builtin integrator tools, validates arguments, runs a short tool plan, and prints manifest/crosswalk samples. No Spark required.

```bash
cd ambient-core
pip install -e .
python examples/integrators/builtin_tools_walkthrough.py
```

See [docs/integrator-agent-tools.md](../../docs/integrator-agent-tools.md).
