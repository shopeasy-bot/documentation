import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagamento confirmado - ShopEasy",
  description: "Seu pagamento foi confirmado e o acesso ao curso foi liberado.",
  robots: { index: false, follow: false },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export default function CursoSucessoPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-8 min-h-screen px-6 py-12">
      <FlareDecoration />

      <div className="relative motion-preset-expand motion-delay-[100ms]">
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
          <FiCheck className="w-9 h-9 text-emerald-400" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 max-w-lg motion-preset-expand motion-delay-[200ms]">
        <h1 className={`${poppins.className} text-3xl lg:text-4xl text-neutral-800 dark:text-neutral-100`}>
          Pagamento confirmado!
        </h1>
        <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Seu acesso ao Curso de Vendas no Discord foi liberado. Em breve você recebe mais
          informações sobre como acessar o conteúdo.
        </p>
      </div>

      <Link
        href="/curso"
        className={`${jetbrains.className} group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-100/10 backdrop-blur-sm text-sm text-neutral-700 dark:text-slate-50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50 transition-all duration-300 motion-preset-expand motion-delay-[300ms]`}
      >
        Voltar para a página do curso
      </Link>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  );
}
