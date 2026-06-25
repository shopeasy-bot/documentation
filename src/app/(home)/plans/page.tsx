import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FiCheck, FiX, FiShield, FiChevronDown } from "react-icons/fi";
import { FaArrowRight, FaYoutube } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import settings from "@/../settings.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos - ShopEasy",
  description: "Escolha o plano ideal para sua loja no Discord. Do gratuito ao premium, com recursos para todo tamanho de negócio.",
  openGraph: {
    title: "Planos - ShopEasy",
    description: "Escolha o plano ideal para sua loja no Discord. Do gratuito ao premium, com recursos para todo tamanho de negócio.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/plans`,
  },
  twitter: {
    title: "Planos - ShopEasy",
    description: "Escolha o plano ideal para sua loja no Discord. Do gratuito ao premium, com recursos para todo tamanho de negócio.",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const howItWorks = [
  {
    number: "01",
    title: "Escolha seu plano",
    description: "Selecione o plano que melhor encaixa no tamanho da sua operação — ou comece de graça.",
  },
  {
    number: "02",
    title: "Instale o bot no Discord",
    description: "Adicione o ShopEasy ao seu servidor e configure em minutos com comandos simples.",
  },
  {
    number: "03",
    title: "Comece a vender",
    description: "Crie produtos, defina preços e receba pagamentos via PIX ou cartão automaticamente.",
  },
];

const faqs = [
  {
    question: "Posso começar de graça mesmo?",
    answer: "Sim. O Plano Básico é 100% gratuito, sem limite de vendas e sem prazo de expiração. Você pode usar o ShopEasy para sempre sem pagar nada.",
  },
  {
    question: "Existe taxa sobre as minhas vendas?",
    answer: "Não. Nenhum plano cobra comissão sobre vendas. Tudo que você vende fica 100% com você.",
  },
  {
    question: "Como funciona o pagamento do plano?",
    answer: "Os planos são cobrados mensalmente via PIX ou cartão de crédito. Você pode cancelar a qualquer momento sem multa ou fidelidade.",
  },
  {
    question: "O que é o bot exclusivo do Plano Completo?",
    answer: "No Plano Completo você recebe um bot com o nome e identidade visual da sua loja, sem nenhuma menção ao ShopEasy — parece que você mesmo desenvolveu.",
  },
  {
    question: "Preciso saber programar para usar?",
    answer: "Não. O ShopEasy foi criado para ser simples. Tudo é configurado por comandos no Discord e menus interativos, sem nenhuma linha de código.",
  },
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento pelo bot, com o comando /plano gerenciar.",
  },
];

const cardTones = [
  "bg-neutral-100/5 dark:bg-neutral-900/20 border-neutral-200/10 dark:border-neutral-800/50",
  "bg-neutral-100/5 dark:bg-neutral-900/20 border-neutral-200/10 dark:border-neutral-800/50",
  "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/20 shadow-2xl",
  "bg-neutral-100/5 dark:bg-neutral-900/20 border-neutral-200/10 dark:border-neutral-800/50",
];

export default function PlansPage() {
  const regularPlans = settings.plans.filter((plan) => !plan.enterprise);
  const enterprisePlan = settings.plans.find((plan) => plan.enterprise);

  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-12 px-4 pb-16">
      <FlareDecoration />

      {/* HEADER */}
      <div className="max-w-2xl flex flex-col items-center gap-3 pt-20 motion-preset-expand motion-delay-[100ms]">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
          +5.000 lojas no Discord
        </span>
        <h1 className={`${poppins.className} text-3xl lg:text-5xl text-neutral-800 dark:text-neutral-100`}>
          Escolha o plano ideal para sua loja
        </h1>
        <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400 max-w-xl">
          Comece de graça e evolua quando quiser. Sem comissão sobre vendas, em nenhum plano.
        </p>
      </div>

      {/* PRICING CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full motion-preset-expand motion-delay-[200ms]">
        {regularPlans.map((plan, index) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col p-6 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]",
              cardTones[index],
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-500 text-white px-4 py-1">
                  Mais Vendido
                </Badge>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className={`${poppins.className} text-2xl font-bold mb-2`}>
                {plan.name}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">
                {plan.description}
              </p>

              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className={`${jetbrains.className} font-bold text-4xl`}>
                  {plan.price}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">
                  {plan.period}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  {feature.enabled ? (
                    <FiCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <FiX className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}

                  <span
                    className={cn(
                      "text-sm",
                      feature.enabled
                        ? "text-neutral-600 dark:text-neutral-300"
                        : "text-neutral-400 line-through",
                    )}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.price === "Grátis" ? "/invite" : `/adquirir?plan=${plan.name.toLowerCase()}`}
              target="_self"
              className={cn(
                `${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl overflow-hidden font-medium shadow-lg transition-all hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 w-full`,
                plan.popular
                  ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white hover:shadow-emerald-500/30 border border-emerald-500/20"
                  : "bg-neutral-100/10 backdrop-blur-sm text-neutral-700 dark:text-slate-50 border border-neutral-200/20 dark:border-neutral-800/50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50",
              )}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
              <span className="relative z-10">
                {plan.price === "Grátis" ? "Começar Grátis" : "Assinar agora"}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* ENTERPRISE */}
      {enterprisePlan && (
        <div className="relative w-full max-w-6xl rounded-3xl border border-neutral-300/30 dark:border-neutral-700/40 bg-neutral-900/[0.03] dark:bg-neutral-950/60 backdrop-blur-sm p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6 motion-preset-expand motion-delay-[250ms]">
          <div className="flex-1 flex flex-col gap-3 text-left">
            <div className="flex items-center gap-3">
              <h3 className={`${poppins.className} text-2xl font-bold`}>{enterprisePlan.name}</h3>
              <Badge className="bg-neutral-700 dark:bg-neutral-200 text-white dark:text-neutral-900 px-3 py-1">
                Personalizado
              </Badge>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg">
              {enterprisePlan.description}
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 mt-1">
              {enterprisePlan.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                  <FiCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 w-full lg:w-auto lg:min-w-[200px] lg:border-l lg:border-neutral-300/20 dark:lg:border-neutral-700/40 lg:pl-8">
            <div className="flex flex-col items-center gap-1">
              <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-neutral-400 dark:text-neutral-500`}>
                Investimento
              </span>
              <span className={`${poppins.className} text-xl font-semibold text-neutral-800 dark:text-neutral-100`}>
                {enterprisePlan.price}
              </span>
            </div>
            <Link
              href="/support"
              target="_blank"
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl overflow-hidden font-medium shadow-lg transition-all hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 bg-neutral-100/10 backdrop-blur-sm text-neutral-700 dark:text-slate-50 border border-neutral-200/20 dark:border-neutral-800/50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50 whitespace-nowrap w-full sm:w-auto`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
              <span className="relative z-10">Fale com a gente</span>
              <FaArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}

      {/* HOW IT WORKS */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-6 motion-preset-expand motion-delay-[300ms]">
        <div className="flex flex-col items-center gap-2">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
            Como funciona
          </span>
          <h2 className={`${poppins.className} text-2xl text-neutral-800 dark:text-neutral-100`}>
            Venda no Discord em 3 passos
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {howItWorks.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 text-center"
            >
              <span className={`${jetbrains.className} text-3xl font-bold text-emerald-500/40`}>
                {step.number}
              </span>
              <h3 className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
                {step.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* YOUTUBE TUTORIAL */}
      <Link
        href="https://youtu.be/-bWY9WApNgU?si=A_PU75zHDMeZzykl"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 p-5 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 max-w-xl w-full motion-preset-expand motion-delay-[350ms]"
      >
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
          <FaYoutube className="w-5 h-5 text-red-400" />
        </div>
        <div className="text-left flex-1">
          <p className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
            Assista ao tutorial completo
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Aprenda a configurar sua loja do zero em menos de 10 minutos.
          </p>
        </div>
        <FaArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </Link>

      {/* FAQ */}
      <div className="w-full max-w-2xl flex flex-col gap-3 motion-preset-expand motion-delay-[400ms]">
        <h2 className={`${poppins.className} text-xl text-neutral-800 dark:text-neutral-100 mb-2`}>
          Perguntas frequentes
        </h2>
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group border border-neutral-200/10 dark:border-neutral-800/50 rounded-2xl bg-neutral-100/5 dark:bg-neutral-900/20 overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-left select-none">
              <span className={`${poppins.className} text-sm text-neutral-700 dark:text-neutral-200`}>
                {faq.question}
              </span>
              <FiChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-left leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>

      {/* TRUST STRIP */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 motion-preset-expand motion-delay-[200ms]">
        <span className="flex items-center gap-1.5">
          <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
          0% de comissão em todos os planos
        </span>
        <span className="flex items-center gap-1.5">
          <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
          Cancele quando quiser
        </span>
        <span className="flex items-center gap-1.5">
          <FiShield className="w-3.5 h-3.5 text-emerald-500" />
          Pagamento seguro
        </span>
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
