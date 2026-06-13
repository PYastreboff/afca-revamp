import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { footerColumns, footerUtilityLinks, phoneNumbers, socialLinks } from "@/lib/navigation";
import { Logo } from "./Logo";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="relative bg-afca-navy text-white mt-auto overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-afca-sky/60 to-transparent" />
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-afca-blue/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-10 sm:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Independent dispute resolution for financial complaints across Australia.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={phoneNumbers.freeCall.href}
                className="flex items-center gap-2 text-white/80 hover:text-afca-sky transition-colors"
              >
                <span className="font-semibold text-white">{phoneNumbers.freeCall.number}</span>
                <span className="text-white/50">free call</span>
              </a>
              <a
                href={phoneNumbers.members.href}
                className="block text-white/60 hover:text-afca-sky transition-colors"
              >
                Members: {phoneNumbers.members.number}
              </a>
              <a
                href="mailto:info@afca.org.au"
                className="inline-flex items-center gap-2 text-white/60 hover:text-afca-sky transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                Email us
              </a>
            </div>
          </div>

          {footerColumns.map((section) => (
            <div key={section.label}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-afca-sky mb-4">
                <Link href={section.href} className="hover:text-white transition-colors">
                  {section.label}
                </Link>
              </h3>
              <ul className="space-y-2">
                {section.children?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-start gap-1 text-xs sm:text-sm text-white/55 hover:text-white transition-colors line-clamp-2"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                      {item.external && (
                        <ArrowUpRight className="h-3 w-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-60" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-8">
          {footerUtilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm text-white/55 hover:text-afca-sky transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs sm:text-sm text-white/45 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Australian Financial Complaints Authority
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`AFCA on ${link.label}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-white/70 hover:bg-white/15 hover:text-afca-sky transition-colors"
              >
                <SocialIcon network={link.network} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
