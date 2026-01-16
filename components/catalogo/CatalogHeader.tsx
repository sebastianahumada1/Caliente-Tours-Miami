'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CatalogHeaderProps {
  title?: string;
}

export default function CatalogHeader({ title = 'All Fleet' }: CatalogHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative z-30 p-6 pt-14 bg-background-dark/80 backdrop-blur-lg sticky top-0 border-b border-white/5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="size-10 flex items-center justify-center rounded-full bg-white/5 active:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
        </button>
        <h1 className="text-3xl font-extrabold tracking-tighter italic uppercase sunset-gradient leading-none">
          {title}
        </h1>
      </div>
    </header>
  );
}
