import { DocsLayout, DocsLayoutProps } from 'fumadocs-ui/layouts/notebook';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { BannerDiscordNav } from '@/components/nav/bannerDiscord';
import { GridDecoration } from '@/components/decoration/Grid';
import { cn } from '@/lib/cn';
import { FlareDecoration } from '@/components/decoration/Flare';
import { SidebarBanner } from '@/components/sidebar/banner';

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: {
    ...source.pageTree,
  },
  links: [],
  sidebar: {
    prefetch: false,
    footer: [<BannerDiscordNav key="discord" />],
    lang: "pt-br",
    banner: [< SidebarBanner />]
    
  },
  disableThemeSwitch: true,
 
  nav: {    
    ...baseOptions.nav,
    mode: "top"
  }
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions} >{children}
      <FlareDecoration />
      
      <GridDecoration
        width={60}
        height={56}
        className={cn("[mask-image:linear-gradient(-160deg,white,transparent,transparent)] opacity-30")}
      />
  </DocsLayout>;
}