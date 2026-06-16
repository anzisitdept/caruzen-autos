import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/sections/WhyChooseUs";
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  const team = [
    { name: "Ali Rahman", role: "CEO & Founder", desc: "15+ years in the automotive industry." },
    { name: "Sara Malik", role: "Sales Director", desc: "Ensuring premium customer experiences." },
    { name: "Faisal Khan", role: "Lead Inspector", desc: "Certified mechanic for our 150-point checks." },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-[80px] bg-[#000000]">

        {/* Hero Banner */}
        <section className="relative bg-[#000000] overflow-hidden">

          {/* YELLOW TOP BORDER — 3px full width accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#eece00] z-10" />

          {/* RIGHT PANEL — diagonal dark section */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[44%] bg-[#111111]"
            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          />

          <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 lg:py-24">
            <div className="max-w-[580px]">

              {/* EYEBROW */}
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#eece00] flex-shrink-0" />
                <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#eece00]">
                  About Us
                </p>
              </div>

              {/* H1 */}
              <h1 className="font-heading font-black text-[62px] md:text-[72px]
                             leading-[1.0] tracking-[-0.01em] text-[#ffffff] mb-5">
                Built on Trust.<br />
                <span className="text-[#eece00]">Driven by Passion.</span>
              </h1>

              {/* SUBTEXT */}
              <p className="font-body font-normal text-[15px] text-[#888888]
                            leading-[1.75] max-w-[460px] mb-10">
                A trusted name in Pakistan's automotive industry — helping families
                find their perfect cars with honesty, expertise, and zero pressure.
              </p>

              {/* INLINE STAT CHIPS ROW */}
              <div className="flex flex-wrap gap-3">
                {[
                  { num: '1000+', label: 'Cars Sold' },
                  { num: '1000+', label: 'Happy Buyers' },
                  { num: '5★', label: 'Star Rated' },
                  { num: '5+', label: 'Years Experience' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#111111] border border-[#222222] rounded-[8px]
                               px-5 py-3 flex flex-col"
                  >
                    <span className="font-heading font-black text-[26px] text-[#eece00] leading-none">
                      {stat.num}
                    </span>
                    <span className="font-body font-medium text-[10px] text-[#555555]
                                     uppercase tracking-[0.1em] mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT DECORATIVE AREA */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10
                          text-right hidden lg:block">

            {/* GHOST WATERMARK TEXT 
            <p
              className="font-heading font-black text-[#eece00] leading-none select-none"
              style={{ fontSize: '90px', opacity: 0.06 }}
              aria-hidden="true"
            >
              CARUZEN<br />MOTORS
            </p>
            */}

            {/* FLOATING BRAND BADGES */}
            <div className="flex flex-col items-end gap-3 mt-5">
              <span className="bg-[#eece00] text-[#000000] font-heading font-black
                               text-[11px] uppercase tracking-[0.1em]
                               px-4 py-2 rounded-[5px]">
                Verified Dealer
              </span>
              <span className="bg-[#111111] border border-[#222222] text-[#aaaaaa]
                               font-body text-[12px] px-4 py-2 rounded-[5px]">
                📍 Sukkur, Pakistan
              </span>
            </div>
          </div>

        </section>

        {/* Our Story */}
        <section className="py-20 bg-[#ffffff]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-stretch">
              <div className="lg:w-1/2 text-left flex flex-col justify-center">
                <SectionHeading label="BEHIND THE SCENES" title="Our Story" theme="light" />
                <div className="font-body font-normal text-[15px] leading-[1.75] text-[#444444] mb-8 space-y-4">
                  <p>
                    Founded with a vision to revolutionize the car buying experience in Pakistan, Caruzen Motors started as a small dealership and has grown into one of the most trusted automotive brands in the country.
                  </p>
                  <p>
                    We realized that buying a car, whether new or used, was often filled with uncertainty and hidden costs. Our goal was to bring transparency, premium service, and absolute trust to every transaction. Today, we pride ourselves on our rigorous inspection processes and customer-first approach.
                  </p>
                </div>

                {/* Stats Box */}
                <div className="bg-[#000000] border-l-4 border-[#eece00] p-6 rounded-r-md flex flex-wrap gap-6 md:gap-12 justify-between w-full mt-auto">
                  <div className="text-center">
                    <span className="font-heading block text-3xl font-extrabold text-[#eece00]">1000+</span>
                    <span className="font-body text-xs font-medium text-white uppercase tracking-[0.1em] mt-1 block">Cars Sold</span>
                  </div>
                  <div className="text-center">
                    <span className="font-heading block text-3xl font-extrabold text-[#eece00]">5+</span>
                    <span className="font-body text-xs font-medium text-white uppercase tracking-[0.1em] mt-1 block">Years Exp</span>
                  </div>
                  <div className="text-center">
                    <span className="font-heading block text-3xl font-extrabold text-[#eece00]">1000+</span>
                    <span className="font-body text-xs font-medium text-white uppercase tracking-[0.1em] mt-1 block">Happy Clients</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full flex">
                <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] rounded-xl overflow-hidden shadow-md bg-gray-100">
                  <Image src="/caruzen-cover.webp" alt="Caruzen Motors Showroom" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px" className="object-cover object-center" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="pt-24 pb-0 bg-[#000000] text-white text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-black text-[32px] md:text-[48px] leading-[1.1] italic text-white">
              "To make car buying simple, trustworthy, and premium for every Pakistani."
            </h2>
            <div className="w-24 h-1 bg-[#eece00] mx-auto mt-10 rounded-full"></div>
          </div>
        </section>

        {/* Why Trust Us */}
        <WhyChooseUs className="!pt-12" />

        {/* Meet the Team */}
        {/*<section className="py-20 bg-[#f5f5f5]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <SectionHeading
                label="EXPERTS"
                title="Meet the Team"
                subtitle="The automotive experts behind Caruzen Motors."
                theme="light"
                align="center"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden border border-[#eeeeee] hover:shadow-yellow-sm transition-all duration-300 text-center flex flex-col">
                  <div className="relative w-full aspect-square bg-gray-200">
                    <Image src="/placeholder.jpg" alt={member.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" className="object-cover" />
                  </div>
                  <div className="p-6 border-t-4 border-[#eece00] flex-grow flex flex-col">
                    <h4 className="font-heading font-bold text-[20px] leading-tight tracking-[0.01em] text-[#000000]">{member.name}</h4>
                    <p className="font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#eece00] mt-1.5 mb-3">{member.role}</p>
                    <p className="font-body font-normal text-[13px] leading-[1.6] text-[#555555] mt-auto">{member.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>*/}

      </main>
      <Footer />
    </>
  );
}
