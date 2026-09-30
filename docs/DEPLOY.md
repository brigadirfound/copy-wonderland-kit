# Как сайт выкладывается на сервер

Сайт статичный: после сборки это папка `dist/` с HTML, JS, CSS и картинками. Бэкенда и базы нет.

- **Сервер:** VPS FirstVDS (Ubuntu 24.04, Москва), IP `212.57.118.168`.
- **Домен:** `brigadirfound.ru`, DNS-записи — в панели регистратора (NS `registrant.ru`).
- **Веб-сервер:** Caddy — сам получает и продлевает HTTPS-сертификаты.
- **Выкладка:** GitHub Actions (`.github/workflows/deploy.yml`) собирает сайт при каждом изменении в `main` и загружает `dist/` на сервер через rsync.

## Первичная настройка (один раз)

### 1. DNS

Панель регистратора → `brigadirfound.ru` → «Управление DNS-записями» → «Добавить DNS-запись». Домен должен быть делегирован на `ns1–ns3.registrant.ru`, иначе панель не даст редактировать записи.

| Имя | Тип | Значение |
|---|---|---|
| (пусто) | A | `212.57.118.168` |
| `www` | A | `212.57.118.168` |

Для основного домена поле «Имя» оставьте пустым. Записи начинают работать через 15 минут — несколько часов.

### 2. Настройка сервера

Зайдите на сервер под root (пароль — в письме или панели FirstVDS). На Windows 10/11 это работает прямо в PowerShell:

```bash
ssh root@212.57.118.168
```

И выполните одну команду:

```bash
curl -fsSL https://raw.githubusercontent.com/brigadirfound/copy-wonderland-kit/main/deploy/setup-server.sh | bash
```

Скрипт (`deploy/setup-server.sh`) ставит Caddy, fail2ban и файрвол, создаёт пользователя `deploy` для загрузки файлов и в конце печатает ключ.

### 3. Ключ в GitHub

Репозиторий → Settings → Secrets and variables → Actions → New repository secret:

- **Name:** `DEPLOY_SSH_KEY`
- **Secret:** ключ, который напечатал скрипт, целиком — вместе со строками `BEGIN` и `END`.

После этого выкладка запускается сама при каждом изменении в `main`. Запустить вручную: Actions → Deploy → Run workflow.

## Как это защищено

- Ключ GitHub Actions может только загружать файлы в `/var/www/site`: на сервере он ограничен `rrsync`, без доступа к консоли.
- Открыты только порты SSH, 80 и 443; fail2ban блокирует перебор паролей SSH.
- Пароль root никому не отправляйте. Повторный запуск скрипта ключ не меняет. Новый ключ: `curl -fsSL …/setup-server.sh | FORCE_NEW_KEY=1 bash`, затем обновите секрет в GitHub.

## Если что-то пошло не так

- **Браузер пишет `ERR_SSL_PROTOCOL_ERROR`** — сертификата ещё нет. Проверьте, что домен уже указывает на сервер: `getent ahostsv4 brigadirfound.ru` должен показать `212.57.118.168`. Если да — `systemctl restart caddy`, через минуту сертификат будет получен.
- **Ошибки получения сертификата:** `journalctl -u caddy --no-pager -o cat | grep -i error | tail`.
- **Выкладка упала в Actions** — откройте упавший запуск и посмотрите шаг «Upload to server». Чаще всего секрет скопирован не целиком.
- **Логи веб-сервера:** `journalctl -u caddy --no-pager -n 50` на сервере.

## Яндекс Метрика

Счётчик подключён (номер в `src/content/site.ts`, поле `yandexMetrikaId`). Визиты с `localhost` не считаются.

Чтобы видеть, сколько людей нажали «Написать», создайте в Метрике цели типа «JavaScript-событие»: `telegram_click` и `email_click`. Также стоит добавить сайт в [Яндекс Вебмастер](https://webmaster.yandex.ru) и указать `https://brigadirfound.ru/sitemap.xml`.
