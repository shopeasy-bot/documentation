import { GridDecoration } from "@/components/decoration/Grid";
import { FlareDecoration } from "@/components/decoration/Flare";
import { cn } from "@/lib/cn";
import { Poppins } from "next/font/google";
import { FiCheckCircle } from "react-icons/fi";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

export default function inviteAuthSuccessPage() {
  return (
    <main className="flex flex-1 flex-col z-10 items-center justify-center text-center gap-16 px-4">
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={60}
        className={cn(
          "[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30"
        )}
      />

      <div className="flex flex-col items-center gap-6 motion-preset-expand motion-delay-[100ms]">
        <FiCheckCircle className="w-24 h-24 text-emerald-400 animate-pulse" />
        <h1
          className={`${poppins.className} text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r 
            dark:from-white from-black dark:to-neutral-400 to-neutral-500 bg-clip-text text-transparent
            tracking-tight leading-none
          `}
        >
          Conta Discord Autorizada!
        </h1>
        <p className="text-lg lg:text-xl font-light text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Sua conta Discord foi autorizada com sucesso! Adicionamos você no
          servidor da Zyven Studio e também enviamos uma mensagem no seu
          privado. Chegou aí? Caso não tenha chegado,{" "}
          <a href="/support" className="text-emerald-400 animate-pulse">
            clique aqui
          </a>
          .
        </p>
      </div>
    </main>
  );
}
