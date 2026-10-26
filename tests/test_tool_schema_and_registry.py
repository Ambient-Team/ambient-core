"""Tests for integrator tool schema validation and per-instance registry."""

from __future__ import annotations

from ambient_cli.tool_registry import (
    IntegratorToolRegistry,
    ToolPlanProfile,
    execute_tool_plan,
)
from ambient_cli.tool_schema import validate_tool_args, validate_tool_schema_document


def test_validate_tool_args_accepts_valid_payload() -> None:
    errors = validate_tool_args(
        {"name": {"type": "string"}, "count": {"type": "integer"}},
        ["name"],
        {"name": "alpha", "count": 2},
    )
    assert errors == []


def test_validate_tool_args_nested_object_and_array() -> None:
    schema = {
        "filter": {
            "type": "object",
            "properties": {"industry": {"type": "string"}},
            "required": ["industry"],
        },
        "ids": {"type": "array", "items": {"type": "integer"}},
    }
    errors = validate_tool_args(schema, ["filter"], {"filter": {"industry": "Real Estate"}, "ids": [1, 2]})
    assert errors == []
    bad = validate_tool_args(schema, ["filter"], {"filter": {}, "ids": ["x"]})
    assert any("industry" in err for err in bad)
    assert any("ids[0]" in err for err in bad)


def test_validate_tool_args_reports_missing_and_unknown() -> None:
    errors = validate_tool_args(
        {"name": {"type": "string"}},
        ["name"],
        {"extra": 1},
    )
    assert any("missing" in err for err in errors)
    assert any("unknown" in err for err in errors)


def test_integrator_tool_registry_is_per_instance() -> None:
    a = IntegratorToolRegistry()
    b = IntegratorToolRegistry()
    a.register("echo", lambda msg: msg)
    assert b.tool_ids() == []
    assert a.call("echo", msg="hi") == "hi"


def test_validate_tool_schema_document_wraps_properties() -> None:
    errors = validate_tool_schema_document(
        {"properties": {"name": {"type": "string"}}, "required": ["name"]},
        {},
    )
    assert any("missing" in err for err in errors)


def test_validate_tool_args_enum_and_min_length() -> None:
    props = {"mode": {"type": "string", "enum": ["read", "write"], "minLength": 3}}
    assert validate_tool_args(props, ["mode"], {"mode": "read"}) == []
    errors = validate_tool_args(props, [], {"mode": "bad"})
    assert any("one of" in err for err in errors)


def test_validate_tool_args_integer_minimum() -> None:
    props = {"metric_id": {"type": "integer", "minimum": 1}}
    assert validate_tool_args(props, ["metric_id"], {"metric_id": 5}) == []
    errors = validate_tool_args(props, [], {"metric_id": 0})
    assert any("minimum" in err for err in errors)


def test_validate_tool_args_one_of_exactly_one_match() -> None:
    props = {
        "value": {
            "oneOf": [{"type": "string"}, {"type": "integer"}],
        }
    }
    assert validate_tool_args(props, [], {"value": "text"}) == []
    assert validate_tool_args(props, [], {"value": 42}) == []
    errors = validate_tool_args(props, [], {"value": 3.14})
    assert any("oneOf" in err for err in errors)


def test_execute_tool_plan_runs_each_id_once_v1() -> None:
    registry = IntegratorToolRegistry()
    registry.register("one", lambda: 1)
    registry.register("two", lambda: 2)
    profile = ToolPlanProfile(tool_ids=["one", "two"], max_tool_rounds=5)
    assert execute_tool_plan(registry, profile) == [1, 2]
