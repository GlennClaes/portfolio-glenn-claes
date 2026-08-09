"""Generate a formatted changelog from git log between two refs."""

from __future__ import annotations

import subprocess
from pathlib import Path

from rich.console import Console

console = Console()

_REPO_ROOT = Path(__file__).resolve().parents[4]


def _git(*args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(_REPO_ROOT), *args],
        capture_output=True,
        text=True,
        check=True,
    )
    return result.stdout.strip()


def run(from_ref: str, to_ref: str) -> None:
    """Print a changelog between *from_ref* and *to_ref*."""
    log = _git(
        "log",
        "--pretty=format:- %s (%h)",
        f"{from_ref}..{to_ref}",
    )

    if not log:
        console.print(f"[yellow]No commits between {from_ref} and {to_ref}.[/]")
        return

    console.print(f"\n[bold]Changelog: {from_ref} → {to_ref}[/]\n")
    console.print(log)
    console.print()
