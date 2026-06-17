"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Check, X, Phone, MapPin, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function VariantDetailsPage() {
  const { slug, variantId } = useParams();
  
  const [car, setCar] = useState<any>(null);
  const [variant, setVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    const fetchVariant = async () => {
      try {
        const res = await fetch(`/api/cars/${slug}/${variantId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.variant) {
            setVariant(data.variant);
            setCar(data.car);
          } else {
            setVariant(null);
          }
        } else {
            setVariant(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVariant();
  }, [slug, variantId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 bg-[#f9f9f9] min-h-screen flex items-center justify-center">
          <div className="font-heading font-bold text-xl text-gray-500">Loading variant details...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!variant && !loading) {
    notFound();
  }

  const formatPrice = (priceNum: number) => {
    return `Rs ${priceNum.toLocaleString()}`;
  };

  const coverImage = variant.cover_image || (car.images && car.images[0]) || "/placeholder.jpg";

  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16 bg-[#f9f9f9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          
          <h1 className="font-heading font-bold text-lg md:text-xl lg:text-2xl text-[#0e1d44] mb-8">
            {variant.name?.toLowerCase().includes(car?.make?.toLowerCase()) ? '' : `${car?.make} ${car?.model} `}{variant.name || variant.id} Price in Pakistan, Specs & Features
          </h1>

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
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black shadow-sm"
              >
                {(car?.images && car.images.length > 0 ? car.images : [coverImage]).map((img: string | any, index: number) => {
                  const src = typeof img === 'string' ? img : (img?.url || "/placeholder.jpg");
                  return (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image src={index === 0 ? coverImage : src} alt={`${car?.make} ${variant.name}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px" className="object-contain bg-black" priority={index === 0} unoptimized={true} referrerPolicy="no-referrer" />
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
                {(car?.images && car.images.length > 0 ? car.images : [coverImage]).map((img: string | any, index: number) => {
                  const src = typeof img === 'string' ? img : (img?.url || "/placeholder.jpg");
                  return (
                  <SwiperSlide key={index} className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity">
                    <div className="relative w-full h-full">
                      <Image src={index === 0 ? coverImage : src} alt={`${car?.make} ${variant.name}`} fill sizes="(max-width: 768px) 25vw, 200px" className="object-cover" unoptimized={true} referrerPolicy="no-referrer" />
                    </div>
                  </SwiperSlide>
                )})}
              </Swiper>
            </div>

            {/* Info Block (Right 35%) */}
            <div className="lg:w-[35%] flex flex-col">
              <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-[#e5e5e5]">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="font-heading font-extrabold text-[24px] lg:text-[30px] text-black leading-tight tracking-[0.01em]">
                    {car?.year && `${car.year} `}{car?.make} {car?.model} <span className="block font-heading font-medium text-[18px] text-gray-500 mt-1">{variant.name || variant.id}</span>
                  </h2>
                </div>
                
                {/* PRICE BLOCK */}
                <div className="border-l-4 border-[#eece00] pl-4 py-1.5 my-6 bg-[#f9f9f9] rounded-r-md">
                  <p className="font-heading font-bold text-xs uppercase tracking-[0.04em] text-[#666666]">Estimated Price</p>
                  <p className="font-heading font-black text-4xl text-[#000000] mt-1">{variant.parsedPrice ? formatPrice(variant.parsedPrice) : (variant.price || 'Contact Us')}</p>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <a href="tel:03473931287" className="font-heading font-black text-[13px] tracking-[0.04em] uppercase w-full flex items-center justify-center py-3 bg-[#eece00] text-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00] transition-colors border border-transparent hover:border-[#eece00] cursor-pointer">
                    <Phone size={20} className="mr-2" /> Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Specs Strip */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e5e5] p-6 mb-12 flex flex-wrap gap-y-6 justify-between">
            <div className="w-1/2 md:w-auto flex flex-col gap-1">
              <span className="text-[#999999] font-heading font-bold text-[10px] uppercase tracking-wider">Engine</span>
              <span className="text-[#333333] font-body font-bold text-lg">{variant.engine_displacement || variant.engine_cc || "N/A"}</span>
            </div>
            <div className="w-1/2 md:w-auto flex flex-col gap-1">
              <span className="text-[#999999] font-heading font-bold text-[10px] uppercase tracking-wider">Transmission</span>
              <span className="text-[#333333] font-body font-bold text-lg">{variant.transmission_type || "N/A"}</span>
            </div>
            <div className="w-1/2 md:w-auto flex flex-col gap-1">
              <span className="text-[#999999] font-heading font-bold text-[10px] uppercase tracking-wider">Fuel Type</span>
              <span className="text-[#333333] font-body font-bold text-lg">{variant.fuel_type || "N/A"}</span>
            </div>
            <div className="w-1/2 md:w-auto flex flex-col gap-1">
              <span className="text-[#999999] font-heading font-bold text-[10px] uppercase tracking-wider">Mileage</span>
              <span className="text-[#333333] font-body font-bold text-lg">{variant.mileage ? `${variant.mileage} km/l` : "N/A"}</span>
            </div>
          </div>

          <div className="space-y-12">
            {/* Dynamic Features & Specifications Sections */}
            {variant.features && typeof variant.features === 'object' && Object.entries(variant.features).map(([categoryName, categoryData]) => {
              // Skip empty categories
              if (!categoryData || typeof categoryData !== 'object' || Object.keys(categoryData).length === 0) return null;
              
              return (
                <div key={categoryName} className="bg-white rounded-xl p-8 shadow-sm border border-[#e5e5e5]">
                  <SectionHeading label="SPECS & FEATURES" title={categoryName} theme="light" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {Object.entries(categoryData).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-[#f0f0f0] pb-3">
                        <span className="text-[#555555] font-body text-sm">{key}</span>
                        <span className="font-body text-sm font-bold text-[#222222]">
                          {typeof value === 'boolean' ? (
                            value ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
                          ) : (
                            String(value)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Colors Section */}
          {variant.colors && variant.colors.length > 0 && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e5e5e5] mt-12">
              <SectionHeading label="AESTHETICS" title="Available Colors" theme="light" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-6">
                {variant.colors.map((color: any, idx: number) => (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <div 
                      className="w-16 h-16 rounded-full shadow-inner border border-gray-200 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-center font-body text-xs text-[#555555]">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
