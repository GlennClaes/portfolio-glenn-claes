#!/usr/bin/env sh
# Starts the Next.js dev server with hot reload.
# Works from any directory and in Git Bash on Windows.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo "==> Starting dev server on http://localhost:3000 (Ctrl+C to stop)"
npm run dev
