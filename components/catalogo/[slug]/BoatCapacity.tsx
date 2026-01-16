interface BoatCapacityProps {
  capacity: number;
}

export default function BoatCapacity({ capacity }: BoatCapacityProps) {
  return (
    <section>
      <div className="bg-surface border border-white/10 rounded-2xl p-6 neon-glow-cyan">
        <div className="flex items-center gap-3 mb-3">
          <span className="material-symbols-outlined text-secondary text-2xl">group</span>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Max Capacity</h2>
        </div>
        <p className="text-xl font-bold text-white mb-2">
          {capacity} People <span className="text-sm font-medium text-gray-400">(Adults & Children)</span>
        </p>
        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider leading-relaxed">
          Regulated under the Passenger Vessel Safety Act of 1993
        </p>
      </div>
    </section>
  );
}
