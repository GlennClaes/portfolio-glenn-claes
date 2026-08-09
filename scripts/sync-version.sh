#!/usr/bin/env sh
# Sync versions between root and frontend package.json.
# Usage: scripts/sync-version.sh [--set <version>]
# Without --set, detects mismatches and prompts interactively.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

SET_VERSION=""
for i in $(seq 1 $#); do
  eval "arg=\${$i}"
  case "$arg" in
    --set)
      NEXT_I=$((i + 1))
      eval "SET_VERSION=\${$NEXT_I}"
      ;;
  esac
done

ROOT_VER=$(node -p "require('./package.json').version")
FE_VER=$(node -p "require('./frontend/package.json').version")

if [ -n "$SET_VERSION" ]; then
  echo "Setting both to $SET_VERSION"
  cd "$ROOT/frontend"
  npm version "$SET_VERSION" --no-git-tag-version --silent
  cd "$ROOT"
  npm version "$SET_VERSION" --no-git-tag-version --silent
  echo "✅  Root: $SET_VERSION  |  Frontend: $SET_VERSION"
  exit 0
fi

if [ "$ROOT_VER" = "$FE_VER" ]; then
  echo "✅  Versions match: $ROOT_VER"
  exit 0
fi

echo "⚠️  Version mismatch!"
echo "  Root:      $ROOT_VER"
echo "  Frontend:  $FE_VER"
echo ""
echo "Which version should win?"
echo "  1) Frontend ($FE_VER)  — copy to root"
echo "  2) Root ($ROOT_VER)    — copy to frontend"
echo "  3) Cancel"
echo ""
printf "Choice [1/2/3]: "
read -r choice

case "$choice" in
  1)
    cd "$ROOT"
    npm version "$FE_VER" --no-git-tag-version --silent
    echo "✅  Root updated to $FE_VER"
    ;;
  2)
    cd "$ROOT/frontend"
    npm version "$ROOT_VER" --no-git-tag-version --silent
    echo "✅  Frontend updated to $ROOT_VER"
    ;;
  *)
    echo "Cancelled."
    exit 0
    ;;
esac
