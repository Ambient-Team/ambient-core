"""Close remaining lib/ coverage gaps (behavior-focused)."""

from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

import pytest

import ambient_pipeline.secrets as secrets_module
from ambient_contracts.loader import ContractLoader
from ambient_pipeline import catalog_field_rules
from ambient_pipeline.catalog_loader import load_data_option
from ambient_pipeline.colab_smoke import _load_contract
from ambient_pipeline.pandas_provenance import PandasBronzeStamper
from ambient_pipeline.pii import _SparkPiiUdf, hmac_sha256_hex


def test_safe_contract_name_rejects_backslash() -> None:
    with pytest.raises(ValueError, match="invalid contract file"):
        ContractLoader._safe_contract_name("evil\\contract.yaml")


def test_resolve_path_rejects_symlink_outside_contracts_dir(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    outside = tmp_path / "outside.yaml"
    outside.write_text("product: {name: Outside, version: 1}\n", encoding="utf-8")
    (contracts / "link.yaml").symlink_to(outside)
    loader = ContractLoader(contracts_dir=contracts)
    with pytest.raises(ValueError, match="escapes"):
        loader.resolve_path("link.yaml")


def test_load_data_option_without_pack_yaml(tmp_path: Path) -> None:
    pack = tmp_path / "industries" / "bare"
    pack.mkdir(parents=True)
    (pack / "data_options.yaml").write_text(
        "dataOptions:\n  BareKey:\n    id: 1\n    name: Bare\n    metricIds: []\n    fields: []\n",
        encoding="utf-8",
    )
    opt = load_data_option("BareKey", tmp_path)
    assert opt is not None
    assert opt.get("name") == "Bare"


def test_infer_integer_for_count_suffix_when_hints_narrowed(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(catalog_field_rules, "_NUMERIC_HINTS", ("amount",))
    assert catalog_field_rules.infer_catalog_field_type("widget_count") == "integer"


def test_colab_bootstrap_skips_non_directory_drive_candidates(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    from ambient_pipeline.colab_bootstrap import find_platform_root

    isolated = tmp_path / "isolated" / "colab_bootstrap.py"
    isolated.parent.mkdir(parents=True)
    monkeypatch.setattr("ambient_pipeline.colab_bootstrap.__file__", str(isolated))
    file_candidate = tmp_path / "not-a-drive"
    file_candidate.write_text("x", encoding="utf-8")
    platform = tmp_path / "ambient-core"
    (platform / "ambient_pipeline").mkdir(parents=True)
    (platform / "data").mkdir()
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.DRIVE_CANDIDATES",
        (file_candidate,),
    )
    monkeypatch.setattr(
        "ambient_pipeline.colab_bootstrap.Path.cwd",
        lambda: platform,
    )
    assert find_platform_root() == platform.resolve()


def test_load_contract_missing_file(tmp_path: Path) -> None:
    with pytest.raises(FileNotFoundError, match="Missing contract"):
        _load_contract(tmp_path / "contracts")


def test_load_contract_rejects_non_mapping(tmp_path: Path) -> None:
    contracts = tmp_path / "contracts"
    contracts.mkdir()
    from ambient_pipeline.colab_smoke import CONTRACT_FILE

    (contracts / CONTRACT_FILE).write_text("- not a mapping\n", encoding="utf-8")
    with pytest.raises(ValueError, match="YAML mapping"):
        _load_contract(contracts)


def test_pandas_bronze_stamper_required_columns() -> None:
    stamper = PandasBronzeStamper(run_id="r", org_id="o")
    assert "_bronze_row_hash" in stamper.required_columns()


def test_spark_pii_udf_callable_pseudonymizes_on_driver() -> None:
    assert _SparkPiiUdf("pepper")("plain-text") == hmac_sha256_hex("pepper", "plain-text")
    assert _SparkPiiUdf("pepper")(None) == hmac_sha256_hex("pepper", None)


def test_try_dbutils_secret_uses_notebook_dbutils(monkeypatch: pytest.MonkeyPatch) -> None:
    mock_dbutils = SimpleNamespace(
        secrets=SimpleNamespace(get=lambda **_kw: "from-notebook-dbutils")
    )
    monkeypatch.setitem(secrets_module.__dict__, "dbutils", mock_dbutils)
    assert secrets_module._try_dbutils_secret("scope", "key") == "from-notebook-dbutils"
