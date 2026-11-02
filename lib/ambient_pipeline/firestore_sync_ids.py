"""Stable document id builders for optional Gold → Firestore sync (platform)."""


def pipeline_health_document_id(org_id: str, pipeline_name: str, stage: str) -> str:
    """Document id for root collection pipelineHealth.

    Args:
        org_id: str.
        pipeline_name: str.
        stage: str.

    Returns:
        str.

    Raises:
        None: This callable does not raise.

    Example:
        >>> pipeline_health_document_id(...)
    """
    return f"{org_id}|{pipeline_name}|{stage}"


def audit_performance_document_id(org_id: str, audit_event_id: str) -> str:
    """Document id under organizations/{orgId}/auditPerformanceEvents.

    Args:
        org_id: str.
        audit_event_id: str.

    Returns:
        str.

    Raises:
        None: This callable does not raise.

    Example:
        >>> audit_performance_document_id(...)
    """
    return f"{org_id}|{audit_event_id}"
