import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { FeedbackForm } from "@/components/feedback-form";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sugestões - ShopEasy",
  description: "Tem uma ideia para o ShopEasy? Conte pra gente.",
  openGraph: {
    title: "Sugestões - ShopEasy",
    description: "Tem uma ideia para o ShopEasy? Conte pra gente.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/sugestoes`,
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export default function SugestoesPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-10 px-4 py-20">
      <FlareDecoration />

      <div className="flex flex-col items-center gap-3 max-w-xl motion-preset-expand motion-delay-[100ms]">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
          Sugestões
        </span>
        <h1 className={`${poppins.className} text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100`}>
          Tem uma ideia para o ShopEasy?
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Funcionalidades, melhorias, integrações... queremos ouvir. As melhores ideias entram
          nas próximas atualizações.
        </p>
      </div>

      <div className="motion-preset-expand motion-delay-[150ms] w-full flex justify-center">
        <FeedbackForm type="sugestao" accent="emerald" />
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  );
}
