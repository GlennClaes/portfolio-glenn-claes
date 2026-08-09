"""CLI entry point for portfolio-tools."""

from __future__ import annotations

import argparse
import sys


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="portfolio-tools",
        description="CLI tools and automation workflows for the Glenn Claes portfolio.",
    )
    sub = parser.add_subparsers(dest="command")

    # changelog
    changelog = sub.add_parser("changelog", help="Generate a changelog from git log")
    changelog.add_argument("from_ref", help="Starting tag or commit (e.g. v1.0.0)")
    changelog.add_argument("to_ref", help="Ending tag or commit (default: HEAD)")
    changelog.set_defaults(func=_run_changelog)

    # validate
    validate = sub.add_parser("validate", help="Validate project data structure")
    validate.add_argument(
        "--data-file",
        default="../frontend/src/data/projects.ts",
        help="Path to projects.ts (relative to python/ or absolute)",
    )
    validate.set_defaults(func=_run_validate)

    # seo-audit
    seo = sub.add_parser("seo-audit", help="Check SEO tags on a URL")
    seo.add_argument("url", help="URL to audit")
    seo.set_defaults(func=_run_seo_audit)

    return parser


def _run_changelog(args: argparse.Namespace) -> None:
    from portfolio_tools.workflows.generate_changelog import run

    run(args.from_ref, args.to_ref)


def _run_validate(args: argparse.Namespace) -> None:
    from portfolio_tools.workflows.validate_project_data import run

    run(args.data_file)


def _run_seo_audit(args: argparse.Namespace) -> None:
    from portfolio_tools.workflows.seo_audit import run

    run(args.url)


def main() -> None:
    parser = _build_parser()
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    args.func(args)
