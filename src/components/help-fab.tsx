"use client";

import { useEffect, useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { CrispTrigger } from "@/components/crisp";

const DISMISS_KEY = "shopeasy-help-bubble-dismissed";
const SHOW_DELAY_MS = 4000;
const AUTO_HIDE_MS = 12000;

export function HelpFab() {
  const [bubbleMounted, setBubbleMounted] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const showTimer = setTimeout(() => {
      setBubbleMounted(true);
      requestAnimationFrame(() => setBubbleVisible(true));
    }, SHOW_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!bubbleVisible) return;
    const hideTimer = setTimeout(dismissBubble, AUTO_HIDE_MS);
    return () => clearTimeout(hideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubbleVisible]);

  function dismissBubble() {
    setBubbleVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    setTimeout(() => setBubbleMounted(false), 300);
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {bubbleMounted && (
        <div
          role="alert"
          className={cn(
            "relative w-64 max-w-[calc(100vw-2rem)] rounded-2xl border p-4 shadow-xl transition-all duration-300 ease-out",
            "border-neutral-200/10 dark:border-neutral-800/50 bg-white dark:bg-neutral-900",
            bubbleVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "pointer-events-none opacity-0 translate-y-2 scale-95",
          )}
        >
          <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-neutral-200/10 bg-white dark:border-neutral-800/50 dark:bg-neutral-900" />

          <button
            type="button"
            onClick={dismissBubble}
            aria-label="Fechar"
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 dark:bg-neutral-700"
          >
            <FiX className="h-3 w-3" />
          </button>

          <CrispTrigger onClick={dismissBubble} className="flex flex-col gap-1 text-left w-full">
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
              Precisa de ajuda? 👋
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Fale com a gente agora pelo chat.
            </p>
          </CrispTrigger>
        </div>
      )}

      <CrispTrigger
        onClick={dismissBubble}
        aria-label="Precisa de ajuda? Abrir chat"
        className={cn(
          "group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-white",
          "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20",
          "transition-transform duration-300 hover:scale-105 active:scale-95 hover:shadow-emerald-500/40",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-transparent",
        )}
      >
        {!bubbleVisible && (
          <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" />
        )}
        <FiMessageCircle className="relative h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:scale-110" />
      </CrispTrigger>
    </div>
  );
}
