#!/usr/bin/env python3
"""Run a one-shot Cursor SDK local Agent.prompt for CI self-heal.

Used by GitHub Actions (Pattern A/B and vault maintenance). Does not call Cloud
Agents API. Auth: CURSOR_API_KEY.

  python3 _main/scripts/cursor_sdk_heal.py --prompt-file path/to/prompt.txt
  python3 _main/scripts/cursor_sdk_heal.py --prompt-file prompt.txt --cwd /repo --model composer-2.5
"""

from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--prompt-file",
        required=True,
        help="Path to the agent prompt text file",
    )
    parser.add_argument(
        "--cwd",
        default=".",
        help="Working directory for the local agent (default: .)",
    )
    parser.add_argument(
        "--model",
        default=os.environ.get("CURSOR_HEAL_MODEL", "composer-2.5"),
        help="Model id (default: composer-2.5 or CURSOR_HEAL_MODEL)",
    )
    args = parser.parse_args()

    key = os.environ.get("CURSOR_API_KEY", "").strip()
    if not key:
        print("CURSOR_API_KEY is not set; skipping heal.", file=sys.stderr)
        return 2

    prompt_path = Path(args.prompt_file)
    if not prompt_path.is_file():
        print(f"Prompt file not found: {prompt_path}", file=sys.stderr)
        return 2
    prompt = prompt_path.read_text(encoding="utf-8")
    if not prompt.strip():
        print("Prompt file is empty.", file=sys.stderr)
        return 2

    cwd = str(Path(args.cwd).resolve())

    try:
        from cursor_sdk import Agent, AgentOptions, LocalAgentOptions
    except ImportError:
        print(
            "cursor-sdk is not installed. pip install -r .github/scripts/requirements-cursor-sdk.txt",
            file=sys.stderr,
        )
        return 2

    print(f"Running Cursor SDK local Agent.prompt (model={args.model}, cwd={cwd})")
    result = Agent.prompt(
        prompt,
        AgentOptions(
            api_key=key,
            model=args.model,
            local=LocalAgentOptions(cwd=cwd),
        ),
    )
    status = getattr(result, "status", None)
    summary = getattr(result, "result", None) or getattr(result, "text", None) or ""
    print(f"Agent status: {status}")
    if summary:
        text = str(summary)
        print(text[:4000])
        if len(text) > 4000:
            print("... (truncated)")

    # Treat explicit failure statuses as errors; unknown/success continue.
    status_l = str(status or "").lower()
    if status_l in ("error", "failed", "failure", "cancelled", "canceled"):
        print(f"Agent reported failure status: {status}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
