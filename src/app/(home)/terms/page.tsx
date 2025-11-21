import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start text-center gap-12 px-4 min-h-screen pt-20 pb-20">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn(
          "[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30"
        )}
      />

      <div className="max-w-4xl w-full text-left motion-preset-expand motion-delay-[100ms]">
        <h1
          className={`${poppins.className} text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r 
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          Termos de Serviço e Política de Privacidade
        </h1>

        <div className="space-y-8 text-neutral-400">
          <section>
            <h2
              className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}
            >
              1. Termos de Serviço
            </h2>
            <p className="mb-4">
              Bem-vindo ao ShopEasy! Ao utilizar nossos serviços, você concorda
              em cumprir estes termos e condições de uso. Se não concordar com
              qualquer parte, não utilize nossos serviços.
            </p>
            <p className="mb-4">
              O ShopEasy é um bot de Discord que fornece{" "}
              <span className="font-bold">
                uma ferramenta para automatizar e gerenciar lojas e transações
                em servidores
              </span>
              . Nós{" "}
              <span className="font-bold">
                não vendemos produtos nem participamos das transações
              </span>{" "}
              realizadas pelos usuários. Cada usuário é{" "}
              <span className="font-bold">totalmente responsável</span> por seus
              próprios produtos, preços e conformidade legal.
            </p>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer
              momento. Quaisquer alterações serão publicadas nesta página, e o
              uso continuado dos serviços após tais modificações constitui sua
              aceitação.
            </p>
          </section>

          <section>
            <h2
              className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}
            >
              2. Política de Privacidade
            </h2>
            <p className="mb-4">
              A privacidade é importante. Esta política descreve como coletamos
              e usamos dados mínimos necessários para operar o ShopEasy.
            </p>
            <h3
              className={`${poppins.className} text-xl font-semibold mb-2 text-white`}
            >
              2.1. Coleta de Dados
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>IDs de usuários e servidores Discord para operar o bot.</li>
              <li>
                Dados relacionados a transações dentro do servidor para
                gerenciar lojas automatizadas.
              </li>
              <li>
                Configurações específicas do servidor para personalização do
                bot.
              </li>
            </ul>
            <p className="mb-4">
              Não coletamos mensagens privadas, informações pessoais fora do
              contexto de IDs de Discord, ou dados desnecessários.
            </p>

            <h3
              className={`${poppins.className} text-xl font-semibold mb-2 text-white`}
            >
              2.2. Uso de Dados
            </h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Manter e operar as funcionalidades do bot.</li>
              <li>Melhorar a experiência do usuário.</li>
              <li>Fornecer suporte técnico.</li>
              <li>Garantir segurança e integridade do serviço.</li>
            </ul>

            <h3
              className={`${poppins.className} text-xl font-semibold mb-2 text-white`}
            >
              2.3. Compartilhamento de Dados
            </h3>
            <p className="mb-4">
              Não vendemos ou compartilhamos dados com terceiros, exceto quando
              exigido por lei ou para proteger nossos direitos. Apenas pessoal
              autorizado acessa os dados para manutenção e desenvolvimento.
            </p>

            <h3
              className={`${poppins.className} text-xl font-semibold mb-2 text-white`}
            >
              2.4. Seus Direitos
            </h3>
            <p className="mb-4">
              Você pode solicitar acesso, correção ou exclusão dos seus dados
              armazenados pelo ShopEasy através do nosso suporte no Discord.
            </p>

            <h3
              className={`${poppins.className} text-xl font-semibold mb-2 text-white`}
            >
              2.5. Alterações
            </h3>
            <p>
              Atualizaremos esta política periodicamente. Revisões importantes
              serão publicadas nesta página.
            </p>
          </section>

          <section>
            <h2
              className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}
            >
              3. Responsabilidade do Usuário
            </h2>
            <p>
              O ShopEasy fornece apenas a ferramenta para vendas e automação.
              Todo conteúdo, produto ou transação realizada por usuários é de{" "}
              <span className="font-bold">
                responsabilidade exclusiva do próprio usuário
              </span>
              . Nós não nos responsabilizamos por disputas, ilegalidades ou
              problemas de transações.
            </p>
          </section>

          <section>
            <h2
              className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}
            >
              4. Contato
            </h2>
            <p>
              Para dúvidas sobre Termos ou Política de Privacidade, entre em
              contato via nosso servidor de suporte no Discord.
            </p>
          </section>
        </div>
      </div>

      <div className="motion-preset-expand motion-delay-[200ms]">
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
