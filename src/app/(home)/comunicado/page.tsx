import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { CrispTrigger } from "@/components/crisp";
import { WHATSAPP_COMMUNITY_URL, WHATSAPP_SUPPORT_URL } from "@/lib/contacts";
import { cn } from "@/lib/cn";
import { JetBrains_Mono, Poppins } from "next/font/google";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiMessageSquare, FiFileText, FiUsers } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunicado - ShopEasy",
  description:
    "Entenda o que aconteceu com nosso servidor no Discord e como falar com o ShopEasy agora.",
  openGraph: {
    title: "Comunicado - ShopEasy",
    description:
      "Entenda o que aconteceu com nosso servidor no Discord e como falar com o ShopEasy agora.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/comunicado`,
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: "500" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const channelCardClass = cn(
  "group flex flex-col gap-4 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 text-left w-full",
  "border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20",
);

export default function ComunicadoPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start text-center gap-12 px-4 min-h-screen pt-20 pb-20">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn(
          "[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30",
        )}
      />

      <div className="flex flex-col items-center gap-3 max-w-2xl motion-preset-expand motion-delay-[100ms]">
        <span className={`${jetbrains.className} text-xs uppercase tracking-widest text-amber-500`}>
          Aviso importante
        </span>
        <h1 className={`${poppins.className} text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100`}>
          Sobre o banimento do nosso servidor no Discord
        </h1>
      </div>

      <div className="max-w-3xl w-full text-left space-y-8 text-neutral-500 dark:text-neutral-400 motion-preset-expand motion-delay-[150ms]">
        <section>
          <h2 className={`${poppins.className} text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100`}>
            O que aconteceu
          </h2>
          <p className="mb-4">
            O servidor no Discord onde nossa comunidade se organizava foi banido após uma
            série de denúncias que acreditamos terem sido feitas de má-fé por concorrentes.
            O Discord baniu o servidor sob alegação de fraude — e, no mesmo processo, nossa
            conta pessoal usada para administrá-lo também foi banida.
          </p>
          <p>
            Estamos no Discord há mais de <span className="font-semibold text-neutral-700 dark:text-neutral-200">4 anos</span> e
            sempre seguimos todas as regras da plataforma. Não concordamos com a decisão e
            já estamos contestando o banimento junto ao Discord, mas, até que isso se resolva,
            precisamos seguir atendendo vocês por outros canais.
          </p>
        </section>

        <section>
          <h2 className={`${poppins.className} text-xl font-semibold mb-3 text-neutral-800 dark:text-neutral-100`}>
            O que muda agora
          </h2>
          <p>
            O ShopEasy continua funcionando normalmente — site, bot e pagamentos não foram
            afetados. A única mudança é onde falamos com você: enquanto o servidor está fora
            do ar, o atendimento passa a ser feito por chat aqui no site (Crisp) e por WhatsApp.
          </p>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full motion-preset-expand motion-delay-[200ms]">
        <CrispTrigger
          className={cn(
            channelCardClass,
            "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5",
          )}
        >
          <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
            <FiMessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
              Chat no site
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Fale com a gente direto por aqui pelo chat.
            </p>
          </div>
          <span className={`${jetbrains.className} text-xs text-emerald-400 group-hover:underline`}>
            Abrir chat →
          </span>
        </CrispTrigger>

        <Link
          href={WHATSAPP_SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            channelCardClass,
            "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5",
          )}
        >
          <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-green-500/10 border-green-500/20 text-green-400">
            <FaWhatsapp className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
              WhatsApp - Atendimento
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Suporte individual direto no seu WhatsApp.
            </p>
          </div>
          <span className={`${jetbrains.className} text-xs text-green-400 group-hover:underline`}>
            Chamar no WhatsApp →
          </span>
        </Link>

        <Link
          href={WHATSAPP_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            channelCardClass,
            "border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/5",
          )}
        >
          <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
            <FiUsers className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <h3 className={`${poppins.className} text-sm font-semibold text-neutral-800 dark:text-neutral-100`}>
              Canal no WhatsApp
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Nossa comunidade para avisos, novidades e atualizações.
            </p>
          </div>
          <span className={`${jetbrains.className} text-xs text-indigo-400 group-hover:underline`}>
            Acessar o canal →
          </span>
        </Link>
      </div>

      <div className="max-w-3xl w-full text-left space-y-8 text-neutral-500 dark:text-neutral-400 motion-preset-expand motion-delay-[250ms]">
        <section className="flex items-start gap-4 p-5 rounded-2xl border border-neutral-200/10 dark:border-neutral-800/50 bg-neutral-100/5 dark:bg-neutral-900/20">
          <div className="w-9 h-9 rounded-xl bg-neutral-500/10 border border-neutral-500/20 flex items-center justify-center flex-shrink-0">
            <FiFileText className="w-4 h-4 text-neutral-400" />
          </div>
          <div>
            <p className={`${poppins.className} text-sm text-neutral-800 dark:text-neutral-100 font-medium mb-1`}>
              As atualizações continuam
            </p>
            <p className="text-xs leading-relaxed">
              O desenvolvimento do ShopEasy não para. Novidades e atualizações seguem sendo
              publicadas normalmente no{" "}
              <Link href="/blog" className="text-emerald-400 hover:underline">
                blog
              </Link>{" "}
              e no canal do WhatsApp.
            </p>
          </div>
        </section>
      </div>

      <div className="motion-preset-expand motion-delay-[300ms]">
        <Link
          href="/"
          className="text-neutral-500 dark:text-neutral-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
        >
          ← Voltar para início
        </Link>
      </div>
    </main>
  );
}
