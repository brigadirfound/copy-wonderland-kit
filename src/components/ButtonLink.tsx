import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TelegramIcon } from "@/components/icons";
import { site } from "@/content/site";
import { reachGoal } from "@/lib/metrika";
import { buttonClasses, type ButtonSize as Size, type ButtonVariant as Variant } from "@/lib/buttonClasses";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function ButtonLink({ to, children, variant = "primary", size = "lg", className }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses(variant, size, className)}>
      {children}
    </Link>
  );
}

interface TelegramButtonProps {
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconOnly?: boolean;
}

export function TelegramButton({
  label = "Обсудить проект",
  variant = "primary",
  size = "lg",
  className,
  iconOnly = false,
}: TelegramButtonProps) {
  return (
    <a
      href={site.telegram.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => reachGoal("telegram_click")}
      aria-label={iconOnly ? `Написать в Telegram ${site.telegram.handle}` : undefined}
      className={buttonClasses(variant, size, cn(iconOnly && "w-11 px-0", className))}
    >
      <TelegramIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
      {!iconOnly && (
        <>
          <span>{label}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      )}
    </a>
  );
}
