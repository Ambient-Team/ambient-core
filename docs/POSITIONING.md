# Positioning vs existing tools

**Ambient Core is the governed substrate beneath AI-powered analytics** — not another agent framework, and not another data-governance suite alone.

Two ecosystems already exist. Agent and RAG frameworks make models *reason*. Data-governance tools make data *trustworthy*. Neither treats trustworthy data and grounded intelligence as one foundation. Ambient Core does — and stays small enough to read end to end.

For how this repository relates to a full product repo, see [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md). For components and releases, see [ECOSYSTEM.md](ECOSYSTEM.md).

## At a glance

| Tool / family | Primary job | What Ambient Core adds |
|---------------|-------------|-------------------------|
| **LangChain** | Agent and chain orchestration | An opinion on what your data *means* |
| **LlamaIndex** | Connecting LLMs to data (RAG) | Contract-defined Gold shapes, not just retrieval |
| **Haystack** | Production NLP/search pipelines | The governance layer that sits upstream |
| **dbt / Great Expectations / Soda** | Quality tests and assertions | A versioned product *interface* — plus intelligence |
| **DataHub / OpenMetadata** | Catalog, lineage, discovery | Enforceable contracts and inference in one tree |
| **ODCS** | A *spec* for data contracts | A working implementation, with catalog and inference attached |
| **Collibra** | Enterprise governance suite | A small, MIT, fully inspectable foundation |

## Versus agent and RAG frameworks

LangChain, LlamaIndex, and Haystack are runtimes you build *inside*, and they are deliberately indifferent to what your data means. Ambient Core inverts that on several axes:

- **You extend it, not enter it.** Pin a tagged release and add tools at the seams via `register_tool()` — you do not rebuild your app around it. See [AGENTS.md](AGENTS.md).
- **Grounded, not improvised.** The agent reads governed Gold shapes and catalog metrics through neutral tools instead of carrying KPI logic in a prompt.
- **Thin by default.** Its only hard dependency is a YAML parser; everything heavy sits behind optional extras.
- **Intelligence you own.** [Maestro](inference-layer.md) is self-hosted and open-weight, with routing and a multi-model council — not a thin client to a hosted provider.

The two still compose: run LlamaIndex retrieval inside a registered tool while Ambient Core keeps owning what a metric means. If advanced retrieval over arbitrary documents is your hard problem, those frameworks are far more mature, and Ambient Core is not competing there.

## Versus data governance tooling

dbt, Great Expectations, and Soda assert quality; DataHub and OpenMetadata catalog and trace; ODCS standardizes how a contract is written. All of them stop at the data layer.

Ambient Core's move is the bundling, not the contract idea:

- The contract idea is not new — **ODCS already standardizes the spec.**
- Ambient Core ships contracts, catalog semantics, governance code, *and* open-weight inference in **one MIT tree.**
- The result: governed data and intelligence share **one source of truth**, instead of drifting across separate systems.

Canonical edit rules: [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md). Embedding a release: [INTEGRATING.md](INTEGRATING.md).

## The unique angle

It is the only stack in this table that treats governed definitions and headless AI as a single foundation — and the only one that draws a hard open-core line: **neutral and canonical here; tenancy, secrets, UI, and vendor code strictly downstream.** Frameworks never draw that line. Commercial suites cannot — they sell the whole product.

## When it fits — and when it does not

**Reach for it when:**

- Stable, auditable definitions of metrics and data products are a core concern.
- You want intelligence grounded in those definitions, not improvised.
- Self-hosted, inspectable, pinnable infrastructure beats ecosystem size.

**Skip it (or use it as a dependency) when:**

- Your bottleneck is retrieval or agent reasoning over loosely governed data.
- You need a large integration ecosystem today.
- Governance simply is not your constraint.

For the teams it is not built for, the discipline is overhead. For the teams it is, that same discipline is exactly the point.

## Related

- [inference-layer.md](inference-layer.md) — Maestro control plane and operations
- [ARCHITECTURE.md](ARCHITECTURE.md) — packages and layout
