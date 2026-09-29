import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowDown, Bot, GraduationCap, MonitorSmartphone, Play, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink, TelegramButton } from "@/components/ButtonLink";
import HeroBackground from "@/components/HeroBackground";
import { EASE_OUT } from "@/lib/motion";
import { hero } from "@/content/site";

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2600);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative block h-[1.16em] overflow-hidden text-primary">
      <AnimatePresence initial={false}>
        <m.span
          key={words[index]}
          className="absolute inset-x-0 top-0 block whitespace-nowrap"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="block">
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <m.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease: EASE_OUT }}
          >
            {word}
            {" "}
          </m.span>
        </span>
      ))}
    </span>
  );
}

const floatingChips: { icon: LucideIcon; title: string; meta: string; className: string; float: number }[] = [
  { icon: Play, title: "AI-Shorts", meta: "428 тыс. просмотров", className: "right-[6%] top-[22%]", float: 6 },
  { icon: Bot, title: "Telegram-бот", meta: "Новая заявка · сейчас", className: "right-[24%] top-[40%]", float: 7 },
  { icon: MonitorSmartphone, title: "Лендинг", meta: "от 30 000 ₽", className: "right-[4%] top-[57%]", float: 5.5 },
  { icon: GraduationCap, title: "GetCourse", meta: "Доступ открыт ✓", className: "right-[20%] top-[74%]", float: 6.5 },
];

/** Плавающие «карточки» справа от заголовка — только на больших экранах. */
function FloatingChips() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] xl:block" aria-hidden="true">
      {floatingChips.map((chip, i) => (
        <m.div
          key={chip.title}
          className={`absolute ${chip.className}`}
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 + i * 0.15, ease: EASE_OUT }}
        >
          <m.div
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] py-3 pl-3 pr-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: chip.float, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <chip.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">{chip.title}</span>
              <span className="block text-xs text-foreground/60">{chip.meta}</span>
            </span>
          </m.div>
        </m.div>
      ))}
    </div>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

export default function Hero() {
  const reduce = useReducedMotion();
  const motionProps = (delay: number) => (reduce ? {} : fadeUp(delay));
  const srTitle = `${hero.rotatingWords.join(", ")} ${hero.titleTail}`;

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 bg-background/15 lg:bg-[linear-gradient(90deg,hsl(var(--background)/0.75)_0%,hsl(var(--background)/0.3)_50%,transparent_100%)]" />
      <div className="grain" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      <FloatingChips />

      <div className="container-page relative flex flex-1 flex-col justify-center pb-24 pt-[calc(var(--header-h)+3.5rem)]">
        <m.p
          {...motionProps(0)}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-background/40 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-400" />
          {hero.status}
        </m.p>

        <h1 className="display-xl mt-7 max-w-5xl">
          <span className="sr-only">{srTitle}</span>
          <span aria-hidden="true" className="block">
            {reduce ? (
              <>
                <span className="block text-primary">{hero.staticLead}</span>
                <span className="block">{hero.titleTail}</span>
              </>
            ) : (
              <>
                <RotatingWord words={hero.rotatingWords} />
                <SplitWords text={hero.titleTail} delay={0.15} />
              </>
            )}
          </span>
        </h1>

        <m.p {...motionProps(0.45)} className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
          {hero.lead}
        </m.p>

        <m.div {...motionProps(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <TelegramButton />
          <ButtonLink to="/#cases" variant="secondary">
            Смотреть кейсы
          </ButtonLink>
        </m.div>

        <m.dl {...motionProps(0.7)} className="mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {hero.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow text-[10px] sm:text-xs">{fact.label}</dt>
              <dd className="mt-1.5 font-display text-sm font-semibold sm:text-lg">{fact.value}</dd>
            </div>
          ))}
        </m.dl>
      </div>

      <a
        href="#services"
        aria-label="Прокрутить к услугам"
        className="absolute bottom-8 right-4 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 text-muted-foreground transition-colors hover:border-white/30 hover:text-foreground sm:right-6 md:flex lg:right-8"
      >
        <ArrowDown className="h-5 w-5 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
