'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FleetCardProps {
  id: string;
  slug: string;
  name: string;
  type: string;
  price: number;
  image: string;
  isHotDeal?: boolean;
  opacity?: number;
  className?: string;
}

export default function FleetCard({
  id,
  slug,
  name,
  type,
  price,
  image,
  isHotDeal = false,
  opacity = 1,
  className = "",
}: FleetCardProps) {
  return (
    <Link href={`/catalogo/${slug}`} className={`min-w-[280px] snap-center ${className}`}>
      <div
        className={`relative h-[380px] rounded-xl overflow-hidden border border-white/10 group ${isHotDeal ? 'neon-glow-pink' : ''}`}
        style={{ opacity }}
      >
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="280px"
            priority={isHotDeal}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        {isHotDeal && (
          <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase">
            Hot Deal
          </div>
        )}
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">
            {type}
          </p>
          <h4 className="text-2xl font-bold leading-tight mb-3">{name}</h4>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              ${price.toLocaleString()} <span className="text-xs font-normal text-gray-400">/hr</span>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/reserva`;
              }}
              className="size-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
