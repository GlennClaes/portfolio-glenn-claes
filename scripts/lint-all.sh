#!/usr/bin/env sh
# Run all linters across the project (frontend + python if available).
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

echo "==> Frontend: lint"
cd "$ROOT/frontend"
npm run lint

echo ""
echo "==> Frontend: typecheck"
npm run typecheck

echo ""
echo "==> Python: ruff (if available)"
if command -v ruff >/dev/null 2>&1; then
  cd "$ROOT/python"
  ruff check src/
else
  echo "   ruff not installed — skipping. Install with: pip install ruff"
fi

echo ""
echo "✅  All linters passed."
