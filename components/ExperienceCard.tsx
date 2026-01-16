import Image from 'next/image';

interface ExperienceCardProps {
  title: string;
  subtitle: string;
  image: string;
  borderColor: 'primary' | 'secondary';
}

export default function ExperienceCard({
  title,
  subtitle,
  image,
  borderColor,
}: ExperienceCardProps) {
  const borderClass = borderColor === 'primary' ? 'border-primary/30' : 'border-secondary/30';

  return (
    <div className="flex flex-col gap-3">
      <div className={`w-full aspect-square rounded-full overflow-hidden border-2 ${borderClass} p-1`}>
        <div className="w-full h-full rounded-full relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-full"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="text-center">
        <h5 className="font-bold text-sm tracking-tight text-white">{title}</h5>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );
}
