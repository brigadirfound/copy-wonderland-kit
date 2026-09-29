import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { loadMetrika, trackHit } from "@/lib/metrika";

/** Прокрутка к якорю или наверх при смене страницы. */
export function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();
  const previous = useRef({ pathname, search });

  useEffect(() => {
    const before = previous.current;
    previous.current = { pathname, search };

    // Поменялись только параметры (например, фильтр кейсов) — позицию не трогаем.
    if (!hash && before.pathname === pathname && before.search !== search) return;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: "start" });
      } else if (attempts++ < 20) {
        timer = window.setTimeout(scrollToTarget, 50);
      }
    };

    scrollToTarget();
    return () => window.clearTimeout(timer);
  }, [pathname, search, hash, key]);

  return null;
}

/** Яндекс Метрика: загрузка счётчика и хиты при переходах внутри SPA. */
export function MetrikaTracker() {
  const { pathname, search } = useLocation();
  const previousUrl = useRef<string | undefined>(document.referrer || undefined);

  useEffect(() => {
    loadMetrika();
  }, []);

  useEffect(() => {
    const url = window.location.href;
    trackHit(url, previousUrl.current);
    previousUrl.current = url;
  }, [pathname, search]);

  return null;
}
