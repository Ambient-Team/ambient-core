"""Dev and test helpers for left-join enrichment cardinality."""

from __future__ import annotations

from collections.abc import Callable
from typing import Union

from pyspark.sql import DataFrame

KeyList = Union[list[str], str]


def _normalize_keys(keys: KeyList) -> list[str]:
    if isinstance(keys, str):
        return [keys]
    return list(keys)


def assert_unique_keys(df: DataFrame, keys: KeyList, label: str) -> None:
    """Raise if duplicate key combinations exist in df."""
    key_cols = _normalize_keys(keys)
    total = df.count()
    if total == 0:
        return
    distinct = df.select(*key_cols).distinct().count()
    if distinct != total:
        raise RuntimeError(
            f"Join guard {label}: expected unique keys {key_cols}, "
            f"found {total} rows but {distinct} distinct key groups"
        )


def assert_left_join_preserves_row_count(
    left: DataFrame, joined: DataFrame, label: str
) -> None:
    """Raise if a left join inflated row count (duplicate keys on the right)."""
    left_n = left.count()
    joined_n = joined.count()
    if joined_n > left_n:
        raise RuntimeError(
            f"Join guard {label}: left join row count grew from {left_n} to {joined_n}"
        )


def log_left_join_audit(
    left: DataFrame,
    right: DataFrame,
    joined: DataFrame,
    keys: KeyList,
    label: str,
    *,
    logger: Callable[[str], None] = print,
) -> None:
    """Log left and joined row counts; warn when joined count exceeds left."""
    key_cols = _normalize_keys(keys)
    left_n = left.count()
    joined_n = joined.count()
    right_n = right.count()
    delta = joined_n - left_n
    logger(
        f"[join_audit] {label} keys={key_cols} left_rows={left_n} "
        f"right_rows={right_n} joined_rows={joined_n} delta={delta}"
    )
    if delta > 0:
        logger(
            f"[join_audit] WARN {label}: left join added {delta} rows; "
            f"check duplicate keys on the right side"
        )
