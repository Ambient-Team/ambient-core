# Positioning vs existing tools

**Ambient Core is the governed data-product substrate** — versioned contracts, a reference catalog, and lakehouse governance helpers — not an agent framework and not a hosted AI product.

For how this repository relates to a full product repo, see [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md). For components and releases, see [ECOSYSTEM.md](ECOSYSTEM.md).

## At a glance

- **dbt / Great Expectations / Soda** — quality tests and assertions. Ambient Core adds a versioned product *interface* and catalog semantics.
- **DataHub / OpenMetadata** — catalog, lineage, discovery. Ambient Core adds enforceable data-product contracts in one tree.
- **ODCS** — a *spec* for data contracts. Ambient Core adds a working implementation with catalog and pipeline governance attached.
- **Collibra** — enterprise governance suite. Ambient Core is a small, MIT, fully inspectable foundation.

Ambient Core does **not** compete with LangChain, LlamaIndex, or Haystack. It does not ship customer-facing AI, model hosting, or third-party model resale. Operator AI tooling (for example Cursor Agent) is internal engineering practice, not an Ambient Core deliverable.

## Versus data governance tooling

dbt, Great Expectations, and Soda assert quality; DataHub and OpenMetadata catalog and trace; ODCS standardizes how a contract is written. Ambient Core ships contracts, catalog semantics, and governance code in **one MIT tree** so definitions stay one source of truth instead of drifting across separate systems.

Canonical edit rules: [CANONICAL_SCOPE.md](CANONICAL_SCOPE.md). Embedding a release: [INTEGRATING.md](INTEGRATING.md).

## The unique angle

Governed Gold-layer interfaces and reference catalog semantics in a **small, pinnable, inspectable** open core — with a hard line: **neutral and canonical here; tenancy, secrets, UI, and vendor code strictly downstream.** Commercial suites sell the whole product; frameworks never draw that line. Future proprietary AI/ML, if any, belongs only in the commercial platform application, never in this MIT core.

## When it fits — and when it does not

**Reach for it when:**

- Stable, auditable definitions of metrics and data products are a core concern.
- Self-hosted, inspectable, pinnable infrastructure beats ecosystem size for the contract/catalog layer.

**Skip it (or use it as a dependency) when:**

- Your bottleneck is LLM retrieval or agent reasoning over loosely governed data.
- You need a large integration ecosystem today.
- Governance simply is not your constraint.

## Related

- [ARCHITECTURE.md](ARCHITECTURE.md) — packages and layout
- [ECOSYSTEM.md](ECOSYSTEM.md) — components and release flow
