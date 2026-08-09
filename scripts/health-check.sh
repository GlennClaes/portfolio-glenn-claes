#!/usr/bin/env sh
# Check if the site is live on one or more deployment targets.
# Usage: scripts/health-check.sh [url ...]
# Defaults to Vercel + GitHub Pages URLs if none given.
set -eu

VERCEL_URL="https://portfolio-glenn-claes.vercel.app"
PAGES_URL="https://glennclaes.github.io/portfolio-glenn-claes"

if [ $# -gt 0 ]; then
  URLS="$*"
else
  URLS="$VERCEL_URL $PAGES_URL"
fi

PASS=0
FAIL=0

for url in $URLS; do
  printf "→ %s ... " "$url"

  HTTP_CODE=$(curl -s -L -o /dev/null -w "%{http_code}" --max-time 15 "$url" 2>/dev/null || echo "000")
  TITLE=$(curl -s -L --max-time 15 "$url" 2>/dev/null | grep -oi '<title[^>]*>[^<]*</title>' | head -1 | sed 's/<[^>]*>//g' || true)

  if [ "$HTTP_CODE" = "200" ]; then
    if [ -n "$TITLE" ]; then
      echo "✅ $HTTP_CODE — title: $TITLE"
    else
      echo "⚠️  $HTTP_CODE — no <title> found"
    fi
    PASS=$((PASS + 1))
  else
    echo "❌ $HTTP_CODE"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "Results: $PASS passed, $FAIL failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
