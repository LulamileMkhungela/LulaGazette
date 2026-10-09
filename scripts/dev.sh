#!/usr/bin/env bash
# Start LulaGazette on a free port (prefers 3000).
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"
is_free() {
  ! ss -tln 2>/dev/null | grep -qE ":${1}\\s" \
    && ! (command -v lsof >/dev/null && lsof -iTCP:"$1" -sTCP:LISTEN >/dev/null 2>&1)
}

if ! is_free "$PORT"; then
  echo "Port $PORT is in use — trying the next free port..."
  for try in 3000 3001 3002 3003 3004 3005 3010 3030 4000 5173; do
    if is_free "$try"; then
      PORT="$try"
      break
    fi
  done
fi

if ! is_free "$PORT"; then
  echo "Could not find a free port. Free port 3000 with:"
  echo "  kill \$(ss -tlnp | sed -n 's/.*:3000.*pid=\\([0-9]*\\).*/\\1/p')"
  exit 1
fi

echo "Starting LulaGazette on http://localhost:${PORT}"
export PORT
# Prefer the project-local Next binary (avoid npx fetching a different major version)
if [[ -x "./node_modules/.bin/next" ]]; then
  exec ./node_modules/.bin/next dev -H 0.0.0.0 -p "$PORT"
fi
exec npx --no-install next dev -H 0.0.0.0 -p "$PORT"
