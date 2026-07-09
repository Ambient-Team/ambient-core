# AGENTS

Repository-wide guidance for AI agents. See `docs/AGENTS.md` for the agent/inference runtime design, and the `README.md` for the standard developer quick start.

## Cursor Cloud specific instructions

Ambient Core is a Python foundation library plus one runnable service (Maestro). There is no GUI/web frontend; everything is validated via CLIs, `pytest`, and the Maestro HTTP API.

### Environment

- Dependencies are installed by the startup update script into a virtualenv at `.venv` (the base image also has the `python3.12-venv` apt package). Activate it before running anything: `source .venv/bin/activate`. The system Python only exposes `python3`; the `python` command comes from the venv.
- Java (JDK 21) is preinstalled and works for the PySpark 3.5 pipeline tests even though CI pins Java 17.

### Lint / validate

- The repo has no formatter/linter; "lint" is the set of CI validation scripts. Run the exact commands listed under the `python:` job in `.github/workflows/ci.yml` (e.g. `validate-contracts`, `validate-inference-registry`, `validate-agent-config`, `python scripts/harden_catalog_data_options.py --check`, `python scripts/generate_reference_catalog.py --check --strict-data-option-inputs`, and the `scripts/check_*.py` checks).
- Markdown must not use pipe tables — `scripts/check_markdown_prose.py` enforces this (see `.cursor/rules/markdown-prose.mdc`).

### Test

- Run `pytest` (config lives in `pyproject.toml`). The default `-m 'not agent_e2e'` excludes the live agent loop; the `gpu` marker test skips unless `MAESTRO_E2E_URL` and a live backend are set.
- To match CI, run PySpark pipeline tests with `AMBIENT_SPARK_TESTS=1 pytest`.

### Run Maestro (the only service)

- Start: `uvicorn main:app --app-dir services/maestro --port 8088` (needs the `inference` extra, included in `.[all]`).
- `GET /health`, `GET /ready`, and `GET /v1/models` work with no backends. `POST /v1/runs` computes a routing plan and persists the run even with no backend, but returns `status: "failed"` (artifact null) because it cannot reach an LLM.
- For a successful run you must point the `MAESTRO_BACKEND_*_URL` env vars (see `.env.example`) at an OpenAI-compatible `/v1/chat/completions` endpoint (Ollama/vLLM in production, or any mock during local testing). With `MAESTRO_USE_CLASSIFIER=true` (default) at least `MAESTRO_BACKEND_CLASSIFIER_URL` is consulted.
- Maestro's default run store is SQLite at `./maestro_runs.db`, which is a **tracked** file — issuing runs dirties it. Set `MAESTRO_DATABASE_URL` (e.g. `sqlite:////tmp/maestro.db`) when testing to avoid committing run data, or `git checkout -- maestro_runs.db` afterward.
