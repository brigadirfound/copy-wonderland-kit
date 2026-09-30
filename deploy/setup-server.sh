#!/usr/bin/env bash
# Первичная настройка VPS (Ubuntu 22.04/24.04) под сайт-портфолио.
#
# Запуск на сервере под root:
#   curl -fsSL https://raw.githubusercontent.com/brigadirfound/copy-wonderland-kit/main/deploy/setup-server.sh | bash
#
# Что делает:
#   - ставит веб-сервер Caddy (сам получает и продлевает HTTPS), fail2ban и файрвол;
#   - создаёт пользователя deploy, который может только загружать файлы в папку сайта;
#   - генерирует ключ для GitHub Actions и печатает его — его нужно сохранить в секрет DEPLOY_SSH_KEY.
# Повторный запуск безопасен и ключ не меняет. Новый ключ: FORCE_NEW_KEY=1 (потом обновите секрет в GitHub).

set -euo pipefail

DOMAIN="brigadirfound.ru"
SITE_DIR="/var/www/site"
DEPLOY_USER="deploy"
NEW_KEY=0

install_packages() {
  echo "==> Ставлю Caddy, rsync, fail2ban и файрвол"
  apt-get update -qq
  apt-get install -y -qq curl rsync ufw fail2ban >/dev/null
  if ! apt-get install -y -qq caddy >/dev/null 2>&1; then
    # В стандартных репозиториях Caddy нет — подключаем официальный.
    apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https gnupg >/dev/null
    curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/gpg.key" |
      gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf "https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt" >/etc/apt/sources.list.d/caddy-stable.list
    apt-get update -qq
    apt-get install -y -qq caddy >/dev/null
  fi
}

setup_firewall() {
  echo "==> Настраиваю файрвол (SSH, HTTP, HTTPS)"
  local ssh_ports
  ssh_ports="$(sshd -T 2>/dev/null | awk '/^port /{print $2}' || true)"
  for port in ${ssh_ports:-22}; do
    ufw allow "${port}/tcp" >/dev/null
  done
  ufw allow 80/tcp >/dev/null
  ufw allow 443/tcp >/dev/null
  ufw --force enable >/dev/null
  systemctl enable --now fail2ban >/dev/null 2>&1 || true
}

setup_site_dir() {
  echo "==> Создаю пользователя ${DEPLOY_USER} и папку сайта"
  if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
    useradd --create-home --shell /bin/bash "$DEPLOY_USER"
  fi
  mkdir -p "$SITE_DIR"
  if [[ ! -f "$SITE_DIR/index.html" ]]; then
    cat >"$SITE_DIR/index.html" <<'HTML'
<!doctype html>
<html lang="ru">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Скоро здесь будет сайт</title>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#09090b;color:#f4f4f5;font-family:system-ui,sans-serif">
<p>Сервер работает. Сайт появится после первой выкладки из GitHub.</p>
</body>
</html>
HTML
  fi
  chown -R "$DEPLOY_USER:$DEPLOY_USER" "$SITE_DIR"
  chmod 755 "$SITE_DIR"
}

setup_deploy_key() {
  local rrsync auth_keys="/home/$DEPLOY_USER/.ssh/authorized_keys"
  if [[ -s "$auth_keys" && "${FORCE_NEW_KEY:-0}" != "1" ]]; then
    echo "==> Ключ для GitHub Actions уже настроен — оставляю как есть"
    return
  fi

  echo "==> Генерирую ключ для GitHub Actions"
  rrsync="$(command -v rrsync || true)"
  if [[ -z "$rrsync" ]]; then
    echo "Не найден rrsync (идёт в пакете rsync 3.2.4+). Нужна Ubuntu 22.04 или новее." >&2
    exit 1
  fi

  ssh-keygen -q -t ed25519 -N "" -C "github-actions-deploy" -f "$KEY_DIR/deploy_key"
  install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"
  # Ключ может только загружать файлы в папку сайта (rrsync), без шелла и проброса портов.
  echo "command=\"$rrsync -wo $SITE_DIR\",restrict $(cat "$KEY_DIR/deploy_key.pub")" >"$auth_keys"
  chown "$DEPLOY_USER:$DEPLOY_USER" "$auth_keys"
  chmod 600 "$auth_keys"
  NEW_KEY=1
}

setup_caddy() {
  echo "==> Настраиваю Caddy для ${DOMAIN}"
  cat >/etc/caddy/Caddyfile <<CADDY
{
	# Только Let's Encrypt: запасной ZeroSSL не отвечает серверам из России
	cert_issuer acme
}

${DOMAIN} {
	root * ${SITE_DIR}
	encode zstd gzip

	header {
		X-Content-Type-Options nosniff
		Referrer-Policy strict-origin-when-cross-origin
		-Server
	}

	# Файлы с хэшем в имени кэшируем надолго, остальное всегда проверяем на свежесть
	@assets path /assets/*
	header @assets Cache-Control "public, max-age=31536000, immutable"
	@pages not path /assets/*
	header @pages Cache-Control "no-cache"

	# Все адреса вроде /cases/... отдаём через index.html (это SPA)
	try_files {path} /index.html
	file_server
}

www.${DOMAIN} {
	redir https://${DOMAIN}{uri} permanent
}
CADDY
  caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null
  systemctl enable caddy >/dev/null 2>&1
  systemctl restart caddy
}

print_summary() {
  local ip
  ip="$(curl -fsS4 --max-time 5 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
  echo
  echo "====================================================================="
  echo " Готово! Сервер настроен."
  echo
  if [[ "$NEW_KEY" == "1" ]]; then
    cat <<KEY
 Скопируйте ключ ниже ЦЕЛИКОМ, вместе со строками BEGIN и END.
 В GitHub откройте репозиторий → Settings → Secrets and variables →
 Actions → New repository secret. Имя: DEPLOY_SSH_KEY, значение — ключ.

$(cat "$KEY_DIR/deploy_key")

KEY
  else
    echo " Ключ для GitHub Actions не менялся — секрет обновлять не нужно."
    echo
  fi
  echo " Сайт: https://${DOMAIN} — HTTPS появится, как только A-записи @ и www"
  echo " в DNS будут указывать на IP ${ip}."
  echo "====================================================================="
}

main() {
  if [[ $EUID -ne 0 ]]; then
    echo "Запустите скрипт от root." >&2
    exit 1
  fi

  export DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a

  KEY_DIR="$(mktemp -d)"
  trap 'rm -rf "$KEY_DIR"' EXIT

  install_packages
  setup_firewall
  setup_site_dir
  setup_deploy_key
  setup_caddy
  print_summary
}

# Весь скрипт обёрнут в main, чтобы при запуске через «curl | bash» он выполнился только целиком.
main "$@"
