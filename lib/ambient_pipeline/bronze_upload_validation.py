"""Bronze upload header validation against catalog mapping metadata."""

from __future__ import annotations

from typing import Any

from ambient_pipeline.bronze_catalog_map import parse_mapping_json


def validate_csv_headers_against_mapping(
    csv_headers: list[str],
    mapping_json: str | dict[str, Any] | None,
) -> tuple[bool, str | None]:
    """Ensure every mapped CSV header exists on the file.

    Args:
        csv_headers: list[str].
        mapping_json: str | dict[str, Any] | None.

    Returns:
        tuple[bool, str | None].

    Raises:
        None: This callable does not raise.

    Example:
        >>> validate_csv_headers_against_mapping(...)
    """
    mapping = parse_mapping_json(mapping_json)
    if not mapping:
        return False, "mapping_json is empty"
    header_set = {str(h).strip() for h in csv_headers if str(h).strip()}
    missing = [csv_header for csv_header in mapping.values() if csv_header not in header_set]
    if missing:
        return False, f"missing mapped CSV columns: {', '.join(sorted(set(missing)))}"
    return True, None


def parse_mapping_widget(raw: str) -> dict[str, str]:
    """Parse mapping widget.

    Args:
        raw: str.

    Returns:
        dict[str, str].

    Raises:
        None: This callable does not raise.

    Example:
        >>> parse_mapping_widget(...)
    """
    try:
        return parse_mapping_json(raw or "{}")
    except ValueError as exc:
        raise ValueError(f"invalid mapping_json widget: {exc}") from exc
