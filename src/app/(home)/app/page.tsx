import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FiDownload, FiAlertTriangle, FiCheckCircle, FiShield, FiZap, FiPackage } from "react-icons/fi";
import { FaAndroid } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Android - ShopEasy",
  description: "Baixe o app ShopEasy para Android e gerencie sua loja, acompanhe vendas e atenda clientes direto do celular.",
  openGraph: {
    title: "App Android - ShopEasy",
    description: "Baixe o app ShopEasy para Android e gerencie sua loja, acompanhe vendas e atenda clientes direto do celular.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/app`,
  },
  twitter: {
    title: "App Android - ShopEasy",
    description: "Baixe o app ShopEasy para Android e gerencie sua loja, acompanhe vendas e atenda clientes direto do celular.",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const steps = [
  {
    number: "01",
    title: "Baixe o APK",
    description: "Clique no botão e faça o download do arquivo APK oficial do ShopEasy.",
    icon: <FiDownload className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "Fontes desconhecidas",
    description: 'Vá em Configurações → Segurança e ative "Instalar de fontes desconhecidas".',
    icon: <FiShield className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "Instale o APK",
    description: "Abra o arquivo no gerenciador de arquivos e toque em Instalar.",
    icon: <FiPackage className="w-5 h-5" />,
  },
  {
    number: "04",
    title: "Comece a vender",
    description: "Faça login com sua conta ShopEasy e gerencie sua loja de onde estiver.",
    icon: <FiZap className="w-5 h-5" />,
  },
];

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center select-none">
      {/* outer glow */}
      <div className="absolute w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl" />

      {/* phone frame */}
      <div className="relative w-52 h-96 rounded-[2.5rem] border-2 border-neutral-700/60 bg-neutral-950 shadow-2xl overflow-hidden flex flex-col">
        {/* notch */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-20 h-4 rounded-full bg-neutral-800" />
        </div>

        {/* screen content */}
        <div className="flex-1 flex flex-col px-4 py-3 gap-3 overflow-hidden">
          {/* header bar */}
          <div className="flex items-center justify-between">
            <div className="w-16 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-6 h-6 rounded-full bg-emerald-500/30 border border-emerald-500/40" />
          </div>

          {/* balance card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 p-3 flex flex-col gap-1.5">
            <div className="w-10 h-1.5 rounded-full bg-emerald-400/40" />
            <div className="w-20 h-4 rounded-full bg-emerald-400/60" />
            <div className="w-14 h-2 rounded-full bg-emerald-400/30 mt-1" />
          </div>

          {/* list items */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-neutral-800 flex-shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <div
                  className="h-2 rounded-full bg-neutral-700"
                  style={{ width: `${55 + i * 10}%` }}
                />
                <div className="h-1.5 rounded-full bg-neutral-800 w-2/3" />
              </div>
              <div className="w-8 h-2 rounded-full bg-emerald-500/30" />
            </div>
          ))}

          {/* bottom nav */}
          <div className="mt-auto flex justify-around pt-2 border-t border-neutral-800">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-5 h-5 rounded-lg",
                  i === 0 ? "bg-emerald-500/50" : "bg-neutral-800",
                )}
              />
            ))}
          </div>
        </div>

        {/* home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-20 h-1 rounded-full bg-neutral-700" />
        </div>
      </div>

      {/* floating badge */}
      <div
        className={`${jetbrains.className} absolute -bottom-3 -right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-semibold shadow-lg shadow-emerald-500/30`}
      >
        <FaAndroid className="w-3 h-3" />
        Android APK
      </div>
    </div>
  );
}

export default function AppPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start min-h-screen pt-24 pb-20 px-6 gap-24">
      <FlareDecoration />

      {/* ── HERO ── */}
      <section className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-16 motion-preset-expand motion-delay-[100ms]">
        {/* left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl">
          <span
            className={`${jetbrains.className} flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-wide w-fit`}
          >
            <FaAndroid className="w-3.5 h-3.5" />
            Somente Android por enquanto
          </span>

          <h1
            className={`${poppins.className} text-5xl lg:text-7xl uppercase bg-gradient-to-r
              dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
              tracking-tight leading-none`}
          >
            App
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              ShopEasy
            </span>
          </h1>

          <p className={`${poppins.className} text-base lg:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
            Gerencie sua loja, acompanhe vendas e cuide dos seus clientes direto do celular.
            Disponível via APK para Android.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              href="https://github.com/shopeasy-bot/mobile/releases/download/v1.0.0/application-749d219e-e3e8-4a82-a3a7-cfd11235e768.apk"
              target="_blank"
              rel="noopener noreferrer"
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 w-full sm:w-auto`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-500" />
              <FiDownload className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Baixar APK</span>
            </Link>

            <div className={`${jetbrains.className} flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500`}>
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              Arquivo oficial verificado
            </div>
          </div>
        </div>

        {/* right — phone mockup */}
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="w-full max-w-6xl motion-preset-expand motion-delay-[200ms]">
        <div className="text-center mb-12">
          <h2 className={`${poppins.className} text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100`}>
            Como instalar
          </h2>
          <p className={`${poppins.className} mt-2 text-sm text-neutral-500 dark:text-neutral-500`}>
            4 passos simples para começar
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* connector line — desktop only */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5 group"
            >
              {/* icon circle */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20 z-10">
                {step.icon}
                <span
                  className={`${jetbrains.className} absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] flex items-center justify-center font-bold`}
                >
                  {i + 1}
                </span>
              </div>

              <div>
                <h3 className={`${poppins.className} text-sm font-semibold mb-1 text-neutral-800 dark:text-neutral-100`}>
                  {step.title}
                </h3>
                <p className={`${poppins.className} text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WARNING ── */}
      <div className="w-full max-w-2xl motion-preset-expand motion-delay-[300ms]">
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
            <FiAlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-left">
            <p className={`${jetbrains.className} text-sm text-yellow-400 font-semibold mb-1`}>
              Atenção
            </p>
            <p className={`${poppins.className} text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
              Por ser externo à Play Store, o Android pode exibir um aviso de segurança.
              O app é seguro — baixe apenas pelo link oficial desta página.
            </p>
          </div>
        </div>
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  );
}
