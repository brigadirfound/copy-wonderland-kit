import { useEffect } from "react";
import { site } from "@/content/site";

const DEFAULT_TITLE = `${site.brand} — сайты, боты и AI-контент на скорости нейросетей`;
const DEFAULT_DESCRIPTION =
  "Делаю сайты, приложения, Telegram-ботов и AI-контент под ключ. Техподдержка онлайн-школ на GetCourse. Сайты — от 30 000 ₽, контент — от 5 000 ₽.";

/** Заголовок вкладки и описание страницы. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.brand}` : DEFAULT_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description ?? DEFAULT_DESCRIPTION);
  }, [title, description]);
}
