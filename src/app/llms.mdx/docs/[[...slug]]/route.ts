import { getLLMText } from '@/lib/get-llm-text';
import { botSource, devSource } from '@/lib/sourcer';
import { notFound } from 'next/navigation';

export const revalidate = false;

type Ctx = { params: Promise<{ slug?: string[] }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const isDevPath = slug?.[0] === 'dev';
  const source = isDevPath ? devSource : botSource;
  const pageSlug = isDevPath ? slug?.slice(1) : slug;

  const page = source.getPage(pageSlug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: { 'Content-Type': 'text/markdown' },
  });
}

export function generateStaticParams() {
  return [
    ...botSource.generateParams(),
    ...devSource.generateParams().map((p) => ({ slug: ['dev', ...(p.slug ?? [])] })),
  ];
}
