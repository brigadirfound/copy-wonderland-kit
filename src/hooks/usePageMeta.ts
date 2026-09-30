import { useEffect } from "react";
import { site } from "@/content/site";

const DEFAULT_TITLE = `${site.brand} — сайты, боты и AI-контент на скорости нейросетей`;
const DEFAULT_DESCRIPTION =
  "Делаю сайты, приложения, игры, Telegram-ботов, AI-контент и монтаж под ключ. В разработке с 2016 года. Сайты — от 15 000 ₽, контент и монтаж — от 1 000 ₽.";

/** Заголовок вкладки и описание страницы. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.brand}` : DEFAULT_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
