#!/usr/bin/env sh
# Check SSL certificate expiry for a domain.
# Usage: scripts/ssl-check.sh <domain>
# Warns if the certificate expires within 30 days.
set -eu

DOMAIN="${1:-}"

if [ -z "$DOMAIN" ]; then
  echo "Usage: $0 <domain>"
  echo "Example: $0 portfolio-glenn-claes.vercel.app"
  exit 1
fi

# Strip protocol/path
DOMAIN=$(echo "$DOMAIN" | sed 's|https\?://||' | sed 's|/.*||')

echo "→ Checking SSL for $DOMAIN"
echo ""

CERT_INFO=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN":443 2>/dev/null)

if [ -z "$CERT_INFO" ]; then
  echo "❌ Could not connect to $DOMAIN:443"
  exit 1
fi

EXPIRY=$(echo "$CERT_INFO" | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
ISSUER=$(echo "$CERT_INFO" | openssl x509 -noout -issuer 2>/dev/null | sed 's/issuer=//')

if [ -z "$EXPIRY" ]; then
  echo "❌ No certificate found for $DOMAIN"
  exit 1
fi

# Calculate days remaining
EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s 2>/dev/null || date -j -f "%b %d %T %Y %Z" "$EXPIRY" +%s 2>/dev/null || echo "0")
NOW_EPOCH=$(date +%s)
DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))

echo "Issuer:    $ISSUER"
echo "Expires:   $EXPIRY"
echo "Days left: $DAYS_LEFT"
echo ""

if [ "$DAYS_LEFT" -lt 0 ]; then
  echo "❌ Certificate has EXPIRED!"
  exit 1
elif [ "$DAYS_LEFT" -lt 30 ]; then
  echo "⚠️  Certificate expires in $DAYS_LEFT days — renew soon."
  exit 1
else
  echo "✅ Certificate is valid for $DAYS_LEFT more days."
fi
