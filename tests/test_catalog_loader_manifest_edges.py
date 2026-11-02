"""catalog_loader manifest.json edge cases."""

from __future__ import annotations

import json
from pathlib import Path

from ambient_pipeline.catalog_loader import load_data_option, load_manifest_version


def test_load_manifest_version_unknown_when_manifest_not_object(tmp_path: Path) -> None:
    (tmp_path / "manifest.json").write_text("[1, 2, 3]", encoding="utf-8")
    assert load_manifest_version(tmp_path) == "unknown"


def test_load_data_option_skips_pack_dir_without_data_options_yaml(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "empty"
    pack.mkdir(parents=True)
    (pack / "pack.yaml").write_text("industry: Test\n", encoding="utf-8")
    manifest = {
        "version": 3,
        "dataOptions": [
            {
                "catalogOptionKey": "ManifestOnly",
                "id": 1,
                "name": "From manifest",
                "metricIds": [],
                "fields": [],
            }
        ],
    }
    (tmp_path / "manifest.json").write_text(json.dumps(manifest), encoding="utf-8")
    opt = load_data_option("ManifestOnly", tmp_path)
    assert opt is not None
    assert opt.get("name") == "From manifest"
