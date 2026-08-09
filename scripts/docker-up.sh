#!/usr/bin/env sh
# Start docker-compose services.
# Usage: scripts/docker-up.sh [service]
# Without arguments, starts the web service. Pass 'tools' to start the Python tools.
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"

SERVICE="${1:-web}"

case "$SERVICE" in
  web)
    echo "==> Starting web on http://localhost:3000"
    docker compose up --build web
    ;;
  tools)
    echo "==> Starting python tools shell"
    docker compose --profile tools run --rm python --help
    ;;
  static)
    echo "==> Starting static preview on http://localhost:8080"
    docker compose --profile static up --build static
    ;;
  *)
    echo "Usage: $0 [web|tools|static]"
    exit 1
    ;;
esac
