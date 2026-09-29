import { Link } from "react-router-dom";
import { TelegramButton } from "@/components/ButtonLink";
import { LogoMark } from "@/components/icons";
import { navLinks, site } from "@/content/site";
import { reachGoal } from "@/lib/metrika";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
            <LogoMark className="h-8 w-8" />
            {site.brand}
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Сайты, боты и AI-контент на скорости нейросетей. Работаю удалённо с клиентами по всей России.
          </p>
          <TelegramButton size="md" label="Написать" className="mt-6" />
        </div>

        <div>
          <p className="eyebrow">Разделы</p>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cases" className="text-muted-foreground transition-colors hover:text-foreground">
                Все кейсы
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Контакты</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={site.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => reachGoal("telegram_click")}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Telegram {site.telegram.handle}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                onClick={() => reachGoal("email_click")}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
            <li className="text-muted-foreground">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-white/[0.06] py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand}
          </p>
          <p>Сделано с нейросетями ✦</p>
        </div>
      </div>
    </footer>
  );
}
