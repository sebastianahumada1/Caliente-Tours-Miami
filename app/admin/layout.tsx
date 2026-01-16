'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Header from '@/components/Header';
import SunsetBlur from '@/components/SunsetBlur';

// Layout que verifica la sesión desde localStorage en el cliente
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // No verificar sesión en la ruta de login
    if (pathname?.startsWith('/admin/login')) {
      setIsChecking(false);
      return;
    }

    // Verificar sesión desde localStorage
    async function checkAuth() {
      const session = await getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, [pathname, router]);

  // Mostrar loading mientras se verifica la sesión
  if (isChecking && !pathname?.startsWith('/admin/login')) {
    return (
      <>
        <SunsetBlur />
        <Header />
        <div className="min-h-screen pb-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Verificando sesión...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SunsetBlur />
      <Header />
      {children}
    </>
  );
}
