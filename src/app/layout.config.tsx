import { NavTitle } from '@/components/nav/title';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FaBook, FaCreditCard } from 'react-icons/fa';

export const baseOptions: BaseLayoutProps = {
  disableThemeSwitch: true,
  githubUrl: "https://github.com/jeanbrnd/shopeasy-docs",
  nav: {
    title: <NavTitle />,
    transparentMode: "top"
  },
  links: [
      {
      text: <span className="flex gap-2 items-center"><FaBook/>Documentação</span>,
      url: "/docs",
      active: "nested-url",
     },
    //  {
    //   text: <span className="flex gap-2 items-center"><FaNewspaper/>Novidades</span>,
    //   url: "/updates",
    //   active: "nested-url",
    // },
     {
      text: <span className="flex gap-2 items-center"><FaCreditCard/>Planos</span>,
      url: "/plans",
      active: "nested-url",
    },
     
    ],
};
