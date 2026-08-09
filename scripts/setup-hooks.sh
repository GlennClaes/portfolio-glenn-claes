#!/usr/bin/env sh
# Enable git hooks by pointing core.hooksPath to .githooks/.
# Run once after cloning: scripts/setup-hooks.sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"

git -C "$ROOT" config core.hooksPath .githooks

echo "✅ Git hooks enabled."
echo "   Hooks directory: .githooks/"
echo "   post-merge      — auto-installs deps after git pull"
echo "   pre-push        — lint + typecheck before push"
echo "   post-checkout   — auto-installs deps after branch switch"
