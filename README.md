# ambient-core

Open-source **Maestro** inference: the `ambient-inference` Python package (`ambient_inference`) with open-weight model registry, routing, model council orchestration, and a headless FastAPI service.

**Repository:** [Ambient-Team/ambient-core](https://github.com/Ambient-Team/ambient-core)

## Install

```bash
pip install -e ".[dev]"
# Postgres run store (Docker / production):
pip install -e ".[dev,postgres]"
```

## Quick start

```bash
validate-inference-registry
pytest -q
set MAESTRO_USE_CLASSIFIER=false
uvicorn main:app --app-dir services/maestro --reload --port 8088
```

Point `MAESTRO_BACKEND_*_URL` env vars at OpenAI-compatible backends (Ollama, vLLM, etc.). See [docs/inference-layer.md](docs/inference-layer.md).

## Layout

- `lib/ambient_inference/` — importable library
- `services/maestro/` — FastAPI Maestro API
- `config/` — models registry, routing policies, council profiles
- `contracts/maestro-run-v1.yaml` — run artifact contract (also packaged under `ambient_inference/contracts/`)
- `scripts/validate_inference_registry.py` — CI registry validator

## License

MIT — see [LICENSE](LICENSE).
