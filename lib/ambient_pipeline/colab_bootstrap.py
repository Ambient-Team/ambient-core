"""Deprecated — use :mod:`ambient_pipeline.notebook_bootstrap`."""

from __future__ import annotations

from ambient_pipeline.notebook_bootstrap import ensure_checkout_on_path, find_checkout_root

ensure_package_on_path = ensure_checkout_on_path
find_platform_root = find_checkout_root

__all__ = [
    "ensure_checkout_on_path",
    "ensure_package_on_path",
    "find_checkout_root",
    "find_platform_root",
]
