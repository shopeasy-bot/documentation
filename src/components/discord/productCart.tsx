import { cn } from "fumadocs-ui/utils/cn";
import Image from "next/image";
import { ggsans } from "./font";

interface DiscordProductCardProps {
  botName?: string;
  botIcon?: string;
  title?: string;
  description?: string;
  price: string;
  stock?: string;
  buttonLabel?: string;
}

export function DiscordProductCard({
  botName = "ShopEasy",
  botIcon = "/shopeasy.svg",
  title = "Sem título configurado..",
  description = "Sem descrição configurada...",
  price,
  stock = "0 unidades disponíveis",
  buttonLabel = "Comprar",
}: DiscordProductCardProps) {
  return (
    <div className={cn(ggsans.className, "max-w-md")}>

      {/* Header compacto */}
      <div className="flex items-center gap-2 mb-1 text-sm">
        <Image
          src={botIcon}
          alt="Bot avatar"
          width={24}
          height={24}
          className="rounded-full"
        />

        <span className="text-green-400 font-semibold leading-none">
          {botName}
        </span>

        <span className="bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          APP
        </span>
      </div>

      {/* Embed */}
      <div className="flex bg-[#2b2d31] rounded-md overflow-hidden shadow-md">

        {/* Barra lateral */}
        <div className="w-1 bg-green-500" />

        {/* Conteúdo */}
        <div className="p-3 flex-1">
          <div className="font-semibold text-white mb-1">
            {title}
          </div>

          <div className="text-sm text-white/60 mb-3">
            {description}
          </div>

          <div className="text-white font-semibold mb-1">
            {price}
          </div>

          <div className="text-xs text-white/40">
            {stock}
          </div>
        </div>
      </div>

      {/* Botão */}
      <button
        className="
          mt-2 inline-flex items-center gap-2
          bg-green-600 hover:bg-green-700
          disabled:bg-green-800 disabled:cursor-not-allowed
          text-white text-sm font-semibold
          px-4 py-2 rounded-md
        "
      >
        🛒 {buttonLabel}
      </button>
    </div>
  );
}
