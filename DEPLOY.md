# Деплой FTS-Pay на VPS

Инструкция рассчитана на Ubuntu 22.04/24.04, домен `fts-pay.cc`, Nginx и Node.js 20.

## DNS

```text
A    @      IP_СЕРВЕРА
A    www    IP_СЕРВЕРА
```

## Сервер и проект

```bash
ssh root@IP_СЕРВЕРА
apt update && apt upgrade -y
apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
mkdir -p /var/www/fts-pay
cd /var/www/fts-pay
git clone https://github.com/Bell1488/fts.git .
npm install
npm run build
```

## Переменные окружения

Создайте `/var/www/fts-pay/.env`:

```env
TELEGRAM_BOT_TOKEN=ТОКЕН_БОТА
TELEGRAM_CHAT_ID=ID_ТЕЛЕГРАМ_ГРУППЫ
SOCKS5H_URL=socks5h://ЛОГИН:ПАРОЛЬ@ХОСТ:ПОРТ
PORT=8787
VITE_MANAGER_TELEGRAM_URL=https://t.me/obmen_CNY_support
```

Бот должен быть добавлен в группу и иметь право отправлять сообщения. Не публикуйте `.env` в GitHub.

## Запуск API через systemd

Создайте `/etc/systemd/system/fts-pay-api.service`:

```ini
[Unit]
Description=FTS-Pay API
After=network.target

[Service]
Type=simple
WorkingDirectory=/var/www/fts-pay
EnvironmentFile=/var/www/fts-pay/.env
ExecStart=/usr/bin/node /var/www/fts-pay/server/index.mjs
Restart=always
RestartSec=5
User=www-data

[Install]
WantedBy=multi-user.target
```

```bash
chown -R www-data:www-data /var/www/fts-pay
systemctl daemon-reload
systemctl enable --now fts-pay-api
systemctl status fts-pay-api
curl http://127.0.0.1:8787/api/health
```

## Nginx

Создайте `/etc/nginx/sites-available/fts-pay.cc`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name fts-pay.cc www.fts-pay.cc;
    root /var/www/fts-pay/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/fts-pay.cc /etc/nginx/sites-enabled/fts-pay.cc
nginx -t
systemctl reload nginx
```

## HTTPS

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d fts-pay.cc -d www.fts-pay.cc
certbot renew --dry-run
```

Сайт будет доступен по адресу `https://fts-pay.cc`.

## Проверки и обновление

```bash
curl https://fts-pay.cc/api/health
curl https://fts-pay.cc/api/rates
```

Проверьте главную страницу, мобильную версию, страницу `/contacts`, получение тестовой заявки в Telegram, калькулятор, `/robots.txt` и `/sitemap.xml`.

Для обновления:

```bash
cd /var/www/fts-pay
git pull origin main
npm install
npm run build
systemctl restart fts-pay-api
systemctl reload nginx
```

Для диагностики:

```bash
journalctl -u fts-pay-api -f
tail -f /var/log/nginx/error.log
systemctl status nginx
```

## Яндекс Директ и Метрика

Добавьте `https://fts-pay.cc` в Яндекс Вебмастер и отправьте sitemap `https://fts-pay.cc/sitemap.xml`.

В Яндекс Метрике создайте цели: клик по Telegram, успешная отправка формы, клик по телефону и переход на `/contacts`. Перед запуском объявлений проверьте, что цели срабатывают в тестовом визите.
