"""Typed models for catalog/manifest.json (parse once at load boundary)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Mapping


def _expect_mapping(value: object, path: str) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise ValueError(f"{path}: expected object")
    return value


def _expect_list(value: object, path: str) -> list[Any]:
    if not isinstance(value, list):
        raise ValueError(f"{path}: expected array")
    return value


def _expect_str(value: object, path: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{path}: expected non-empty string")
    return value


def _expect_int(value: object, path: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int):
        raise ValueError(f"{path}: expected integer")
    return value


@dataclass(frozen=True)
class CatalogIndustryEntry:
    value: str
    label: str
    pack: str
    sector_profile_ids: tuple[str, ...] = ()


@dataclass(frozen=True)
class RequiredSource:
    catalog_option_key: str
    name: str | None
    fields: tuple[str, ...]

    def to_tool_dict(self) -> dict[str, Any]:
        out: dict[str, Any] = {
            "catalogOptionKey": self.catalog_option_key,
            "fields": list(self.fields),
        }
        if self.name is not None:
            out["name"] = self.name
        return out


@dataclass(frozen=True)
class CatalogMetric:
    catalog_metric_key: str
    id: int
    name: str
    industry: str
    methodology: str
    type: str
    unit: str
    required_sources: tuple[RequiredSource, ...]

    def to_tool_dict(self) -> dict[str, Any]:
        return {
            "catalogMetricKey": self.catalog_metric_key,
            "id": self.id,
            "name": self.name,
            "industry": self.industry,
            "methodology": self.methodology,
            "type": self.type,
            "unit": self.unit,
            "requiredSources": [s.to_tool_dict() for s in self.required_sources],
        }


@dataclass(frozen=True)
class CatalogDataOption:
    catalog_option_key: str
    id: int
    name: str
    industry: str
    metric_ids: tuple[int, ...]
    fields: tuple[str, ...]

    def to_tool_dict(self) -> dict[str, Any]:
        return {
            "catalogOptionKey": self.catalog_option_key,
            "id": self.id,
            "name": self.name,
            "industry": self.industry,
            "metricIds": list(self.metric_ids),
            "fields": list(self.fields),
        }


@dataclass(frozen=True)
class CatalogManifest:
    version: int
    industries: tuple[CatalogIndustryEntry, ...]
    metrics: tuple[CatalogMetric, ...]
    data_options: tuple[CatalogDataOption, ...]
    financial_sector_profiles: Mapping[str, object]
    transportation_sector_profiles: Mapping[str, object]

    def metrics_for_industry(self, industry: str) -> list[CatalogMetric]:
        want = str(industry).strip()
        return [m for m in self.metrics if m.industry == want]

    def resolve_metric(self, metric_id: str) -> CatalogMetric | None:
        want = str(metric_id).strip()
        for metric in self.metrics:
            if str(metric.id) == want:
                return metric
        return None


def _parse_required_source(raw: object, path: str) -> RequiredSource:
    obj = _expect_mapping(raw, path)
    key = _expect_str(obj.get("catalogOptionKey"), f"{path}.catalogOptionKey")
    name_val = obj.get("name")
    name: str | None
    if name_val is None:
        name = None
    elif isinstance(name_val, str):
        name = name_val
    else:
        raise ValueError(f"{path}.name: expected string or null")
    fields_raw = _expect_list(obj.get("fields"), f"{path}.fields")
    fields = tuple(str(f) for f in fields_raw)
    return RequiredSource(catalog_option_key=key, name=name, fields=fields)


def _parse_metric(raw: object, path: str) -> CatalogMetric:
    obj = _expect_mapping(raw, path)
    key = _expect_str(obj.get("catalogMetricKey"), f"{path}.catalogMetricKey")
    mid = _expect_int(obj.get("id"), f"{path}.id")
    name = _expect_str(obj.get("name"), f"{path}.name")
    industry = _expect_str(obj.get("industry"), f"{path}.industry")
    methodology = obj.get("methodology")
    if not isinstance(methodology, str):
        raise ValueError(f"{path}.methodology: expected string")
    mtype = _expect_str(obj.get("type"), f"{path}.type")
    unit = obj.get("unit")
    if not isinstance(unit, str):
        raise ValueError(f"{path}.unit: expected string")
    sources_raw = _expect_list(obj.get("requiredSources"), f"{path}.requiredSources")
    sources = tuple(
        _parse_required_source(s, f"{path}.requiredSources[{i}]") for i, s in enumerate(sources_raw)
    )
    return CatalogMetric(
        catalog_metric_key=key,
        id=mid,
        name=name,
        industry=industry,
        methodology=methodology,
        type=mtype,
        unit=unit,
        required_sources=sources,
    )


def _parse_data_option(raw: object, path: str) -> CatalogDataOption:
    obj = _expect_mapping(raw, path)
    key = _expect_str(obj.get("catalogOptionKey"), f"{path}.catalogOptionKey")
    oid = _expect_int(obj.get("id"), f"{path}.id")
    name = _expect_str(obj.get("name"), f"{path}.name")
    industry = _expect_str(obj.get("industry"), f"{path}.industry")
    mids_raw = _expect_list(obj.get("metricIds"), f"{path}.metricIds")
    metric_ids = tuple(_expect_int(m, f"{path}.metricIds[{i}]") for i, m in enumerate(mids_raw))
    fields_raw = _expect_list(obj.get("fields"), f"{path}.fields")
    fields = tuple(str(f) for f in fields_raw)
    return CatalogDataOption(
        catalog_option_key=key,
        id=oid,
        name=name,
        industry=industry,
        metric_ids=metric_ids,
        fields=fields,
    )


def _parse_industry_entry(raw: object, path: str) -> CatalogIndustryEntry:
    obj = _expect_mapping(raw, path)
    value = _expect_str(obj.get("value"), f"{path}.value")
    label = _expect_str(obj.get("label"), f"{path}.label")
    pack = _expect_str(obj.get("pack"), f"{path}.pack")
    profile_ids: tuple[str, ...] = ()
    if "sectorProfileIds" in obj:
        ids_raw = _expect_list(obj.get("sectorProfileIds"), f"{path}.sectorProfileIds")
        profile_ids = tuple(_expect_str(i, f"{path}.sectorProfileIds[{j}]") for j, i in enumerate(ids_raw))
    return CatalogIndustryEntry(
        value=value,
        label=label,
        pack=pack,
        sector_profile_ids=profile_ids,
    )


def _parse_profile_map(raw: object | None, path: str) -> dict[str, object]:
    if raw is None:
        return {}
    obj = _expect_mapping(raw, path)
    out: dict[str, object] = {}
    for key, val in obj.items():
        if not isinstance(key, str):
            raise ValueError(f"{path}: profile keys must be strings")
        if not isinstance(val, dict):
            raise ValueError(f"{path}.{key}: expected object")
        out[key] = val
    return out


def parse_catalog_manifest(doc: object) -> CatalogManifest:
    """Parse manifest JSON into typed models. Raises ValueError on invalid shape."""
    root = _expect_mapping(doc, "manifest")
    version = _expect_int(root.get("version"), "manifest.version")
    industries_raw = _expect_list(root.get("industries"), "manifest.industries")
    industries = tuple(
        _parse_industry_entry(e, f"manifest.industries[{i}]") for i, e in enumerate(industries_raw)
    )
    metrics_raw = _expect_list(root.get("metrics"), "manifest.metrics")
    metrics = tuple(_parse_metric(m, f"manifest.metrics[{i}]") for i, m in enumerate(metrics_raw))
    options_raw = _expect_list(root.get("dataOptions"), "manifest.dataOptions")
    data_options = tuple(
        _parse_data_option(o, f"manifest.dataOptions[{i}]") for i, o in enumerate(options_raw)
    )
    financial = _parse_profile_map(root.get("financialSectorProfiles"), "manifest.financialSectorProfiles")
    transportation = _parse_profile_map(
        root.get("transportationSectorProfiles"),
        "manifest.transportationSectorProfiles",
    )
    return CatalogManifest(
        version=version,
        industries=industries,
        metrics=metrics,
        data_options=data_options,
        financial_sector_profiles=financial,
        transportation_sector_profiles=transportation,
    )
