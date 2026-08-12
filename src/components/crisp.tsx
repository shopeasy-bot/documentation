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
        window.$crisp?.push(["do", "chat:open"]);
        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
