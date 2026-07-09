## Summary

What changed and why (link an issue if there is one).

## Area

- [ ] contracts (bundled sync updated if YAML changed)
- [ ] catalog (`ambient-catalog-generate --check`)
- [ ] ambient_inference / Maestro
- [ ] ambient_pipeline
- [ ] docs / CI only

## Checklist

- [ ] `validate-contracts` (and `ambient-catalog-generate --check` if catalog touched)
- [ ] `pytest` (set `AMBIENT_SPARK_TESTS=1` if pipeline tests matter)
- [ ] No secrets or production data in the diff
