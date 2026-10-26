"""GDPR Art. 25 PII pseudonymization."""

from __future__ import annotations

import hashlib
import hmac
from dataclasses import dataclass, field

from pyspark.sql import Column, DataFrame
from pyspark.sql import functions as F
from pyspark.sql.types import StringType


PII_INDICATORS = ("uid", "email", "name", "phone", "address")

_PSEUDO_HEX_LEN = 64


def columns_matching_pii_indicators(
    column_names: list[str] | tuple[str, ...],
    *,
    extra_sensitive: list[str] | None = None,
) -> list[str]:
    """Return column names that match ``PII_INDICATORS`` or an explicit sensitive list.

    Args:
        column_names: DataFrame column names to scan.
        extra_sensitive: Additional lowercase names treated as sensitive.

    Returns:
        Matching column names (original casing).

    Raises:
        None: This callable does not raise.

    Example:
        >>> columns_matching_pii_indicators(["customer_name", "metric_id"])
    """
    extra = {str(n).lower() for n in (extra_sensitive or [])}
    matched: list[str] = []
    for col_name in column_names:
        col_lower = col_name.lower()
        if col_lower in extra or any(indicator in col_lower for indicator in PII_INDICATORS):
            matched.append(col_name)
    return matched


def value_looks_pseudonymized(value: object) -> bool:
    """True when *value* is a 64-char lowercase hex digest (HMAC-SHA256 output).

    Args:
        value: Cell value to inspect.

    Returns:
        bool.

    Raises:
        None: This callable does not raise.

    Example:
        >>> value_looks_pseudonymized("a" * 64)
    """
    if value is None:
        return True
    text = str(value).strip()
    if len(text) != _PSEUDO_HEX_LEN:
        return False
    return all(ch in "0123456789abcdef" for ch in text)


def assert_pii_columns_pseudonymized(
    df: DataFrame,
    *,
    extra_sensitive: list[str] | None = None,
) -> None:
    """Raise ``AssertionError`` if configured PII columns contain non-digest values.

    Args:
        df: Spark DataFrame after the pseudonymizer stage.
        extra_sensitive: Additional sensitive column names.

    Returns:
        None.

    Raises:
        AssertionError: When a PII column still holds a raw-looking value.

    Example:
        >>> assert_pii_columns_pseudonymized(df)
    """
    pii_cols = columns_matching_pii_indicators(df.columns, extra_sensitive=extra_sensitive)
    for col in pii_cols:
        for row in df.select(col).where(F.col(col).isNotNull()).distinct().limit(20).collect():
            if not value_looks_pseudonymized(row[0]):
                raise AssertionError(
                    f"PII column {col!r} contains non-pseudonymized value {row[0]!r}"
                )


def hmac_sha256_hex(salt: str, value: str | None) -> str:
    """Keyed HMAC-SHA256 hex digest (one-way pseudonymization).

    Args:
        salt: str.
        value: str | None.

    Returns:
        str.

    Raises:
        None: This callable does not raise.

    Example:
        >>> hmac_sha256_hex(...)
    """
    raw = "" if value is None else str(value)
    return hmac.new(
        salt.encode("utf-8"),
        raw.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


def pseudonymize_string(salt: str, value: str | None) -> str:
    """Pseudonymize one string value (shared by Spark UDF and unit tests).

    Args:
        salt: str.
        value: str | None.

    Returns:
        str.

    Raises:
        None: This callable does not raise.

    Example:
        >>> pseudonymize_string(...)
    """
    return hmac_sha256_hex(salt, value)


class _SparkPiiUdf:
    """Picklable callable for Spark UDF registration (driver-testable for coverage)."""

    __slots__ = ("salt",)

    def __init__(self, salt: str) -> None:
        self.salt = salt

    def __call__(self, value: str | None) -> str:
        return pseudonymize_string(self.salt, value)


@dataclass
class PiiPseudonymizer:
    """One-way HMAC-SHA256 pseudonymization of PII columns."""

    salt: str
    transform_ts: str
    indicators: tuple[str, ...] = field(default=PII_INDICATORS)

    def __repr__(self) -> str:
        return f"PiiPseudonymizer(salt=<redacted>, transform_ts={self.transform_ts!r})"

    def pseudonymize_column(self, col_ref: Column) -> Column:
        """Return expression for one-way HMAC-SHA256 pseudonymization.

        Args:
            col_ref: Column.

        Returns:
            Column.

        Raises:
            None: This callable does not raise.

        Example:
            >>> pseudonymize_column(...)
        """
        udf = F.udf(_SparkPiiUdf(self.salt), StringType())
        return udf(col_ref.cast("string"))

    def apply(self, df: DataFrame, sensitive_field_names: list[str] | None = None) -> DataFrame:
        """Scan columns for PII indicators and pseudonymize matches.

        Args:
            df: DataFrame.
            sensitive_field_names: list[str] | None.

        Returns:
            DataFrame.

        Raises:
            None: This callable does not raise.

        Example:
            >>> apply(...)
        """
        pseudonymized_cols: list[str] = []
        result = df
        extra = {str(n).lower() for n in (sensitive_field_names or [])}
        for col_name in df.columns:
            col_lower = col_name.lower()
            if col_lower in extra or any(indicator in col_lower for indicator in self.indicators):
                result = result.withColumn(col_name, self.pseudonymize_column(F.col(col_name)))
                pseudonymized_cols.append(col_name)

        return (
            result.withColumn("_gdpr_pii_scanned", F.lit(True))
            .withColumn("_gdpr_pseudonymized_cols", F.lit(str(pseudonymized_cols)))
            .withColumn("_gdpr_pseudonymization_ts", F.lit(self.transform_ts))
        )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, PiiPseudonymizer):
            return False
        return self.salt == other.salt and self.transform_ts == other.transform_ts
