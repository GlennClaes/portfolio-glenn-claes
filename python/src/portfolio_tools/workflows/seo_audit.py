"""Audit basic SEO tags on a live or local URL.

Checks for: title, meta description, canonical, Open Graph tags,
structured data (JSON-LD), and robots/sitemap presence.

Usage:
    python -m portfolio_tools.workflows.seo_audit https://portfolio-glenn-claes.vercel.app
"""

from __future__ import annotations

import re
import sys

import httpx
from rich.console import Console

console = Console()

_REQUIRED_OG = ["og:title", "og:description", "og:image", "og:url"]


def run(url: str) -> None:
    url = url.rstrip("/")
    console.print(f"\n[bold]SEO Audit: {url}[/]\n")

    try:
        resp = httpx.get(url, follow_redirects=True, timeout=15)
        resp.raise_for_status()
    except httpx.HTTPError as exc:
        console.print(f"[red]Failed to fetch URL: {exc}[/]")
        sys.exit(1)

    html = resp.text
    errors: list[str] = []
    warnings: list[str] = []

    # Title
    title_match = re.search(r"<title[^>]*>([^<]+)</title>", html, re.IGNORECASE)
    if title_match:
        title = title_match.group(1).strip()
        console.print(f"[green]✓ Title: {title[:80]}[/]")
        if len(title) > 60:
            warnings.append(f"Title is {len(title)} chars (recommended ≤60)")
    else:
        errors.append("Missing <title> tag")

    # Meta description
    desc_match = re.search(
        r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE
    )
    if desc_match:
        desc = desc_match.group(1).strip()
        console.print(f"[green]✓ Description: {desc[:80]}[/]")
        if len(desc) > 160:
            warnings.append(f"Description is {len(desc)} chars (recommended ≤160)")
    else:
        errors.append("Missing meta description")

    # Canonical
    canonical = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', html)
    if canonical:
        console.print(f"[green]✓ Canonical: {canonical.group(1)}[/]")
    else:
        warnings.append("No canonical link tag found")

    # Open Graph
    for tag in _REQUIRED_OG:
        pattern = rf'<meta\s+property=["\']({re.escape(tag)})["\']\s+content=["\']([^"\']+)["\']'
        og_match = re.search(pattern, html, re.IGNORECASE)
        if og_match:
            val = og_match.group(2).strip()
            console.print(f"[green]✓ {tag}: {val[:60]}[/]")
        else:
            errors.append(f"Missing {tag}")

    # JSON-LD structured data
    ld_matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>', html)
    if ld_matches:
        console.print(f"[green]✓ Structured data: {len(ld_matches)} JSON-LD block(s)[/]")
    else:
        warnings.append("No JSON-LD structured data found")

    # Sitemap reference
    if "sitemap" in html.lower():
        console.print("[green]✓ Sitemap reference found in HTML[/]")
    else:
        warnings.append("No sitemap reference in HTML (check /sitemap.xml)")

    # Summary
    console.print()
    if warnings:
        for w in warnings:
            console.print(f"[yellow]⚠ {w}[/]")
    if errors:
        for e in errors:
            console.print(f"[red]✗ {e}[/]")
        console.print(f"\n[red]{len(errors)} error(s), {len(warnings)} warning(s)[/]")
        sys.exit(1)
    else:
        console.print(f"[bold green]No errors. {len(warnings)} warning(s).[/]")
