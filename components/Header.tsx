import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative z-20 p-4 sm:p-6 pt-12 sm:pt-14">
      <div className="flex items-center justify-start mb-4 sm:mb-6">
        <div className="flex flex-col items-start gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src="/logo-transparent.png"
              alt="Caliente Tours Miami Logo"
              width={211}
              height={211}
              className="w-[141px] h-[141px] sm:w-[176px] sm:h-[176px] md:w-[211px] md:h-[211px] object-contain"
              sizes="(max-width: 640px) 141px, (max-width: 768px) 176px, 211px"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold italic uppercase tracking-tighter text-white">
            MIAMI YACHT RENTALS
          </h2>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md">
        <span className="material-symbols-outlined text-secondary text-lg sm:text-xl">verified_user</span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-secondary">
          Licensed Broker
        </span>
      </div>
    </header>
  );
}
