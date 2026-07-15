# Using ambient-core

Quick start for contracts, catalog, and governance helpers. For embedding in another repo, see [INTEGRATING.md](INTEGRATING.md). Foundation vs full product: [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md).

## Install

**From a git clone (recommended for catalog + pipeline tests):**

```bash
git clone <repository-url>
cd ambient-core
py -3.12 -m venv .venv
# Windows: .venv\Scripts\activate
pip install -e ".[all]"
```

**From a pinned git URL (downstream apps):**

```bash
pip install "ambient-core[dev] @ git+<repository-url>@v0.3.0"
```

PyPI is **not** the documented distribution path unless publishing is added later.

**Extras:** `.[pipeline,dev]` (Spark tests, Java 17) · `.[postgres]` · `.[all]` (pipeline + postgres + dev)

## Recipes

**1. Contracts only** — validate and load data-product YAML.

```bash
pip install -e .
validate-contracts
```

- Edit `contracts/`; sync `lib/ambient_contracts/bundled/` before release (CI enforces).
- Wheel-only installs use `ambient_contracts.bundled`; override with `AMBIENT_CONTRACTS_DIR` or `AMBIENT_CORE_ROOT` (`lib/ambient_contracts/paths.py`).

**2. Catalog** — author YAML and regenerate manifest/runtime.

```bash
pip install -e .
ambient-catalog-generate
ambient-catalog-generate --check
```

- Edit `catalog/shared/` and `catalog/industries/<pack>/` ([catalog/README.md](../catalog/README.md)).
- Use `manifest.json` for pipelines; `catalog/runtime/` for JS apps.
- Set `AMBIENT_CATALOG_DIR` or run from a full checkout (`resolve_catalog_root()` in `paths.py`).

**3. Pipeline governance (Spark)** — pytest with governance modules.

```bash
pip install -e ".[pipeline,dev]"
set AMBIENT_SPARK_TESTS=1
pytest
```

- Needs Java 17+ for Spark tests.
- End-to-end narrative: [pipeline.md](pipeline.md).

## Contributing and releases

[CONTRIBUTING.md](CONTRIBUTING.md) — scope, workflows, tagging, consumer follow-up.
