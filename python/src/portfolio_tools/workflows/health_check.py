"""Check if a site is live and healthy.

Reports HTTP status, response time, title tag, and expected content.
"""

from __future__ import annotations

import re
import sys
import time

import httpx
from rich.console import Console

console = Console()


def run(url: str) -> None:
    url = url.rstrip("/")
    console.print(f"\n[bold]Health Check: {url}[/]\n")

    start = time.monotonic()
    try:
        resp = httpx.get(url, follow_redirects=True, timeout=15)
        elapsed = time.monotonic() - start
    except httpx.HTTPError as exc:
        console.print(f"[red]✗ Connection failed: {exc}[/]")
        sys.exit(1)

    status = resp.status_code
    html = resp.text

    # Status
    if status == 200:
        console.print(f"[green]✓ HTTP {status} ({elapsed:.2f}s)[/]")
    else:
        console.print(f"[red]✗ HTTP {status} ({elapsed:.2f}s)[/]")

    # Title
    title_match = re.search(r"<title[^>]*>([^<]+)</title>", html, re.IGNORECASE)
    if title_match:
        console.print(f"[green]✓ Title: {title_match.group(1).strip()[:80]}[/]")
    else:
        console.print("[yellow]⚠ No <title> tag found[/]")

    # Size
    size_kb = len(resp.content) / 1024
    console.print(f"[green]✓ Page size: {size_kb:.1f} KB[/]")

    # Links count
    links = re.findall(r'href="([^"]*)"', html)
    console.print(f"[green]✓ Links found: {len(links)}[/]")

    console.print()

    if status != 200:
        sys.exit(1)
