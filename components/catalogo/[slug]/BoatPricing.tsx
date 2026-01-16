import { Pricing } from '@/types/database';

interface BoatPricingProps {
  pricing: Pricing | null;
  basePrice?: number; // Fallback para compatibilidad
}

export default function BoatPricing({ pricing, basePrice }: BoatPricingProps) {
  // Si no hay pricing configurado, usar el formato antiguo con basePrice
  if (!pricing && basePrice) {
    const legacyPricing = [
    { hours: 2, price: Math.round(basePrice * 0.75) },
    { hours: 3, price: Math.round(basePrice * 1.04) },
    { hours: 4, price: Math.round(basePrice * 1.25) },
    { hours: 6, price: Math.round(basePrice * 1.75) },
    { hours: 8, price: Math.round(basePrice * 2.25) },
  ];

  return (
    <section>
      <div className="bg-surface border border-white/10 rounded-2xl p-6 neon-glow-pink">
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-primary text-2xl">payments</span>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Pricing</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {legacyPricing.map((item, index) => (
            <div
              key={index}
                className={index === legacyPricing.length - 1 ? 'flex flex-col col-span-2 pt-2' : 'flex flex-col border-b border-white/5 pb-2'}
            >
              <span className="text-xs font-medium text-gray-400 uppercase">{item.hours} Hours</span>
              <span className="text-xl font-black text-white">${item.price.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  }

  // Tipo "hourly": Precios por hora que varían por día
  if (pricing?.type === 'hourly') {
    return (
      <section>
        <div className="bg-surface border border-white/10 rounded-2xl p-6 neon-glow-pink">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Pricing</h2>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col border-b border-white/5 pb-4">
              <span className="text-xs font-medium text-gray-400 uppercase mb-2">Weekends</span>
              <span className="text-xl font-black text-white">${pricing.weekend.toLocaleString()} per hour</span>
            </div>
            <div className="flex flex-col border-b border-white/5 pb-4">
              <span className="text-xs font-medium text-gray-400 uppercase mb-2">Monday through Thursday</span>
              <span className="text-xl font-black text-white">${pricing.weekday.toLocaleString()} per hour</span>
            </div>
            <div className="flex flex-col pt-2">
              <span className="text-xs font-medium text-gray-400 uppercase mb-1">Minimum</span>
              <span className="text-lg font-bold text-primary">{pricing.minimum_hours} hours</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Tipo "fixed": Precios fijos por cantidad de horas
  if (pricing?.type === 'fixed') {
    const fixedPrices = Object.entries(pricing.prices)
      .map(([hours, price]) => ({
        hours: hours.replace('H', ''), // Convertir "3H" -> "3"
        price: price,
        display: hours, // Mantener "3H" para mostrar
      }))
      .sort((a, b) => parseInt(a.hours) - parseInt(b.hours)); // Ordenar por horas

    return (
      <section>
        <div className="bg-surface border border-white/10 rounded-2xl p-6 neon-glow-pink">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Pricing</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {fixedPrices.map((item, index) => (
              <div
                key={index}
                className={index === fixedPrices.length - 1 ? 'flex flex-col pt-2' : 'flex flex-col border-b border-white/5 pb-4'}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 uppercase">{item.display}</span>
                  <span className="text-xl font-black text-white">${item.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: Si no hay pricing configurado
  return null;
}
