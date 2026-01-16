'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BoatHeroProps {
  image: string;
  alt: string;
}

export default function BoatHero({ image, alt }: BoatHeroProps) {
  const router = useRouter();

  return (
    <div className="relative w-full overflow-hidden h-[28vh] min-h-[200px] max-h-[300px]">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-black/20 z-10 pointer-events-none"></div>
      <div className="absolute top-12 left-6 z-20">
        <button
          onClick={() => router.back()}
          className="size-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 active:scale-95 transition-transform hover:bg-black/60"
        >
          <span className="material-symbols-outlined text-white text-xl leading-none">arrow_back_ios_new</span>
        </button>
      </div>
    </div>
  );
}
