import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Em breve - ShopEasy",
  description: "Algo novo está chegando.",
  openGraph: {
    title: "Em breve - ShopEasy",
    description: "Algo novo está chegando.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/app`,
  },
  twitter: {
    title: "Em breve - ShopEasy",
    description: "Algo novo está chegando.",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export default function AppPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-6 px-4">
      <FlareDecoration />

      <div className="flex flex-col items-center gap-4 motion-preset-expand motion-delay-[100ms]">
        <span
          className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}
        >
          Em breve
        </span>
        <h1
          className={`${poppins.className} text-4xl lg:text-6xl text-neutral-800 dark:text-neutral-100`}
        >
          Algo novo está chegando
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Esta página está sendo preparada. Fique de olho nas novidades.
        </p>
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn(
          "[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30",
        )}
      />
    </main>
  );
}
