#!/usr/bin/env sh
# One-command fresh setup after cloning the repo.
# Usage: scripts/setup.sh [--python]
# Pass --python to also set up the Python environment.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

SETUP_PYTHON=false
for arg in "$@"; do
  case "$arg" in
    --python) SETUP_PYTHON=true ;;
  esac
done

echo "════════════════════════════════════════"
echo "  Portfolio — Fresh Setup"
echo "════════════════════════════════════════"
echo ""

# --- Check prerequisites ---
echo "── Checking prerequisites ──"

if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js not found. Install Node 22+: https://nodejs.org"
  exit 1
fi

NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VER" -lt 22 ]; then
  echo "⚠️  Node $NODE_VER detected — Node 22+ recommended."
else
  echo "✅ Node $(node -v)"
fi

if [ "$SETUP_PYTHON" = true ]; then
  if ! command -v python3 >/dev/null 2>&1; then
    echo "⚠️  Python3 not found — skipping Python setup."
    SETUP_PYTHON=false
  else
    echo "✅ Python $(python3 --version | cut -d' ' -f2)"
  fi
fi

echo ""

# --- Frontend ---
echo "── Installing frontend dependencies ──"
cd "$ROOT/frontend"
npm ci
echo "✅ Frontend ready."
echo ""

# --- Python (optional) ---
if [ "$SETUP_PYTHON" = true ]; then
  echo "── Setting up Python environment ──"
  cd "$ROOT/python"
  python3 -m venv .venv
  # shellcheck source=/dev/null
  . .venv/bin/activate
  pip install -e ".[dev]"
  echo "✅ Python ready (activated in python/.venv)."
  echo ""
fi

# --- Git hooks ---
echo "── Enabling git hooks ──"
"$ROOT/scripts/setup-hooks.sh"
echo ""

echo "════════════════════════════════════════"
echo "  Setup complete!"
echo ""
echo "  Next steps:"
echo "    cd frontend && npm run dev"
if [ "$SETUP_PYTHON" = true ]; then
  echo "    cd python && source .venv/bin/activate"
fi
echo "════════════════════════════════════════"
