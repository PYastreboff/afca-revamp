import Link from "next/link";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/lib/a11y";

type LogoProps = {
  className?: string;
  variant?: "default" | "compact" | "light";
};

const logoSources = {
  default: { src: "/logo-afca.svg", width: 210, height: 92 },
  compact: { src: "/logo-afca-notext.png", width: 300, height: 109 },
  light: { src: "/logo-afca.svg", width: 210, height: 92 },
} as const;

export function Logo({ className = "", variant = "default" }: LogoProps) {
  const logo = logoSources[variant];

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 group rounded-sm", FOCUS_RING, className)}
      aria-label="AFCA homepage"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath(logo.src)}
        alt=""
        width={logo.width}
        height={logo.height}
        className={cn(
          "h-8 sm:h-9 w-auto transition-opacity group-hover:opacity-85",
          variant === "light" && "brightness-0 invert"
        )}
      />
    </Link>
  );
}
