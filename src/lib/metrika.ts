import { site } from "@/content/site";

type YmFunction = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

const isLocalHost = () => ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);

// Не шлём визиты из разработки и локальных превью, чтобы не портить статистику.
const enabled = () => Boolean(site.yandexMetrikaId) && import.meta.env.PROD && !isLocalHost();

/** Подключает Яндекс Метрику (один раз). Хиты для SPA отправляются вручную. */
export function loadMetrika() {
  if (!enabled() || window.ym) return;

  const ym: YmFunction = (...args: unknown[]) => {
    (ym.a = ym.a || []).push(args);
  };
  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${site.yandexMetrikaId}`;
  document.head.appendChild(script);

  window.ym(site.yandexMetrikaId, "init", {
    defer: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

export function trackHit(url: string, referer?: string) {
  if (!enabled()) return;
  window.ym?.(site.yandexMetrikaId, "hit", url, { referer, title: document.title });
}

/** Цели для Метрики: создайте в счётчике JS-цели с такими же идентификаторами. */
export function reachGoal(goal: "telegram_click" | "email_click") {
  if (!enabled()) return;
  window.ym?.(site.yandexMetrikaId, "reachGoal", goal);
}
