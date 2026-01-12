"use client";

import { ReactElement, ButtonHTMLAttributes } from "react";
import { ggsans } from "./font";

type Variant = "primary" | "secondary" | "success" | "danger";

interface DiscordButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  label: string;
  icon?: ReactElement;
}

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#5865F2",
  },
  secondary: {
    backgroundColor: "#4F545C",
  },
  success: {
    backgroundColor: "#3BA55D",
  },
  danger: {
    backgroundColor: "#ED4245",
  },
};

export function DiscordButton({
  variant = "primary",
  label,
  icon,
  disabled,
  ...props
}: DiscordButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={ggsans.className}
      style={{
        /* RESET TOTAL (ignora global.css) */
        all: "unset",
        boxSizing: "border-box",

        /* Layout */
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",

        /* Tamanho igual Discord */
        padding: "6px 16px",
        borderRadius: "4px",

        /* Texto */
        fontSize: "14px",
        fontWeight: 600,
        lineHeight: "18px",
        color: "#FFFFFF",

        /* Comportamento */
        cursor: disabled ? "not-allowed" : "pointer",
        userSelect: "none",
        opacity: disabled ? 0.5 : 1,

        /* Transição */
        transition: "background-color 0.15s ease",

        /* Variante */
        ...VARIANT_STYLES[variant],
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.backgroundColor = "#4752C4";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.backgroundColor =
          VARIANT_STYLES[variant].backgroundColor!;
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.backgroundColor = "#3C45A5";
      }}
    >
      {icon}
      {label}
    </button>
  );
}
