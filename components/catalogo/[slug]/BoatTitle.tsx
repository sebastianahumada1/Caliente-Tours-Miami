interface BoatTitleProps {
  name: string;
}

export default function BoatTitle({ name }: BoatTitleProps) {
  return (
    <div className="px-6 pt-4 pb-2 text-center">
      <h1 className="yacht-title text-3xl uppercase tracking-tighter leading-tight text-white italic">
        {name}
      </h1>
    </div>
  );
}
