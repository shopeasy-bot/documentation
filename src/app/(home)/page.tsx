import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { FiFileText, FiPackage, FiTag, FiShield, FiSettings, FiZap, FiPercent, FiUsers, FiTrendingUp } from "react-icons/fi"
import AnimatedShinyText from "@/components/ui/animaty-text"
import { FaPlus } from "react-icons/fa"
import { FaPix, FaCreditCard, FaCcStripe, FaBitcoin, FaWallet, FaAndroid, FaDiscord, FaArrowRight } from "react-icons/fa6"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ShopEasy - Bot de Vendas Gratuito para Discord",
  description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
  openGraph: {
    title: "ShopEasy - Bot de Vendas Gratuito para Discord",
    description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    title: "ShopEasy - Bot de Vendas Gratuito para Discord",
    description: "Crie sua loja virtual no Discord em minutos. Bot de vendas gratuito, sem taxas, com suporte a PIX, cartão e criptomoedas.",
  },
}

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

const stats = [
  { icon: <FiUsers className="w-5 h-5" />, value: "+5.000", label: "Lojas ativas no Discord" },
  { icon: <FiTrendingUp className="w-5 h-5" />, value: "+500K", label: "Vendas processadas" },
  { icon: <FiPercent className="w-5 h-5" />, value: "0%", label: "Taxa de comissão" },
  { icon: <FaCreditCard className="w-5 h-5" />, value: "8+", label: "Formas de pagamento" },
]

const features = [
  {
    icon: <FiPackage className="w-5 h-5" />,
    title: "Catálogo completo",
    description: "Produtos, variações e controle de estoque automático direto no Discord.",
  },
  {
    icon: <FaCreditCard className="w-5 h-5" />,
    title: "Pagamentos integrados",
    description: "PIX, cartão, criptomoedas e carteira interna em um só lugar.",
  },
  {
    icon: <FiTag className="w-5 h-5" />,
    title: "Cupons e promoções",
    description: "Crie descontos personalizados para impulsionar suas vendas.",
  },
  {
    icon: <FiSettings className="w-5 h-5" />,
    title: "Personalização total",
    description: "Embeds, cores, banners e mensagens com a cara da sua loja.",
  },
  {
    icon: <FiShield className="w-5 h-5" />,
    title: "Segurança integrada",
    description: "Proteção contra fraudes e automação de entregas confiável.",
  },
  {
    icon: <FiPercent className="w-5 h-5" />,
    title: "0% de comissão",
    description: "Fique com 100% do valor das suas vendas, sem taxas escondidas.",
  },
  {
    icon: <FaAndroid className="w-5 h-5" />,
    title: "App Android",
    description: "Acompanhe vendas e gerencie sua loja direto do celular.",
  },
  {
    icon: <FiZap className="w-5 h-5" />,
    title: "Setup em minutos",
    description: "Configure sua loja com poucos comandos e comece a vender hoje.",
  },
]

const paymentMethods = [
  { icon: <FaPix className="w-4 h-4" />, label: "PIX" },
  { icon: <FaCreditCard className="w-4 h-4" />, label: "Mercado Pago" },
  { icon: <FaCreditCard className="w-4 h-4" />, label: "PagSeguro" },
  { icon: <FaCreditCard className="w-4 h-4" />, label: "Asaas" },
  { icon: <FaCreditCard className="w-4 h-4" />, label: "EFI Bank" },
  { icon: <FaCcStripe className="w-4 h-4" />, label: "Stripe" },
  { icon: <FaBitcoin className="w-4 h-4" />, label: "Criptomoedas" },
  { icon: <FaWallet className="w-4 h-4" />, label: "Carteira interna" },
]

const steps = [
  {
    number: "01",
    icon: <FaDiscord className="w-5 h-5" />,
    title: "Adicione o bot",
    description: "Convide o ShopEasy para o seu servidor com apenas um clique.",
  },
  {
    number: "02",
    icon: <FiSettings className="w-5 h-5" />,
    title: "Configure sua loja",
    description: "Defina produtos, preços, formas de pagamento e a identidade da sua loja.",
  },
  {
    number: "03",
    icon: <FiZap className="w-5 h-5" />,
    title: "Comece a vender",
    description: "Compartilhe o catálogo e receba pedidos automaticamente, sem complicação.",
  },
]

const faqs = [
  {
    question: "Como começo a vender com o ShopEasy?",
    answer: "Basta adicionar o bot ao seu servidor do Discord e seguir o passo a passo de configuração pelos próprios comandos. Em poucos minutos sua loja já está no ar.",
  },
  {
    question: "O ShopEasy cobra comissão sobre as vendas?",
    answer: "Não. O plano Básico é 100% gratuito e nenhum plano cobra comissão sobre o que você vende — o valor é todo seu.",
  },
  {
    question: "Quais formas de pagamento meus clientes podem usar?",
    answer: "PIX, cartão de crédito/débito, criptomoedas e carteira interna, através de gateways como Mercado Pago, PagSeguro, Asaas, EFI Bank, Stripe e NowPayments.",
  },
  {
    question: "Preciso saber programar para configurar minha loja?",
    answer: "Não. Produtos, preços, cupons, estoque e pagamentos são configurados por comandos simples direto no Discord.",
  },
  {
    question: "Posso personalizar a aparência da minha loja?",
    answer: "Sim! Você pode personalizar embeds, cores, banners e mensagens. Em planos superiores, também é possível ter um bot 100% exclusivo com a identidade da sua marca.",
  },
]

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col z-10 items-center text-center gap-24 px-4 pb-24">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center gap-16 min-h-[80vh] w-full">
        <FlareDecoration />

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 motion-preset-expand motion-delay-[100ms]">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
            <Image src={"/shopeasy.svg"} alt="logo" width={124} height={124} className="relative z-10" />
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <h1
              className={`${poppins.className} text-4xl lg:text-7xl uppercase bg-gradient-to-r
                dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
                tracking-tight leading-none
              `}
            >
              SHOPEASY
            </h1>

            {/* YouTube tutorial — ticker pill com flip de texto no hover */}
            <Link
              href="/blog"
              className={`${jetbrains.className} group flex items-center gap-2.5 px-4 py-1.5 rounded-full
                border border-neutral-200/30 dark:border-neutral-700/50
                bg-neutral-100/5 dark:bg-neutral-900/30
                backdrop-blur-sm
                hover:border-emerald-500/40 dark:hover:border-emerald-500/40
                hover:bg-emerald-500/5
                transition-all duration-300 ease-out
                text-neutral-500 dark:text-neutral-400
                text-xs tracking-wide
              `}
            >
              <FiZap className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span className="relative h-4 overflow-hidden flex items-center">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  nova atualização disponível
                </span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-emerald-500 dark:text-emerald-400">
                  ver agora →
                </span>
              </span>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl motion-preset-expand motion-delay-[200ms]">
          <p className="text-lg lg:text-2xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Automatize suas vendas no Discord com o{" "}
            <span className="font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              ShopEasy
            </span>
            <br />
            <span className="text-base lg:text-xl text-neutral-500 dark:text-neutral-400">
              A solução completa para gerenciar sua loja no Discord. Configure em minutos, venda em segundos.
            </span>
          </p>
        </div>

        <div className="flex flex-col w-fit motion-preset-expand motion-delay-[300ms]">
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            <Link
              href="/invite"
              target="_blank"
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-500" />
              <FaPlus className="w-4 h-4" />
              Adicionar ao Discord
              <svg
                className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div
              className={`${jetbrains.className} group rounded-full border border-neutral-200/20 bg-neutral-100/10 backdrop-blur-sm text-base transition-all ease-in hover:cursor-pointer hover:bg-neutral-100/20 dark:border-neutral-800/50 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/50 hover:scale-105 duration-300`}
            >
              <AnimatedShinyText className="flex items-center justify-center px-8 py-4 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 text-neutral-700 dark:text-slate-50">
                <Link href="/docs" className="flex items-center gap-3">
                  <FiFileText className="w-5 h-5 opacity-90" />
                  Documentação
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </AnimatedShinyText>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 motion-preset-expand motion-delay-[100ms]">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
              {stat.icon}
            </div>
            <span
              className={`${jetbrains.className} text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent`}
            >
              {stat.value}
            </span>
            <span className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="w-full max-w-6xl motion-preset-expand motion-delay-[100ms]">
        <div className="text-center mb-12">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}>
            Recursos
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-4xl text-neutral-800 dark:text-neutral-100`}>
            Tudo que sua loja precisa
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Um bot completo para gerenciar sua loja do início ao fim, sem sair do Discord
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 p-6 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500/20">
                {feature.icon}
              </div>
              <div>
                <h3 className={`${poppins.className} text-sm font-semibold mb-1 text-neutral-800 dark:text-neutral-100`}>
                  {feature.title}
                </h3>
                <p className={`${poppins.className} text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="w-full max-w-5xl motion-preset-expand motion-delay-[100ms]">
        <div className="text-center mb-12">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}>
            Pagamentos
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-4xl text-neutral-800 dark:text-neutral-100`}>
            Aceite pagamentos de várias formas
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Conecte os principais meios de pagamento do Brasil e do mundo em poucos cliques
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.label}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/20 hover:bg-emerald-500/5"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                {method.icon}
              </div>
              <span className={`${poppins.className} text-sm text-neutral-700 dark:text-neutral-200`}>
                {method.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full max-w-5xl motion-preset-expand motion-delay-[100ms]">
        <div className="text-center mb-12">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}>
            Como funciona
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-4xl text-neutral-800 dark:text-neutral-100`}>
            Comece a vender em 3 passos
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Do convite ao primeiro pedido em poucos minutos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col gap-4 p-8 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20 backdrop-blur-sm text-left overflow-hidden"
            >
              <span className={`${jetbrains.className} absolute top-4 right-6 text-5xl font-bold text-emerald-500/10`}>
                {step.number}
              </span>
              <div className="relative z-10 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {step.icon}
              </div>
              <h3 className={`${poppins.className} relative z-10 text-lg font-semibold text-neutral-800 dark:text-neutral-100`}>
                {step.title}
              </h3>
              <p className="relative z-10 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl motion-preset-expand motion-delay-[100ms]">
        <div className="text-center mb-12">
          <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500 dark:text-emerald-400`}>
            Dúvidas
          </span>
          <h2 className={`${poppins.className} mt-2 text-2xl lg:text-4xl text-neutral-800 dark:text-neutral-100`}>
            Perguntas frequentes
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
            Tudo o que você precisa saber antes de começar
          </p>
        </div>

        <Accordions type="single" className="text-left">
          {faqs.map((faq) => (
            <Accordion key={faq.question} title={faq.question} id={faq.question}>
              {faq.answer}
            </Accordion>
          ))}
        </Accordions>
      </section>

      {/* CTA */}
      <section className="w-full max-w-2xl motion-preset-expand motion-delay-[100ms]">
        <div className="relative flex flex-col items-center text-center gap-6 p-10 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_70%)]" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <h3 className={`${poppins.className} text-xl lg:text-2xl font-semibold text-neutral-900 dark:text-neutral-100`}>
              Pronto para vender no Discord?
            </h3>
            <p className={`${poppins.className} text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md`}>
              Adicione o ShopEasy ao seu servidor agora mesmo e comece a vender de forma gratuita,
              sem taxas e sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href="/invite"
                target="_blank"
                className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white text-sm font-medium shadow-lg hover:shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
                <FaPlus className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Adicionar ao Discord</span>
              </Link>

              <Link
                href="/plans"
                className={`${jetbrains.className} group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-100/10 backdrop-blur-sm text-sm text-neutral-700 dark:text-slate-50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50 hover:scale-105 transition-all duration-300`}
              >
                Ver planos
                <FaArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
