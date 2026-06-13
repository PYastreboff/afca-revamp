import Link from "next/link";
import { ArrowUpRight, Share2 } from "lucide-react";
import { mainNavigation, phoneNumbers, socialLinks } from "@/lib/navigation";
import { Logo } from "./Logo";

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
              <a href={phoneNumbers.freeCall.href} className="flex items-center gap-2 text-white/80 hover:text-afca-sky transition-colors">
                <span className="font-semibold text-white">{phoneNumbers.freeCall.number}</span>
                <span className="text-white/50">free call</span>
              </a>
              <a href={phoneNumbers.members.href} className="block text-white/60 hover:text-afca-sky transition-colors">
                Members: {phoneNumbers.members.number}
              </a>
            </div>
          </div>

          {mainNavigation.map((section) => (
            <div key={section.label}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-afca-sky mb-4">
                <Link href={section.href} className="hover:text-white transition-colors">
                  {section.label}
                </Link>
              </h3>
              <ul className="space-y-2">
                {section.children?.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-start gap-1 text-xs sm:text-sm text-white/55 hover:text-white transition-colors line-clamp-2"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {item.label}
                      {item.external && <ArrowUpRight className="h-3 w-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-60" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-white/10 pt-8">
          <p className="text-xs sm:text-sm text-white/45 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Australian Financial Complaints Authority
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/8 px-3.5 py-2 text-xs font-medium text-white/60 hover:bg-white/15 hover:text-afca-sky transition-colors"
              >
                <Share2 className="h-3 w-3 opacity-60" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
