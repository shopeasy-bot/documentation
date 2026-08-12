import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { CrispTrigger } from "@/components/crisp"
import { CONTACT_EMAIL, WHATSAPP_SUPPORT_URL } from "@/lib/contacts"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa"
import { FiMessageSquare, FiFileText, FiMail } from "react-icons/fi"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suporte - ShopEasy",
  description: "Precisa de ajuda? Fale com o suporte do ShopEasy.",
  openGraph: {
    title: "Suporte - ShopEasy",
    description: "Precisa de ajuda? Fale com o suporte do ShopEasy.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/support`,
  },
}

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

const channels = [
  {
    icon: <FiMessageSquare className="w-5 h-5" />,
    title: "Chat no site",
    description: "Fale com a gente agora mesmo pelo chat aqui do site.",
    label: "Abrir chat",
    color: "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5",
    iconColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: <FaWhatsapp className="w-5 h-5" />,
    title: "WhatsApp",
    description: "Suporte individual direto no seu WhatsApp.",
    href: WHATSAPP_SUPPORT_URL,
    label: "Chamar no WhatsApp",
    color: "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5",
    iconColor: "bg-green-500/10 border-green-500/20 text-green-400",
  },
  {
    icon: <FiFileText className="w-5 h-5" />,
    title: "Documentação",
    description: "Encontre respostas na documentação oficial do ShopEasy.",
    href: "/docs",
    label: "Ver docs",
    color: "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5",
    iconColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: <FiMail className="w-5 h-5" />,
    title: "E-mail",
    description: "Para questões comerciais ou parcerias, entre em contato por e-mail.",
    href: `mailto:${CONTACT_EMAIL}`,
    label: "Enviar e-mail",
    color: "border-neutral-500/20 hover:border-neutral-500/40 hover:bg-neutral-500/5",
    iconColor: "bg-neutral-500/10 border-neutral-500/20 text-neutral-400",
  },
]

export default function SupportPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-12 px-4 py-20">
      <FlareDecoration />

      <div className="flex flex-col items-center gap-3 max-w-xl motion-preset-expand motion-delay-[100ms]">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-emerald-500`}>
          Suporte
        </span>
        <h1 className={`${poppins.className} text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100`}>
          Como podemos ajudar?
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Escolha o canal mais adequado para a sua dúvida ou problema.
        </p>
        <Link href="/comunicado" className="text-xs text-amber-500 hover:underline">
          Por que não temos mais servidor no Discord? →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full motion-preset-expand motion-delay-[150ms]">
        {channels.map((c) => {
          const cardClassName = cn(
            "group flex flex-col gap-4 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left w-full",
            "border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20",
            c.color,
          )
          const content = (
            <>
              <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center", c.iconColor)}>
                {c.icon}
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <h3 className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
                  {c.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {c.description}
                </p>
              </div>
              <span className={`${jetbrains.className} text-xs text-emerald-400 group-hover:underline`}>
                {c.label} →
              </span>
            </>
          )

          if (!c.href) {
            return (
              <CrispTrigger key={c.title} className={cardClassName}>
                {content}
              </CrispTrigger>
            )
          }

          return (
            <Link
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") || c.href.startsWith("mailto") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={cardClassName}
            >
              {content}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-3 p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 max-w-xl w-full motion-preset-expand motion-delay-[200ms]">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <FiMessageSquare className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-left">
          <p className={`${poppins.className} text-sm text-neutral-200 font-medium`}>
            Tempo médio de resposta
          </p>
          <p className="text-xs text-neutral-500">
            Mensagens respondidas em até <span className="text-indigo-400">2 horas</span> em horário comercial.
          </p>
        </div>
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
