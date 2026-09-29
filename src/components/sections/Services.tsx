import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Code2, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import { TelegramIcon } from "@/components/icons";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services, site, type ServiceId } from "@/content/site";
import { useSpotlight } from "@/hooks/useSpotlight";
import { reachGoal } from "@/lib/metrika";
import { cn } from "@/lib/utils";

const icons: Record<ServiceId, LucideIcon> = {
  dev: Code2,
  content: Sparkles,
  schools: GraduationCap,
};

/** Мини-макет сайта с заявкой из бота — иллюстрация для первой карточки. */
function DevVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mt-8 hidden overflow-hidden rounded-2xl border border-white/10 bg-background/70 lg:block" aria-hidden="true">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-6 flex-1 truncate rounded-full bg-white/[0.06] px-3 font-mono text-[11px] leading-6 text-muted-foreground">
          ваш-бизнес.рф
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3 p-5">
        <div className="col-span-3 space-y-2.5 pt-2">
          <div className="h-3.5 w-11/12 rounded bg-white/20" />
          <div className="h-3.5 w-3/4 rounded bg-white/20" />
          <div className="h-2.5 w-2/3 rounded bg-white/10" />
          <div className="mt-5 h-9 w-32 rounded-full bg-primary/85" />
        </div>
        <div className="col-span-2 h-28 rounded-xl bg-[radial-gradient(circle_at_30%_30%,hsl(var(--glow-2)/0.8),transparent_60%),radial-gradient(circle_at_80%_80%,hsl(var(--glow-1)/0.9),transparent_60%)]" />
        <div className="col-span-5 grid grid-cols-3 gap-3 pb-10">
          <div className="h-16 rounded-lg bg-white/[0.05]" />
          <div className="h-16 rounded-lg bg-white/[0.05]" />
          <div className="h-16 rounded-lg bg-white/[0.05]" />
        </div>
      </div>
      <m.div
        className="absolute bottom-4 right-4 w-64 rounded-2xl rounded-br-md border border-white/10 bg-card/95 p-3.5 shadow-2xl backdrop-blur"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#2AABEE] text-white">
            <TelegramIcon className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold">Новая заявка с сайта</span>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">сейчас</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Анна: «Нужен лендинг к запуску курса. Успеем?»</p>
      </m.div>
    </div>
  );
}

function ServiceCard({ service, featured }: { service: (typeof services)[number]; featured: boolean }) {
  const Icon = icons[service.id];
  const ref = useSpotlight<HTMLElement>();

  return (
    <article
      ref={ref}
      className="spotlight flex h-full flex-col rounded-3xl border border-white/[0.08] bg-card/60 p-6 transition-colors duration-300 hover:border-white/[0.16] sm:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm text-muted-foreground">{service.index}</span>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/25">
          <Icon className="h-6 w-6" />
        </span>
      </div>

      {featured && <DevVisual />}

      <h3 className={cn("display-md mt-8 text-balance", featured && "lg:mt-10")}>{service.title}</h3>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{service.lead}</p>

      <ul className="mt-6 space-y-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex gap-3 text-sm text-foreground/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 font-display text-sm font-semibold text-primary">
          {service.price}
        </span>
        <a
          href={site.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => reachGoal("telegram_click")}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary"
        >
          Обсудить
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <section id="services" className="container-page py-20 sm:py-28">
      <SectionHeading
        index="01"
        eyebrow="Услуги"
        title="Что я делаю"
        lead="Три направления. Пишете задачу — предлагаю решение, срок и цену."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:grid-rows-[auto_auto]">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08} className={i === 0 ? "lg:row-span-2" : undefined}>
            <ServiceCard service={service} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
