#!/usr/bin/env sh
# Run security audits across the project (npm + pip).
# Usage: scripts/dep-audit.sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

echo "════════════════════════════════════════"
echo "  Dependency & Security Audit"
echo "════════════════════════════════════════"
echo ""

# --- npm audit ---
echo "── npm audit (frontend) ──"
cd "$ROOT/frontend"
if npm audit --audit-level=high 2>/dev/null; then
  echo "✅ No high/critical npm vulnerabilities."
else
  echo "⚠️  npm audit found issues (see above)."
fi
echo ""

# --- pip audit (if available) ──
echo "── pip audit (python) ──"
if command -v pip >/dev/null 2>&1 && [ -d "$ROOT/python" ]; then
  cd "$ROOT/python"
  if pip install -q pip-audit 2>/dev/null && pip-audit 2>/dev/null; then
    echo "✅ No known pip vulnerabilities."
  else
    echo "⚠️  pip-audit not available or found issues. Install with: pip install pip-audit"
  fi
else
  echo "   pip not found — skipping."
fi
echo ""

# --- Outdated check ---
echo "── npm outdated (frontend) ──"
cd "$ROOT/frontend"
npm outdated 2>/dev/null || true
echo ""

echo "════════════════════════════════════════"
echo "  Audit complete."
echo "════════════════════════════════════════"
