import { blog } from "@/lib/sourcer";
import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import type { Metadata } from "next";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: `${page.data.title} — Blog ShopEasy`,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.url}`,
      type: "article",
      publishedTime: page.data.date?.toISOString(),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page.url}`,
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start text-center gap-12 px-4 min-h-screen pt-20 pb-20">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />

      <div className="max-w-3xl w-full text-left motion-preset-expand motion-delay-[100ms]">
        <Link
          href="/blog"
          className={`${jetbrains.className} text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-400 transition-colors duration-300 mb-8 inline-block`}
        >
          ← Voltar para o blog
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {page.data.date && (
            <span className={`${jetbrains.className} flex items-center gap-1.5 text-xs text-neutral-500`}>
              <FiCalendar className="w-3 h-3" />
              {new Date(page.data.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          )}
          {page.data.tags?.map((tag) => (
            <span
              key={tag}
              className={`${jetbrains.className} text-xs px-2.5 py-1 rounded-full bg-neutral-100/10 dark:bg-neutral-800/50 border border-neutral-200/20 dark:border-neutral-700/50 text-neutral-500 dark:text-neutral-400`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1
          className={`${poppins.className} text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          {page.data.title}
        </h1>

        {page.data.description && (
          <p className="text-lg font-light text-neutral-600 dark:text-neutral-300 mb-8 border-b border-neutral-200/10 dark:border-neutral-800/50 pb-8">
            {page.data.description}
          </p>
        )}

        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>

        <div className="mt-12 pt-8 border-t border-neutral-200/10 dark:border-neutral-800/50">
          <Link
            href="/blog"
            className={`${jetbrains.className} text-sm text-neutral-500 dark:text-neutral-400 hover:text-emerald-400 transition-colors duration-300`}
          >
            ← Ver todas as atualizações
          </Link>
        </div>
      </div>
    </main>
  );
}
