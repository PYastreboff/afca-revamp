import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SR_NEW_WINDOW } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type ButtonVariant = "yellow" | "orange" | "sky" | "navy" | "outline" | "ghost" | "hero-secondary";

const variants: Record<ButtonVariant, string> = {
  yellow:
    "bg-afca-yellow text-afca-navy shadow-sm shadow-black/10 hover:bg-afca-yellow-light",
  orange:
    "bg-afca-orange text-afca-navy shadow-sm shadow-afca-orange/20 hover:brightness-105 hover:shadow-md",
  sky:
    "bg-afca-sky text-afca-navy shadow-sm shadow-afca-sky/25 hover:brightness-105 hover:shadow-md",
  navy:
    "bg-afca-navy text-white shadow-sm shadow-afca-navy/20 hover:bg-afca-blue hover:shadow-md",
  outline:
    "border border-afca-navy/20 bg-white text-afca-navy hover:border-afca-navy hover:bg-afca-navy hover:text-white",
  ghost: "text-afca-blue hover:bg-afca-cream hover:text-afca-navy",
  "hero-secondary":
    "border border-white/50 bg-transparent text-white hover:bg-white/10 hover:border-white",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  showExternalIcon?: boolean;
  hideExternalIconOnMobile?: boolean;
};

const sizes = {
  sm: "min-h-[40px] gap-1.5 px-4 py-2 text-sm",
  md: "min-h-[44px] gap-2 px-5 py-2.5 text-sm font-semibold",
  lg: "min-h-[48px] gap-2 px-6 py-3 text-base font-semibold sm:px-7 sm:py-3.5",
};

export function Button({
  href,
  children,
  variant = "navy",
  external,
  className,
  size = "md",
  onClick,
  showExternalIcon,
  hideExternalIconOnMobile,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-afca-sky focus-visible:ring-offset-2 text-center active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {children}
      {(external && showExternalIcon) && (
        <ArrowUpRight
          className={cn(
            "h-4 w-4 opacity-70",
            hideExternalIconOnMobile && "max-sm:hidden"
          )}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
        <span className="sr-only">{SR_NEW_WINDOW}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
