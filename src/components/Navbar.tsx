"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"new" | "used" | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  // Mobile collapsibles
  const [mobileNewOpen, setMobileNewOpen] = useState(false);
  const [mobileUsedOpen, setMobileUsedOpen] = useState(false);

  const [popularBrands, setPopularBrands] = useState([
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

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      // Auto-hide mobile menu if user scrolls down to other sections
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Auto-close mobile menu when navigating to a new route
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileNewOpen(false);
    setMobileUsedOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "New Cars", href: "/cars/new", mega: true, type: "new" as const },
    { name: "Used Cars", href: "/cars/used", mega: true, type: "used" as const },
    { name: "All Cars", href: "/cars" },
    /*
    { name: "Blog", href: "/blog" ,}
    */
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Used Cars mega dropdown data
  const usedCarsMegaData = {
    columns: [
      {
        title: "Find Used Cars",
        items: [
          { label: "Find Used Cars for Sale", desc: "Search from over 1,500+ premium options", href: "/cars?condition=used" },
          { label: "Featured Used Cars", desc: "View inspected cars by Caruzen", href: "/cars?condition=used&featured=true" },
          { label: "Sell Your Car", desc: "Post an ad and sell your car quickly", href: "/contact?subject=Sell a Car" },
          { label: "Used Car Dealers", desc: "Find trusted local dealers", href: "/about" },
          { label: "Price Calculator", desc: "Calculate current market value of cars", href: "/consultation" },
        ]
      },
      {
        title: "Caruzen Services",
        items: [
          { label: "Caruzen Certified Cars", desc: "Cars with Caruzen seal of approval", href: "/cars?certified=true" },
          { label: "Caruzen Car Inspection", desc: "Get highly detailed inspection reports", href: "/consultation" },
          { label: "Caruzen Sell It For Me", desc: "Let our experts handle the sale for you", href: "/contact" },
        ]
      },
      {
        title: "Popular Models",
        links: [
          { label: "Toyota Corolla", href: "/cars?q=corolla" },
          { label: "Honda Civic", href: "/cars?q=civic" },
          { label: "Honda City", href: "/cars?q=city" },
          { label: "Suzuki Cultus", href: "/cars?q=cultus" },
          { label: "Suzuki Mehran", href: "/cars?q=mehran" },
          { label: "Toyota Yaris", href: "/cars?q=yaris" },
          { label: "Suzuki Alto", href: "/cars?q=alto" },
          { label: "Toyota Prado", href: "/cars?q=prado" },
        ]
      }
    ]
  };

  // New Cars mega dropdown data
  const newCarsMegaData = {
    columns: [
      {
        title: "Find New Cars",
        items: [
          { label: "Find New Cars for Sale", desc: "Explore zero-meter current models", href: "/cars?condition=new" },
          { label: "New Car Launches", desc: "Stay updated on upcoming releases", href: "/cars/new" },
          { label: "On-Road Price", desc: "Calculate registration & tax costs", href: "/consultation" },
          { label: "Car Reviews", desc: "Read owner & expert ratings", href: "/#reviews" },
        ]
      },
      {
        title: "Popular Brands",
        items: popularBrands
      },
      {
        title: "Trending Models",
        links: [
          { label: "Corolla Cross", href: "/cars?q=corolla+cross" },
          { label: "Civic Oriel", href: "/cars?q=civic" },
          { label: "Suzuki Swift", href: "/cars?q=swift" },
          { label: "Kia Sportage", href: "/cars?q=sportage" },
          { label: "Changan Alsvin", href: "/cars?q=alsvin" },
          { label: "Hyundai Tucson", href: "/cars?q=tucson" },
        ]
      }
    ]
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end md:justify-between items-center h-20 w-full gap-4 relative bg-[#000000] z-20">

          {/* Logo container */}
          <div className="flex-shrink-0 flex items-center justify-center h-20 overflow-visible absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:justify-start">
            <Link href="/" className="flex items-center h-full" onClick={() => setMobileMenuOpen(false)}>
              <Image
                src="/caruzen.png"
                alt="Caruzen Motors Logo"
                width={280}
                height={80}
                className="object-contain h-24 w-auto transform scale-125 md:scale-145 origin-center md:origin-left md:translate-y-1 hover:scale-125 md:hover:scale-150 transition-transform duration-200"
                priority
              />
            </Link>
          </div>

          {/* Centered Desktop Nav */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
            {navLinks.map((link) => {
              if (link.mega) {
                const megaData = link.type === "new" ? newCarsMegaData : usedCarsMegaData;
                const isHovered = activeMegaMenu === link.type;

                return (
                  <div
                    key={link.name}
                    className="static"
                    onMouseEnter={() => {
                      if (closeTimeout) clearTimeout(closeTimeout);
                      setActiveMegaMenu(link.type);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => setActiveMegaMenu(null), 100);
                      setCloseTimeout(timeout);
                    }}
                  >
                    <Link
                      href={link.href}
                      data-active={isActive(link.href)}
                      className="font-heading font-semibold text-[14px] tracking-[0.03em] text-[#ffffff] hover:text-[#eece00] transition-colors duration-200 data-[active=true]:text-[#eece00] data-[active=true]:border-b-2 data-[active=true]:border-[#eece00] pb-1 flex items-center gap-1 py-6 cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown className={`ml-0.5 w-4 h-4 transition-transform duration-200 ${isHovered ? "rotate-180 text-[#eece00]" : ""}`} />
                    </Link>

                    {/* Mega Dropdown Panel */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`absolute left-1/2 -translate-x-1/2 top-[80px] w-[calc(100vw-2rem)] bg-[#0d0d0d]/98 border border-[#222222] rounded-2xl shadow-yellow-md shadow-2xl z-50 text-left overflow-hidden ${megaData.columns.length === 3 ? "max-w-4xl" : "max-w-5xl"
                            }`}
                          onMouseEnter={() => {
                            if (closeTimeout) clearTimeout(closeTimeout);
                            setActiveMegaMenu(link.type);
                          }}
                          onMouseLeave={() => {
                            const timeout = setTimeout(() => setActiveMegaMenu(null), 100);
                            setCloseTimeout(timeout);
                          }}
                        >
                          <div className={`py-6 px-8 grid gap-8 ${megaData.columns.length === 3 ? "grid-cols-3" : "grid-cols-4"
                            }`}>
                            {megaData.columns.map((col, idx) => (
                              <div key={idx} className="space-y-4">
                                <h4 className="font-heading text-xs font-bold text-[#eece00] uppercase tracking-widest border-b border-[#222222] pb-2">
                                  {col.title}
                                </h4>

                                {col.items && (
                                  <ul className="space-y-1.5">
                                    {col.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>
                                        <Link
                                          href={item.href}
                                          className="group block hover:bg-[#1a1a1a] py-1.5 px-2 rounded-md transition-all duration-150"
                                          onClick={() => setActiveMegaMenu(null)}
                                        >
                                          <div className="font-heading text-sm font-bold text-white group-hover:text-[#eece00] transition-colors">
                                            {item.label}
                                          </div>
                                          <div className="font-body text-xs text-[#999999] mt-0.5 group-hover:text-[#cccccc] transition-colors leading-relaxed">
                                            {item.desc}
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {col.links && (
                                  <div className="grid grid-cols-1 gap-2 pt-1">
                                    {col.links.map((lnk, lnkIdx) => (
                                      <Link
                                        key={lnkIdx}
                                        href={lnk.href}
                                        className="font-body text-sm text-[#cccccc] hover:text-[#eece00] hover:translate-x-1 transition-all duration-200 block py-1 font-medium"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        {lnk.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // Normal single links
              return (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    data-active={isActive(link.href)}
                    className="font-heading font-semibold text-[14px] tracking-[0.03em] text-[#ffffff] hover:text-[#eece00] transition-colors duration-200 data-[active=true]:text-[#eece00] data-[active=true]:border-b-2 data-[active=true]:border-[#eece00] pb-1 flex items-center gap-1 py-6"
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Consultation Button on the corner */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/consultation"
              className="font-heading font-black text-[14px] tracking-[0.04em] uppercase bg-[#eece00] text-[#000000] px-6 py-2.5 rounded-md hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-200 shadow-sm"
            >
              Consultation
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#eece00] md:hidden focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE OVERLAY (Click outside to close) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 top-20 bg-black/60 z-10"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[#000000] border-t border-[#222222] overflow-hidden z-20 shadow-2xl"
          >
            <div className="flex flex-col py-2">
              {navLinks.map((link) => {
                if (link.mega) {
                  const isCollapsibleOpen = link.type === "new" ? mobileNewOpen : mobileUsedOpen;
                  const setCollapsibleOpen = link.type === "new" ? setMobileNewOpen : setMobileUsedOpen;
                  const megaData = link.type === "new" ? newCarsMegaData : usedCarsMegaData;

                  return (
                    <div key={link.name} className="flex flex-col border-b border-[#1a1a1a]">
                      <button
                        onClick={() => setCollapsibleOpen(!isCollapsibleOpen)}
                        className="font-heading font-semibold text-[14px] tracking-[0.03em] flex justify-between items-center w-full px-6 py-4 text-[#ffffff] hover:text-[#eece00] hover:bg-[#0a0a0a] transition-all"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCollapsibleOpen ? "rotate-180 text-[#eece00]" : ""}`} />
                      </button>

                      {isCollapsibleOpen && (
                        <div className="bg-[#050505] pl-6 pb-4 space-y-4">
                          {megaData.columns.map((col, idx) => (
                            <div key={idx} className="space-y-2 pt-2">
                              <h5 className="font-heading font-bold text-xs text-[#eece00] uppercase tracking-wider">{col.title}</h5>

                              {col.items && (
                                <div className="space-y-2 pl-2">
                                  {col.items.map((item, itemIdx) => (
                                    <Link
                                      key={itemIdx}
                                      href={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="font-body block text-sm text-[#aaaaaa] hover:text-[#eece00] py-1"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              )}

                              {col.links && (
                                <div className="grid grid-cols-2 gap-2 pl-2">
                                  {col.links.slice(0, 6).map((lnk, lnkIdx) => (
                                    <Link
                                      key={lnkIdx}
                                      href={lnk.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="font-body text-xs text-[#aaaaaa] hover:text-[#eece00] py-1"
                                    >
                                      {lnk.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading font-semibold text-[14px] tracking-[0.03em] block px-6 py-4 text-[#ffffff] border-b border-[#1a1a1a] hover:text-[#eece00] hover:bg-[#0a0a0a] transition-all"
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                href="/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading font-black text-[14px] tracking-[0.04em] uppercase block text-center mx-6 my-4 bg-[#eece00] text-[#000000] py-3 rounded-md hover:bg-[#ffffff] hover:text-[#000000] transition-all duration-200"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
