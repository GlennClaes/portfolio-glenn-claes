#!/usr/bin/env sh
# Send a push notification via ntfy.sh to your phone.
# Usage: scripts/notify.sh <title> <message>
#
# Setup:
#   1. Install the ntfy app on your phone (iOS/Android).
#   2. Subscribe to a topic (default: "portfolio-alerts").
#   3. Set NTFY_TOPIC env var if you use a different topic.
#
# Works from anywhere — Git Bash, terminal, or CI.
set -eu

TOPIC="${NTFY_TOPIC:-portfolio-alerts}"
TITLE="${1:-}"
MESSAGE="${2:-}"

if [ -z "$TITLE" ] || [ -z "$MESSAGE" ]; then
  echo "Usage: $0 <title> <message>"
  echo ""
  echo "Examples:"
  echo "  $0 'Portfolio' 'Site is back online!'"
  echo "  $0 'Deploy' 'New version deployed to Vercel'"
  echo ""
  echo "Setup:"
  echo "  1. Install ntfy app on your phone"
  echo "  2. Subscribe to topic: $TOPIC"
  echo "  3. Optionally set: export NTFY_TOPIC=your-topic"
  exit 1
fi

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  -H "Title: $TITLE" \
  -d "$MESSAGE" \
  "https://ntfy.sh/$TOPIC" 2>/dev/null)

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Notification sent to $TOPIC"
else
  echo "❌ Failed to send (HTTP $HTTP_CODE)"
  exit 1
fi
