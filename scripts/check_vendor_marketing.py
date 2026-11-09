#!/usr/bin/env python3
"""Fail CI when user-visible copy promotes blocked vendor brands or forge CTAs."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

sys.path.insert(0, str(ROOT / "scripts"))
from check_markdown_prose import iter_doc_files  # noqa: E402

SCAN_EXTRA: tuple[Path, ...] = (
    ROOT / "scripts" / "build_pages_site.py",
    ROOT / "pyproject.toml",
    ROOT / "CHANGELOG.md",
    ROOT / "SECURITY.md",
    ROOT / "CODE_OF_CONDUCT.md",
)

FORBIDDEN_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("Google Colab", re.compile(r"\bgoogle\s+colab\b", re.IGNORECASE)),
    ("free Google", re.compile(r"\bfree\s+google\b", re.IGNORECASE)),
    ("Google account", re.compile(r"\bgoogle\s+account\b", re.IGNORECASE)),
    ("Open in Colab", re.compile(r"\bopen\s+in\s+colab\b", re.IGNORECASE)),
    ("Google Cloud", re.compile(r"\bgoogle\s+cloud\b", re.IGNORECASE)),
    ("GCP", re.compile(r"\bgcp\b", re.IGNORECASE)),
    ("Firebase", re.compile(r"\bfirebase\b", re.IGNORECASE)),
    ("Anthropic", re.compile(r"\banthropic\b", re.IGNORECASE)),
    ("Amazon Web Services", re.compile(r"\bamazon\s+web\s+services\b", re.IGNORECASE)),
    ("Microsoft Fabric", re.compile(r"\bmicrosoft\s+fabric\b", re.IGNORECASE)),
    ("Ambient-Team forge URL", re.compile(r"github\.com/Ambient-Team", re.IGNORECASE)),
    ("GitHub Issues CTA", re.compile(r"\bGitHub\s+Issues\b")),
    ("GitHub Releases CTA", re.compile(r"\bGitHub\s+Releases\b")),
    ("GitHub Security Advisories CTA", re.compile(r"\bGitHub\s+Security\s+Advisories\b")),
    ("View on GitHub CTA", re.compile(r"\bView\s+on\s+GitHub\b", re.IGNORECASE)),
    ("CI badge widget", re.compile(r"github\.com/.+/actions/workflows/.+badge\.svg", re.IGNORECASE)),
    ("GitHub Pages host", re.compile(r"github\.io/", re.IGNORECASE)),
)

COLAB_ALLOWED = re.compile(
    r"colab\s*=|[,_\[]colab|colab[_\-\./\],]|\[colab\]|optional-colab|colab-file|"
    r"requirements-colab|00_colab|/colab|\.colab",
    re.IGNORECASE,
)


def _colab_violation(line: str) -> bool:
    if not re.search(r"(?i)\bcolab\b", line):
        return False
    return COLAB_ALLOWED.search(line) is None


def _scan_text(rel: str, text: str, *, line_offset: int = 1) -> list[str]:
    errors: list[str] = []
    for lineno, line in enumerate(text.splitlines(), start=line_offset):
        for label, pattern in FORBIDDEN_PATTERNS:
            if pattern.search(line):
                errors.append(f"{rel}:{lineno}: forbidden {label!r}")
        if _colab_violation(line):
            errors.append(f"{rel}:{lineno}: forbidden bare Colab vendor copy")
    return errors


def _scan_notebook_markdown(path: Path) -> list[str]:
    rel = path.relative_to(ROOT).as_posix()
    data = json.loads(path.read_text(encoding="utf-8"))
    errors: list[str] = []
    for cell in data.get("cells", []):
        if cell.get("cell_type") != "markdown":
            continue
        source = cell.get("source", [])
        if isinstance(source, str):
            block = source
        else:
            block = "".join(source)
        errors.extend(_scan_text(rel, block, line_offset=1))
    return errors


HUB_PREFIX = ROOT / "docs" / "hub"


def collect_scan_files() -> list[Path]:
    files = [
        path
        for path in iter_doc_files()
        if not path.resolve().is_relative_to(HUB_PREFIX.resolve())
    ]
    for extra in SCAN_EXTRA:
        if extra.is_file():
            files.append(extra)
    seen: set[Path] = set()
    unique: list[Path] = []
    for path in files:
        key = path.resolve()
        if key in seen:
            continue
        seen.add(key)
        unique.append(path)
    return unique


def scan_tree_paths(paths: list[Path]) -> list[str]:
    errors: list[str] = []
    for path in paths:
        rel = path.relative_to(ROOT).as_posix()
        if path.suffix == ".ipynb":
            errors.extend(_scan_notebook_markdown(path))
            continue
        text = path.read_text(encoding="utf-8")
        errors.extend(_scan_text(rel, text))
    return errors


def scan_site_dir(site_dir: Path) -> list[str]:
    if not site_dir.is_dir():
        return [f"site directory missing: {site_dir}"]
    errors: list[str] = []
    for path in sorted(site_dir.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix not in {".html", ".css", ".js", ".json", ".txt", ".md"}:
            continue
        rel = path.relative_to(site_dir).as_posix()
        text = path.read_text(encoding="utf-8", errors="replace")
        errors.extend(_scan_text(rel, text))
    return errors


def main() -> int:
    errors = scan_tree_paths(collect_scan_files())
    if errors:
        print("Vendor marketing copy is not allowed in public docs and metadata.", file=sys.stderr)
        for item in errors:
            print(item, file=sys.stderr)
        return 1
    print(f"OK: vendor marketing scan ({len(collect_scan_files())} source file(s))")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
