import { cn } from "../../lib/cn"
import type React from "react"

type AnimatedShinyTextProps = React.HTMLAttributes<HTMLDivElement>

export default function AnimatedShinyText({ className, children, ...props }: AnimatedShinyTextProps) {
  return (
    <div
      className={cn(
        "animate-shine bg-gradient-to-r from-neutral-500 via-neutral-100 to-neutral-500 bg-[200%_auto] bg-clip-text text-transparent dark:from-neutral-400 dark:via-white dark:to-neutral-400",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
