#!/usr/bin/env bash
# Tut9 — 위성 Next 앱 빌드 + PM2
set -euo pipefail

build_one() {
  local dir="$1" name="$2" port="$3"
  echo "===== BUILD ${name} :${port} ====="
  cd "$dir"
  npm install
  npm run build
  pm2 delete "$name" 2>/dev/null || true
  pm2 start npm --name "$name" --cwd "$dir" -- start -- -H 127.0.0.1 -p "$port"
}

build_one /var/www/norangbubi.com norangbubi 3002
build_one /var/www/noranghiop.com noranghiop 3003
build_one /var/www/norangbudal.com norangbudal 3004
build_one /var/www/norangdalcom.com norangdalcom 3005
build_one /var/www/norangfuncho.com norangfuncho 3006
build_one /var/www/yuheungpick.com yuheungpick 3007
build_one /var/www/bubi.yuheungpick.com bubi-yuheung 3008
build_one /var/www/budal.yuheungpick.com budal-yuheung 3009
build_one /var/www/funcho.yuheungpick.com funcho-yuheung 3010

pm2 save
pm2 list
echo SAT_BUILD_OK
