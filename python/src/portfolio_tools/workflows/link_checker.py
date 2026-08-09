"""Crawl a page and check all links for broken URLs."""

from __future__ import annotations

import re
import sys
from urllib.parse import urljoin

import httpx
from rich.console import Console

console = Console()


def run(url: str) -> None:
    url = url.rstrip("/")
    console.print(f"\n[bold]Link Checker: {url}[/]\n")

    try:
        resp = httpx.get(url, follow_redirects=True, timeout=15)
        resp.raise_for_status()
    except httpx.HTTPError as exc:
        console.print(f"[red]Failed to fetch {url}: {exc}[/]")
        sys.exit(1)

    html = resp.text

    # Extract unique href values
    raw_links = re.findall(r'href="([^"]*)"', html)
    seen: set[str] = set()
    links: list[str] = []
    for link in raw_links:
        if link.startswith("#") or link.startswith("javascript:") or link.startswith("mailto:"):
            continue
        full = urljoin(url, link)
        if full not in seen:
            seen.add(full)
            links.append(full)

    total = len(links)
    ok = 0
    broken = 0
    redirects = 0

    for link in links:
        try:
            r = httpx.head(link, follow_redirects=False, timeout=10)
            code = r.status_code
        except httpx.HTTPError:
            console.print(f"[red]✗ TIMEOUT {link}[/]")
            broken += 1
            continue

        if code == 200:
            ok += 1
        elif 300 <= code < 400:
            location = r.headers.get("location", "")
            console.print(f"[yellow]↩ {code} {link} → {location}[/]")
            redirects += 1
        else:
            console.print(f"[red]✗ {code} {link}[/]")
            broken += 1

    console.print()
    console.print(
        f"Checked [bold]{total}[/] links: "
        f"[green]{ok} ok[/], "
        f"[yellow]{redirects} redirects[/], "
        f"[red]{broken} broken[/]"
    )

    if broken > 0:
        sys.exit(1)
