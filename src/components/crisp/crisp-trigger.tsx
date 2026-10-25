"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { openCrispChat } from "./store";

export function CrispTrigger({
  className,
  children,
  message,
  onClick,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  /** Texto que já aparece digitado no chat. */
  message?: string;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const pathname = usePathname() ?? undefined;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => {
        openCrispChat({ message, page: pathname });
        onClick?.();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
