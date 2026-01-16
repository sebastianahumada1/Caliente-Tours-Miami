'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: 'home',
      label: 'Home',
      isActive: pathname === '/',
    },
    {
      href: '/catalogo',
      icon: 'directions_boat',
      label: 'Fleet',
      isActive: pathname === '/catalogo' || pathname?.startsWith('/catalogo/'),
    },
    {
      href: '/reserva',
      icon: 'search',
      label: 'Search',
      isSpecial: true,
    },
    {
      href: '/reserva',
      icon: 'confirmation_number',
      label: 'Trips',
      isActive: pathname === '/reserva',
    },
    {
      href: '#',
      icon: 'account_circle',
      label: 'Profile',
      isActive: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full h-20 bg-background-dark/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-6 z-50">
      {navItems.map((item, index) => {
        if (item.isSpecial) {
          return (
            <Link
              key={index}
              href={item.href}
              className="size-14 bg-primary rounded-full -mt-10 border-4 border-[#0a0a1a] flex items-center justify-center neon-glow-pink hover:scale-110 transition-transform"
            >
              <span className="material-symbols-outlined text-white text-[32px]">{item.icon}</span>
            </Link>
          );
        }

        const isActive = item.isActive;
        const textColor = isActive ? 'text-primary' : 'text-gray-400';

        return (
          <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${textColor} transition-colors`}
          >
            <span
              className={`material-symbols-outlined text-[28px] ${
                isActive ? 'drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
