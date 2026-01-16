'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 border border-red-500/50 text-red-400 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-red-500/10 transition-colors"
    >
      <span className="material-symbols-outlined text-lg">logout</span>
      Cerrar Sesión
    </button>
  );
}
