#!/usr/bin/env sh
# Crawl a page and check all links for broken URLs.
# Usage: scripts/link-check.sh <url>
set -eu

URL="${1:-}"

if [ -z "$URL" ]; then
  echo "Usage: $0 <url>"
  echo "Example: $0 https://portfolio-glenn-claes.vercel.app"
  exit 1
fi

echo "→ Checking links on $URL"
echo ""

# Fetch the page and extract href values
HTML=$(curl -s --max-time 15 "$URL" 2>/dev/null)

if [ -z "$HTML" ]; then
  echo "❌ Could not fetch $URL"
  exit 1
fi

# Extract unique href values (strip protocol-relative and anchor-only)
LINKS=$(echo "$HTML" \
  | grep -oP 'href="[^"]*"' \
  | sed 's/href="//;s/"$//' \
  | grep -v '^#' \
  | grep -v '^javascript:' \
  | grep -v '^mailto:' \
  | sort -u)

TOTAL=0
OK=0
BROKEN=0
REDIRECT=0

for link in $LINKS; do
  TOTAL=$((TOTAL + 1))

  # Resolve relative URLs
  case "$link" in
    http*) FULL_URL="$link" ;;
    //*) FULL_URL="https:$link" ;;
    /*) FULL_URL="${URL%/}${link}" ;;
    *) FULL_URL="${URL%/}/${link}" ;;
  esac

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -L "$FULL_URL" 2>/dev/null || echo "000")

  case "$HTTP_CODE" in
    200) OK=$((OK + 1)) ;;
    3[0-9][0-9]) echo "↩️  $HTTP_CODE $FULL_URL"; REDIRECT=$((REDIRECT + 1)) ;;
    000) echo "❌ TIMEOUT $FULL_URL"; BROKEN=$((BROKEN + 1)) ;;
    *) echo "❌ $HTTP_CODE $FULL_URL"; BROKEN=$((BROKEN + 1)) ;;
  esac
done

echo ""
echo "Checked $TOTAL links: $OK ok, $REDIRECT redirects, $BROKEN broken"

if [ "$BROKEN" -gt 0 ]; then
  exit 1
fi
