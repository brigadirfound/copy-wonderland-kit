import { ArrowLeft, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ButtonLink, TelegramButton } from "@/components/ButtonLink";
import { CaseBadges } from "@/components/cases/CaseCard";
import CaseCover from "@/components/cases/CaseCover";
import Reveal from "@/components/motion/Reveal";
import FinalCta from "@/components/sections/FinalCta";
import { cases, categoryLabels, getCase } from "@/content/cases";
import { usePageMeta } from "@/hooks/usePageMeta";
import NotFound from "@/pages/NotFound";

export default function CaseDetail() {
  const { slug = "" } = useParams();
  const item = getCase(slug);
  usePageMeta(item?.title ?? "Кейс не найден", item?.summary);

  if (!item) return <NotFound />;

  const next = cases[(cases.indexOf(item) + 1) % cases.length];
  const meta = [
    { label: "Направление", value: categoryLabels[item.category] },
    item.role && { label: "Роль", value: item.role },
    item.period && { label: "Период", value: item.period },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <article className="container-page pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
        <Reveal>
          <Link
            to="/cases"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Все кейсы
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <CaseBadges item={item} className="mt-8" />
          <h1 className="display-lg mt-5 max-w-4xl text-balance">{item.title}</h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {item.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-3">
            {meta.map((entry) => (
              <div key={entry.label}>
                <dt className="eyebrow">{entry.label}</dt>
                <dd className="mt-2 font-display text-base font-semibold">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="group aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[16/8]">
            <CaseCover item={item} />
          </div>
        </Reveal>

        {item.metric && (
          <Reveal className="mt-10">
            <div className="flex flex-col gap-2 rounded-3xl border border-primary/25 bg-primary/[0.06] p-8 sm:flex-row sm:items-end sm:gap-6">
              <p className="font-display text-5xl font-semibold leading-none text-primary sm:text-7xl">{item.metric.value}</p>
              <p className="text-lg text-foreground/80 sm:pb-1.5">{item.metric.label}</p>
            </div>
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 className="eyebrow">Задача</h2>
            <p className="mt-4 text-pretty font-display text-xl font-medium leading-snug sm:text-2xl">{item.task}</p>
          </Reveal>

          <div className="space-y-12">
            <Reveal>
              <h2 className="eyebrow">Что сделано</h2>
              <ol className="mt-5 space-y-4">
                {item.done.map((step, i) => (
                  <li key={step} className="flex gap-4 text-lg leading-relaxed">
                    <span className="mt-1 font-mono text-sm text-primary">0{i + 1}</span>
                    <span className="text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="eyebrow">Результат</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">{item.result}</p>
            </Reveal>

            {item.brands && (
              <Reveal>
                <h2 className="eyebrow">Бренды</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.brands.map((brand) => (
                    <li key={brand} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm">
                      {brand}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {item.status === "nda" && (
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-card/70 p-6 sm:p-8">
                  <p className="flex items-center gap-2 font-display text-lg font-semibold">
                    <Lock className="h-5 w-5 text-primary" />
                    Работы под NDA
                  </p>
                  <p className="mt-3 text-muted-foreground">
                    Публично показать не могу, но пришлю примеры и расскажу подробности в личных сообщениях.
                  </p>
                  <TelegramButton label="Попросить примеры" size="md" className="mt-6" />
                </div>
              </Reveal>
            )}

            {item.link && (
              <Reveal>
                {item.link.href.startsWith("http") ? (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                  >
                    {item.link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <ButtonLink to={item.link.href} variant="secondary" size="md">
                    {item.link.label}
                  </ButtonLink>
                )}
              </Reveal>
            )}
          </div>
        </div>

        {item.video && (
          <Reveal className="mt-16">
            <video
              src={item.video}
              controls
              playsInline
              preload="metadata"
              className="mx-auto max-h-[80vh] w-full rounded-3xl border border-white/10 bg-black"
            />
          </Reveal>
        )}

        {item.gallery && item.gallery.length > 0 && (
          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {item.gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 2) * 0.06}>
                <img
                  src={src}
                  alt={`${item.title} — изображение ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-3xl border border-white/10"
                />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-20">
          <Link
            to={`/cases/${next.slug}`}
            className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-card/60 p-6 transition-colors duration-300 hover:border-white/25 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="eyebrow">Следующий кейс</p>
              <p className="mt-3 text-balance font-display text-xl font-semibold sm:text-2xl">{next.title}</p>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </Reveal>
      </article>

      <FinalCta />
    </>
  );
}
