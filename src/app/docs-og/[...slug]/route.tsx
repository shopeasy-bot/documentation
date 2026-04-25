import { botSource, devSource } from "@/lib/sourcer";
import { notFound } from "next/navigation";
import { generateOGImage } from "./og";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const isDevPage = slug[0] === 'dev';
  const source = isDevPage ? devSource : botSource;
  const pageSlug = isDevPage ? slug.slice(1, -1) : slug.slice(0, -1);

  const page = source.getPage(pageSlug);
  if (!page) notFound();

  const { title, description, icon } = page.data;

  return generateOGImage({ title, description, icon, site: "ShopEasy" });
}

export function generateStaticParams() {
  return [
    ...botSource.generateParams().map((p) => ({
      slug: [...(p.slug ?? []), 'image.png'],
    })),
    ...devSource.generateParams().map((p) => ({
      slug: ['dev', ...(p.slug ?? []), 'image.png'],
    })),
  ];
}
