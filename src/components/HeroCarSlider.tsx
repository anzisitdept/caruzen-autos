'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type SliderCar = {
  id: number;
  name: string;
  year: number;
  price: string;
  image: string;
  tag: string;
  slug?: string;
};

export default function HeroCarSlider({ cars }: { cars: SliderCar[] }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);

  // ── AUTO-SLIDE every 4 seconds ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [current, isPaused]);

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350); // matches CSS transition duration
    },
    [isAnimating]
  );

  const goPrev = useCallback(() => {
    const prevIndex = current === 0 ? cars.length - 1 : current - 1;
    goTo(prevIndex, 'left');
  }, [current, cars.length, goTo]);

  const goNext = useCallback(() => {
    const nextIndex = current === cars.length - 1 ? 0 : current + 1;
    goTo(nextIndex, 'right');
  }, [current, cars.length, goTo]);

  const activeCar = cars[current];

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full select-none"
    >

      {/* ══ MAIN IMAGE FRAME ══ */}
      <div
        className="relative rounded-2xl overflow-hidden bg-[#0a0a0a]
                   border border-[#222222]"
        style={{ aspectRatio: '16 / 10' }}
      >
        {/* SLIDING IMAGE */}
        {cars.map((car, index) => (
          <div
            key={car.id}
            className="absolute inset-0 transition-all duration-[350ms] ease-in-out"
            style={{
              opacity: index === current ? 1 : 0,
              transform:
                index === current
                  ? 'translateX(0%)'
                  : direction === 'right'
                  ? index < current
                    ? 'translateX(-8%)'
                    : 'translateX(8%)'
                  : index > current
                  ? 'translateX(8%)'
                  : 'translateX(-8%)',
              zIndex: index === current ? 2 : 1,
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay — bottom fade for price tag readability */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)',
              }}
            />
          </div>
        ))}

        {/* ══ NEW ARRIVAL BADGE — top right ══ */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className="font-heading font-black text-[10px] uppercase tracking-[0.1em] bg-[#eece00] text-[#000000] px-3 py-1.5 rounded-[4px]"
          >
            {activeCar.tag}
          </span>
        </div>

        {/* ══ PREV BUTTON ══ */}
        <button
          onClick={goPrev}
          aria-label="Previous car"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30
                     w-9 h-9 rounded-full
                     bg-[#000000]/70 border border-[#333333]
                     flex items-center justify-center
                     hover:bg-[#eece00] hover:border-[#eece00]
                     transition-all duration-200 group border-none cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-[#ffffff] group-hover:text-[#000000] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* ══ NEXT BUTTON ══ */}
        <button
          onClick={goNext}
          aria-label="Next car"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30
                     w-9 h-9 rounded-full
                     bg-[#000000]/70 border border-[#333333]
                     flex items-center justify-center
                     hover:bg-[#eece00] hover:border-[#eece00]
                     transition-all duration-200 group border-none cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-[#ffffff] group-hover:text-[#000000] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* ══ DOT INDICATORS — bottom center of image ══ */}
        <div className="absolute bottom-[72px] left-1/2 -translate-x-1/2 z-30
                        flex items-center gap-1.5">
          {cars.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index, index > current ? 'right' : 'left')}
              aria-label={`Go to car ${index + 1}`}
              className="transition-all duration-300 rounded-full border-none cursor-pointer"
              style={{
                width: index === current ? '24px' : '7px',
                height: '7px',
                background: index === current ? '#eece00' : 'rgba(255,255,255,0.35)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ══ SLIDE COUNTER — top left ══ */}
        <div className="absolute top-4 left-4 z-20
                        bg-[#000000]/60 border border-[#333333]
                        rounded-md px-2.5 py-1">
          <span className="font-heading text-[#eece00] text-[11px] font-black">
            {String(current + 1).padStart(2, '0')}
          </span>
          <span className="font-body text-[#555555] text-[11px] font-medium">
            /{String(cars.length).padStart(2, '0')}
          </span>
        </div>

      </div>
      {/* END IMAGE FRAME */}

      {/* ══ FLOATING PRICE TAG — sits below image, overlapping bottom ══ */}
      <div
        className="mx-4 -mt-px rounded-b-xl border border-t-0 border-[#2a2a2a]
                   bg-[#000000] p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-4"
      >
        {/* CAR INFO — updates with slider */}
        <div
          key={activeCar.id}           /* key forces re-render + fade on car change */
          className="animate-fadeIn w-full sm:w-auto"   /* add keyframe in globals.css */
        >
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.1em] text-[#ffffff]/80 mb-0.5">
            Starting From
          </p>
          <p className="font-heading font-black text-[22px] leading-none tracking-[-0.01em] text-[#eece00]">
            {activeCar.price}
          </p>
          <p className="font-body font-medium text-[11px] text-[#ffffff] mt-0.5">
            {activeCar.year} {activeCar.name}
          </p>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden sm:block w-px h-10 bg-[#222222] flex-shrink-0" />

        {/* VIEW INVENTORY BUTTON — clickable navigation to /cars */}
        <Link
          href={`/cars/${activeCar.slug || ''}`}
          className="font-heading font-black text-[12px] tracking-[0.04em] uppercase bg-[#eece00] text-[#000000] px-4 py-2.5 rounded-[6px] whitespace-nowrap
                     flex items-center justify-center gap-1.5 w-full sm:w-auto
                     hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-200 group border-none cursor-pointer"
        >
          <span>View Details</span>
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

    </div>
  );
}
