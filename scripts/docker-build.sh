#!/usr/bin/env sh
# Build all Docker images (web + python tools).
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Building web (Next.js production)"
docker compose build web

echo ""
echo "==> Building python tools"
docker compose --profile tools build python

echo ""
echo "✅  All images built."
