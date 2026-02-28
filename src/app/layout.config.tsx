import { NavTitle } from '@/components/nav/title';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { FaBook, FaCreditCard } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

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
      text: <span className="flex gap-2 items-center"><FaShield/>Termos</span>,
      url: "/terms",
      active: "nested-url",
    },
    {
      type: 'custom',
      children: (
        <Link
          href="/login"
          className="group relative inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/30 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.25),rgba(255,255,255,0))] group-hover:translate-x-full duration-500 transition-transform" />
          <FiLogIn className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Login</span>
        </Link>
      ),
      secondary: true,
    },
  ],
};
