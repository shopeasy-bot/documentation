import { GridDecoration } from "@/components/decoration/Grid"
import { FlareDecoration } from "@/components/decoration/Flare"
import { cn } from "@/lib/cn"
import { JetBrains_Mono, Poppins } from "next/font/google"
import Link from "next/link"
import { FiCheck } from "react-icons/fi"
import { Badge } from "@/components/ui/badge"
import settings from "@/../settings.json"

const poppins = Poppins({ subsets: ["latin"], weight: "500" })
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: "500" })

export default function PlansPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full motion-preset-expand motion-delay-[100ms] pt-20">
        {settings.plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:scale-105",
              plan.popular
                ? "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/20 shadow-2xl"
                : "bg-neutral-100/5 border-neutral-200/10 dark:border-neutral-800/50",
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-500 text-white px-4 py-1">Mais Vendido</Badge>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className={`${poppins.className} text-2xl font-bold mb-2`}>{plan.name}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">{plan.description}</p>

              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className={`${jetbrains.className} text-4xl font-bold`}>{plan.price}</span>
                <span className="text-neutral-500 dark:text-neutral-400">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center gap-3">
                  <FiCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
               href={`/discord`}
              target="_blank"
              className={cn(
                `${jetbrains.className} group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl overflow-hidden font-medium shadow-lg transition-all hover:shadow-2xl active:opacity-90 hover:scale-105 duration-300 w-full`,
                plan.popular
                  ? "bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 text-white hover:shadow-emerald-500/30 border border-emerald-500/20"
                  : "bg-neutral-100/10 backdrop-blur-sm text-neutral-700 dark:text-slate-50 border border-neutral-200/20 dark:border-neutral-800/50 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50",
              )}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.4),rgba(255,255,255,0))] group-hover:translate-x-full duration-700" />
              <span className="relative z-10">{plan.price === "Grátis" ? "Começar Grátis" : "Adquirir Plano"}</span>
            </Link>
          </div>
        ))}
      </div>

      <GridDecoration
        width={60}
        height={60}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </main>
  )
}
