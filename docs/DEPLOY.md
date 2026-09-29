# Как выложить сайт на свой сервер

Сайт полностью статичный: после сборки это просто папка `dist/` с HTML, JS, CSS и картинками. Базы данных и бэкенда нет, поэтому хватит самого дешёвого VPS.

## Что понадобится

- **VPS** на Ubuntu 22.04 или 24.04: 1 ядро, 1 ГБ памяти — с запасом. Лучше у российского хостинга или хотя бы на отдельном сервере, **не на том же, где VPN**: если заблокируют IP VPN, вместе с ним упадёт и сайт.
- **Домен**. В DNS нужна A-запись на IP сервера (и на `www`, если нужен).

## 1. Поставить Caddy

Caddy — веб-сервер, который сам получает и продлевает HTTPS-сертификат.

```bash
sudo apt update
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install -y caddy
```

## 2. Настроить Caddy

Замените `example.ru` на свой домен и положите это в `/etc/caddy/Caddyfile`:

```caddyfile
example.ru {
	root * /var/www/site
	encode zstd gzip

	# Файлы с хэшем в имени можно кэшировать навсегда
	@assets path /assets/*
	header @assets Cache-Control "public, max-age=31536000, immutable"

	# Все адреса вроде /cases/... отдаём через index.html (это SPA)
	try_files {path} /index.html
	file_server
}

www.example.ru {
	redir https://example.ru{uri} permanent
}
```

```bash
sudo mkdir -p /var/www/site
sudo systemctl reload caddy
```

## 3. Собрать и загрузить сайт

На своём компьютере (нужен Node.js 18+):

```bash
npm ci
npm run build
rsync -avz --delete dist/ root@IP_СЕРВЕРА:/var/www/site/
```

Всё. Сайт открывается по `https://example.ru`, сертификат Caddy получит сам в течение минуты.

Обновление сайта — те же две команды: `npm run build` и `rsync`.

## 4. После подключения домена

Замените старый адрес `https://copy-wonderland-kit.lovable.app` на свой домен:

- `src/content/site.ts` — поле `url` (из него собирается `sitemap.xml`);
- `index.html` — теги `og:url`, `og:image`, `twitter:image`;
- `public/robots.txt` — строка `Sitemap`.

Потом пересоберите и загрузите сайт. Чтобы Telegram обновил превью ссылки, отправьте её боту [@WebpageBot](https://t.me/WebpageBot).

## Яндекс Метрика

Счётчик уже подключён (номер в `src/content/site.ts`, поле `yandexMetrikaId`). Визиты с `localhost` не считаются.

Чтобы видеть, сколько людей нажали «Написать», создайте в Метрике две цели типа «JavaScript-событие»:

- `telegram_click` — клик по любой кнопке Telegram;
- `email_click` — клик по почте.

Если счётчик удалён или нужен новый — поменяйте номер в `site.ts`. Также стоит добавить домен в [Яндекс Вебмастер](https://webmaster.yandex.ru) и указать там `sitemap.xml`.
