import type { SVGProps } from "react";

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.94 4.3a1.5 1.5 0 0 0-2.02-1.1L2.93 9.82c-1.13.44-1.1 2.07.05 2.46l4.1 1.4 1.6 5.05c.3.94 1.48 1.24 2.18.56l2.33-2.25 4.33 3.2c.82.6 2 .16 2.2-.84l2.2-15.1Zm-4.4 3.24-7.9 7.2a.75.75 0 0 0-.24.45l-.3 2.23-1.02-3.34 9.06-6.08a.2.2 0 0 1 .4-.46Z" />
    </svg>
  );
}

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="9" fill="hsl(var(--primary))" />
      <path
        d="M9 22V10.5l7 7 7-7V22"
        fill="none"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
