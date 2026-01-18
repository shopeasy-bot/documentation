import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { JetBrains_Mono, Poppins } from "next/font/google"
import { FiCreditCard, FiTrendingUp, FiShield, FiLink } from "react-icons/fi"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/cn"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export default function WalletPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center px-4 py-16 relative min-h-screen">
      <FlareDecoration />

      <div className="max-w-6xl w-full space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-6 motion-preset-expand motion-delay-[100ms]">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-lg"></div>
            <Badge
              variant="outline"
              className="relative bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-6 py-2 text-sm font-medium backdrop-blur-sm hover:bg-emerald-500/20 transition-all duration-300"
            >
              <FiCreditCard className="w-4 h-4 mr-2" />
              Gestão de Pagamentos
            </Badge>
          </div>

          <h1
            className={`${poppins.className} text-4xl lg:text-6xl font-bold bg-gradient-to-r 
              dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
              tracking-tight leading-tight
            `}
          >
            Carteira do Bot
          </h1>

          <p className="text-lg lg:text-xl font-light text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            Conecte sua carteira a múltiplos{" "}
            <span className="font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              gateways de pagamento
            </span>{" "}
            e gerencie suas transações com <span className="font-semibold">flexibilidade total</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 motion-preset-expand motion-delay-[200ms]">
          {/* Gateway Integration Card */}
          <Card className="group relative overflow-hidden border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FiLink className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Múltiplos Gateways
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Conecte sua carteira a diversos gateways de pagamento como Mercado Pago, Stripe, PayPal e mais.
              </p>
            </div>
          </Card>

          {/* Variable Fees Card */}
          <Card className="group relative overflow-hidden border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Taxas Variáveis
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                As taxas são determinadas pelo gateway escolhido. Cada plataforma possui sua própria estrutura de
                tarifas.
              </p>
            </div>
          </Card>

          {/* Security Card */}
          <Card className="group relative overflow-hidden border-neutral-200/20 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <FiShield className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className={`${poppins.className} text-xl font-semibold text-neutral-900 dark:text-white`}>
                Segurança Garantida
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Todas as transações são processadas de forma segura através dos gateways oficiais.
              </p>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <div className="motion-preset-expand motion-delay-[300ms]">
          <Card className="border-neutral-200/20 dark:border-neutral-800/50 bg-gradient-to-br from-neutral-50/80 to-neutral-100/80 dark:from-neutral-900/80 dark:to-neutral-800/80 backdrop-blur-sm p-8 lg:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-500 font-bold">1</span>
                </div>
                <div>
                  <h4 className={`${poppins.className} text-lg font-semibold text-neutral-900 dark:text-white mb-2`}>
                    Como Funciona a Conexão
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Configure suas credenciais do gateway diretamente no painel do bot. Suportamos integração com
                    Mercado Pago, Stripe, PayPal e outros provedores populares.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-500 font-bold">2</span>
                </div>
                <div>
                  <h4 className={`${poppins.className} text-lg font-semibold text-neutral-900 dark:text-white mb-2`}>
                    Sobre as Taxas
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Cada gateway possui sua própria estrutura de taxas que varia de acordo com o método de pagamento,
                    país e volume de transações. Consulte a documentação do seu gateway para mais detalhes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-500 font-bold">3</span>
                </div>
                <div>
                  <h4 className={`${poppins.className} text-lg font-semibold text-neutral-900 dark:text-white mb-2`}>
                    Gestão Centralizada
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Gerencie todas as suas transações em um único lugar. Visualize histórico, estatísticas e configure
                    notificações automáticas para cada venda.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6 motion-preset-expand motion-delay-[400ms]">
          <div className="inline-block">
            <div
              className={`${jetbrains.className} group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 cursor-pointer`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3),rgba(255,255,255,0))] group-hover:translate-x-full duration-500" />
              <FiCreditCard className="w-5 h-5" />
              Configurar Carteira
              <svg
                className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
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
