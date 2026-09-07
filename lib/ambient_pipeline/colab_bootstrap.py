"""Resolve ambient-core / Drive demo root on Google Colab or a local checkout."""

from __future__ import annotations

import sys
from pathlib import Path


FOLDER_MARKERS = (
    "Ambient-Systems-Platform",  # personal Drive SSOT folder name
    "ambient-core",
)
DRIVE_CANDIDATES = (
    Path("/content/drive/MyDrive"),
    Path("/content/drive/My Drive"),
)


def find_platform_root(explicit: str | Path | None = None) -> Path:
    """Return the folder that contains ambient_pipeline/, data/, contracts/, notebooks/."""
    import os

    if explicit is None:
        env_root = os.environ.get("PLATFORM_ROOT", "").strip()
        if env_root:
            explicit = env_root

    if explicit:
        root = Path(explicit).expanduser().resolve()
        if not (root / "ambient_pipeline").is_dir():
            raise FileNotFoundError(
                f"explicit root missing ambient_pipeline/: {root}"
            )
        return root

    seen: set[str] = set()
    candidates: list[Path] = []

    # Prefer shallow Drive lookups (avoid whole-MyDrive rglob hangs).
    for drive in DRIVE_CANDIDATES:
        if not drive.is_dir():
            continue
        for marker in FOLDER_MARKERS:
            direct = drive / marker
            if direct.is_dir():
                candidates.append(direct)
            # One extra directory level only (e.g. MyDrive/06 Business/<marker>).
            try:
                for child in drive.iterdir():
                    if child.is_dir():
                        nested = child / marker
                        if nested.is_dir():
                            candidates.append(nested)
            except OSError:
                continue

    here = Path(__file__).resolve()
    # .../<root>/ambient_pipeline/colab_bootstrap.py  OR  .../<root>/lib/ambient_pipeline/...
    if len(here.parents) >= 2:
        candidates.append(here.parents[1])
    if len(here.parents) >= 3 and here.parents[1].name == "lib":
        candidates.append(here.parents[2])
    candidates.extend([Path.cwd(), Path.cwd().parent])

    for root in candidates:
        root = root.resolve()
        key = str(root)
        if key in seen:
            continue
        seen.add(key)
        if (root / "ambient_pipeline").is_dir() and (root / "data").is_dir():
            return root

    raise FileNotFoundError(
        "Could not find ambient-core root. "
        "Mount Google Drive in Colab, then pass root= explicitly, e.g. "
        "'/content/drive/MyDrive/06 Business/Ambient-Systems-Platform', "
        "or set PLATFORM_ROOT to a local clone (with external data/raw samples)."
    )


def ensure_package_on_path(root: Path | None = None) -> Path:
    """Insert the platform root on sys.path so ``import ambient_pipeline`` works."""
    root = root or find_platform_root()
    root_str = str(root)
    if root_str not in sys.path:
        sys.path.insert(0, root_str)
    # Local GitHub clone also ships Spark helpers under lib/
    lib = root / "lib"
    if lib.is_dir() and str(lib) not in sys.path:
        sys.path.insert(0, str(lib))
    return root
