import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";
import { CourseAccessProvider, CourseCtaLink } from "./CourseCheckout";
import { JetBrains_Mono, Poppins } from "next/font/google";
import {
  FiCheck,
  FiChevronDown,
  FiPlay,
  FiPlayCircle,
  FiZap,
  FiLayers,
  FiClock,
  FiRadio,
  FiLock,
  FiGift,
  FiCalendar,
  FiUser,
  FiTool,
  FiTrendingUp,
  FiDollarSign,
  FiRepeat,
  FiUsers,
} from "react-icons/fi";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Curso de Vendas no Discord - ShopEasy",
  description:
    "Curso completo de vendas no Discord: 5 módulos, 20 aulas em vídeo e encontros ao vivo mensais. Garanta por R$ 10,90 na pré-venda — R$ 20,90 a partir do lançamento em 1º de outubro.",
  openGraph: {
    title: "Curso de Vendas no Discord - ShopEasy",
    description:
      "Curso completo de vendas no Discord: 5 módulos, 20 aulas em vídeo e encontros ao vivo mensais. Garanta por R$ 10,90 na pré-venda — R$ 20,90 a partir do lançamento em 1º de outubro.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/curso`,
  },
  twitter: {
    title: "Curso de Vendas no Discord - ShopEasy",
    description:
      "Curso completo de vendas no Discord: 5 módulos, 20 aulas em vídeo e encontros ao vivo mensais. Garanta por R$ 10,90 na pré-venda — R$ 20,90 a partir do lançamento em 1º de outubro.",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const LAUNCH_DATE = new Date(2026, 9, 1); // 1º de outubro de 2026
const LAUNCH_LABEL = "1º de outubro";

const audience = [
  {
    icon: <FiUser className="w-5 h-5" />,
    title: "Quem nunca vendeu no Discord",
    description: "Comece do zero, sem enrolação, seguindo um passo a passo testado.",
  },
  {
    icon: <FiTool className="w-5 h-5" />,
    title: "Quem já vende mas quer estruturar",
    description: "Organize processos, automatize o que hoje é manual e pare de perder vendas.",
  },
  {
    icon: <FiTrendingUp className="w-5 h-5" />,
    title: "Quem quer escalar a operação",
    description: "Monte uma operação maior, com equipe e múltiplos produtos ou servidores.",
  },
];

const outcomes = [
  {
    icon: <FiZap className="w-5 h-5" />,
    title: "Estruture sua loja do zero",
    description: "Monte o servidor, o catálogo e o fluxo de vendas do jeito certo desde o início.",
  },
  {
    icon: <FiTrendingUp className="w-5 h-5" />,
    title: "Tráfego e divulgação",
    description: "Estratégias para atrair clientes até o seu servidor de forma constante.",
  },
  {
    icon: <FiDollarSign className="w-5 h-5" />,
    title: "Precificação e gestão",
    description: "Como precificar sem perder margem e organizar as finanças da operação.",
  },
  {
    icon: <FiRepeat className="w-5 h-5" />,
    title: "Automação de vendas",
    description: "Configure automações para atender e vender enquanto você dorme.",
  },
  {
    icon: <FiUsers className="w-5 h-5" />,
    title: "Fidelização de clientes",
    description: "Métodos para transformar comprador único em cliente recorrente.",
  },
  {
    icon: <FiRadio className="w-5 h-5" />,
    title: "Aulas ao vivo",
    description: "Tira-dúvidas e conteúdos exclusivos direto com quem já vende no Discord.",
  },
];

const curriculum = [
  {
    number: "01",
    title: "Fundamentos da loja no Discord",
    lessons: [
      { title: "Como estruturar um servidor de vendas do zero", duration: "12 min" },
      { title: "Categorias, canais e cargos que convertem", duration: "9 min" },
      { title: "Configurando o bot de vendas passo a passo", duration: "15 min" },
      { title: "Formas de pagamento: PIX, cartão e carteira", duration: "10 min" },
    ],
  },
  {
    number: "02",
    title: "Produto e catálogo",
    lessons: [
      { title: "Como criar produtos que vendem", duration: "8 min" },
      { title: "Precificação sem perder margem", duration: "11 min" },
      { title: "Estoque, entregas automáticas e garantias", duration: "10 min" },
    ],
  },
  {
    number: "03",
    title: "Tráfego e divulgação",
    lessons: [
      { title: "De onde vêm os primeiros clientes", duration: "13 min" },
      { title: "Parcerias e indicações dentro do Discord", duration: "9 min" },
      { title: "Anúncios e divulgação fora da plataforma", duration: "14 min" },
      { title: "Construindo autoridade e prova social", duration: "10 min" },
    ],
  },
  {
    number: "04",
    title: "Automação e atendimento",
    lessons: [
      { title: "Automatizando o atendimento com o bot", duration: "12 min" },
      { title: "Funis automáticos de venda e recompra", duration: "11 min" },
      { title: "Cupons, promoções e gatilhos automáticos", duration: "8 min" },
    ],
  },
  {
    number: "05",
    title: "Escala e gestão",
    lessons: [
      { title: "Organizando finanças e métricas da loja", duration: "10 min" },
      { title: "Montando uma equipe e delegando atendimento", duration: "9 min" },
      { title: "Expandindo para múltiplos servidores/produtos", duration: "12 min" },
    ],
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Garanta seu acesso",
    description: "Escolha PIX ou cartão e confirme sua compra pelo preço atual, direto no site.",
  },
  {
    number: "02",
    title: "Assista no seu ritmo",
    description: "Os 5 módulos ficam liberados para você assistir quando quiser.",
  },
  {
    number: "03",
    title: "Participe ao vivo",
    description: "Entre nos encontros mensais ao vivo e tire dúvidas em tempo real.",
  },
];

function CoursePlayerMockup() {
  const playlist = [
    { title: "Como estruturar um servidor de vendas do zero", duration: "12 min", state: "done" as const },
    { title: "Categorias, canais e cargos que convertem", duration: "9 min", state: "playing" as const },
    { title: "Configurando o bot de vendas passo a passo", duration: "15 min", state: "locked" as const },
  ];

  return (
    <div className="relative flex items-center justify-center select-none">
      <div className="absolute w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative w-80 rounded-2xl border border-neutral-700/60 bg-neutral-950 shadow-2xl overflow-hidden">
        <div className="relative h-40 bg-gradient-to-br from-emerald-500/30 via-emerald-600/10 to-neutral-900 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.35),transparent_70%)]" />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-neutral-900/80 border border-emerald-500/30 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className={`${jetbrains.className} text-[9px] text-neutral-200 tracking-wide`}>MÓDULO 01</span>
          </div>

          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="relative z-10 w-14 h-14 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center"
          >
            <FiPlay className="w-6 h-6 text-white translate-x-0.5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div className="h-full w-[42%] bg-emerald-500" />
          </div>
        </div>

        <div className="px-4 py-4">
          <p className={`${poppins.className} text-sm font-semibold text-white mb-0.5`}>
            Categorias, canais e cargos que convertem
          </p>
          <p className={`${jetbrains.className} text-[10px] text-neutral-500 mb-4`}>
            Módulo 01 · Aula 02 de 04
          </p>

          <div className="h-px bg-neutral-800 mb-3" />

          <div className="flex flex-col gap-2.5">
            {playlist.map((item) => (
              <div key={item.title} className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    item.state === "done" && "bg-emerald-500/20 text-emerald-400",
                    item.state === "playing" && "bg-emerald-500 text-white",
                    item.state === "locked" && "bg-neutral-800 text-neutral-600",
                  )}
                >
                  {item.state === "done" && <FiCheck className="w-3 h-3" />}
                  {item.state === "playing" && <FiPlay className="w-2.5 h-2.5 translate-x-px" />}
                  {item.state === "locked" && <FiLock className="w-2.5 h-2.5" />}
                </div>
                <span
                  className={cn(
                    `${poppins.className} text-xs flex-1 truncate`,
                    item.state === "locked" ? "text-neutral-600" : "text-neutral-300",
                  )}
                >
                  {item.title}
                </span>
                <span className={`${jetbrains.className} text-[10px] text-neutral-600 flex-shrink-0`}>
                  {item.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CursoPage() {
  const now = new Date();
  const isPreLaunch = now < LAUNCH_DATE;
  const daysLeft = Math.max(0, Math.ceil((LAUNCH_DATE.getTime() - now.getTime()) / 86_400_000));

  const currentPrice = isPreLaunch ? "R$ 10,90" : "R$ 20,90";
  const otherPrice = isPreLaunch ? "R$ 20,90" : "R$ 10,90";

  const heroStats = [
    { icon: <FiLayers className="w-3.5 h-3.5" />, label: "5 módulos" },
    { icon: <FiPlayCircle className="w-3.5 h-3.5" />, label: "20 aulas em vídeo" },
    { icon: <FiClock className="w-3.5 h-3.5" />, label: "+3h de conteúdo" },
    { icon: <FiRadio className="w-3.5 h-3.5" />, label: "Aulas ao vivo mensais" },
  ];

  const faqs = [
    {
      question: "Quando o curso é lançado?",
      answer: `O curso é lançado no dia ${LAUNCH_LABEL}. Você já pode garantir seu acesso agora pelo preço de pré-venda, e passa a assistir assim que o conteúdo estiver disponível.`,
    },
    {
      question: "Por que comprar antes custa menos?",
      answer: `Comprando antes do lançamento (${LAUNCH_LABEL}) você garante o acesso por R$ 10,90. A partir do lançamento, o preço passa a ser R$ 20,90. Em ambos os casos é pagamento único, sem mensalidade.`,
    },
    {
      question: "Por quanto tempo tenho acesso ao curso?",
      answer:
        "O acesso é vitalício — você paga uma vez e o conteúdo é seu, incluindo atualizações futuras e os encontros ao vivo mensais.",
    },
    {
      question: "Preciso já ter uma loja no Discord?",
      answer:
        "Não. Os módulos 01 e 02 partem do zero, e os módulos 03 a 05 servem para quem já vende e quer estruturar melhor a operação.",
    },
    {
      question: "As aulas ao vivo são obrigatórias?",
      answer:
        "Não. Todos os encontros ao vivo ficam gravados e disponíveis na plataforma para assistir depois, no seu tempo.",
    },
    {
      question: "Como recebo o acesso depois de comprar?",
      answer: `No cartão, o acesso é liberado assim que o pagamento é aprovado. No PIX, assim que a confirmação cai (geralmente poucos segundos). Se a compra for feita antes do lançamento, o conteúdo fica disponível a partir do dia ${LAUNCH_LABEL}.`,
    },
  ];

  return (
    <CourseAccessProvider>
    <main className="flex flex-1 flex-col z-10 items-center justify-start min-h-screen pt-24 pb-20 px-6 gap-24">
      <FlareDecoration />

      {/* HERO */}
      <section className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-16 motion-preset-expand motion-delay-[100ms]">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl">
          <span
            className={`${jetbrains.className} flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs tracking-wide w-fit uppercase`}
          >
            <FiCalendar className="w-3.5 h-3.5" />
            {isPreLaunch
              ? daysLeft > 0
                ? `Lançamento em ${LAUNCH_LABEL} · faltam ${daysLeft} dias`
                : `Lançamento hoje, ${LAUNCH_LABEL}`
              : "Disponível agora"}
          </span>

          <h1
            className={`${poppins.className} text-4xl lg:text-6xl text-neutral-800 dark:text-neutral-100 leading-tight`}
          >
            Curso completo de{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              vendas no Discord
            </span>
          </h1>

          <p className="text-base lg:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
            5 módulos, 20 aulas em vídeo e encontros ao vivo mensais para você estruturar sua
            loja no Discord do zero ou escalar o que já está rodando. Acesso único, sem
            mensalidade.
          </p>

          <div className="flex flex-wrap items-center gap-2 lg:justify-start justify-center">
            {heroStats.map((stat) => (
              <span
                key={stat.label}
                className={`${jetbrains.className} flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 text-[11px] text-neutral-500 dark:text-neutral-400`}
              >
                <span className="text-emerald-400">{stat.icon}</span>
                {stat.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
            <CourseCtaLink
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 w-full sm:w-auto`}
              label="Adquirir agora"
            />

            <div className={`${jetbrains.className} flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500`}>
              <FiCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              {isPreLaunch ? `${currentPrice} até ${LAUNCH_LABEL} · depois ${otherPrice}` : "Pagamento único, acesso vitalício"}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <CoursePlayerMockup />
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="w-full max-w-5xl motion-preset-expand motion-delay-[150ms]">
        <div className="text-center mb-10">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
            Para quem é este curso
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100`}>
            Não importa o ponto de partida
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audience.map((a) => (
            <div
              key={a.title}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {a.icon}
              </div>
              <div>
                <h3 className={`${poppins.className} text-sm font-semibold mb-1 text-neutral-800 dark:text-neutral-100`}>
                  {a.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="w-full max-w-6xl motion-preset-expand motion-delay-[200ms]">
        <div className="text-center mb-12">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
            O que você vai aprender
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100`}>
            Métodos práticos, do primeiro cliente à escala
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((o) => (
            <div
              key={o.title}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20">
                {o.icon}
              </div>
              <div>
                <h3 className={`${poppins.className} text-sm font-semibold mb-1 text-neutral-800 dark:text-neutral-100`}>
                  {o.title}
                </h3>
                <p className={`${poppins.className} text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                  {o.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE CLASSES BONUS */}
      <section className="w-full max-w-3xl flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 motion-preset-expand motion-delay-[250ms]">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <FiGift className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-left flex-1">
          <p className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
            Bônus: encontro ao vivo todo mês
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Além dos 5 módulos, você participa de um encontro ao vivo mensal para tirar dúvidas
            e ver casos reais sendo resolvidos — gravado para quem não puder ir ao vivo.
          </p>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="w-full max-w-3xl motion-preset-expand motion-delay-[300ms]">
        <div className="text-center mb-10">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
            Grade completa do curso
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-3xl text-neutral-800 dark:text-neutral-100`}>
            5 módulos, aula por aula
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {curriculum.map((mod) => (
            <details
              key={mod.number}
              className="group border border-neutral-200/10 dark:border-neutral-800/50 rounded-2xl bg-neutral-100/5 dark:bg-neutral-900/20 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-left select-none">
                <div className="flex items-center gap-4">
                  <span className={`${jetbrains.className} text-lg font-bold text-emerald-500/50 w-7 flex-shrink-0`}>
                    {mod.number}
                  </span>
                  <div>
                    <p className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
                      {mod.title}
                    </p>
                    <p className={`${jetbrains.className} text-[11px] text-neutral-500 dark:text-neutral-500 mt-0.5`}>
                      {mod.lessons.length} aulas
                    </p>
                  </div>
                </div>
                <FiChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-4 flex flex-col gap-1">
                {mod.lessons.map((lesson) => (
                  <div
                    key={lesson.title}
                    className="flex items-center gap-3 py-2 pl-11 border-t border-neutral-200/5 dark:border-neutral-800/40 first:border-t-0"
                  >
                    <FiPlayCircle className="w-3.5 h-3.5 text-emerald-500/60 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-300 flex-1 text-left">
                      {lesson.title}
                    </span>
                    <span className={`${jetbrains.className} text-[11px] text-neutral-500 dark:text-neutral-500 flex-shrink-0`}>
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full max-w-4xl flex flex-col items-center gap-6 motion-preset-expand motion-delay-[350ms]">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
            Como funciona
          </span>
          <h2 className={`${poppins.className} text-2xl text-neutral-800 dark:text-neutral-100`}>
            Comece a aprender em minutos
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
      </section>

      {/* PRICING */}
      <section className="w-full max-w-md motion-preset-expand motion-delay-[400ms]">
        <div className="relative flex flex-col p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_70%)]" />
          <div className="absolute -top-4 left-8">
            <Badge className="bg-emerald-500 text-white px-4 py-1">
              {isPreLaunch ? "Preço de pré-venda" : "Preço de lançamento"}
            </Badge>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <div>
              <h2 className={`${poppins.className} text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1`}>
                Acesso ao curso
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Pagamento único. Sem mensalidade, sem taxa recorrente.
              </p>
            </div>

            <div className="flex items-baseline gap-2 flex-wrap">
              <span className={`${jetbrains.className} font-bold text-5xl text-neutral-900 dark:text-neutral-100`}>
                {currentPrice}
              </span>
              {isPreLaunch && (
                <span className={`${jetbrains.className} text-base text-neutral-500 dark:text-neutral-500 line-through`}>
                  {otherPrice}
                </span>
              )}
            </div>

            {isPreLaunch && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Válido até {LAUNCH_LABEL}. A partir do lançamento, o preço vai para{" "}
                <span className="font-semibold">{otherPrice}</span>.
              </p>
            )}

            <ul className="space-y-3">
              {[
                "5 módulos e 20 aulas liberados no lançamento",
                "Tutoriais em vídeo passo a passo, +3h de conteúdo",
                "Métodos de vendas no Discord testados e validados",
                "Acesso vitalício, sem mensalidade",
                "Atualizações futuras do curso inclusas",
                "Encontros ao vivo mensais inclusos",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <FiCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>

            <CourseCtaLink
              className={cn(
                `${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl overflow-hidden font-medium shadow-lg transition-all hover:shadow-2xl active:opacity-90 hover:scale-[1.02] duration-300 w-full`,
                "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white hover:shadow-emerald-500/30",
              )}
              label="Adquirir agora"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-2xl flex flex-col gap-3 motion-preset-expand motion-delay-[450ms]">
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
      </section>

      {/* FINAL CTA */}
      <section className="w-full max-w-2xl motion-preset-expand motion-delay-[500ms]">
        <div className="relative flex flex-col items-center text-center gap-6 p-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <FiPlayCircle className="w-6 h-6 text-emerald-400" />
            </div>

            <div>
              <h3 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2`}>
                Pronto pra vender mais no Discord?
              </h3>
              <p className={`${poppins.className} text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                {isPreLaunch
                  ? `Garanta seu acesso por ${currentPrice} antes do lançamento, direto no site.`
                  : "Garanta seu acesso ao curso direto no site."}
              </p>
            </div>

            <CourseCtaLink
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white text-sm font-medium shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300`}
              label="Adquirir agora"
            />
          </div>
        </div>
      </section>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
    </CourseAccessProvider>
  );
}
