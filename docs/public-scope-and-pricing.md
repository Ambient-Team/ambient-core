# Public scope and pricing alignment

This page keeps **repository docs** aligned with how Ambient Core is described on [ambientsystems.ai](https://www.ambientsystems.ai/) and in the root [README](../README.md) product matrix. It does not publish commercial prices (those live on the website and in sales materials).

## What Ambient Core is (this repository)

- **Open source** under the [MIT License](../LICENSE): contracts, reference catalog, and pipeline governance libraries anyone can inspect, fork, and run locally.
- **No hosted product** in this tree: no tenancy, billing UI, managed storage, or customer-facing AI.
- **Free path:** Google Colab + external demo CSVs from [EngineerID/ambient-systems `demos/ambient-core/`](https://github.com/EngineerID/ambient-systems/tree/main/demos/ambient-core/); optional local Spark with your own `AMBIENT_PII_SALT` and Java 17.

## What the commercial platform is (separate repository)

- **Hosting, storage, and operator deploy** — platform team operates lakehouse and app glue.
- **Members / hosted try** — product demo and entitlements, not shipped from ambient-core.
- **No CLI resale of third-party models** — consistent with [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md) and [POSITIONING.md](POSITIONING.md).

## Product matrix (SSOT in README)

The authoritative split is the bullet list in [README.md](../README.md#product-matrix-authoritative). In short:

- **Contracts, notebooks, pipeline code** — in ambient-core and in the commercial platform (platform pins a core tag).
- **Hosting and storage** — ambient-core: **you**; commercial platform: **us**.
- **Demo** — ambient-core: free Google Colab; commercial platform: members / hosted try.

When marketing or pricing pages change, update the **README product matrix** and this doc in the same PR as any technical scope change. Do not duplicate price tables in git; link to the website for SKUs and fees.

## Related

- [CORE_VS_PLATFORM.md](CORE_VS_PLATFORM.md)
- [RELEASING.md](RELEASING.md) — monthly tags (no freeze days; work continues through release day)
