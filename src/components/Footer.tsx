"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Car, Users, Trophy, Star, ChevronDown } from "lucide-react";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  return (
    <footer
      className="relative bg-[#000000] border-t border-[#1a1a1a] overflow-hidden shadow-[0_-8px_40px_rgba(238,206,0,0.12)]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`
      }}
      suppressHydrationWarning
    >

      {/*  NEWSLETTER STRIP */}
      <div className="w-full bg-[#eece00]/5 border-b border-[#eece00]/10 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#eece00]/10 border border-[#eece00]/20 flex items-center justify-center text-xl text-[#eece00] flex-shrink-0 mx-auto md:mx-0">
              <Mail size={24} />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[15px] uppercase tracking-wide text-[#ffffff]">Get Notified About New Arrivals & Deals</p>
              <p className="font-body text-[#888888] text-[12px] mt-0.5">Subscribe to stay updated on new premium inventory, pricing deals, and special offers.</p>
            </div>
          </div>

          <form className="flex w-full md:w-auto items-center max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="font-body bg-[#111111] border border-[#222222] text-[#ffffff] px-4 py-3 rounded-[6px] text-xs focus:border-[#eece00] focus:ring-1 focus:ring-[#eece00]/30 outline-none w-full md:w-64 transition-all duration-200"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="font-heading font-black text-xs px-6 py-3 rounded-[6px] tracking-wide uppercase whitespace-nowrap cursor-pointer relative overflow-hidden bg-[#eece00] text-[#000000] hover:bg-[#ffffff] transition-colors duration-300 group
                         after:content-[''] after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:transition-transform after:duration-500 hover:after:translate-x-full"
              suppressHydrationWarning
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>



      {/* THIN HORIZONTAL ACCENT DIVIDER */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#eece00]/30 to-transparent my-8" />

      {/* MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 text-left">

          {/* COL 1 — BRAND */}
          <div className="flex flex-col items-center text-center justify-start">
            <div className="mb-0 flex justify-center w-full">
              <Link href="/">
                <Image
                  src="/caruzen.png"
                  alt="Caruzen Motors Logo"
                  width={240}
                  height={80}
                  className="object-contain w-[180px] md:w-[200px] h-auto transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            <p className="font-body font-normal text-[15px] leading-[1.75] text-[#888888] mb-4 max-w-sm">
              Pakistan's trusted dealership for new and used premium vehicles. Verified inventory. Honest pricing.
            </p>

            {/* Stars rating visual */}
            <div className="flex justify-center items-center gap-2 mb-6 bg-[#111111]/60 px-3 py-2 rounded-lg border border-[#222222] w-fit mx-auto">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#eece00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-heading text-[#ffffff] text-[11px] font-bold">4.9</span>
              <span className="font-body text-[#888888] text-[10px]">based on 200+ reviews</span>
            </div>

            {/* Social icons with hover glow & title tooltip */}
            <div className="flex gap-3">
              {[
                {
                  label: 'Facebook', s: 'FB', href: 'https://www.facebook.com/caruzenmotors.pk', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  )
                },
                {
                  label: 'Instagram', s: 'IG', href: 'https://www.instagram.com/caruzenmotors.pk', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )
                },
                {
                  label: 'TikTok', s: 'TT', href: 'https://www.tiktok.com/@caruzenmotors.pk', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.18.99 1.15 2.37 1.89 3.86 2.11v3.9c-1.78-.17-3.48-.89-4.82-2.11-.02 3.5-.02 7-.01 10.5-.09 1.83-.75 3.63-1.92 5.01-1.22 1.39-2.97 2.27-4.83 2.47-1.97.16-3.99-.41-5.5-1.68-1.42-1.21-2.27-3.03-2.31-4.88-.04-2.02.82-3.99 2.36-5.3 1.52-1.26 3.56-1.77 5.51-1.4v3.95c-1.04-.26-2.15-.02-3 .6-.81.6-1.27 1.58-1.24 2.6.02 1 .53 1.95 1.34 2.5.87.58 1.96.69 2.9.29.98-.39 1.63-1.37 1.63-2.42V.02z" />
                    </svg>
                  )
                },
                {
                  label: 'WhatsApp', s: 'WA', href: 'https://wa.me/923009315053', icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.86.002-2.636-1.023-5.113-2.887-6.978C16.578 1.9 14.108.85 11.482.85 6.048.85 1.623 5.27 1.62 10.707c-.001 1.638.43 3.235 1.25 4.649l-.999 3.648 3.776-.99z" />
                    </svg>
                  )
                }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.label}
                  className="relative group w-9 h-9 rounded-full bg-[#111111] flex items-center justify-center
                             text-[#eece00] border border-[#222222] transition-all duration-300
                             hover:scale-110 hover:shadow-[0_0_15px_rgba(238,206,0,0.5)] hover:bg-[#eece00] hover:text-[#000000] cursor-pointer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — QUICK LINKS */}
          <div className="border-b border-[#222222] md:border-none pb-4 md:pb-0">
            <button
              className="w-full flex justify-between items-center md:block focus:outline-none group"
              onClick={() => setOpenSection(openSection === 'quickLinks' ? null : 'quickLinks')}
            >
              <h4 className="font-heading font-extrabold text-[12px] uppercase tracking-[0.18em] text-[#eece00] relative text-left">
                Quick Links
                <span className="hidden md:block absolute -bottom-1.5 left-0 h-[2px] w-8 bg-[#eece00] transition-all duration-300 group-hover:w-full" />
              </h4>
              <ChevronDown className={`w-4 h-4 text-[#eece00] md:hidden transition-transform duration-200 ${openSection === 'quickLinks' ? 'rotate-180' : ''}`} />
            </button>
            <div className="hidden md:block h-[2px] w-8 mb-6" />
            <div className={`overflow-hidden transition-all duration-300 ${openSection === 'quickLinks' ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:mt-0 md:opacity-100'}`}>
              <ul className="space-y-3 pb-2 md:pb-0">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'All Cars', href: '/cars' },
                  { label: 'New Cars', href: '/cars/new' },
                  { label: 'Used Cars', href: '/cars/used' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="font-body font-normal text-[13px] text-[#777777] hover:text-[#eece00] transition-all duration-200 
                                 group flex items-center border-l-2 border-transparent hover:border-[#eece00] hover:pl-3 py-0.5"
                    >
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-200 text-xs mr-0.5 text-[#eece00]">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COL 3 — CAR TYPES */}
          <div className="border-b border-[#222222] md:border-none pb-4 md:pb-0">
            <button
              className="w-full flex justify-between items-center md:block focus:outline-none group"
              onClick={() => setOpenSection(openSection === 'carTypes' ? null : 'carTypes')}
            >
              <h4 className="font-heading font-extrabold text-[12px] uppercase tracking-[0.18em] text-[#eece00] relative text-left">
                Car Types
                <span className="hidden md:block absolute -bottom-1.5 left-0 h-[2px] w-8 bg-[#eece00] transition-all duration-300 group-hover:w-full" />
              </h4>
              <ChevronDown className={`w-4 h-4 text-[#eece00] md:hidden transition-transform duration-200 ${openSection === 'carTypes' ? 'rotate-180' : ''}`} />
            </button>
            <div className="hidden md:block h-[2px] w-8 mb-6" />
            <div className={`overflow-hidden transition-all duration-300 ${openSection === 'carTypes' ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:mt-0 md:opacity-100'}`}>
              <ul className="space-y-3 pb-2 md:pb-0">
                {[
                  { label: 'Toyota Cars', href: '/cars?brand=toyota' },
                  { label: 'Honda Cars', href: '/cars?brand=honda' },
                  { label: 'Suzuki Cars', href: '/cars?brand=suzuki' },
                  { label: 'Kia Cars', href: '/cars?brand=kia' },
                  { label: 'SUVs', href: '/cars?body=suv' },
                  { label: 'Sedans', href: '/cars?body=sedan' },
                  { label: 'Hatchbacks', href: '/cars?body=hatchback' }
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="font-body font-normal text-[13px] text-[#777777] hover:text-[#eece00] transition-all duration-200 
                                 group flex items-center border-l-2 border-transparent hover:border-[#eece00] hover:pl-3 py-0.5"
                    >
                      <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-200 text-xs mr-0.5 text-[#eece00]">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* COL 4 — CONTACT */}
          <div>
            <button
              className="w-full flex justify-between items-center md:block focus:outline-none group"
              onClick={() => setOpenSection(openSection === 'contact' ? null : 'contact')}
            >
              <h4 className="font-heading font-extrabold text-[12px] uppercase tracking-[0.18em] text-[#eece00] relative text-left">
                Contact Us
                <span className="hidden md:block absolute -bottom-1.5 left-0 h-[2px] w-8 bg-[#eece00] transition-all duration-300 group-hover:w-full" />
              </h4>
              <ChevronDown className={`w-4 h-4 text-[#eece00] md:hidden transition-transform duration-200 ${openSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            <div className="hidden md:block h-[2px] w-8 mb-6" />

            <div className={`overflow-hidden transition-all duration-300 ${openSection === 'contact' ? 'max-h-[800px] mt-4 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:mt-0 md:opacity-100'}`}>

              <div className="space-y-3.5">
                {[
                  {
                    title: 'SHOWROOM',
                    val: 'Sukkur, Sindh',
                    icon: <MapPin size={16} />,
                    sub: (
                      <a
                        href="https://maps.google.com/?q=Sukkur,+Sindh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[10px] text-[#eece00] hover:underline font-bold tracking-wider mt-1.5 flex items-center gap-1 w-fit"
                      >
                        <MapPin size={10} />
                        <span>Get Directions</span>
                      </a>
                    )
                  },
                  { title: 'CALL US', val: '0347 3931287', icon: <Phone size={16} />, href: 'tel:03473931287' },
                  { title: 'EMAIL', val: 'caruzenmotors1@gmail.com', icon: <Mail size={16} />, href: 'mailto:caruzenmotors1@gmail.com' },
                  { title: 'WORKING HOURS', val: 'Mon–Sat, 9AM–7PM', icon: <Clock size={16} /> }
                ].map((item, idx) => {
                  const cardContent = (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded bg-[#eece00]/5 border border-[#eece00]/10 flex items-center justify-center text-[#eece00] text-sm flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-heading text-[9px] text-[#888888] font-bold tracking-widest uppercase">{item.title}</p>
                        <p className="font-body text-white text-xs font-semibold mt-0.5 leading-snug">{item.val}</p>
                        {item.sub}
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={idx}
                      href={item.href}
                      className="block p-3 rounded-lg bg-[#111111] border-l-2 border-transparent hover:border-[#eece00] hover:bg-[#161616] transition-all duration-200 border border-[#222222]/30"
                    >
                      {cardContent}
                    </a>
                  ) : (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#111111] border-l-2 border-transparent hover:border-[#eece00] transition-all duration-200 border border-[#222222]/30"
                    >
                      {cardContent}
                    </div>
                  );
                })}

                {/* WhatsApp Quick Chat pill button */}
                <a
                  href="https://wa.me/923009315053"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading font-black text-[12px] tracking-[0.04em] uppercase flex items-center justify-center gap-2 w-full py-3 mt-4 bg-[#25d366] text-[#ffffff] rounded-full hover:bg-[#1ebd59] hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer border-none"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.733-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.86.002-2.636-1.023-5.113-2.887-6.978C16.578 1.9 14.108.85 11.482.85 6.048.85 1.623 5.27 1.62 10.707c-.001 1.638.43 3.235 1.25 4.649l-.999 3.648 3.776-.99z" />
                  </svg>
                  <span>Chat with us</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR WITH TOP SHADOW */}
      <div className="bg-[#eece00] border-t border-[#eece00] shadow-[0_-4px_20px_rgba(0,0,0,0.15)] relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-body font-semibold text-[16px] text-[#000000]" suppressHydrationWarning>© {new Date().getFullYear()} Caruzen Motors. All Rights Reserved.</p>
          <div className="font-body font-semibold text-[16px] text-[#000000]">
            Developed by{" "}
            <a
              href="https://anziandco.com?ref=caruzen-motors"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#333333] hover:underline decoration-2 underline-offset-2 transition-all duration-200"
            >
              Anzi & Co.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
