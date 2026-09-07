"""GDPR Art. 25 PII pseudonymization."""

from __future__ import annotations

import hashlib
import hmac
from dataclasses import dataclass, field

from pyspark.sql import DataFrame
from pyspark.sql import functions as F
from pyspark.sql.types import StringType


PII_INDICATORS = ("uid", "email", "name", "phone", "address")


def hmac_sha256_hex(salt: str, value: str | None) -> str:
    """Keyed HMAC-SHA256 hex digest (one-way pseudonymization)."""
    raw = "" if value is None else str(value)
    return hmac.new(
        salt.encode("utf-8"),
        raw.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()


@dataclass
class PiiPseudonymizer:
    """One-way HMAC-SHA256 pseudonymization of PII columns."""

    salt: str
    transform_ts: str
    indicators: tuple[str, ...] = field(default=PII_INDICATORS)

    def __repr__(self) -> str:
        return f"PiiPseudonymizer(salt=<redacted>, transform_ts={self.transform_ts!r})"

    def pseudonymize_column(self, col_ref):
        """Return expression for one-way HMAC-SHA256 pseudonymization."""
        salt = self.salt

        @F.udf(returnType=StringType())
        def _hmac_udf(value: str | None) -> str:
            return hmac_sha256_hex(salt, value)

        return _hmac_udf(col_ref.cast("string"))

    def apply(self, df: DataFrame, sensitive_field_names: list[str] | None = None) -> DataFrame:
        """Scan columns for PII indicators and pseudonymize matches."""
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
