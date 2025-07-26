import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { Poppins } from "next/font/google"
import Link from "next/link"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-start text-center gap-12 px-4 min-h-screen pt-20 pb-20">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
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
            <h2 className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}>1. Termos de Serviço</h2>
            <p className="mb-4">
              Bem-vindo ao ShopEasy! Ao utilizar nossos serviços, você concorda em cumprir e estar vinculado aos
              seguintes termos e condições de uso. Por favor, leia-os atentamente. Se você não concordar com qualquer
              parte destes termos, não utilize nossos serviços.
            </p>
            <p className="mb-4">
              O ShopEasy é um bot de Discord projetado para automatizar e gerenciar lojas e transações dentro de
              servidores Discord. Nosso objetivo é fornecer uma ferramenta eficiente e segura para a sua comunidade.
            </p>
            <p>
              Reservamo-nos o direito de modificar estes Termos de Serviço a qualquer momento. Quaisquer alterações
              serão publicadas nesta página, e o uso continuado dos serviços após tais modificações constituirá sua
              aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}>
              2. Política de Privacidade
            </h2>
            <p className="mb-4">
              Sua privacidade é de extrema importância para nós. Esta Política de Privacidade descreve como coletamos,
              usamos e protegemos suas informações ao utilizar o ShopEasy.
            </p>
            <h3 className={`${poppins.className} text-xl font-semibold mb-2 text-white`}>2.1. Coleta de Dados</h3>
            <p className="mb-4">
              Coletamos informações mínimas necessárias para o funcionamento do bot e a prestação dos serviços. Isso
              pode incluir:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>IDs de usuários e servidores Discord (para identificar e operar o bot).</li>
              <li>Dados relacionados a transações e itens da loja (para gerenciar sua economia no servidor).</li>
              <li>Configurações do bot específicas do servidor (para personalizar sua experiência).</li>
            </ul>
            <p>
              Não coletamos mensagens de chat privadas, informações pessoais identificáveis (como nome real, e-mail)
              fora do contexto de IDs de Discord, ou qualquer dado que não seja estritamente necessário para a
              funcionalidade do ShopEasy.
            </p>

            <h3 className={`${poppins.className} text-xl font-semibold mb-2 text-white`}>2.2. Uso de Dados</h3>
            <p className="mb-4">Os dados coletados são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Operar e manter as funcionalidades do ShopEasy.</li>
              <li>Melhorar a experiência do usuário e a performance do bot.</li>
              <li>Fornecer suporte técnico e resolver problemas.</li>
              <li>Garantir a segurança e integridade dos nossos serviços.</li>
            </ul>

            <h3 className={`${poppins.className} text-xl font-semibold mb-2 text-white`}>
              2.3. Compartilhamento de Dados
            </h3>
            <p className="mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações com terceiros, exceto quando exigido por lei ou
              para proteger nossos direitos e segurança. Todos os dados são armazenados de forma segura e acessados
              apenas por pessoal autorizado para fins de manutenção e desenvolvimento.
            </p>

            <h3 className={`${poppins.className} text-xl font-semibold mb-2 text-white`}>2.4. Seus Direitos</h3>
            <p className="mb-4">
              Você tem o direito de solicitar acesso, correção ou exclusão dos seus dados armazenados pelo ShopEasy.
              Para exercer esses direitos, entre em contato conosco através dos canais de suporte no Discord.
            </p>

            <h3 className={`${poppins.className} text-xl font-semibold mb-2 text-white`}>
              2.5. Alterações na Política de Privacidade
            </h3>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer
              alterações significativas publicando a nova política nesta página. Recomendamos que você revise esta
              política regularmente.
            </p>
          </section>

          <section>
            <h2 className={`${poppins.className} text-2xl font-semibold mb-4 text-white`}>3. Contato</h2>
            <p>
              Se você tiver alguma dúvida sobre estes Termos de Serviço ou nossa Política de Privacidade, entre em
              contato conosco através do nosso servidor de suporte no Discord.
            </p>
          </section>
        </div>
      </div>

      {/* Back to Home */}
      <div className="motion-preset-expand motion-delay-[200ms]">
        <Link
          href="/"
          className="text-neutral-500 dark:text-neutral-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
        >
          ← Voltar para início
        </Link>
      </div>
    </main>
  )
}
