"""Optional Firebase/Firestore bridge for commercial platform jobs.

Not imported by default notebook or ``pip install`` OSS paths. Requires
``firebase_admin`` and a configured service-account secret when used.
"""

from __future__ import annotations

from typing import Any


def _firestore_client():
    import os
    import tempfile

    import firebase_admin
    from firebase_admin import credentials, firestore

    from ambient_pipeline.secrets import get_secret

    if not firebase_admin._apps:
        sa_json_str = get_secret("ambient-systems", "firebase_service_account")
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as handle:
            handle.write(sa_json_str)
            sa_path = handle.name
        cred = credentials.Certificate(sa_path)
        firebase_admin.initialize_app(cred)
        os.unlink(sa_path)
    return firestore.client()


def append_lineage_event(
    org_id: str,
    source_id: str,
    *,
    run_id: str,
    status: str,
    rows_written: int,
    gcs_path: str,
) -> None:
    """Append server-side mapping lineage to dataSources history."""
    try:
        db = _firestore_client()
        db.collection("organizations").document(org_id).collection("dataSources").document(
            source_id
        ).collection("history").add(
            {
                "action": "bronze_catalog_map",
                "run_id": run_id,
                "status": status,
                "rows_written": rows_written,
                "gcs_path": gcs_path,
                "note": "bronze catalog mapping completed.",
            }
        )
    except Exception:
        return


def fetch_data_source(org_id: str, source_id: str) -> dict[str, Any] | None:
    """Read organizations/{orgId}/dataSources/{sourceId}."""
    try:
        db = _firestore_client()
        snap = (
            db.collection("organizations")
            .document(org_id)
            .collection("dataSources")
            .document(source_id)
            .get()
        )
        return snap.to_dict() if snap.exists else None
    except Exception:
        return None
