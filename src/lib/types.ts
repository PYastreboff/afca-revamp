export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  links?: { label: string; href: string; external?: boolean }[];
  embeds?: { src: string; title?: string }[];
};

export type PageContent = {
  title: string;
  description?: string;
  hero?: string;
  sections: ContentSection[];
  relatedLinks?: { label: string; href: string }[];
};
