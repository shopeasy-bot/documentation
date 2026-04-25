import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { devSource } from '@/lib/sourcer';
import { BannerDiscordNav } from '@/components/nav/bannerDiscord';
import { GridDecoration } from '@/components/decoration/Grid';
import { cn } from '@/lib/cn';
import { FlareDecoration } from '@/components/decoration/Flare';
import { SidebarBanner } from '@/components/sidebar/banner';
import { DocsModeToggle } from '@/components/docs-mode-toggle';

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: devSource.pageTree,
  links: [],
  sidebar: {
    prefetch: false,
    footer: [<BannerDiscordNav key="discord" />],
    lang: "pt-br",
    banner: [
      <SidebarBanner key="banner" />,
      <DocsModeToggle key="mode-toggle" />,
    ],
  },
  themeSwitch: { enabled: false },
  nav: {
    ...baseOptions.nav,
    mode: "top",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...docsOptions}>
      {children}
      <FlareDecoration />
      <GridDecoration
        width={60}
        height={56}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
    </DocsLayout>
  );
}
