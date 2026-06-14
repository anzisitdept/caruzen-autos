"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import { Check, X } from "lucide-react";

export default function VariantDetailsPage() {
  const { slug, variantId } = useParams();
  
  const [car, setCar] = useState<any>(null);
  const [variant, setVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        <Navbar />
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
      <Navbar />
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] bg-black pt-20">
        <Image 
          src={coverImage}
          alt={variant.name || 'Variant Image'}
          fill
          className="object-cover opacity-60"
          priority
          unoptimized={true}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-heading font-bold text-[#eece00] tracking-widest uppercase text-sm mb-2 block">
                  {car?.make} {car?.model}
                </span>
                <h1 className="font-heading font-black text-4xl md:text-5xl text-white uppercase tracking-tight">
                  {variant.name || variant.id}
                </h1>
              </div>
              <div className="bg-[#eece00] px-6 py-3 rounded-lg inline-block">
                <span className="block font-heading font-bold text-[10px] uppercase tracking-wider text-black/70 mb-1">Price</span>
                <span className="font-heading font-black text-2xl md:text-3xl text-black leading-none">
                  {variant.parsedPrice ? formatPrice(variant.parsedPrice) : (variant.price || 'Contact Us')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-12 bg-[#f9f9f9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
