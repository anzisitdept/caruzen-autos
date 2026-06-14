"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";
import carsData from "@/data/cars.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { MapPin, Calendar, Phone, MessageCircle, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CarDetailsPage() {
  const { slug } = useParams();
  
  const initialCar = carsData.find((c) => c.slug === slug);
  const [car, setCar] = useState<any>(initialCar || null);
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(!initialCar);
  const [relatedCars, setRelatedCars] = useState<any[]>(() => {
    if (initialCar) {
       const initialRelated = carsData.filter((c) => c.make === initialCar.make && c.id !== initialCar.id).slice(0, 4);
       if (initialRelated.length < 4) {
          const extra = carsData.filter(c => c.id !== initialCar.id && !initialRelated.find(rc => rc.id === c.id)).slice(0, 4 - initialRelated.length);
          initialRelated.push(...extra);
       }
       return initialRelated;
    }
    return [];
  });
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    if (!initialCar) {
      const fetchCar = async () => {
        try {
          const res = await fetch(`/api/cars/${slug}`);
          if (res.ok) {
            const data = await res.json();
            if (data.car) {
              setCar({
                ...data.car,
                // Fallbacks for UI if missing
                features: data.car.features || ["Air Conditioning", "Power Steering", "ABS", "Power Windows"],
                description: data.car.description || `The ${data.car.make} ${data.car.model} is an excellent choice for a new vehicle. It features top-notch performance and modern amenities.`,
                postedDate: "Just Now",
                color: "Various",
                assembly: "Local",
                bodyType: "Sedan"
              });
              setVariants(data.variants || []);
              setRelatedCars(data.relatedCars || []);
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchCar();
    }
  }, [slug, initialCar]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
          <div className="font-heading font-bold text-xl text-gray-500">Loading details...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!car && !loading) {
    notFound();
  }



  const onSubmit = (data: any) => {
    toast.success("Your inquiry has been sent! We'll contact you shortly.");
    reset();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-[#f9f9f9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Image Gallery (Left 65%) */}
            <div className="lg:w-[65%] flex flex-col gap-4">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#eece00",
                  "--swiper-pagination-color": "#eece00",
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black shadow-sm"
              >
                {car.images.map((img: string | any, index: number) => {
                  const src = typeof img === 'string' ? img : (img?.url || "/placeholder.jpg");
                  return (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image src={src} alt={`${car.make} ${car.model}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px" className="object-contain bg-black" priority={index === 0} />
                    </div>
                  </SwiperSlide>
                )})}
              </Swiper>
              
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-24 thumbs-slider"
              >
                {car.images.map((img: string | any, index: number) => {
                  const src = typeof img === 'string' ? img : (img?.url || "/placeholder.jpg");
                  return (
                  <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity">
                    <div className="relative w-full h-full">
                      <Image src={src} alt={`${car.make} ${car.model}`} fill sizes="(max-width: 768px) 25vw, 200px" className="object-cover" />
                    </div>
                  </SwiperSlide>
                )})}
              </Swiper>
            </div>

            {/* Info Block (Right 35%) */}
            <div className="lg:w-[35%] flex flex-col">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-[#e5e5e5]">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="font-heading font-extrabold text-[24px] lg:text-[30px] text-black leading-tight tracking-[0.01em]">
                    {car.year} {car.make} {car.model} {car.variant && <span className="block font-heading font-medium text-[18px] text-gray-500 mt-1">{car.variant}</span>}
                  </h1>
                  <span className="font-heading font-black text-[11px] uppercase tracking-[0.04em] text-black px-2.5 py-1 rounded shadow ml-2 bg-[#eece00]">
                    {car.condition?.toUpperCase() || "NEW"}
                  </span>
                </div>
                
                {/* PRICE BLOCK */}
                <div className="border-l-4 border-[#eece00] pl-4 py-1.5 my-6 bg-[#f9f9f9] rounded-r-md">
                  <p className="font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#666666]">Estimated Price</p>
                  <p className="font-heading font-black text-4xl text-[#000000] mt-1">{formatPrice(car.price)}</p>
                </div>

                <div className="flex flex-col gap-2 text-[#555555] mb-8 border-t border-b border-[#eeeeee] py-4">
                  <div className="font-body text-sm flex items-center text-[#555555]">
                    <MapPin size={18} className="mr-2 text-[#eece00]" />
                    Location: <span className="font-heading font-bold ml-1 text-black">{car.city}</span>
                  </div>
                  <div className="font-body text-sm flex items-center text-[#555555]">
                    <Calendar size={18} className="mr-2 text-[#eece00]" />
                    Posted: <span className="font-heading font-bold ml-1 text-black">{car.postedDate}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <a href="tel:03473931287" className="font-heading font-black text-[13px] tracking-[0.04em] uppercase w-full flex items-center justify-center py-3 bg-[#eece00] text-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00] transition-colors border border-transparent hover:border-[#eece00] cursor-pointer">
                    <Phone size={20} className="mr-2" /> Call Now
                  </a>
                  <a href={`https://wa.me/923009315053?text=I%20am%20interested%20in%20${car.make}%20${car.model}`} target="_blank" rel="noreferrer" className="font-heading font-black text-[13px] tracking-[0.04em] uppercase w-full flex items-center justify-center py-3 bg-[#25D366] text-white rounded-md hover:bg-[#128C7E] transition-colors cursor-pointer">
                    <MessageCircle size={20} className="mr-2" /> WhatsApp
                  </a>
                  <button onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })} className="font-heading font-black text-[13px] tracking-[0.04em] uppercase w-full flex items-center justify-center py-3 bg-[#000000] text-[#ffffff] rounded-md border-2 border-[#000000] hover:bg-[#eece00] hover:text-[#000000] hover:border-[#eece00] transition-colors cursor-pointer">
                    <Mail size={20} className="mr-2" /> Send Inquiry
                  </button>
                </div>
              </div>

              {/* Inspection Badge for Used Cars */}
              {car.condition === "used" && car.verified && (
                <div className="bg-[#1a1a1a] border border-[#222222] rounded-xl p-5 flex items-start gap-4 shadow-yellow-sm">
                  <span className="text-[#eece00] text-3xl">🛡️</span>
                  <div>
                    <h3 className="font-heading font-bold text-[18px] text-[#eece00] mb-1">Caruzen Verified</h3>
                    <p className="font-body font-normal text-[13px] leading-relaxed text-[#cccccc]">This vehicle has passed our comprehensive 150-point inspection process.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[65%] flex flex-col gap-8">
              
              {/* Specs */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                <SectionHeading label="SPECS" title="Vehicle Specifications" theme="light" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-2">
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Make</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.make}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Model</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.model}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Year</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.year}</span>
                  </div>
                  {car.variant && (
                    <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                      <span className="font-body text-sm text-[#666666]">Variant</span>
                      <span className="font-heading font-bold text-sm text-[#000000]">{car.variant}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Condition</span>
                    <span className="font-heading font-bold text-sm text-[#000000] capitalize">{car.condition}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Mileage</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.mileage}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Color</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.color}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Engine</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.engine}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Transmission</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Fuel Type</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Assembly</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.assembly}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#eeeeee]">
                    <span className="font-body text-sm text-[#666666]">Body Type</span>
                    <span className="font-heading font-bold text-sm text-[#000000]">{car.bodyType}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                <SectionHeading label="EXTRAS" title="Features & Options" theme="light" />
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {car.features.map((feature: string, idx: number) => (
                    <span key={idx} className="font-heading font-bold text-[11px] uppercase tracking-[0.04em] inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-[#f5f5f5] text-[#333333] rounded-md border border-[#e5e5e5]">
                      ⚡ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                <SectionHeading label="DETAILS" title="About This Car" theme="light" />
                <div className="prose max-w-none font-body font-normal text-[15px] leading-[1.75] text-[#444444] whitespace-pre-wrap mt-2">
                  {car.description}
                </div>
              </div>

              {/* Variants Table */}
              {variants && variants.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e5e5e5]">
                  <SectionHeading label="VARIANTS" title={`Available Variants (${variants.length})`} theme="light" />
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-[#eeeeee] bg-[#f9f9f9]">
                          <th className="py-3 px-4 font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#333333]">Variant Name</th>
                          <th className="py-3 px-4 font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#333333]">Engine</th>
                          <th className="py-3 px-4 font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#333333]">Price</th>
                          <th className="py-3 px-4 font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#333333]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map(v => (
                          <tr key={v.id} className="border-b border-[#eeeeee] hover:bg-[#fdfdfd] transition-colors">
                            <td className="py-4 px-4 font-body font-medium text-sm text-black">{v.name || v.id}</td>
                            <td className="py-4 px-4 font-body text-sm text-gray-600">{v.engine_cc || v.engine || "N/A"}</td>
                            <td className="py-4 px-4 font-heading font-bold text-sm text-[#000000]">{v.parsedPrice ? formatPrice(v.parsedPrice) : (v.price || "Contact Us")}</td>
                            <td className="py-4 px-4">
                              <Link href={`/cars/${slug}/${v.slug || v.id}`} className="font-heading font-bold text-[10px] uppercase tracking-[0.04em] bg-black text-[#eece00] px-3 py-1.5 rounded hover:bg-[#eece00] hover:text-black transition-colors">
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Inspection Details */}
              {car.condition === "used" && (
                <div className="bg-[#1a1a1a] border border-[#222222] rounded-xl p-6 text-white my-8 shadow-yellow-sm">
                  <h3 className="font-heading font-bold text-[18px] text-[#eece00] mb-4 flex items-center gap-2">
                    🛡️ Certified Verification
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> Engine Verified</div>
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> Chassis Clear</div>
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> Documents Verified</div>
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> No Major Accidents</div>
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> Original Paint (mostly)</div>
                    <div className="font-body text-sm flex items-center gap-2 text-[#cccccc]"><span className="text-[#eece00]">✔</span> Auction Sheet Available</div>
                  </div>
                </div>
              )}

            </div>

            {/* Inquiry Form */}
            <div className="lg:w-[35%]">
              <div id="inquiry-form" className="bg-[#ffffff] p-6 rounded-xl shadow-sm border border-[#e5e5e5] sticky top-28">
                <h3 className="font-heading font-extrabold text-[22px] text-black mb-6">Inquire About This Car</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block">Full Name</label>
                    <input {...register("name", { required: true })} type="text" className="font-body w-full border-[#dddddd] border rounded-md p-2.5 focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none text-sm text-black" placeholder="Your Name" />
                    {errors.name && <span className="font-body text-red-500 text-xs block mt-1">Name is required</span>}
                  </div>
                  <div>
                    <label className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block">Phone Number</label>
                    <input {...register("phone", { required: true })} type="tel" className="font-body w-full border-[#dddddd] border rounded-md p-2.5 focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none text-sm text-black" placeholder="0300 0000000" />
                    {errors.phone && <span className="font-body text-red-500 text-xs block mt-1">Phone is required</span>}
                  </div>
                  <div>
                    <label className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block">Email</label>
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" className="font-body w-full border-[#dddddd] border rounded-md p-2.5 focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none text-sm text-black" placeholder="you@example.com" />
                    {errors.email && <span className="font-body text-red-500 text-xs block mt-1">Valid email is required</span>}
                  </div>
                  <div>
                    <label className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block">Preferred Time</label>
                    <select {...register("time")} className="font-body w-full border-[#dddddd] border rounded-md p-2.5 focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none text-sm text-black bg-white">
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block">Message</label>
                    <textarea {...register("message", { required: true })} rows={4} className="font-body w-full border-[#dddddd] border rounded-md p-2.5 focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none text-sm text-black" defaultValue={`I'm interested in this ${car.year} ${car.make} ${car.model}. Please provide more details.`} />
                  </div>
                  <button type="submit" className="font-heading font-black text-[13px] tracking-[0.04em] uppercase w-full py-3 bg-[#eece00] text-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00] transition-colors border border-transparent hover:border-[#eece00] cursor-pointer">
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Related Cars */}
          <div className="mt-16">
            <SectionHeading label="SIMILAR" title="You May Also Like" theme="light" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map(relatedCar => (
                <CarCard key={relatedCar.id} car={relatedCar} theme="light" />
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
