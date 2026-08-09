#!/usr/bin/env sh
# Poll origin/main and pull when new commits are detected.
# Usage: scripts/watch-deploy.sh [interval_seconds]
# Default interval: 60 seconds. Run in background: scripts/watch-deploy.sh &
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
INTERVAL="${1:-60}"

echo "👁️  Watching origin/main for changes (poll every ${INTERVAL}s)"
echo "   Press Ctrl+C to stop."
echo ""

while true; do
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

  # Fetch quietly
  git -C "$ROOT" fetch origin --quiet 2>/dev/null || {
    echo "[$TIMESTAMP] ⚠️  Fetch failed (network issue?). Retrying in ${INTERVAL}s..."
    sleep "$INTERVAL"
    continue
  }

  LOCAL=$(git -C "$ROOT" rev-parse main 2>/dev/null)
  REMOTE=$(git -C "$ROOT" rev-parse origin/main 2>/dev/null)

  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "[$TIMESTAMP] 🔄 New commits on origin/main — pulling..."
    git -C "$ROOT" pull --rebase --quiet 2>/dev/null && {
      echo "[$TIMESTAMP] ✅ Pulled and rebased."
    } || {
      echo "[$TIMESTAMP] ⚠️  Pull failed — resolve conflicts manually."
    }
  fi

  sleep "$INTERVAL"
done
