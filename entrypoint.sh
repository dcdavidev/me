#!/bin/bash
set -e

if [ -z "$INFISICAL_CLIENT_ID" ] || [ -z "$INFISICAL_CLIENT_SECRET" ]; then
  echo "⚠️  Infisical credentials not found. Starting application directly..."
  exec "$@"
fi

echo "🔐 Authenticating with Infisical..."
INFISICAL_TOKEN=$(infisical login \
  --method=universal-auth \
  --client-id="$INFISICAL_CLIENT_ID" \
  --client-secret="$INFISICAL_CLIENT_SECRET" \
  --domain="https://eu.infisical.com" \
  --silent --plain)
export INFISICAL_TOKEN

if [ -z "$INFISICAL_TOKEN" ]; then
  echo "❌ Infisical login failed."
  exit 1
fi

echo "🚀 Starting application via Infisical..."
exec infisical run --domain="https://eu.infisical.com" --projectId "$INFISICAL_PROJECT_ID" --env=prod --path=/apps/me -- "$@"
