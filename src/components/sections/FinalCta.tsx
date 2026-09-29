import { TelegramButton } from "@/components/ButtonLink";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { reachGoal } from "@/lib/metrika";

export default function FinalCta() {
  return (
    <section id="contact" className="container-page py-20 sm:py-28">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10 bg-card px-6 py-16 text-center sm:px-12 sm:py-24">
          <div className="cta-glow absolute inset-0 -z-10" />
          <div className="grain" />
          <p className="eyebrow">
            <span className="text-primary">(06)</span> Контакты
          </p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl text-balance">Есть задача? Давайте обсудим</h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75">
            Напишите в Telegram — {site.replyTime.toLowerCase()}. Можно просто описать задачу своими словами.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <TelegramButton label="Написать в Telegram" />
            <a
              href={`mailto:${site.email}`}
              onClick={() => reachGoal("email_click")}
              className="text-sm font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              или на почту {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
