import Link from "next/link";
import Image from "next/image";
import { Settings, Calendar, Flag, Fuel, MapPin } from "lucide-react";

interface Car {
  id: number;
  slug: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  price: number;
  mileage: string;
  engine: string;
  transmission: string;
  fuelType: string;
  city: string;
  featured: boolean;
  images: string[];
}

interface CarCardProps {
  car: Car;
  view?: "grid" | "list";
  theme?: "light" | "dark";
}

export default function CarCard({ car, view = "grid", theme = "light" }: CarCardProps) {
  const isDark = theme === "dark";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const name = `${car.make || ''} ${car.model || ''} ${car.year || ''}`.trim();
  const image = car.images?.[0] || "/placeholder.jpg";
  const fuel = car.fuelType;

  if (isDark) {
    return (
      <Link href={`/cars/${car.slug}`} className="bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden
                      hover:border-[#eece00] hover:shadow-yellow-md transition-all duration-300 group flex flex-col h-full block cursor-pointer">
        {/* IMAGE */}
        <div className="relative h-52 w-full overflow-hidden bg-[#000000]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {/* FEATURED BADGE */}
          {car.featured && (
            <span className="font-heading font-black text-[10px] uppercase tracking-[0.1em] bg-[#eece00] text-[#000000] px-2.5 py-1 rounded-[4px] absolute top-3 left-3 z-10">
              FEATURED
            </span>
          )}

          {/* CONDITION BADGE */}
          <span className={`font-heading font-black text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-[4px] absolute top-3 right-3 z-10
            ${car.condition === 'new'
              ? 'bg-[#eece00] text-[#000000]'
              : 'bg-[#000000] text-[#ffffff]'}`}>
            {car.condition === 'new' ? 'NEW' : 'USED'}
          </span>
        </div>

        {/* CARD BODY */}
        <div className="p-4 flex flex-col flex-grow">
          <h4 className="font-heading font-bold text-[20px] leading-[1.1] tracking-[0.01em] text-[#ffffff] mb-2 line-clamp-1">{name}</h4>

          {/* SPECS ROW */}
          <div className="font-body font-normal text-[12px] flex flex-wrap gap-x-3 gap-y-1.5 mb-3 text-[#aaaaaa]">
            <span className="flex items-center gap-1"><Settings className="w-3.5 h-3.5" /> {car.engine}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {car.year}</span>
            <span className="flex items-center gap-1"><Flag className="w-3.5 h-3.5" /> {car.mileage}</span>
            <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> {fuel}</span>
          </div>

          {/* PRICE */}
          <div className="border-l-4 border-[#eece00] pl-3 mb-4 mt-auto">
            <p className="font-heading font-black text-[28px] leading-none tracking-[-0.01em] text-[#eece00]">{formatPrice(car.price)}</p>
            <p className="font-body font-normal text-[13px] leading-[1.6] text-[#777777] mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {car.city}</p>
          </div>

          {/* CTA */}
          <div
            className="font-heading font-black text-[14px] tracking-[0.04em] uppercase block w-full text-center bg-[#eece00] text-[#000000] py-2.5 rounded-md
                       hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-200"
          >
            View Details →
          </div>
        </div>
      </Link>
    );
  }

  // LIGHT variant
  return (
    <Link href={`/cars/${car.slug}`} className="bg-[#ffffff] border border-[#e5e5e5] rounded-xl overflow-hidden
                    hover:border-[#eece00] hover:shadow-yellow-md transition-all duration-300 group flex flex-col h-full block cursor-pointer">
    {/* IMAGE */}
    <div className="relative h-52 w-full overflow-hidden bg-[#f9f9f9]">
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain group-hover:scale-105 transition-transform duration-500"
      />

      {/* FEATURED BADGE */}
      {car.featured && (
        <span className="font-heading font-black text-[10px] uppercase tracking-[0.1em] bg-[#eece00] text-[#000000] px-2.5 py-1 rounded-[4px] absolute top-3 left-3 z-10">
          FEATURED
        </span>
      )}

      {/* CONDITION BADGE */}
      <span className={`font-heading font-black text-[10px] uppercase tracking-[0.1em] px-2.5 py-1 rounded-[4px] absolute top-3 right-3 z-10
        ${car.condition === 'new'
          ? 'bg-[#eece00] text-[#000000]'
          : 'bg-[#000000] text-[#ffffff]'}`}>
        {car.condition === 'new' ? 'NEW' : 'USED'}
      </span>
    </div>

    {/* CARD BODY */}
    <div className="p-4 flex flex-col flex-grow">
      <h4 className="font-heading font-bold text-[20px] leading-[1.1] tracking-[0.01em] text-[#000000] mb-2 line-clamp-1">{name}</h4>

      {/* SPECS ROW */}
      <div className="font-body font-normal text-[12px] flex flex-wrap gap-x-3 gap-y-1.5 mb-3 text-[#666666]">
        <span className="flex items-center gap-1"><Settings className="w-3.5 h-3.5" /> {car.engine}</span>
        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {car.year}</span>
        <span className="flex items-center gap-1"><Flag className="w-3.5 h-3.5" /> {car.mileage}</span>
        <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> {fuel}</span>
      </div>

      {/* PRICE */}
      <div className="border-l-4 border-[#eece00] pl-3 mb-4 mt-auto">
        <p className="font-heading font-black text-[26px] leading-none tracking-[-0.01em] text-[#000000]">{formatPrice(car.price)}</p>
        <p className="font-body font-normal text-[13px] leading-[1.6] text-[#888888] mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {car.city}</p>
      </div>

      {/* CTA */}
      <div
        className="font-heading font-black text-[14px] tracking-[0.04em] uppercase block w-full text-center bg-[#eece00] text-[#000000] py-2.5 rounded-md
                   hover:bg-[#000000] hover:text-[#eece00] transition-all duration-200"
      >
        View Details →
      </div>
    </div>
    </Link>
  );
}
