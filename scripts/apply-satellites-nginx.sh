#!/usr/bin/env bash
# Tut9 — 위성 사이트 nginx Host 분기
# 실행: bash /root/apply-satellites-nginx.sh
set -euo pipefail

cat > /etc/nginx/conf.d/satellites-upstreams.conf <<'EOF'
upstream norangbubi_app { server 127.0.0.1:3002; keepalive 8; }
upstream noranghiop_app { server 127.0.0.1:3003; keepalive 8; }
upstream norangbudal_app { server 127.0.0.1:3004; keepalive 8; }
upstream norangdalcom_app { server 127.0.0.1:3005; keepalive 8; }
upstream norangfuncho_app { server 127.0.0.1:3006; keepalive 8; }
upstream yuheungpick_app { server 127.0.0.1:3007; keepalive 8; }
upstream bubi_yuheung_app { server 127.0.0.1:3008; keepalive 8; }
upstream budal_yuheung_app { server 127.0.0.1:3009; keepalive 8; }
upstream funcho_yuheung_app { server 127.0.0.1:3010; keepalive 8; }

limit_req_zone $binary_remote_addr zone=sat_site:10m rate=20r/s;
limit_conn_zone $binary_remote_addr zone=sat_conn:10m;
EOF

write_site() {
  local file="$1" names="$2" upstream="$3"
  cat > "/etc/nginx/sites-available/${file}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${names};

    client_max_body_size 4m;

    location = /_next/image {
        return 404;
    }

    location / {
        limit_req zone=sat_site burst=40 nodelay;
        limit_conn sat_conn 30;
        proxy_pass http://${upstream};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 10s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF
  ln -sf "/etc/nginx/sites-available/${file}" "/etc/nginx/sites-enabled/${file}"
}

write_site norangbubi.com "norangbubi.com www.norangbubi.com" norangbubi_app
write_site noranghiop.com "noranghiop.com www.noranghiop.com" noranghiop_app
write_site norangbudal.com "norangbudal.com www.norangbudal.com" norangbudal_app
write_site norangdalcom.com "norangdalcom.com www.norangdalcom.com" norangdalcom_app
write_site norangfuncho.com "norangfuncho.com www.norangfuncho.com" norangfuncho_app
write_site yuheungpick.com "yuheungpick.com www.yuheungpick.com" yuheungpick_app
write_site bubi.yuheungpick.com "bubi.yuheungpick.com" bubi_yuheung_app
write_site budal.yuheungpick.com "budal.yuheungpick.com" budal_yuheung_app
write_site funcho.yuheungpick.com "funcho.yuheungpick.com" funcho_yuheung_app

rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
echo SAT_NGINX_OK
