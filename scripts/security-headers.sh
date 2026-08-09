#!/usr/bin/env sh
# Verify security headers are applied on a URL.
# Usage: scripts/security-headers.sh <url>
set -eu

URL="${1:-}"

if [ -z "$URL" ]; then
  echo "Usage: $0 <url>"
  echo "Example: $0 https://portfolio-glenn-claes.vercel.app"
  exit 1
fi

echo "→ Checking security headers on $URL"
echo ""

HEADERS=$(curl -s -I --max-time 15 "$URL" 2>/dev/null)

PASS=0
FAIL=0
WARN=0

# Third arg: "required" (missing = fail) or "recommended" (missing = warn only).
check_header() {
  NAME="$1"
  EXPECTED="$2"
  MODE="${3:-required}"
  VALUE=$(echo "$HEADERS" | grep -i "^${NAME}:" | head -1 | sed "s/^[^:]*: *//" | tr -d '\r')

  if [ -n "$VALUE" ]; then
    if [ -z "$EXPECTED" ] || echo "$VALUE" | grep -qi "$EXPECTED"; then
      echo "✅ $NAME: $VALUE"
      PASS=$((PASS + 1))
    else
      echo "⚠️  $NAME: $VALUE (expected to contain '$EXPECTED')"
      WARN=$((WARN + 1))
    fi
  elif [ "$MODE" = "recommended" ]; then
    echo "ℹ️  $NAME: not set (recommended)"
    WARN=$((WARN + 1))
  else
    echo "❌ $NAME: missing"
    FAIL=$((FAIL + 1))
  fi
}

check_header "X-Content-Type-Options" "nosniff"
check_header "X-Frame-Options" "DENY"
check_header "Referrer-Policy" ""
check_header "Permissions-Policy" ""
# CSP is recommended but intentionally NOT set: a strict policy would break the
# Next.js inline scripts and the WebGL hero. It's reported as a warning, not a failure.
check_header "Content-Security-Policy" "" "recommended"

echo ""
echo "Results: $PASS passed, $FAIL failed, $WARN warnings"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
