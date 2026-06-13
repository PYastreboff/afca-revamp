import Link from "next/link";
import { ArrowRight, ChevronRight, Languages, Phone, Video } from "lucide-react";
import { interpreterContacts, languageOptions, languagesFeaturedLink } from "@/lib/languages";
import { getParentCrumb, PageBackLink } from "./PageBackLink";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Make a complaint", href: "/make-a-complaint" },
  { label: "Languages", href: "/make-a-complaint/do-you-speak-another-language" },
];

export function LanguagesPage() {
  const parent = getParentCrumb(breadcrumbs);

  return (
    <div>
      <section className="relative overflow-hidden bg-afca-navy text-white">
        <div className="absolute inset-0 hero-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
          {parent && <PageBackLink href={parent.href} label={parent.label} />}
          <nav aria-label="Breadcrumb" className="mb-5 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs sm:text-sm text-white/50">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-white/90 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance leading-tight">
            Do you speak another language?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed text-pretty">
            Information and support about making a complaint to AFCA is available in many
            languages. Select your language below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
        <Link
          href={languagesFeaturedLink.href}
          className="group mb-10 flex items-start gap-4 rounded-2xl border border-afca-blue/20 bg-afca-cream/50 p-5 sm:p-6 transition-all hover:border-afca-blue/40 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-afca-blue/10">
            <Video className="h-5 w-5 text-afca-blue" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-afca-navy group-hover:text-afca-blue transition-colors">
              {languagesFeaturedLink.title}
            </h2>
            <p className="mt-1 text-sm text-afca-gray leading-relaxed">
              {languagesFeaturedLink.description}
            </p>
          </div>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-afca-blue opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </Link>

        <div className="mb-8 flex items-center gap-2">
          <Languages className="h-5 w-5 text-afca-blue" />
          <h2 className="text-lg font-bold text-afca-navy">Information and support in other languages</h2>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {languageOptions.map((lang) => (
            <li key={lang.slug}>
              <Link
                href={lang.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-afca-navy/8 bg-white p-4 sm:p-5 shadow-sm transition-all hover:border-afca-blue/25 hover:shadow-md"
              >
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-bold text-afca-navy group-hover:text-afca-blue transition-colors leading-snug">
                    {lang.native}
                  </p>
                  <p className="mt-0.5 text-sm text-afca-muted">{lang.english}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-afca-blue opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </li>
          ))}
        </ul>

        <aside className="mt-12 surface-card rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Phone className="h-5 w-5 text-afca-blue" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-afca-blue">
              Interpreter &amp; relay services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-afca-gray leading-relaxed mb-5">
            If you are not confident in English, we can arrange a free interpreter for you. Call the
            Translating and Interpreting Service on{" "}
            <a href="tel:131450" className="font-semibold text-afca-blue hover:text-afca-navy">
              131 450
            </a>
            , or contact us on{" "}
            <a href="tel:1800931678" className="font-semibold text-afca-blue hover:text-afca-navy">
              1800 931 678
            </a>{" "}
            and we will arrange an interpreter.
          </p>
          <ul className="space-y-3 text-sm sm:text-base text-afca-gray">
            {interpreterContacts.map((item) => (
              <li key={item.label} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="font-medium text-afca-navy sm:w-44 shrink-0">{item.label}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-afca-blue hover:text-afca-navy font-medium"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-afca-muted">
            For internet relay, enter our number 1800 931 678 and click &ldquo;Connect now&rdquo;.
          </p>
        </aside>
      </section>
    </div>
  );
}
