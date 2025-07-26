import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import icons from '@/lib/icons';
import { Metadata } from 'next';

export default async function Page({ params: paramsPromise }: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await paramsPromise;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const Icon = page.data.icon ? icons[page.data.icon] : null;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>
        <span className="flex gap-4 items-center">
          {Icon && <Icon />} {page.data.title}
        </span>
      </DocsTitle>

      {page.data.description && (
        <DocsDescription>
          <span className="flex items-center gap-1 text-sm text-muted-foreground italic mt-1 -mb-2">
            {page.data.description}
          </span>
        </DocsDescription>
      )}

      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}


export async function generateMetadata({ params }: {
  params: Promise<{
      lang: string,
      slug?: string[]
  }>
}) {
  const { slug=[], lang } = await params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  
  const images = {
    alt: "Banner",
    url: `/docs-og/${slug.join("/")}/image.png`,
    width: 1200,
    height: 630
  };

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images,
    },
    twitter: {
      card: "summary_large_image",
      images,
    },
  } satisfies Metadata;
}