import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { getPageContent, getAllPageSlugs } from "@/lib/content";

function buildBreadcrumbs(slug: string) {
  const parts = slug.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];

  let path = "";
  for (const part of parts) {
    path += `/${part}`;
    const page = getPageContent(path.slice(1));
    crumbs.push({
      label: page?.title ?? part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href: path,
    });
  }

  return crumbs;
}

export function generateStaticParams() {
  return getAllPageSlugs()
    .filter((slug) => slug !== "news/latest-news")
    .filter((slug) => slug !== "make-a-complaint/do-you-speak-another-language")
    .map((slug) => ({
      slug: slug.split("/"),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const content = getPageContent(path);

  if (!content) return { title: "Page not found" };

  return {
    title: content.title,
    description: content.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const content = getPageContent(path);

  if (!content) notFound();

  return <ContentPage content={content} breadcrumbs={buildBreadcrumbs(path)} path={path} />;
}
