"use client";

import { ChatboxColors, Crisp } from "crisp-sdk-web";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/context/user";
import { CRISP_WEBSITE_ID, flushPendingMessage, setChatOpen } from "./store";

let configured = false;

/**
 * Carrega o Crisp pelo SDK oficial (crisp-sdk-web).
 * O lançador padrão fica escondido: quem abre o chat é o balão de ajuda
 * ou qualquer botão que use `openCrispChat`.
 */
export function CrispChat() {
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    if (!CRISP_WEBSITE_ID || configured) return;
    configured = true;

    Crisp.configure(CRISP_WEBSITE_ID, { locale: "pt-br", safeMode: true });
    Crisp.setColorTheme(ChatboxColors.Green);
    Crisp.chat.hide();

    Crisp.chat.onChatOpened(() => {
      setChatOpen(true);
      flushPendingMessage();
    });
    Crisp.chat.onChatClosed(() => {
      Crisp.chat.hide();
      setChatOpen(false);
    });
  }, []);

  // Identifica o leitor logado para o suporte não precisar perguntar.
  useEffect(() => {
    if (!CRISP_WEBSITE_ID || !user) return;
    Crisp.user.setNickname(user.globalName || user.username);
    Crisp.user.setAvatar(user.avatarUrl);
    if (user.email) Crisp.user.setEmail(user.email);
    Crisp.session.setData({ discord_id: user.id, discord_usuario: user.username });
  }, [user]);

  useEffect(() => {
    if (!CRISP_WEBSITE_ID || !pathname) return;
    Crisp.session.setData({ pagina: pathname });
  }, [pathname]);

  return null;
}
