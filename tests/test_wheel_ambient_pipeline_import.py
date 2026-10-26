"""Wheel install smoke: ambient_pipeline imports without repo checkout on PYTHONPATH."""

from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_installed_wheel_exposes_ambient_pipeline_colab_and_governance(
    tmp_path: Path,
) -> None:
    wheel_dir = ROOT / "dist"
    wheel_dir.mkdir(exist_ok=True)
    build = subprocess.run(
        [sys.executable, "-m", "pip", "wheel", ".", "-w", str(wheel_dir), "--no-deps"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    assert build.returncode == 0, build.stderr or build.stdout
    wheels = sorted(wheel_dir.glob("ambient_core-*.whl"))
    assert wheels, "expected ambient_core wheel in dist/"
    wheel_path = wheels[-1]

    script = """
import sys
from importlib import import_module
for mod in (
    "ambient_pipeline",
    "ambient_pipeline.colab_smoke",
    "ambient_pipeline.pandas_provenance",
    "ambient_pipeline.pii",
):
    import_module(mod)
from ambient_pipeline import SilverValidator, PiiPseudonymizer
assert SilverValidator is not None and PiiPseudonymizer is not None
print("ok")
"""
    install_run = subprocess.run(
        [
            sys.executable,
            "-m",
            "pip",
            "install",
            "--force-reinstall",
            "--no-deps",
            str(wheel_path),
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    assert install_run.returncode == 0, install_run.stderr or install_run.stdout
    clean_env = {k: v for k, v in os.environ.items() if k != "PYTHONPATH"}
    clean_env["PYTHONNOUSERSITE"] = "1"
    probe = subprocess.run(
        [sys.executable, "-I", "-c", script],
        cwd=tmp_path,
        env=clean_env,
        capture_output=True,
        text=True,
        check=False,
    )
    assert probe.returncode == 0, probe.stderr or probe.stdout
    assert "ok" in (probe.stdout or "")
