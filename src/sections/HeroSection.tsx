"use client";

import HeroCarSlider from "@/components/HeroCarSlider";

const newArrivalCars = [
  {
    id: 1,
    name: 'Suzuki Baleno',
    year: 2026,
    price: 'Rs 1,080,000',
    image: 'https://cache2.pakwheels.com/system/car_generation_pictures/8389/original/Cover.jpg?1740638264',
    tag: 'New Arrival',
    slug: 'baleno',
  },
  {
    id: 2,
    name: 'Toyota Fortuner',
    year: 2026,
    price: 'Rs 124,000',
    image: 'https://cache4.pakwheels.com/system/car_generation_pictures/16708/original/Cover.jpg?1768980200',
    tag: 'New Arrival',
    slug: 'fortuner',
  },
  {
    id: 3,
    name: 'Toyota Raize',
    year: 2026,
    price: 'Rs 4,835,000',
    image: 'https://cache4.pakwheels.com/system/car_generation_pictures/16289/original/Cover.jpg?1768567610',
    tag: 'New Arrival',
    slug: 'raize',
  },
  {
    id: 4,
    name: 'Suzuki Vitara',
    year: 2026,
    price: 'Rs 3,695,000',
    image: 'https://cache2.pakwheels.com/system/car_generation_pictures/4306/original/Suzuki_Vitara_2016_Pakistan.jpg?1768566968',
    tag: 'New Arrival',
    slug: 'vitara',
  },
];

export default function HeroSection() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — SPLIT LAYOUT
          Left: content | Right: car image
          ══════════════════════════════════════ */}
      <section className="relative bg-[#000000] min-h-[580px] flex items-center overflow-hidden">

        {/* RIGHT PANEL — dark angled background (Hidden on mobile) */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[48%]"
          style={{
            background: '#111111',
            clipPath: 'polygon(6% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />

        {/* YELLOW VERTICAL ACCENT DIVIDER (Hidden on mobile) */}
        <div
          className="hidden lg:block absolute top-0 bottom-0 z-10"
          style={{
            right: '48%',
            width: '4px',
            background: '#eece00',
            transform: 'skewX(-1deg)',
          }}
        />

        {/* ── CONTENT CONTAINER ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10
                        flex flex-col lg:flex-row items-center justify-between min-h-[580px] py-12 lg:py-0">

          {/* ── LEFT: TEXT CONTENT ── */}
          <div className="w-full lg:w-[50%] flex flex-col z-20 pt-10 pb-4 lg:py-20">

            {/* EYEBROW LABEL */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#eece00] flex-shrink-0" />
              <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#eece00]">
                Pakistan's Trusted Dealership
              </p>
            </div>

            {/* H1 HEADLINE */}
            <h1 className="font-heading font-black text-[46px] md:text-[52px] lg:text-[60px] leading-[1.02] mb-5 tracking-tight text-[#ffffff]">
              Drive Home<br />
              Your{' '}
              <span className="text-[#eece00]">Dream Car</span>
              <br />Today.
            </h1>

            {/* SUBTEXT */}
            <p className="font-body font-normal text-[15px] leading-[1.75] text-[#888888] mb-9 max-w-[400px]">
              New &amp; used vehicles, hand-verified by our team.
              Premium quality. No hidden charges. No surprises.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 mb-14">
              {/* PRIMARY — yellow */}
              <a
                href="/cars"
                className="font-heading font-black text-[14px] tracking-[0.04em] uppercase bg-[#eece00] text-[#000000]
                           px-8 py-[14px] rounded-[6px]
                           hover:bg-[#ffffff] hover:text-[#000000]
                           transition-all duration-200"
              >
                Browse All Cars
              </a>
              {/* SECONDARY — outlined */}
              <a
                href="/consultation"
                className="font-heading font-black text-[14px] tracking-[0.04em] uppercase bg-transparent text-[#ffffff]
                           px-8 py-[14px] rounded-[6px]
                           border-2 border-[#333333]
                           hover:border-[#eece00] hover:text-[#eece00]
                           transition-all duration-200"
              >
                Book Consultation
              </a>
            </div>

            {/* TRUST STATS ROW */}
            <div className="flex flex-wrap gap-10 pt-7 border-t border-[#1a1a1a]">
              {[
                { num: '50+', label: 'Cars Listed' },
                { num: '1000+', label: 'Happy Buyers' },
                { num: '5★', label: 'Star Rated' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-[#eece00] text-[40px] font-black leading-none">
                    {stat.num}
                  </p>
                  <p className="font-body text-[#555555] text-[13px] font-medium uppercase
                                tracking-[0.1em] mt-1.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: CAR SLIDER PANEL ── */}
          <div className="w-full lg:w-[46%] z-30 mt-8 lg:mt-0 flex items-center justify-center">
            <HeroCarSlider cars={newArrivalCars} />
          </div>

        </div>
      </section>
    </>
  );
}
