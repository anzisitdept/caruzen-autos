"use client";

import { useRef, useState } from "react";
import testimonialsData from "@/data/testimonials.json";
import SectionHeading from "@/components/SectionHeading";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      const gap = 24; // gap-6 is 24px in Tailwind
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      const gap = 24;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
    }
  };

  return (
    <section id="reviews" className="bg-[#ffffff] py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <SectionHeading 
          label="Reviews" 
          title="What Our Customers Say" 
          theme="light" 
          align="center" 
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* CAROUSEL CONTAINER */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonialsData.map((t) => (
            <div 
              key={t.id} 
              className="bg-[#f9f9f9] border border-[#eeeeee] rounded-xl p-6 relative
                         hover:border-[#eece00] hover:shadow-yellow-sm transition-all duration-300 text-left
                         w-[320px] md:w-[350px] shrink-0 flex flex-col snap-start"
            >
              {/* DECORATIVE QUOTE — large yellow */}
              <span className="absolute top-4 right-5 text-[#eece00] text-7xl font-black leading-none opacity-40 select-none">
                "
              </span>
              
              {/* STARS — yellow */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating || 5)].map((_, s) => (
                  <span key={s} className="text-[#eece00] text-lg">★</span>
                ))}
              </div>
              
              <p className="font-body font-normal text-[15px] italic leading-[1.75] text-[#444444] mb-6 flex-grow">"{t.text}"</p>
              
              <div className="flex items-center gap-3 mt-auto">
                <div className="font-heading font-black text-sm select-none w-10 h-10 rounded-full bg-[#eece00] flex items-center justify-center text-[#000000]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-[15px] text-[#000000]">{t.name}</p>
                  <p className="font-body font-normal text-[12px] text-[#888888]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS NAVIGATION */}
        <div className="flex justify-center items-center gap-3 mt-6">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-10 bg-[#eece00]" : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
