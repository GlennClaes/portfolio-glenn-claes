#!/usr/bin/env sh
# Runs the full local quality gate (lint, typecheck, unit tests, build).
# Works from any directory and in Git Bash on Windows.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo "==> Lint"
npm run lint

echo "==> Typecheck"
npm run typecheck

echo "==> Unit and component tests"
npm run test:unit

echo "==> Build (Vercel production path)"
npm run build

echo ""
echo "All quality gates passed."
