#!/usr/bin/env bash
# Mac에서 실행 — signalurl.com을 VPS에 배포
#
#   VPS_HOST=x.x.x.x bash scripts/deploy-to-vps.sh
#   VPS_HOST=x.x.x.x VPS_SSH_PORT=2299 bash scripts/deploy-to-vps.sh
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -z "${VPS_HOST:-}" ]]; then
  echo "VPS_HOST=서버IP bash scripts/deploy-to-vps.sh"
  exit 1
fi

VPS_SSH_PORT="${VPS_SSH_PORT:-22}"
VPS_USER="${VPS_USER:-root}"
REMOTE_APP="${REMOTE_APP:-/var/www/signalurl.com}"
APP_PORT="${APP_PORT:-3000}"
SSH=(ssh -p "${VPS_SSH_PORT}" "${VPS_USER}@${VPS_HOST}")

echo "=== 대상: ${VPS_USER}@${VPS_HOST}:${VPS_SSH_PORT} → ${REMOTE_APP} :${APP_PORT} ==="
"${SSH[@]}" "echo ssh_ok; mkdir -p ${REMOTE_APP}"

echo "=== rsync ==="
rsync -az --delete \
  --exclude node_modules \
  --exclude .next \
  --exclude .git \
  --exclude .vercel \
  --exclude '.env*' \
  --exclude .DS_Store \
  -e "ssh -p ${VPS_SSH_PORT}" \
  ./ "${VPS_USER}@${VPS_HOST}:${REMOTE_APP}/"

echo "=== build + PM2 ==="
"${SSH[@]}" bash -s <<EOF
set -euo pipefail
cd ${REMOTE_APP}
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
if ! command -v pm2 >/dev/null 2>&1; then
  npm i -g pm2
fi
npm ci
npm run build
pm2 delete signalurl 2>/dev/null || true
pm2 start npm --name signalurl -- start -- -H 127.0.0.1 -p ${APP_PORT}
pm2 save
pm2 list
EOF

echo "✅ signalurl 배포 끝. nginx: ssh 후 bash ${REMOTE_APP}/scripts/vps-nginx-setup.sh"
echo "   SSL: certbot --nginx -d signalurl.com -d www.signalurl.com"
