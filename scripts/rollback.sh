#!/usr/bin/env sh
# Roll back to a previous release tag.
# Usage: scripts/rollback.sh [vX.Y.Z]
# Without an argument, lists available tags and lets you pick.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

TAG="$1"

if [ -z "$TAG" ]; then
  echo "Available version tags:"
  echo ""
  git -C "$ROOT" tag -l 'v*' --sort=-v:refname | head -20
  echo ""
  echo "Usage: $0 <tag>   e.g.  $0 v1.0.0"
  exit 0
fi

# Validate tag exists
if ! git -C "$ROOT" rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Error: tag '$TAG' not found."
  echo "Available tags:"
  git -C "$ROOT" tag -l 'v*' --sort=-v:refname
  exit 1
fi

BRANCH="rollback/${TAG}"
echo "Creating branch '$BRANCH' from tag '$TAG'..."
git -C "$ROOT" checkout -b "$BRANCH" "$TAG"

echo ""
echo "✅  Now on branch '$BRANCH' at tag '$TAG'."
echo ""
echo "To build and preview locally:"
echo "  cd frontend && npm ci && npm run build && npm run start:static"
echo ""
echo "To deploy this rollback to Vercel:"
echo "  git push origin '$BRANCH'"
echo ""
echo "⚠️  This is a local operation. Nothing has been pushed."
