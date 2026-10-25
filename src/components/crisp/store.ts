"use client";

import { Crisp } from "crisp-sdk-web";
import { useSyncExternalStore } from "react";

export const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

// Estado "chat aberto" compartilhado entre o loader e o balão de ajuda.
let chatOpen = false;
const listeners = new Set<() => void>();

export function setChatOpen(open: boolean) {
  if (chatOpen === open) return;
  chatOpen = open;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useCrispChatOpen() {
  return useSyncExternalStore(subscribe, () => chatOpen, () => false);
}

/**
 * Abre o chat do Crisp. Opcionalmente já preenche a mensagem e registra
 * a página atual na sessão, para o suporte saber de onde o leitor veio.
 * Sem o Crisp configurado, cai no servidor do Discord.
 */
export function openCrispChat({ message, page }: { message?: string; page?: string } = {}) {
  if (!CRISP_WEBSITE_ID) {
    window.open("/discord", "_blank", "noopener");
    return;
  }

  if (page) {
    Crisp.session.setData({ pagina: page });
    if (page.startsWith("/docs")) Crisp.session.setSegments(["docs"], false);
  }
  // O lançador padrão do Crisp fica escondido; ele só aparece com o chat aberto.
  Crisp.chat.show();
  Crisp.chat.open();
  setChatOpen(true);

  // O Crisp ignora o texto se a janela ainda não abriu: aplica logo depois de abrir
  // e de novo quando o evento de abertura chegar (caso o chat ainda estivesse carregando).
  pendingMessage = message ?? null;
  if (message) setTimeout(() => Crisp.message.setMessageText(message), 300);
}

let pendingMessage: string | null = null;

/** Chamado quando o Crisp avisa que a janela abriu. */
export function flushPendingMessage() {
  if (!pendingMessage) return;
  Crisp.message.setMessageText(pendingMessage);
  pendingMessage = null;
}

export function closeCrispChat() {
  if (!CRISP_WEBSITE_ID) return;
  Crisp.chat.close();
  Crisp.chat.hide();
  setChatOpen(false);
}
