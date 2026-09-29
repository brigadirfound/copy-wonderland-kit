# Макс Бригадир — сайт-портфолио

Сайты, боты и AI-контент на скорости нейросетей. Одностраничник с услугами, кейсами и контактами + отдельные страницы кейсов.

**Стек:** Vite, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, WebGL-фон. Бэкенда нет — сайт собирается в статику.

## Запуск

```bash
npm ci
npm run dev      # http://localhost:8080
npm run build    # сборка в dist/
```

## Где что лежит

- `src/content/site.ts` — тексты, цены, контакты, FAQ;
- `src/content/cases.ts` — кейсы;
- `src/components/sections/` — блоки главной;
- `src/index.css` — цвета и шрифты.

## Инструкции

- [Как менять тексты, кейсы и картинки](docs/CONTENT.md)
- [Как выложить сайт на свой сервер](docs/DEPLOY.md)

Проект можно продолжать редактировать и в [Lovable](https://lovable.dev/projects/d58fd807-5371-484a-9693-54f1707485a7).
