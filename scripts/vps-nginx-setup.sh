#!/usr/bin/env bash
# VPS(root)에서 실행 — signalurl.com + image.signalurl.com nginx 분기
#
#   bash /var/www/signalurl.com/scripts/vps-nginx-setup.sh
#
# GIF는 Next를 거치지 않음. /_next/image 는 404.
set -euo pipefail

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "root로 실행하세요"
  exit 1
fi

SIGNAL_ROOT="${SIGNAL_ROOT:-/var/www/signalurl.com}"
IMAGE_ROOT="${IMAGE_ROOT:-/var/www/image.signalurl.com}"
UPSTREAM="/etc/nginx/conf.d/signalurl-upstreams.conf"

mkdir -p /etc/nginx/conf.d /etc/nginx/sites-available /etc/nginx/sites-enabled

echo "=== 1) upstream ==="
cp "${SIGNAL_ROOT}/scripts/nginx/signalurl-upstreams.conf.example" "${UPSTREAM}"

echo "=== 2) signalurl.com ==="
cp "${SIGNAL_ROOT}/scripts/nginx/signalurl.com.conf.example" /etc/nginx/sites-available/signalurl.com
ln -sf /etc/nginx/sites-available/signalurl.com /etc/nginx/sites-enabled/signalurl.com

if [[ -f "${IMAGE_ROOT}/scripts/nginx/image.signalurl.com.conf.example" ]]; then
  echo "=== 3) image.signalurl.com ==="
  cp "${IMAGE_ROOT}/scripts/nginx/image.signalurl.com.conf.example" /etc/nginx/sites-available/image.signalurl.com
  ln -sf /etc/nginx/sites-available/image.signalurl.com /etc/nginx/sites-enabled/image.signalurl.com
else
  echo "⚠ image nginx example 없음: ${IMAGE_ROOT}/scripts/nginx/image.signalurl.com.conf.example"
fi

rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl reload nginx

cat <<EOF

OK: nginx 적용됨 (HTTP)

다음:
  1) DNS A → 이 VPS IP
     signalurl.com / www.signalurl.com / image.signalurl.com
     (image는 Vercel CNAME 제거 후 A로)

  2) PM2
     cd ${SIGNAL_ROOT} && npm ci && npm run build
     pm2 start npm --name signalurl -- start -- -H 127.0.0.1 -p 3000

     cd ${IMAGE_ROOT} && npm ci && npm run build
     pm2 start npm --name image-signalurl -- start -- -H 127.0.0.1 -p 3001
     pm2 save && pm2 startup

  3) SSL (DNS 전파 후)
     certbot --nginx -d signalurl.com -d www.signalurl.com
     certbot --nginx -d image.signalurl.com
EOF
