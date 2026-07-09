# Ambient Core

Open-source foundation for Ambient Systems: **contracts**, **reference catalog**, **governance** (ISO 8000 / BCBS 239 helpers), **Maestro inference** (`ambient_inference`), shared **pipeline** primitives, and a placeholder **agent** extension point.

**Platform repo:** [ambient-systems-platform](https://github.com/Ambient-Team/ambient-systems-platform) consumes this package (or git submodule at `ambient-core/`).

## Install

```bash
pip install -e ".[all]"
# minimal + inference only:
pip install -e ".[inference,dev]"
```

## Layout

- **`contracts/`** — neutral data-product YAML (source of truth; mirrored under `lib/ambient_contracts/bundled/` for wheels)
- **`catalog/`** — reference catalog YAML, schemas, generated `runtime/` + `manifest.json`
- **`lib/ambient_contracts/`** — contract load + validate
- **`lib/ambient_pipeline/`** — catalog loaders, Silver validation, provenance, bronze mapping
- **`lib/ambient_inference/`** — Maestro library + packaged run contract
- **`lib/ambient_agent/`** — open agent runtime extension point (non-commercial)
- **`services/maestro/`** — FastAPI Maestro service
- **`docs/`** — layer manuals and architecture

## Commands

```bash
validate-contracts
validate-inference-registry
ambient-catalog-generate          # or: python scripts/generate_reference_catalog.py
ambient-catalog-generate --check
pytest
```

## Local Maestro

```bash
pip install -e ".[inference,dev,postgres]"
uvicorn main:app --app-dir services/maestro --reload --port 8088
```

See [docs/inference-layer.md](docs/inference-layer.md).

## License

MIT — [LICENSE](LICENSE).
