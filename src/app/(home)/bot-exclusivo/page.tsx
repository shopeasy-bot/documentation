import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import {
  FiCamera,
  FiEdit3,
  FiImage,
  FiZap,
  FiStar,
  FiShield,
  FiCheck,
  FiLock,
} from "react-icons/fi";
import { MdOutlineSmartToy } from "react-icons/md";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bot Exclusivo - ShopEasy",
  description: "Um bot 100% personalizado para o seu servidor Discord.",
  robots: { index: false, follow: false },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const features = [
  {
    icon: <FiCamera className="w-5 h-5" />,
    title: "Foto personalizada",
    description: "Defina o avatar do bot com a identidade visual da sua marca.",
  },
  {
    icon: <FiEdit3 className="w-5 h-5" />,
    title: "Nome exclusivo",
    description: "O bot aparece com o nome que você escolher para o servidor.",
  },
  {
    icon: <FiImage className="w-5 h-5" />,
    title: "Banner próprio",
    description: "Adicione um banner ao perfil do bot com a cara do seu negócio.",
  },
  {
    icon: <FiZap className="w-5 h-5" />,
    title: "Status customizado",
    description: 'Configure a atividade exibida no bot (ex: "Gerenciando vendas").',
  },
  {
    icon: <FiEdit3 className="w-5 h-5" />,
    title: "Descrição personalizada",
    description: "Escreva uma bio exclusiva que aparece no perfil do bot.",
  },
  {
    icon: <FiShield className="w-5 h-5" />,
    title: "Token próprio",
    description: "O bot roda com o seu próprio token Discord — independência total.",
  },
];

function BotMockup() {
  return (
    <div className="relative flex items-center justify-center select-none">
      <div className="absolute w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Discord profile card */}
      <div className="relative w-72 rounded-2xl border border-neutral-700/60 bg-neutral-950 shadow-2xl overflow-hidden">
        {/* banner */}
        <div className="h-20 bg-gradient-to-br from-emerald-500/40 via-emerald-600/20 to-neutral-900 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.3),transparent_70%)]" />
          {/* verified badge top right */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-sm">
            <FiStar className="w-2.5 h-2.5 text-emerald-400" />
            <span className={`${jetbrains.className} text-[9px] text-emerald-400`}>Exclusivo</span>
          </div>
        </div>

        {/* avatar */}
        <div className="px-4 pb-4">
          <div className="relative -mt-8 mb-3 w-fit">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-4 border-neutral-950 flex items-center justify-center shadow-lg">
              <MdOutlineSmartToy className="w-8 h-8 text-white" />
            </div>
            {/* online indicator */}
            <div className="absolute bottom-1 right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-neutral-950" />
          </div>

          {/* name + bot badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className={`${poppins.className} text-base font-semibold text-white`}>
              SuaLoja Bot
            </span>
            <span className={`${jetbrains.className} text-[9px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold tracking-wide`}>
              BOT
            </span>
          </div>

          {/* username */}
          <p className={`${jetbrains.className} text-xs text-neutral-400 mb-3`}>
            @sualoja
          </p>

          {/* status */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className={`${jetbrains.className} text-xs text-neutral-400`}>
              Gerenciando vendas ✨
            </span>
          </div>

          {/* divider */}
          <div className="h-px bg-neutral-800 mb-3" />

          {/* bio */}
          <p className={`${poppins.className} text-xs text-neutral-400 leading-relaxed mb-3`}>
            Bot oficial da SuaLoja. Automatizamos suas vendas no Discord com segurança e praticidade.
          </p>

          {/* divider */}
          <div className="h-px bg-neutral-800 mb-3" />

          {/* member since */}
          <div className="flex flex-col gap-0.5">
            <span className={`${jetbrains.className} text-[10px] text-neutral-500 uppercase tracking-wider`}>
              Membro desde
            </span>
            <span className={`${jetbrains.className} text-xs text-neutral-300`}>
              Jan 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BotExclusivoPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start min-h-screen pt-24 pb-20 px-6 gap-24">
      <FlareDecoration />

      {/* HERO */}
      <section className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-16 motion-preset-expand motion-delay-[100ms]">
        {/* left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl">
          <span
            className={`${jetbrains.className} flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-wide w-fit`}
          >
            <FiLock className="w-3 h-3" />
            Apenas Plano Completo
          </span>

          <h1
            className={`${poppins.className} text-5xl lg:text-7xl uppercase bg-gradient-to-r
              dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
              tracking-tight leading-none`}
          >
            Bot
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Exclusivo
            </span>
          </h1>

          <p className={`${poppins.className} text-base lg:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
            Um bot 100% personalizado com a cara do seu servidor. Foto, nome, banner, status
            e muito mais — tudo configurado para a sua marca.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              href="/plans"
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 w-full sm:w-auto`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-500" />
              <FiStar className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Ver Planos</span>
            </Link>

            <div className={`${jetbrains.className} flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500`}>
              <FiCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              Incluso no Plano Completo
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex-shrink-0">
          <BotMockup />
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full max-w-6xl motion-preset-expand motion-delay-[200ms]">
        <div className="text-center mb-12">
          <h2 className={`${poppins.className} text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100`}>
            O que você pode personalizar
          </h2>
          <p className={`${poppins.className} mt-2 text-sm text-neutral-500 dark:text-neutral-500`}>
            Controle total sobre a identidade do bot no seu servidor
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20">
                {f.icon}
              </div>
              <div>
                <h3 className={`${poppins.className} text-sm font-semibold mb-1 text-neutral-800 dark:text-neutral-100`}>
                  {f.title}
                </h3>
                <p className={`${poppins.className} text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-2xl motion-preset-expand motion-delay-[300ms]">
        <div className="relative flex flex-col items-center text-center gap-6 p-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <MdOutlineSmartToy className="w-6 h-6 text-emerald-400" />
            </div>

            <div>
              <h3 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2`}>
                Disponível no Plano Completo
              </h3>
              <p className={`${poppins.className} text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                Assine o Plano Completo e tenha um bot com a identidade total do seu servidor,
                sem dividir com ninguém.
              </p>
            </div>

            <Link
              href="/plans"
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white text-sm font-medium shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
              <span className="relative z-10">Assinar Plano Completo</span>
            </Link>
          </div>
        </div>
      </section>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  );
}
