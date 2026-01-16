interface LiveStatusProps {
  location?: string;
}

export default function LiveStatus({ 
  location = "Downtown Miami"
}: LiveStatusProps) {
  return (
    <div className="flex items-center gap-2 px-2 mb-8">
      <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_#00ffff]"></span>
      <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-secondary/80">
        Live from {location}
      </p>
    </div>
  );
}
