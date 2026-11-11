"use client";

import { usePathname } from "next/navigation";
import { FiMessageCircle } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { openCrispChat, useCrispChatOpen } from "./store";

/** Botão flutuante que abre o chat do Crisp. */
export function HelpBubble() {
  const pathname = usePathname() ?? "/";
  const chatOpen = useCrispChatOpen();

  // Com o chat aberto o botão some, para não ficar por cima da janela do Crisp.
  if (chatOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => openCrispChat({ page: pathname })}
        aria-label="Precisa de ajuda? Abrir chat"
        className={cn(
          "group relative flex h-12 w-12 items-center justify-center rounded-full text-white sm:h-14 sm:w-14",
          "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20",
          "transition-transform duration-300 hover:scale-105 hover:shadow-emerald-500/40 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent",
        )}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-20 motion-reduce:animate-none" />
        <FiMessageCircle className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
