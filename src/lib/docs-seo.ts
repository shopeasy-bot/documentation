import type { Metadata } from "next";
import { absoluteUrl, siteName } from "./site";

interface SeoPage {
  url: string;
  slugs: string[];
  data: { title: string; description?: string };
}

interface SeoSource<P extends SeoPage> {
  getPage(slugs?: string[]): P | undefined;
}

/** Endereço do Markdown da página (lido por IAs e pelo botão "Copiar Markdown"). */
export function markdownUrl(page: SeoPage) {
  return `/llms.mdx${page.url}`;
}

export function docsMetadata(
  page: SeoPage,
  image: { url: string },
  section: string,
): Metadata {
  const title = page.data.title;
  const description = page.data.description ?? `${title} na documentação do ${siteName}.`;
  const url = absoluteUrl(page.url);

  return {
    title,
    description,
    keywords: [title, section, "ShopEasy", "bot de vendas", "Discord", "documentação"],
    alternates: {
      canonical: url,
      types: { "text/markdown": absoluteUrl(markdownUrl(page)) },
    },
    openGraph: {
      type: "article",
      url,
      title: `${title} | ${siteName} Docs`,
      description,
      siteName,
      locale: "pt_BR",
      section,
      images: [{ url: image.url, width: 1430, height: 660, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName} Docs`,
      description,
      images: [image.url],
    },
  };
}

/** JSON-LD (TechArticle + BreadcrumbList) de uma página da documentação. */
export function docsJsonLd<P extends SeoPage>(
  page: P,
  source: SeoSource<P>,
  root: { name: string; url: string },
  image: { url: string },
) {
  const crumbs: { name: string; url: string }[] = [
    { name: siteName, url: absoluteUrl("/") },
    { name: root.name, url: absoluteUrl(root.url) },
  ];
  for (let i = 1; i <= page.slugs.length; i++) {
    const parent = source.getPage(page.slugs.slice(0, i));
    if (parent && parent.url !== root.url) {
      crumbs.push({ name: parent.data.title, url: absoluteUrl(parent.url) });
    }
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: page.data.title,
      description: page.data.description,
      url: absoluteUrl(page.url),
      image: absoluteUrl(image.url),
      inLanguage: "pt-BR",
      isPartOf: { "@type": "WebSite", name: `${siteName} Docs`, url: absoluteUrl(root.url) },
      publisher: {
        "@type": "Organization",
        name: siteName,
        logo: { "@type": "ImageObject", url: absoluteUrl("/shopeasy.svg") },
      },
      encoding: {
        "@type": "MediaObject",
        encodingFormat: "text/markdown",
        contentUrl: absoluteUrl(markdownUrl(page)),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ];
}
