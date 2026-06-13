import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
};

export function Logo({ className = "", variant = "default" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 group", className)}
      aria-label="AFCA homepage"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-afca.svg"
        alt="Australian Financial Complaints Authority"
        width={210}
        height={92}
        className={cn(
          "h-8 sm:h-9 w-auto transition-opacity group-hover:opacity-85",
          variant === "light" && "brightness-0 invert"
        )}
      />
    </Link>
  );
}
