"""Command-line entrypoints for Ambient Core.

Installed console scripts:

- ``validate-contracts`` — validate ``contracts/*.yaml`` (``ambient_contracts.validate``).
- ``ambient-catalog-generate`` — regenerate ``catalog/manifest.json`` and runtime JS
  (``ambient_cli.catalog`` delegates to ``scripts/generate_reference_catalog.py``).

Integrator builtins (catalog / crosswalk / tool registry) live in ``ambient_cli.integrator_tools``,
``ambient_cli.tool_schema``, and ``ambient_cli.tool_registry``.
"""
