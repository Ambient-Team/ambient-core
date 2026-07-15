## Summary

What changed and why (link an issue if there is one).

## Area

- [ ] contracts (bundled sync updated if YAML changed)
- [ ] catalog (`harden_catalog_data_options.py --check`, `ambient-catalog-generate --check --strict-data-option-inputs`)
- [ ] ambient_pipeline
- [ ] docs / CI only

## Checklist

- [ ] `validate-contracts` (and catalog hardening + `ambient-catalog-generate --check --strict-data-option-inputs` if catalog touched)
- [ ] `pytest` (set `AMBIENT_SPARK_TESTS=1` if pipeline tests matter)
- [ ] No secrets or production data in the diff
