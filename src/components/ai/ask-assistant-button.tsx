"use client";

import { HiSparkles } from "react-icons/hi2";
import { ASSISTANT_EVENT } from "@/components/help-fab";

/** Abre o assistente flutuante da documentação. */
export function AskAssistantButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(ASSISTANT_EVENT, { detail: {} }))}
      className="group inline-flex h-8 items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 px-3 text-sm font-medium text-emerald-200 transition-colors hover:border-emerald-400/60 hover:from-emerald-500/20 hover:to-indigo-500/20"
    >
      <HiSparkles className="size-3.5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
      Perguntar ao assistente
    </button>
  );
}
