#!/usr/bin/env sh
# Bump the project version, commit, tag, and optionally push.
# Usage: scripts/version.sh [patch|minor|major] [--push]
# Defaults to patch if no bump type is given.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

BUMP="${1:-patch}"
PUSH=false
for arg in "$@"; do
  case "$arg" in
    --push) PUSH=true ;;
  esac
done

case "$BUMP" in
  patch|minor|major) ;;
  *)
    echo "Usage: $0 [patch|minor|major] [--push]"
    exit 1
    ;;
esac

# Ensure working tree is clean
if [ -n "$(git -C "$ROOT" status --porcelain)" ]; then
  echo "Error: working tree is dirty. Commit or stash changes first."
  exit 1
fi

# Read current version
CURRENT=$(node -p "require('./frontend/package.json').version")
echo "Current version: $CURRENT"

# Bump in frontend (canonical source of truth)
cd "$ROOT/frontend"
npm version "$BUMP" --no-git-tag-version --silent
NEW=$(node -p "require('./package.json').version")
cd "$ROOT"

# Sync root package.json
npm version "$BUMP" --no-git-tag-version --silent

echo "New version: $NEW"

# Commit both package.json files
git -C "$ROOT" add frontend/package.json package.json
git -C "$ROOT" commit -m "chore: release v${NEW}"

# Create annotated tag
git -C "$ROOT" tag -a "v${NEW}" -m "Release v${NEW}"

echo ""
echo "✅  v${NEW} tagged."
echo ""
echo "Next steps:"
echo "  git push origin main --tags"
echo "  (Vercel deploys automatically on push to main)"
echo ""

if [ "$PUSH" = true ]; then
  echo "Pushing..."
  git -C "$ROOT" push origin main --tags
  echo "✅  Pushed."
fi
