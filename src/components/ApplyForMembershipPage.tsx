"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Breadcrumbs } from "./Breadcrumbs";
import { ContentInlineLink } from "./ContentInlineLink";
import { ContentVideoEmbed } from "./ContentVideoEmbed";
import { MembershipFeeTable } from "./MembershipFeeTable";
import { MembershipTypeGuide } from "./MembershipTypeGuide";
import { PageBackLink, getParentCrumb } from "./PageBackLink";
import {
  acrMembershipOptions,
  licenseeMembershipTypes,
  membershipBenefits,
  membershipExplainerVideos,
  membershipFy27Fees,
} from "@/lib/apply-for-membership";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/lib/a11y";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Members", href: "/members" },
  { label: "Apply for membership", href: "/members/apply-for-membership" },
];

type MembershipChoice = "acr" | "licensee" | null;

function SectionCard({
  id,
  highlighted,
  children,
  className,
}: {
  id: string;
  highlighted: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 rounded-2xl border p-5 sm:p-6 transition-shadow",
        highlighted
          ? "border-afca-blue bg-afca-cream/60 shadow-md shadow-afca-blue/10"
          : "border-afca-navy/10 bg-white",
        className
      )}
    >
      {children}
    </section>
  );
}

export function ApplyForMembershipPage() {
  const [highlight, setHighlight] = useState<MembershipChoice>(null);
  const parent = getParentCrumb(breadcrumbs);

  useEffect(() => {
    if (!highlight) return;
    const target = document.getElementById(
      highlight === "acr" ? "acr-membership" : "licensee-membership"
    );
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [highlight]);

  return (
    <div>
      <section className="relative overflow-hidden bg-afca-navy text-white">
        <div className="absolute inset-0 hero-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-afca-navy via-afca-navy to-afca-blue/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16">
          {parent && <PageBackLink href={parent.href} label={parent.label} />}
          <Breadcrumbs items={breadcrumbs} className="mb-5 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-balance leading-tight">
            Apply for membership
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <div className="surface-card rounded-2xl border-l-4 border-l-afca-sky p-5 sm:p-6 mb-10">
          <p className="text-sm sm:text-base text-afca-gray leading-relaxed">
            The Australian Financial Complaints Authority has been authorised as the single external
            dispute resolution scheme for scam complaints under the Scams Prevention Framework,
            effective from 1 July 2026.
          </p>
          <p className="mt-3 text-sm sm:text-base text-afca-gray leading-relaxed">
            Organisations designated under the Framework are required to be AFCA members from 1
            September 2026. Membership applications open 1 July 2026, and early application is
            encouraged to support onboarding ahead of this requirement.
          </p>
          <p className="mt-3 text-sm sm:text-base text-afca-gray leading-relaxed">
            For newly designated sectors, information on how to become an AFCA member can be{" "}
            <ContentInlineLink
              label="found here"
              href="/spf-edr-applications-open-for-membership-1-july-2026"
            />
            .
          </p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
            Membership with AFCA
          </h2>
          <div className="prose-afca space-y-4 text-sm sm:text-base text-afca-gray leading-relaxed">
            <p>
              The Australian Financial Complaints Authority (AFCA) is an external dispute resolution
              scheme that considers and resolves complaints from consumers and small businesses about
              financial products or services.
            </p>
            <p>
              Eligibility for AFCA membership is subject to certain requirements outlined in{" "}
              <ContentInlineLink
                label="AFCA’s Constitution"
                href="/about-afca/corporate-information/constitution"
              />
              . Before applying for AFCA membership please read the Constitution carefully.
            </p>
          </div>
          <div className="mt-6">
            <Button
              href="https://member.afca.org.au/Account/Login"
              variant="orange"
              size="lg"
              external
            >
              Apply for membership
            </Button>
          </div>
        </section>

        <MembershipTypeGuide onHighlight={setHighlight} />

        <div className="space-y-8">
          <SectionCard
            id="acr-membership"
            highlighted={highlight === "acr"}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
              Authorised Credit Representative Membership (Company or Individual)
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-afca-gray leading-relaxed">
              <p>
                The Authorised Credit Representative (ACR) membership is for representatives (Company
                or Individual) that have been appointed by a credit licensee or aggregator to engage in
                specified credit activities.
              </p>
              <p>Authorised Credit Representatives can apply for AFCA membership as an:</p>
              <ul className="list-disc pl-5 space-y-1">
                {acrMembershipOptions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                If you require both an individual and company membership, you will need to submit two
                separate applications.
              </p>
              <p>
                If you are unsure which membership you require, please confirm with your
                licensee/aggregator before applying.
              </p>
              <p>
                If you are unsure whether you currently hold an AFCA membership as an ACR, you can{" "}
                <ContentInlineLink
                  label="search your details here"
                  href="https://my.afca.org.au/ff-search/"
                  external
                />
                .
              </p>
            </div>
            <div
              className="mt-5 rounded-xl border border-afca-orange/30 bg-afca-orange/5 px-4 py-3 text-sm text-afca-navy"
              role="note"
            >
              <p className="font-semibold mb-1">Important</p>
              <p className="leading-relaxed">
                Please ensure you select the correct membership type (individual or company) when
                applying for membership with AFCA. AFCA is generally unable to change membership type
                once the application has been approved. If you are an existing member and your
                membership type has changed, please contact{" "}
                <ContentInlineLink
                  label="membership@afca.org.au"
                  href="mailto:membership@afca.org.au"
                />{" "}
                to discuss your options.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            id="licensee-membership"
            highlighted={highlight === "licensee"}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
              Licensee Membership
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-afca-gray leading-relaxed">
              <p>
                The Licensee membership is for relevant Australian financial firms that have an
                obligation to be a member of AFCA as part of their licensing conditions.
              </p>
              <p>
                Being a member of AFCA ensures you meet your licensing requirement to be a member of an
                external dispute resolution scheme when you are operating your business and providing a
                financial product or service to consumers and/or small businesses.
              </p>
              <p>This includes if you hold, or you are applying for an:</p>
              <ul className="list-disc pl-5 space-y-1">
                {licenseeMembershipTypes.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>
                AFCA membership is also open to other industry participants in the financial services
                and superannuation industries (and related industries), who are legally required or wish
                to become an AFCA member, for the purpose of providing their customers with access to
                AFCA&apos;s independent external dispute resolution services.
              </p>
              <p>These can include:</p>
              <ul className="list-disc pl-5 space-y-1">
                {licenseeMembershipTypes.slice(3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        <section className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
            Application fees
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-afca-gray leading-relaxed mb-6">
            <p>
              All members will pay a single application fee when they apply for AFCA membership. This
              fee is charged at the time of application and covers AFCA membership until 31 July.
            </p>
            <p>
              Membership applications that are submitted up to the end of May each year will also
              receive a renewal fee for the upcoming financial year.
            </p>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-afca-navy mb-4">{membershipFy27Fees.heading}</h3>
          <MembershipFeeTable />
          <p className="mt-4 text-sm text-afca-muted">{membershipFy27Fees.note}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-5 tracking-tight">
            Explainer videos — applying for membership in the member portal
          </h2>
          <div className="space-y-6">
            {membershipExplainerVideos.map((video) => (
              <ContentVideoEmbed key={video.src} embed={video} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
            Processing timeframes
          </h2>
          <p className="text-sm sm:text-base text-afca-gray leading-relaxed">
            After your membership application has been received and payment is successfully processed
            (please allow 5–7 business days), we will provide the nominated principal contact (for
            example, CEO or Admin contact) a confirmation email of approved membership. This email will
            contain details on how to manage your membership with AFCA, as well as information regarding
            our dispute resolution process and complaint fees, which will apply for complaints we
            receive in accordance with{" "}
            <ContentInlineLink label="our Rules" href="/about-afca/rules-and-guidelines/rules" />.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
            Benefits of AFCA membership
          </h2>
          <p className="text-sm sm:text-base text-afca-gray leading-relaxed mb-6">
            There are benefits to being a member with AFCA for financial firms.
          </p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {membershipBenefits.map((benefit) => (
              <li
                key={benefit.title}
                className="surface-card rounded-2xl border border-afca-navy/10 px-4 py-5 text-center"
              >
                <span className="text-sm sm:text-base font-semibold text-afca-navy">
                  {benefit.title}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-afca-navy mb-4 tracking-tight">
            More information
          </h2>
          <p className="text-sm sm:text-base text-afca-gray leading-relaxed">
            For more information about membership with AFCA, please email our membership team on{" "}
            <ContentInlineLink
              label="membership@afca.org.au"
              href="mailto:membership@afca.org.au"
            />{" "}
            or phone{" "}
            <a href="tel:1300565562" className={cn("font-semibold text-afca-blue hover:text-afca-navy", FOCUS_RING)}>
              1300 56 55 62
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
