import { FlareDecoration } from "@/components/decoration/Flare";
import { GridDecoration } from "@/components/decoration/Grid";
import { cn } from "@/lib/cn";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/contacts";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidade - ShopEasy",
  description: "Acompanhe os avisos e atualizações do ShopEasy pelo WhatsApp.",
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

export default function DiscordPage() {
  return (
    <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-20 text-center">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />

      <section className="flex max-w-xl flex-col items-center gap-6 rounded-3xl border border-neutral-200/10 bg-neutral-100/5 p-8 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-900/20 md:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
          <FiAlertCircle className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-3">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-amber-500`}>
            Aviso importante
          </span>
          <h1 className={`${poppins.className} text-3xl text-neutral-800 dark:text-neutral-100 md:text-4xl`}>
            Não temos mais servidor no Discord
          </h1>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Nossa comunidade agora recebe avisos, novidades e atualizações pelo canal oficial no WhatsApp.
          </p>
        </div>
        <Link
          href={WHATSAPP_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${poppins.className} inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600`}
        >
          <FaWhatsapp className="h-5 w-5" />
          Acessar comunidade no WhatsApp
        </Link>
        <Link href="/support" className="text-xs text-neutral-500 transition-colors hover:text-emerald-400">
          Precisa de ajuda? Fale com o suporte
        </Link>
      </section>
    </main>
  );
}
