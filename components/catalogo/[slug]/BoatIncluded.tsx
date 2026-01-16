export default function BoatIncluded() {
  const includedItems = [
    { en: 'Captain fees', es: 'pagos del capitan', icon: 'sailing' },
    { en: 'Steward', es: 'asistente', note: '(large boats)', icon: 'room_service' },
    { en: 'Fuel fee', es: 'gastos de gasolina', icon: 'local_gas_station' },
    { en: 'Dock fee', es: 'gastos de muelle', icon: 'anchor' },
    { en: 'Cooler with ice', es: 'nevera con hielo', icon: 'kitchen' },
    { en: 'Large water mat', es: 'alfombra flotante', icon: 'surfing' },
    { en: 'Bluetooth music system', es: 'sistema de música Bluetooth', icon: 'bluetooth' },
    { en: 'Cleaning fee', es: 'gastos de limpieza', icon: 'cleaning_services' },
  ];

  return (
    <section className="bg-indigo-under/40 rounded-2xl p-6 border border-white/5">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-secondary mb-6">
        Our prices included:
        <br />
        <span className="text-secondary/90">Nuestros precios incluyen:</span>
      </h2>
      <div className="space-y-3">
        {includedItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-secondary text-xl">
                {item.icon}
              </span>
              </div>
            <div className="text-sm font-medium text-white leading-relaxed flex-1">
              {item.en}
              {item.note && <span className="text-gray-400"> {item.note}</span>}
              <span className="text-gray-400"> / {item.es}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
