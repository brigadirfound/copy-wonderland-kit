import { useId, type ReactNode } from "react";
import type { CaseMotif, CaseStudy } from "@/content/cases";
import { cn } from "@/lib/utils";

const DISPLAY_FONT = "'Unbounded Variable', system-ui, sans-serif";
const TEXT_FONT = "'Manrope Variable', system-ui, sans-serif";
const INK = "#0b0b0f";
const PANEL = "#121218";
const primary = (opacity = 1) => ({ fill: "hsl(var(--primary))", fillOpacity: opacity });

interface ArtProps {
  id: string;
  label?: string;
  tone: (lightness: number, saturation?: number) => string;
}

function PhoneArt({ id, label }: ArtProps) {
  return (
    <>
      <path d="M470 430 L530 385 L585 398 L640 320 L690 292 L745 205 V430 Z" fill={`url(#${id}-area)`} />
      <polyline
        points="470,430 530,385 585,398 640,320 690,292 745,205"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: "hsl(var(--primary))" }}
      />
      <circle cx="745" cy="205" r="10" style={primary()} />
      <text x="470" y="130" fontFamily={DISPLAY_FONT} fontSize="80" fontWeight="700" fill="white">
        {label}
      </text>
      <text x="474" y="170" fontFamily={TEXT_FONT} fontSize="22" fontWeight="600" fill="white" fillOpacity="0.6">
        просмотров · 28 дней
      </text>

      <rect x="230" y="50" width="200" height="400" rx="36" fill={PANEL} stroke="white" strokeOpacity="0.14" />
      <rect x="242" y="62" width="176" height="376" rx="26" fill={`url(#${id}-surface)`} />
      <rect x="242" y="250" width="176" height="188" rx="0" fill={`url(#${id}-shade)`} />
      <circle cx="330" cy="235" r="34" fill="white" fillOpacity="0.92" />
      <path d="M320 217 L348 235 L320 253 Z" fill={INK} />
      <rect x="262" y="388" width="110" height="9" rx="4.5" fill="white" fillOpacity="0.85" />
      <rect x="262" y="405" width="78" height="7" rx="3.5" fill="white" fillOpacity="0.5" />
      <circle cx="398" cy="300" r="10" fill="white" fillOpacity="0.7" />
      <circle cx="398" cy="336" r="10" fill="white" fillOpacity="0.7" />
      <circle cx="398" cy="372" r="10" fill="white" fillOpacity="0.7" />
    </>
  );
}

function NdaArt({ id, tone }: ArtProps) {
  const card = (x: number, y: number, angle: number, lightness: number) => (
    <g transform={`rotate(${angle} ${x + 125} ${y + 150})`}>
      <rect x={x} y={y} width="250" height="300" rx="24" fill="#17171f" stroke="white" strokeOpacity="0.12" />
      <rect x={x + 20} y={y + 20} width="210" height="175" rx="16" fill={tone(lightness)} filter={`url(#${id}-blur)`} />
      <rect x={x + 20} y={y + 215} width="170" height="12" rx="6" fill="white" fillOpacity="0.6" filter={`url(#${id}-blur)`} />
      <rect x={x + 20} y={y + 240} width="120" height="10" rx="5" fill="white" fillOpacity="0.35" filter={`url(#${id}-blur)`} />
    </g>
  );

  return (
    <>
      {card(150, 110, -11, 45)}
      {card(290, 80, 3, 58)}
      {card(420, 115, 13, 38)}
      <g transform="rotate(-12 400 255)">
        <rect
          x="262"
          y="198"
          width="276"
          height="114"
          rx="20"
          fill={INK}
          fillOpacity="0.55"
          strokeWidth="7"
          style={{ stroke: "hsl(var(--primary))" }}
        />
        <text
          x="400"
          y="281"
          textAnchor="middle"
          fontFamily={DISPLAY_FONT}
          fontSize="74"
          fontWeight="700"
          letterSpacing="6"
          style={primary()}
        >
          NDA
        </text>
      </g>
    </>
  );
}

function BrowserArt({ id, label }: ArtProps) {
  return (
    <>
      <rect x="120" y="65" width="560" height="370" rx="24" fill={PANEL} stroke="white" strokeOpacity="0.14" />
      <circle cx="150" cy="96" r="6" fill="white" fillOpacity="0.2" />
      <circle cx="172" cy="96" r="6" fill="white" fillOpacity="0.2" />
      <circle cx="194" cy="96" r="6" fill="white" fillOpacity="0.2" />
      <rect x="230" y="84" width="300" height="24" rx="12" fill="white" fillOpacity="0.06" />
      <line x1="120" y1="126" x2="680" y2="126" stroke="white" strokeOpacity="0.08" />

      <rect x="160" y="158" width="220" height="18" rx="7" fill="white" fillOpacity="0.85" />
      <rect x="160" y="186" width="175" height="18" rx="7" fill="white" fillOpacity="0.85" />
      <rect x="160" y="220" width="200" height="10" rx="5" fill="white" fillOpacity="0.35" />
      <rect x="160" y="238" width="150" height="10" rx="5" fill="white" fillOpacity="0.35" />
      <rect x="160" y="268" width="128" height="36" rx="18" style={primary()} />

      <rect x="420" y="150" width="220" height="165" rx="18" fill={`url(#${id}-surface)`} />
      <text
        x="530"
        y="252"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="56"
        fontWeight="700"
        fill="white"
        fillOpacity="0.92"
      >
        {label}
      </text>

      <rect x="160" y="340" width="150" height="66" rx="12" fill="white" fillOpacity="0.05" />
      <rect x="325" y="340" width="150" height="66" rx="12" fill="white" fillOpacity="0.05" />
      <rect x="490" y="340" width="150" height="66" rx="12" fill="white" fillOpacity="0.05" />
      <path d="M276 292 L276 326 L285 318 L292 333 L298 330 L291 316 L303 315 Z" fill="white" stroke={INK} strokeWidth="2" />
    </>
  );
}

function LessonsArt({ id, tone }: ArtProps) {
  const rows = [
    { y: 168, a: 200, b: 120, done: true },
    { y: 230, a: 160, b: 90, done: true },
    { y: 292, a: 220, b: 140, done: true },
    { y: 354, a: 140, b: 100, done: false },
  ];

  return (
    <>
      <rect x="190" y="62" width="420" height="376" rx="26" fill={PANEL} stroke="white" strokeOpacity="0.14" />
      <text x="222" y="112" fontFamily={TEXT_FONT} fontSize="22" fontWeight="700" fill="white" fillOpacity="0.9">
        Модуль 3 · Уроки
      </text>
      <rect x="222" y="130" width="356" height="8" rx="4" fill="white" fillOpacity="0.08" />
      <rect x="222" y="130" width="267" height="8" rx="4" style={primary()} />
      {rows.map((row) => (
        <g key={row.y}>
          <rect x="214" y={row.y} width="372" height="48" rx="14" fill="white" fillOpacity="0.04" />
          {row.done ? (
            <>
              <circle cx="242" cy={row.y + 24} r="12" style={primary()} />
              <path
                d={`M236 ${row.y + 24} l4 4 l8 -9`}
                fill="none"
                stroke={INK}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <circle cx="242" cy={row.y + 24} r="11" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
          )}
          <rect x="268" y={row.y + 13} width={row.a} height="9" rx="4.5" fill="white" fillOpacity="0.7" />
          <rect x="268" y={row.y + 29} width={row.b} height="7" rx="3.5" fill="white" fillOpacity="0.3" />
          <rect x="532" y={row.y + 14} width="40" height="20" rx="10" fill={tone(60)} fillOpacity="0.3" />
        </g>
      ))}
      <rect x="455" y="28" width="200" height="46" rx="23" fill={`url(#${id}-surface)`} />
      <text x="555" y="58" textAnchor="middle" fontFamily={TEXT_FONT} fontSize="17" fontWeight="800" fill={INK}>
        Доступ открыт ✓
      </text>
    </>
  );
}

function TimelineArt({ id, label, tone }: ArtProps) {
  const wave = Array.from({ length: 46 }, (_, i) => 6 + Math.abs(Math.sin(i * 1.7) * 9 + Math.cos(i * 0.6) * 5));

  return (
    <>
      <rect x="150" y="40" width="500" height="260" rx="22" fill={`url(#${id}-surface)`} />
      <rect x="150" y="190" width="500" height="110" fill={`url(#${id}-shade)`} />
      <text
        x="400"
        y="202"
        textAnchor="middle"
        fontFamily={DISPLAY_FONT}
        fontSize="96"
        fontWeight="700"
        fill="white"
        fillOpacity="0.95"
      >
        {label}
      </text>
      <circle cx="192" cy="262" r="17" fill="white" fillOpacity="0.92" />
      <path d="M186 252 L200 262 L186 272 Z" fill={INK} />

      <rect x="110" y="318" width="580" height="152" rx="18" fill={PANEL} stroke="white" strokeOpacity="0.12" />
      <rect x="130" y="338" width="160" height="28" rx="7" fill={tone(55)} />
      <rect x="298" y="338" width="118" height="28" rx="7" fill={tone(45)} />
      <rect x="424" y="338" width="246" height="28" rx="7" fill={tone(62)} />
      <rect x="130" y="376" width="238" height="28" rx="7" style={primary(0.85)} />
      <rect x="376" y="376" width="150" height="28" rx="7" style={primary(0.45)} />
      {wave.map((h, i) => (
        <rect key={i} x={132 + i * 12} y={432 - h / 2} width="6" height={h} rx="3" fill="white" fillOpacity="0.45" />
      ))}
      <line x1="458" y1="326" x2="458" y2="462" strokeWidth="3" style={{ stroke: "hsl(var(--primary))" }} />
      <path d="M449 322 H467 L458 334 Z" style={primary()} />
    </>
  );
}

function NetworkArt({ id, tone }: ArtProps) {
  const nodes: [number, number][] = [
    [240, 165],
    [565, 140],
    [620, 300],
    [300, 365],
    [475, 405],
    [175, 285],
  ];

  return (
    <>
      <circle cx="400" cy="250" r="175" fill="none" stroke="white" strokeOpacity="0.1" />
      <ellipse cx="400" cy="250" rx="175" ry="62" fill="none" stroke="white" strokeOpacity="0.08" />
      <ellipse cx="400" cy="250" rx="100" ry="175" fill="none" stroke="white" strokeOpacity="0.08" />
      {nodes.map(([x, y]) => (
        <line
          key={`l-${x}`}
          x1={x}
          y1={y}
          x2="400"
          y2="250"
          stroke={tone(65)}
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="4 7"
        />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`n-${x}`}>
          <circle cx={x} cy={y} r="18" fill={tone(60)} fillOpacity="0.18" />
          <circle cx={x} cy={y} r="7" fill={tone(70)} />
        </g>
      ))}
      <path
        d="M400 168 L466 195 V252 C466 300 436 332 400 348 C364 332 334 300 334 252 V195 Z"
        fill={`url(#${id}-surface)`}
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M376 258 L394 276 L426 238"
        fill="none"
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

const arts: Record<CaseMotif, (props: ArtProps) => ReactNode> = {
  phone: PhoneArt,
  nda: NdaArt,
  browser: BrowserArt,
  lessons: LessonsArt,
  timeline: TimelineArt,
  network: NetworkArt,
};

interface CaseCoverProps {
  item: CaseStudy;
  className?: string;
}

/** Обложка кейса, нарисованная кодом (или картинка, если задан item.image). */
export default function CaseCover({ item, className }: CaseCoverProps) {
  const id = `cover${useId().replace(/:/g, "")}`;

  if (item.image) {
    return <img src={item.image} alt="" loading="lazy" className={cn("h-full w-full object-cover", className)} />;
  }

  const { motif, hue, label } = item.cover;
  const tone = (lightness: number, saturation = 88) => `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const Art = arts[motif];

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="70%" cy="25%" r="75%">
          <stop offset="0" stopColor={tone(55)} stopOpacity="0.5" />
          <stop offset="1" stopColor={tone(20)} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-accent`} cx="8%" cy="100%" r="60%">
          <stop offset="0" style={{ stopColor: "hsl(var(--glow-1))", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "hsl(var(--glow-1))", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id={`${id}-surface`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone(66)} />
          <stop offset="0.55" stopColor={tone(48)} />
          <stop offset="1" stopColor={tone(30, 70)} />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity="0" />
          <stop offset="1" stopColor={INK} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.3 }} />
          <stop offset="1" style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }} />
        </linearGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="white" strokeOpacity="0.05" />
        </pattern>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <rect width="800" height="500" fill={INK} />
      <rect width="800" height="500" fill={`url(#${id}-grid)`} />
      <rect width="800" height="500" fill={`url(#${id}-glow)`} />
      <rect width="800" height="500" fill={`url(#${id}-accent)`} />
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-2">
        <Art id={id} label={label} tone={tone} />
      </g>
    </svg>
  );
}
