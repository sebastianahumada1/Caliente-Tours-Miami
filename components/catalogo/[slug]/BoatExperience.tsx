interface BoatExperienceProps {
  description: string;
}

export default function BoatExperience({ description }: BoatExperienceProps) {
  return (
    <section className="pb-10">
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 pl-1">The Experience</h2>
      <p className="text-gray-400 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </section>
  );
}
