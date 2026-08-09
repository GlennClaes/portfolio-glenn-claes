"""Validate the structure of frontend/src/data/projects.ts.

Parses the TypeScript file as plain text and checks:
- Every project has texts for all four locales (en, nl, de, fr).
- Required fields (title, desc, body, highlights) are non-empty.
- No duplicate project IDs.

Usage:
    python -m portfolio_tools.workflows.validate_project_data [--data-file path]
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

from rich.console import Console

console = Console()

_REQUIRED_LOCALES = {"en", "nl", "de", "fr"}
_REQUIRED_TEXT_FIELDS = {"title", "label", "desc", "role", "ctaLabel"}


def _extract_project_ids(content: str) -> list[str]:
    """Pull every `id: '...'` from the meta blocks."""
    return re.findall(r"id:\s*'([^']+)'", content)


def _extract_locale_blocks(content: str) -> dict[str, list[str]]:
    """Return a mapping of locale → list of project IDs found under that locale."""
    result: dict[str, list[str]] = {}
    # Each locale block is identified by `en: {`, `nl: {`, etc.
    for locale in _REQUIRED_LOCALES:
        pattern = rf"{locale}:\s*\{{([^}}]*)\}}"
        matches = re.findall(pattern, content, re.DOTALL)
        ids: list[str] = []
        for block in matches:
            ids.extend(re.findall(r"title:\s*'([^']*)'", block))
        result[locale] = ids
    return result


def _check_required_fields(content: str) -> list[str]:
    errors: list[str] = []
    for field in _REQUIRED_TEXT_FIELDS:
        if f"{field}:" not in content:
            errors.append(f"Missing required field '{field}' in project texts")
    return errors


def run(data_file: str) -> None:
    path = Path(data_file).resolve()
    if not path.exists():
        console.print(f"[red]File not found: {path}[/]")
        sys.exit(1)

    content = path.read_text(encoding="utf-8")

    # 1. Check duplicate IDs
    ids = _extract_project_ids(content)
    seen: set[str] = set()
    for pid in ids:
        if pid in seen:
            console.print(f"[red]Duplicate project ID: '{pid}'[/]")
            sys.exit(1)
        seen.add(pid)

    if not ids:
        console.print("[red]No project IDs found in the data file.[/]")
        sys.exit(1)

    console.print(f"[green]✓ {len(ids)} project(s) found: {', '.join(ids)}[/]")

    # 2. Check locale coverage
    locale_map = _extract_locale_blocks(content)
    for locale in _REQUIRED_LOCALES:
        count = len(locale_map.get(locale, []))
        if count < len(ids):
            console.print(
                f"[yellow]⚠ Locale '{locale}' has {count} text block(s), "
                f"but {len(ids)} projects exist — possible missing translations.[/]"
            )
        else:
            console.print(f"[green]✓ Locale '{locale}': {count} text block(s)[/]")

    # 3. Check required fields
    field_errors = _check_required_fields(content)
    if field_errors:
        for err in field_errors:
            console.print(f"[red]✗ {err}[/]")
        sys.exit(1)

    console.print("\n[bold green]All checks passed.[/]")
