"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Inter, Barlow_Condensed } from "next/font/google";
import {
  Phone,
  MapPin,
  User,
  Heart,
  ChevronDown,
  Search,
  PhoneCall,
  Star,
  Building,
  Calculator,
  ShieldCheck,
  ClipboardCheck,
  Tag,
  ArrowRight,
  Car,
  FileText,
  Wallet,
  Circle,
  Menu,
  X
} from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"] });

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [popularBrands, setPopularBrands] = useState<{ label: string, desc: string, href: string }[]>([
    { label: "Toyota Pakistan", desc: "Corolla, Yaris, Fortuner, Revo", href: "/cars/new/toyota" },
    { label: "Honda Atlas", desc: "Civic, City, BR-V, HR-V", href: "/cars/new/honda" },
    { label: "Suzuki Pakistan", desc: "Alto, Swift, Cultus, WagonR", href: "/cars/new/suzuki" },
    { label: "Kia Motors", desc: "Sportage, Stonic, Sorento, Picanto", href: "/cars/new/kia" },
  ]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch('/api/new-cars/brands');
        if (res.ok) {
          const data = await res.json();
          if (data.brands && data.brands.length > 0) {
            setPopularBrands(data.brands.map((b: any) => ({
              label: b.name,
              desc: "Explore all new cars",
              href: `/cars/new/${b.slug || b.id}`
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch brands", err);
      }
    }
    fetchBrands();
  }, []);

  return (
    <header className={`${inter.className} relative w-full z-50`}>
      {/* Top Utility Bar */}
      <div className="w-full bg-[#F5C518] py-[5px] px-4 md:px-10">
        <div className="max-w-[1440px] mx-auto flex justify-end items-center gap-5 text-[11px] font-semibold text-[#111] uppercase tracking-wider">
          <a href="tel:03473931287" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Phone size={12} strokeWidth={2.5} />
            0347 3931287
          </a>
          <span className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
            <MapPin size={12} strokeWidth={2.5} />
            Sukkur · Pakistan
          </span>
          { /* <Link href="/login" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <User size={12} strokeWidth={2.5} />
            Sign In
          </Link>
          <Link href="/saved" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
            <Heart size={12} strokeWidth={2.5} />
            Saved Cars
          </Link>
          */}
        </div>
      </div>

      {/* Main Nav Row */}
      <div className="w-full bg-[#111111] h-[72px] px-4 md:px-10 relative">
        <div className="max-w-[1440px] mx-auto h-full flex items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center mr-8 group py-2">
            <Image
              src="/caruzen.png"
              alt="Caruzen Motors Logo"
              width={400}
              height={120}
              className="object-contain h-[140px] w-auto transform scale-125 origin-left md:scale-150"
              priority
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex h-full items-center ml-10 gap-1">
            <Link href="/" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] hover:text-[#F5C518] border-b-3 border-transparent hover:border-[#F5C518] transition-colors">
              Home
            </Link>

            {/* NEW CARS (Mega Menu Trigger) */}
            <div className="group h-full flex items-center">
              <Link href="/cars/new" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] group-hover:text-[#F5C518] border-b-[3px] border-transparent group-hover:border-[#F5C518] transition-colors gap-1">
                New Cars <ChevronDown size={12} className="mt-0.5" />
              </Link>

              {/* MEGA MENU - NEW CARS */}
              <div className="absolute top-[72px] left-10 w-[780px] bg-[#161616] border border-[#2a2a2a] border-t-[3px] border-t-[#F5C518] rounded-b-[10px] hidden group-hover:flex p-[32px] z-[100] shadow-2xl">

                {/* Col 1 */}
                <div className="flex-1 pr-[32px] border-r border-[#252525]">
                  <div className="text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.14em] mb-4 flex items-center gap-4">
                    BROWSE NEW
                    <div className="flex-grow h-px bg-[#252525]"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/cars?condition=new" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Car size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">New Cars for Sale</span>
                        <span className="text-[11px] text-[#666666]">Explore zero-meter current models</span>
                      </div>
                    </Link>
                    <Link href="/cars/new" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Star size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">New Car Launches</span>
                        <span className="text-[11px] text-[#666666]">Stay updated on upcoming releases</span>
                      </div>
                    </Link>
                    <Link href="/consultation" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Wallet size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">On-Road Price</span>
                        <span className="text-[11px] text-[#666666]">Calculate registration & tax costs</span>
                      </div>
                    </Link>
                    <Link href="/#reviews" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <FileText size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Car Reviews</span>
                        <span className="text-[11px] text-[#666666]">Read owner & expert ratings</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex-1 pl-[32px]">
                  <div className="text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.14em] mb-4 flex items-center gap-4">
                    POPULAR BRANDS
                    <div className="flex-grow h-px bg-[#252525]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {popularBrands.map((brand) => (
                      <Link key={brand.label} href={brand.href} className="flex items-center gap-1.5 py-[7px] px-2.5 bg-[#1a1a1a] border border-[#252525] rounded-md text-[12px] text-[#cccccc] hover:border-[#F5C518] hover:text-[#F5C518] hover:bg-[#1f1d13] group/brand transition-all">
                        <Circle size={13} className="text-[#555555] group-hover/brand:text-[#F5C518]" />
                        <span className="truncate">{brand.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* USED CARS (Mega Menu Trigger) */}
            <div className="group h-full flex items-center">
              <Link href="/cars/used" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] group-hover:text-[#F5C518] border-b-[3px] border-transparent group-hover:border-[#F5C518] transition-colors gap-1">
                Used Cars <ChevronDown size={12} className="mt-0.5" />
              </Link>

              {/* MEGA MENU - USED CARS */}
              <div className="absolute top-[72px] left-10 w-[860px] bg-[#161616] border border-[#2a2a2a] border-t-[3px] border-t-[#F5C518] rounded-b-[10px] hidden group-hover:flex p-[32px] z-[100] shadow-2xl">

                {/* Col 1 */}
                <div className="flex-[1.2] pr-[32px] border-r border-[#252525]">
                  <div className="text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.14em] mb-4 flex items-center gap-4">
                    FIND USED CARS
                    <div className="flex-grow h-px bg-[#252525]"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/cars?condition=used" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Search size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Search Used Cars</span>
                        <span className="text-[11px] text-[#666666]">1,500+ verified listings</span>
                      </div>
                    </Link>
                    <Link href="/cars?featured=true" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Star size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Featured Listings</span>
                        <span className="text-[11px] text-[#666666]">Handpicked & inspected cars</span>
                      </div>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Building size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Sell Your Car</span>
                        <span className="text-[11px] text-[#666666]">Post your ad to millions of buyers</span>
                      </div>
                    </Link>
                    <Link href="/consultation" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1f1f1f] border border-[#2a2a2a] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Calculator size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Car Inspection</span>
                        <span className="text-[11px] text-[#666666]">Get detailed inspection reports</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex-1 px-[32px] border-r border-[#252525]">
                  <div className="text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.14em] mb-4 flex items-center gap-4">
                    CARUZEN SERVICES
                    <div className="flex-grow h-px bg-[#252525]"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="/cars?condition=used&featured=true" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1a1800] border border-[#2a2800] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <ShieldCheck size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Caruzen Certified</span>
                        <span className="text-[11px] text-[#666666]">Verified cars with warranty</span>
                      </div>
                    </Link>
                    <Link href="/consultation" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1a1800] border border-[#2a2800] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <ClipboardCheck size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Car Inspection</span>
                        <span className="text-[11px] text-[#666666]">Detailed 100-point reports</span>
                      </div>
                    </Link>
                    <Link href="/contact" className="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#1f1f1f] group/item transition-colors">
                      <div className="w-9 h-9 shrink-0 bg-[#1a1800] border border-[#2a2800] rounded-md flex items-center justify-center group-hover/item:border-[#F5C518] transition-colors">
                        <Tag size={18} className="text-[#F5C518]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#e8e8e8]">Sell It For Me</span>
                        <span className="text-[11px] text-[#666666]">We handle the entire sale</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Col 3 */}
                <div className="flex-1 pl-[32px]">
                  <div className="text-[10px] font-bold text-[#F5C518] uppercase tracking-[0.14em] mb-4 flex items-center gap-4">
                    POPULAR MODELS
                    <div className="flex-grow h-px bg-[#252525]"></div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { label: "Toyota Corolla", href: "/cars?q=corolla" },
                      { label: "Honda Civic", href: "/cars?q=civic" },
                      { label: "Honda City", href: "/cars?q=city" },
                      { label: "Suzuki Cultus", href: "/cars?q=cultus" },
                      { label: "Suzuki Mehran", href: "/cars?q=mehran" },
                      { label: "Toyota Yaris", href: "/cars?q=yaris" },
                      { label: "Suzuki Alto", href: "/cars?q=alto" },
                      { label: "Toyota Prado", href: "/cars?q=prado" },
                    ].map((model) => (
                      <Link key={model.label} href={model.href} className="flex items-center gap-1.5 py-[7px] px-2.5 bg-[#1a1a1a] border border-[#252525] rounded-md text-[12px] text-[#cccccc] hover:border-[#F5C518] hover:text-[#F5C518] hover:bg-[#1f1d13] group/model transition-all">
                        <ArrowRight size={13} className="text-[#555555] group-hover/model:text-[#F5C518]" />
                        {model.label}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            <Link href="/cars" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] hover:text-[#F5C518] border-b-[3px] border-transparent hover:border-[#F5C518] transition-colors">
              All Cars
            </Link>
            <Link href="/about" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] hover:text-[#F5C518] border-b-[3px] border-transparent hover:border-[#F5C518] transition-colors">
              About
            </Link>
            <Link href="/contact" className="h-full flex items-center px-4 text-[13px] font-medium text-[#cccccc] hover:text-[#F5C518] border-b-[3px] border-transparent hover:border-[#F5C518] transition-colors">
              Contact
            </Link>
          </nav>

          {/* RIGHT-SIDE CLUSTER */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            {/* Search Bar */}
            <div className="flex items-center bg-[#1e1e1e] border border-[#333333] rounded-md h-[38px] w-[200px] px-3">
              <Search size={15} className="text-[#666666]" />
              <input
                type="text"
                placeholder="Search cars..."
                className="bg-transparent border-none outline-none text-[13px] text-[#cccccc] placeholder:text-[#555555] ml-2 w-full"
              />
            </div>

            {/* Saved Cars Icon */}
            <Link href="#" aria-label="Saved cars" className="flex items-center justify-center w-[38px] h-[38px] bg-[#1e1e1e] border border-[#333333] rounded-md hover:border-[#F5C518] transition-colors group">
              <Heart size={16} className="text-[#cccccc] group-hover:text-[#F5C518] transition-colors" />
            </Link>

            {/* Consultation CTA */}
            <Link href="/consultation" className="flex items-center bg-[#F5C518] hover:bg-[#e0b416] text-[#111111] font-bold text-[12px] uppercase tracking-[0.06em] h-[38px] px-[18px] rounded-md transition-colors">
              <PhoneCall size={14} className="mr-2" />
              Consultation
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex lg:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#cccccc] hover:text-[#F5C518] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] z-[99] bg-[#111111] overflow-y-auto pb-20 lg:hidden">
          <nav className="flex flex-col w-full">
            <Link href="/" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/cars/new" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              New Cars
            </Link>
            <Link href="/cars/used" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              Used Cars
            </Link>
            <Link href="/cars" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              All Cars
            </Link>
            <Link href="/about" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="px-6 py-4 text-[16px] font-medium text-[#cccccc] border-b border-[#252525] hover:text-[#F5C518]" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link href="/consultation" className="flex justify-center items-center bg-[#F5C518] text-[#111111] font-bold text-[14px] uppercase tracking-[0.06em] h-[48px] px-[18px] rounded-md" onClick={() => setMobileMenuOpen(false)}>
                <PhoneCall size={16} className="mr-2" />
                Consultation
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
