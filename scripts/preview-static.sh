#!/usr/bin/env sh
# Builds the GitHub Pages static export and serves it locally for preview.
# Works from any directory and in Git Bash on Windows.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT/frontend"

echo "==> Building static export"
npm run build:pages

echo "==> Serving static export on http://localhost:3000 (Ctrl+C to stop)"
npm run start:static
