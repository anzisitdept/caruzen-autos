import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import brandsData from "@/data/brands.json";

export default function BrowseByBrand() {
  // 1. Filter to specific 7 popular brands
  const selectedBrandNames = ["Honda", "Toyota", "Suzuki", "Nissan", "Audi", "Mercedes Benz", "Ford"];
  const filteredBrands = brandsData.filter((b) => selectedBrandNames.includes(b.name));
  
  // 2. Duplicate array to create a seamless scrolling loop. 
  // We multiply it 4 times so it's wide enough for large screens, and exactly 50% of the content is identical.
  const marqueeBrands = [...filteredBrands, ...filteredBrands, ...filteredBrands, ...filteredBrands];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <SectionHeading 
          label="Shop by Make" 
          title="Browse by Brand" 
          theme="light" 
          align="center" 
        />
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-6 relative w-full">
        {/* Row 1: Moves Left */}
        <div className="flex w-max animate-marquee-left gap-4 px-4 hover:[animation-play-state:paused]">
          {marqueeBrands.map((brand, idx) => (
            <Link 
              key={`row1-${brand.id}-${idx}`} 
              href={`/cars?brand=${brand.slug}`}
              className="bg-[#ffffff] rounded-xl p-4 flex flex-col items-center gap-2
                         border border-[#e5e5e5] hover:border-[#eece00] hover:shadow-yellow-sm
                         transition-all duration-200 group w-[160px] shrink-0"
            >
              <div className="h-10 flex items-center justify-center">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  width={80} 
                  height={40} 
                  style={{ height: "auto" }}
                  className="object-contain max-h-10" 
                />
              </div>
              <p className="font-heading font-extrabold text-[11px] uppercase tracking-[0.04em] text-[#000000] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{brand.name}</p>
            </Link>
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex w-max animate-marquee-right gap-4 px-4 hover:[animation-play-state:paused]">
          {marqueeBrands.map((brand, idx) => (
            <Link 
              key={`row2-${brand.id}-${idx}`} 
              href={`/cars?brand=${brand.slug}`}
              className="bg-[#ffffff] rounded-xl p-4 flex flex-col items-center gap-2
                         border border-[#e5e5e5] hover:border-[#eece00] hover:shadow-yellow-sm
                         transition-all duration-200 group w-[160px] shrink-0"
            >
              <div className="h-10 flex items-center justify-center">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  width={80} 
                  height={40} 
                  style={{ height: "auto" }}
                  className="object-contain max-h-10" 
                />
              </div>
              <p className="font-heading font-extrabold text-[11px] uppercase tracking-[0.04em] text-[#000000] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{brand.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
