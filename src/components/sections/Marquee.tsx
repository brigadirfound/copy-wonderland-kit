import type { CSSProperties } from "react";
import { marqueeItems } from "@/content/site";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

export default function Marquee() {
  const track = [...marqueeItems, ...marqueeItems];

  return (
    <section aria-label="Что я делаю" className="relative overflow-hidden border-y border-white/[0.06] bg-card/30 py-6 sm:py-8">
      <ul className="sr-only">
        {marqueeItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mask-fade-x flex" aria-hidden="true">
        <div
          className="flex shrink-0 animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ "--marquee-duration": "55s" } as CSSProperties}
        >
          {track.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-2xl font-semibold uppercase tracking-tight sm:gap-10 sm:pr-10 sm:text-4xl"
            >
              <span className={i % 2 ? "outline-text" : undefined}>{item}</span>
              <Sparkle className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
