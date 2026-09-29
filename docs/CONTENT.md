# Как менять тексты, кейсы и картинки

Весь контент лежит в двух файлах — код трогать не нужно:

- `src/content/site.ts` — контакты, цены, услуги, шаги работы, «Обо мне», FAQ;
- `src/content/cases.ts` — кейсы.

## Добавить кейс

Скопируйте любой кейс в `cases.ts` и поменяйте поля:

```ts
{
  slug: "telegram-bot-shop",              // адрес: /cases/telegram-bot-shop
  title: "Telegram-бот для магазина",
  category: "dev",                        // dev | content | schools
  summary: "Одна-две строки для карточки.",
  period: "2026",                         // необязательно
  status: "wip",                          // необязательно: "nda" или "wip" (в работе)
  tags: ["Telegram", "Бот", "Оплата"],
  cover: { motif: "browser", hue: 200, label: "BOT" }, // обложка кодом: phone | nda | browser | lessons | timeline | network, hue — оттенок 0–360
  image: "/cases/telegram-bot-shop/cover.webp",        // своя обложка (необязательно)
  task: "Какую задачу решали.",
  done: ["Что сделал — пункт 1", "Пункт 2"],
  result: "Результат — лучше с цифрами.",
  link: { href: "https://t.me/...", label: "Открыть бота" }, // необязательно
  gallery: ["/cases/telegram-bot-shop/1.webp"],               // необязательно
  video: "/cases/telegram-bot-shop/demo.mp4",                 // необязательно
},
```

Картинки и видео кладите в `public/cases/<slug>/`. Первые пять кейсов из списка показываются на главной — порядок в файле и есть порядок на сайте.

**Размеры:** обложка 1600×1000 (16:10), WebP до 300 КБ. Видео — MP4 (H.264) до 20 МБ; длинные ролики лучше выложить на YouTube/VK и дать ссылку.

## Цветовой стиль

Сейчас включён лайм. Посмотреть другие варианты: откройте сайт с `?look=ocean` или `?look=sunset` в адресе. Цвета задаются в `src/index.css` (переменные `--primary`, `--glow-1`, `--glow-2`) и `src/lib/look.ts` (цвета анимированного фона).

## Промпты для картинок

Обложки и портрет лучше сгенерировать в одном стиле — так сайт сразу показывает навык работы с нейросетями. Промпты на английском, подходят для Midjourney, Flux и похожих.

**Общий стиль (добавлять в конец каждого промпта):**

```
dark background #09090b, soft violet and electric blue glow, small acid-lime accents, glassmorphism, subtle film grain, clean minimal composition, high detail, 3D render, octane
```

**Портрет для блока «Обо мне»** (загрузить своё фото как референс лица):

```
editorial portrait of the man from the reference photo, relaxed confident half-smile, black t-shirt, dark studio, violet and electric-blue rim light, 85mm lens, shallow depth of field, cinematic color grading, modern tech creator --ar 4:5
```

**Обложки кейсов** (`--ar 16:10`):

- AI-Shorts: `smartphone floating in the air showing a vertical video with a play button, glowing rising analytics chart next to it`
- Креативы для брендов (NDA): `stack of blurred glowing social media meme cards, a bold stamp with the word NDA across them`
- Лендинг ЖК: `sleek laptop showing a real estate landing page with modern residential buildings, floating UI cards with apartment layouts`
- GetCourse: `online course dashboard with lesson list and progress bar floating in 3D space, check marks, student avatars`
- AI-ролики: `video editing timeline with colorful clips floating in 3D, neural network particles turning into film frames`
- VPN: `glowing shield in the center of a network of connected nodes around a dark globe`
