import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TelegramButton } from "@/components/ButtonLink";
import { LogoMark } from "@/components/icons";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site } from "@/content/site";
import { reachGoal } from "@/lib/metrika";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-white/[0.06] bg-background/75 backdrop-blur-xl" : "border-transparent",
      )}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <LogoMark className="h-8 w-8" />
          <span>{site.brand}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <TelegramButton size="md" label="Написать" className="hidden sm:inline-flex" />
          <TelegramButton size="md" iconOnly className="sm:hidden" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Открыть меню"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition-colors hover:bg-white/[0.08] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col border-white/10 bg-background/95 backdrop-blur-xl sm:max-w-sm">
              <SheetTitle className="sr-only">Меню</SheetTitle>
              <SheetDescription className="sr-only">Разделы сайта и контакты</SheetDescription>
              <nav className="mt-14 flex flex-col" aria-label="Мобильная навигация">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 border-b border-white/[0.06] py-4 font-display text-2xl font-semibold transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-4 pb-4">
                <TelegramButton label="Написать в Telegram" className="w-full" />
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => reachGoal("email_click")}
                  className="block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
