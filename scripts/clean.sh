#!/usr/bin/env sh
# Remove build artifacts, caches, and generated files.
# Usage: scripts/clean.sh [--deep]
# --deep also removes node_modules and .venv (requires full reinstall).
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

DEEP=false
for arg in "$@"; do
  case "$arg" in
    --deep) DEEP=true ;;
  esac
done

echo "════════════════════════════════════════"
echo "  Portfolio — Clean"
echo "════════════════════════════════════════"
echo ""

# --- Frontend build artifacts ---
echo "── Removing frontend build artifacts ──"
rm -rf "$ROOT/frontend/.next"
rm -rf "$ROOT/frontend/out"
rm -rf "$ROOT/frontend/dist"
rm -rf "$ROOT/frontend/coverage"
rm -rf "$ROOT/frontend/test-results"
rm -rf "$ROOT/frontend/playwright-report"
rm -f  "$ROOT/frontend/*.tsbuildinfo"
rm -f  "$ROOT/frontend/.eslintcache"
echo "✅ Frontend build artifacts removed."

if [ "$DEEP" = true ]; then
  echo ""
  echo "── Removing frontend node_modules ──"
  rm -rf "$ROOT/frontend/node_modules"
  echo "✅ node_modules removed. Run: cd frontend && npm ci"
fi

# --- Python ---
echo ""
echo "── Removing Python caches ──"
find "$ROOT/python" -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find "$ROOT/python" -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
find "$ROOT/python" -type d -name ".ruff_cache" -exec rm -rf {} + 2>/dev/null || true
rm -rf "$ROOT/python/dist"
rm -rf "$ROOT/python/build"
find "$ROOT/python" -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true
echo "✅ Python caches removed."

if [ "$DEEP" = true ]; then
  echo ""
  echo "── Removing Python venv ──"
  rm -rf "$ROOT/python/.venv"
  echo "✅ .venv removed. Run: cd python && python -m venv .venv && source .venv/bin/activate && pip install -e '.[dev]'"
fi

# --- Root ---
echo ""
echo "── Removing root artifacts ──"
rm -rf "$ROOT/.next"
rm -rf "$ROOT/dist"
echo "✅ Root artifacts removed."

echo ""
echo "════════════════════════════════════════"
echo "  Clean complete."
echo "════════════════════════════════════════"
