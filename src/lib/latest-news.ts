import articlesData from "./latest-news-articles.json";

export type LatestNewsArticle = {
  href: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
};

export const latestNewsArticles = articlesData as LatestNewsArticle[];

export const PAGE_SIZE = 10;

export function getLatestNewsPage(page: number) {
  const totalPages = Math.max(1, Math.ceil(latestNewsArticles.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  return {
    articles: latestNewsArticles.slice(start, start + PAGE_SIZE),
    currentPage,
    totalPages,
    totalArticles: latestNewsArticles.length,
  };
}

export const featuredNews = latestNewsArticles.slice(0, 3);
