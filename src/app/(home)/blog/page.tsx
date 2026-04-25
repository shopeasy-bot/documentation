import { blog } from "@/lib/sourcer";
import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - ShopEasy",
  description: "Fique por dentro das novidades, atualizações e melhorias da plataforma ShopEasy.",
  openGraph: {
    title: "Blog - ShopEasy",
    description: "Fique por dentro das novidades, atualizações e melhorias da plataforma ShopEasy.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
  },
  twitter: {
    title: "Blog - ShopEasy",
    description: "Fique por dentro das novidades, atualizações e melhorias da plataforma ShopEasy.",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export default function BlogPage() {
  const posts = blog.getPages().sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  const [featured, ...rest] = posts;

  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />

      <div className="flex flex-col items-center gap-4 motion-preset-expand motion-delay-[100ms] pt-20">
        <h1
          className={`${poppins.className} text-4xl lg:text-7xl uppercase bg-gradient-to-r
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          Blog
        </h1>
        <p className="text-lg lg:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
          Acompanhe todas as{" "}
          <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            novidades
          </span>{" "}
          e atualizações da plataforma.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl w-full motion-preset-expand motion-delay-[200ms]">
        {/* Featured */}
        {featured && (
          <Link
            href={featured.url}
            className={cn(
              "group relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] text-left",
              "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/20 shadow-2xl",
            )}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`${jetbrains.className} text-xs px-3 py-1 rounded-full bg-emerald-500 text-white`}>
                Mais recente
              </span>
              {featured.data.tags?.map((tag) => (
                <span key={tag} className={`${jetbrains.className} text-xs px-2.5 py-1 rounded-full bg-neutral-100/10 dark:bg-neutral-800/50 border border-neutral-200/20 dark:border-neutral-700/50 text-neutral-500 dark:text-neutral-400`}>
                  {tag}
                </span>
              ))}
            </div>

            <h2 className={`${poppins.className} text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-400 transition-colors duration-200 mb-2`}>
              {featured.data.title}
            </h2>

            {featured.data.description && (
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                {featured.data.description}
              </p>
            )}

            {featured.data.date && (
              <span className={`${jetbrains.className} flex items-center gap-1.5 text-xs text-neutral-500`}>
                <FiCalendar className="w-3 h-3" />
                {new Date(featured.data.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            )}
          </Link>
        )}

        {/* Rest */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className={cn(
                  "group relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 text-left",
                  "bg-neutral-100/5 border-neutral-200/10 dark:border-neutral-800/50",
                )}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {post.data.tags?.map((tag) => (
                    <span key={tag} className={`${jetbrains.className} text-xs px-2.5 py-1 rounded-full bg-neutral-100/10 dark:bg-neutral-800/50 border border-neutral-200/20 dark:border-neutral-700/50 text-neutral-500 dark:text-neutral-400`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-400 transition-colors duration-200 mb-2`}>
                  {post.data.title}
                </h2>

                {post.data.description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                    {post.data.description}
                  </p>
                )}

                {post.data.date && (
                  <span className={`${jetbrains.className} flex items-center gap-1.5 text-xs text-neutral-500`}>
                    <FiCalendar className="w-3 h-3" />
                    {new Date(post.data.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  );
}
