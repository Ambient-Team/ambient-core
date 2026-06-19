# Pipeline examples

## minimal_governed_data.py

Validates all contracts, loads the catalog manifest, and prints a sample metric plus the tenant-metrics contract product name and table. No Spark required.

```bash
cd ambient-core
pip install -e .
# Optional but recommended when core is a submodule:
# export AMBIENT_CORE_ROOT="$PWD"
python examples/pipeline/minimal_governed_data.py
```

For bronze mapping, provenance, and Spark validation, see [docs/pipeline.md](../../docs/pipeline.md) and `tests/pipeline/`.
