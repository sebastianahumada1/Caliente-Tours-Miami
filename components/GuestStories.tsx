interface GuestStoriesProps {
  rating?: number;
  reviewerName?: string;
  reviewerInitials?: string;
  review?: string;
}

export default function GuestStories({
  rating = 4.9,
  reviewerName = "Alex M.",
  reviewerInitials = "AM",
  review = "Best night in Miami! The service was impeccable and the yacht was absolutely stunning. Highly recommend for any luxury event.",
}: GuestStoriesProps) {
  return (
    <section className="mb-12 px-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold italic uppercase tracking-tighter">Guest Stories</h3>
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-yellow-400 text-sm fill-current">star</span>
          <span className="text-sm font-bold">{rating}/5</span>
        </div>
      </div>
      <div className="bg-surface/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 opacity-10">
          <span className="material-symbols-outlined text-6xl">format_quote</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
            <div className="w-full h-full rounded-full bg-indigo-under flex items-center justify-center font-bold text-xs text-white">
              {reviewerInitials}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold">{reviewerName}</p>
            <div className="flex text-[10px] text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[12px] fill-current">star</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-300 italic text-sm leading-relaxed">"{review}"</p>
      </div>
    </section>
  );
}
