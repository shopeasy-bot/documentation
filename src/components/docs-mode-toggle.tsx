'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineSmartToy } from 'react-icons/md';
import { TbApi } from 'react-icons/tb';
import { cn } from '@/lib/cn';

export function DocsModeToggle() {
  const pathname = usePathname();
  const isBot = !pathname.startsWith('/docs/dev');

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl bg-fd-muted/40 border border-fd-border/60 mx-1 mb-1">
      <Link
        href="/docs"
        className={cn(
          'flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
          isBot
            ? 'bg-fd-background text-fd-foreground shadow-sm border border-fd-border/50'
            : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted/60',
        )}
      >
        <MdOutlineSmartToy className="w-3.5 h-3.5 shrink-0" />
        Bot
      </Link>
      <Link
        href="/docs/dev"
        className={cn(
          'flex flex-1 items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
          !isBot
            ? 'bg-fd-background text-fd-foreground shadow-sm border border-fd-border/50'
            : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted/60',
        )}
      >
        <TbApi className="w-3.5 h-3.5 shrink-0" />
        Devs
      </Link>
    </div>
  );
}
