import { cn } from "fumadocs-ui/utils/cn";
import Image from "next/image";
import { ggsans } from "./font";

interface SelectOption {
  label: string;
  description?: string;
  icon?: string;
}

interface DiscordProductConfigProps {
  botName?: string;
  botIcon?: string;
  title?: string;
  description?: string;
  productTitle?: string;
  productDescription?: string;
  price?: string;
  options: SelectOption[];
}

export function DiscordProductConfig({
  botName = "ShopEasy",
  botIcon = "/shopeasy.svg",
  title = "⚙️ Edição produto",
  description = "Selecione abaixo qual opção você deseja alterar/configurar.",
  productTitle = "Sem Título Configurado..",
  productDescription = "Sem Descrição Configurada..",
  price = "R$ 10,00",
  options,
}: DiscordProductConfigProps) {
  return (
    <div className={cn(ggsans.className, "max-w-md")}>

      {/* Header */}
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
      <div className="bg-[#2b2d31] rounded-md overflow-hidden shadow-md">

        {/* Barra lateral */}
        <div className="flex">
          <div className="w-1 bg-green-500" />

          <div className="p-4 flex-1">
            {/* Título */}
            <div className="font-semibold text-white mb-1">
              {title}
            </div>

            {/* Descrição */}
            <div className="text-sm text-white/60 mb-3">
              {description}
            </div>

            <hr className="border-white/10 mb-3" />

            {/* Campos */}
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-white font-semibold">Título:</span>
                <div className="text-white/60">{productTitle}</div>
              </div>

              <div>
                <span className="text-white font-semibold">Descrição:</span>
                <div className="text-white/60">{productDescription}</div>
              </div>

              <div>
                <span className="text-white font-semibold">Valor:</span>
                <div className="text-white/80 font-semibold">{price}</div>
              </div>
            </div>

            <p className="mt-3 text-xs text-white/40">
              Lembre-se de salvar as alterações, elas ficam disponíveis por até 24 horas.
            </p>
          </div>
        </div>

        {/* Select menu */}
        <div className="bg-[#1e1f22] px-3 py-2 border-t border-white/10">
          <div className="bg-[#2b2d31] rounded-md px-3 py-2 flex justify-between items-center text-sm text-white/70">
            <span>📦 Selecione uma opção</span>
            <span className="text-white/40">▾</span>
          </div>
        </div>

        {/* Lista (visual) */}
        <div className="bg-[#1e1f22] px-2 py-1 space-y-1">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex gap-3 p-2 rounded-md hover:bg-white/5 cursor-default"
            >
              {opt.icon && (
                <span className="text-white/80">{opt.icon}</span>
              )}
              <div>
                <div className="text-sm text-white font-semibold">
                  {opt.label}
                </div>
                {opt.description && (
                  <div className="text-xs text-white/50">
                    {opt.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-2 mt-2">
        <button className="flex-1 bg-[#313338] text-white/40 text-sm px-3 py-2 rounded-md">
          ⬅ Menu Principal
        </button>
        <button className="flex-1 bg-green-600 text-white text-sm px-3 py-2 rounded-md">
          💾 Salvar Alterações
        </button>
        <button className="flex-1 bg-red-600 text-white text-sm px-3 py-2 rounded-md">
          🔙 Voltar
        </button>
      </div>
    </div>
  );
}
