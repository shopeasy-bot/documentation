import { NavTitle } from '@/components/nav/title';
import { UserButton } from '@/components/nav/user-button';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FaBook, FaCreditCard } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { FiRss } from 'react-icons/fi';

export const baseOptions: BaseLayoutProps = {
  themeSwitch: { enabled: false },
  nav: {
    title: <NavTitle />,
    transparentMode: "top",
  },
  links: [
    {
      text: <span className="flex gap-2 items-center"><FaBook/>Documentação</span>,
      url: "/docs",
      active: "nested-url",
    },
    {
      text: <span className="flex gap-2 items-center"><FaCreditCard/>Planos</span>,
      url: "/plans",
      active: "nested-url",
    },
    {
      text: <span className="flex gap-2 items-center"><FiRss/>Blog</span>,
      url: "/blog",
      active: "nested-url",
    },
    {
      text: <span className="flex gap-2 items-center"><FaShield/>Termos</span>,
      url: "/terms",
      active: "nested-url",
    },
    {
      type: 'custom',
      children: <UserButton />,
      secondary: true,
    },
  ],
};
