import Link from "next/link";
import { SR_NEW_WINDOW } from "@/lib/a11y";
import { formatLinkLabel } from "@/lib/format-link-label";
import { resolveContentHref } from "@/lib/resolve-content-href";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/lib/a11y";

type ContentInlineLinkProps = {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
};

export function ContentInlineLink({
  label,
  href,
  external,
  className,
}: ContentInlineLinkProps) {
  const resolved = resolveContentHref(href);
  const isExternal = external ?? resolved.external;
  const classes = cn(
    "font-semibold text-afca-blue hover:text-afca-navy underline underline-offset-2 decoration-afca-blue/30 hover:decoration-afca-navy/40 rounded-sm",
    FOCUS_RING,
    className
  );
  const text = formatLinkLabel(label, href);

  if (isExternal) {
    return (
      <a href={resolved.href} className={classes} target="_blank" rel="noopener noreferrer">
        {text}
        <span className="sr-only">{SR_NEW_WINDOW}</span>
      </a>
    );
  }

  return (
    <Link href={resolved.href} className={classes}>
      {text}
    </Link>
  );
}
