"use client";

import Script from "next/script";
import type { ReactNode } from "react";

const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
    CRISP_CHAT_HIDDEN?: boolean;
  }
}

export function CrispChat() {
  if (!CRISP_WEBSITE_ID) return null;

  return (
    <Script id="crisp-widget" strategy="afterInteractive">
      {`
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
        window.CRISP_CHAT_HIDDEN = true;
        (function () {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}

/**
 * Abre o chat do Crisp. Opcionalmente já preenche a mensagem e envia
 * a página atual como dado da sessão, para o suporte saber de onde o leitor veio.
 */
export function openCrispChat({ message, page }: { message?: string; page?: string } = {}) {
  const crisp = window.$crisp;
  if (!crisp) return;
  if (page) {
    crisp.push(["set", "session:data", [[["pagina", page]]]]);
    if (page.startsWith("/docs")) crisp.push(["set", "session:segments", [["docs"]]]);
  }
  if (message) crisp.push(["set", "message:text", [message]]);
  crisp.push(["do", "chat:open"]);
}

export function CrispTrigger({
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        openCrispChat();
        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
