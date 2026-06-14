"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import CarCard from "@/components/CarCard";
import carsData from "@/data/cars.json";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import Button from "@/components/Button";

function CarsContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [allCars, setAllCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    condition: searchParams.get("condition") || "",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    minYear: searchParams.get("year") || "",
    maxYear: searchParams.get("maxYear") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    fuelType: searchParams.get("fuelType") || "",
    transmission: searchParams.get("transmission") || "",
    city: searchParams.get("city") || "",
  });

  // Fetch dynamic cars and merge with static cars
  useEffect(() => {
    setIsLoading(true);
    
    // Map static cars and enforce 'used' condition
    const staticCars = carsData.map(car => ({
      ...car,
      condition: 'used'
    }));
    
    fetch('/api/new-cars')
      .then(res => res.json())
      .then(data => {
        if (data.cars) {
          // Dynamic cars are considered 'new' by the API
          setAllCars([...data.cars, ...staticCars]);
        } else {
          setAllCars(staticCars);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch dynamic cars:", err);
        setAllCars(staticCars);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      condition: searchParams.get("condition") || "",
      make: searchParams.get("make") || "",
      model: searchParams.get("model") || "",
      minYear: searchParams.get("year") || "",
      maxYear: searchParams.get("maxYear") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      fuelType: searchParams.get("fuelType") || "",
      transmission: searchParams.get("transmission") || "",
      city: searchParams.get("city") || "",
    }));
  }, [searchParams]);

  // Derived filtered cars
  const filteredCars = allCars.filter((car) => {
    if (filters.condition && car.condition !== filters.condition) return false;
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    if (filters.model && car.model.toLowerCase() !== filters.model.toLowerCase()) return false;
    if (filters.minYear && car.year < parseInt(filters.minYear)) return false;
    if (filters.maxYear && car.year > parseInt(filters.maxYear)) return false;
    if (filters.minPrice && car.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && car.price > parseInt(filters.maxPrice)) return false;
    if (filters.fuelType && car.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) return false;
    if (filters.transmission && car.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
    if (filters.city && car.city.toLowerCase() !== filters.city.toLowerCase()) return false;
    return true;
  });

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return b.id - a.id;
  });

  const removeFilter = (key: string) => {
    setFilters({ ...filters, [key]: "" });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-[#f9f9f9] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                isOpen={isMobileFiltersOpen} 
                setIsOpen={setIsMobileFiltersOpen} 
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              
              {/* RESULTS COUNT + SORT BAR */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 p-4 bg-[#f9f9f9] rounded-xl border border-[#e5e5e5] gap-4">
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <button 
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="font-heading font-bold text-xs uppercase tracking-[0.04em] lg:hidden flex items-center text-black cursor-pointer"
                  >
                    <SlidersHorizontal size={18} className="mr-2 text-[#eece00]" />
                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </button>
                  <p className="font-heading text-[#000000] font-semibold text-sm md:text-base">
                    Showing <span className="text-[#eece00] font-black">{sortedCars.length}</span> results
                  </p>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  {/* View modes */}
                  <div className="flex items-center gap-1 border border-gray-200 rounded p-1 bg-white">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className="p-1 rounded cursor-pointer text-gray-400 hover:text-black"
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className="p-1 rounded cursor-pointer text-gray-400 hover:text-black"
                    >
                      <List size={18} />
                    </button>
                  </div>
                  
                  {/* Sort selector */}
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="font-body border border-[#dddddd] rounded-md px-3 py-2 text-sm text-[#000000] focus:border-[#eece00] outline-none bg-white transition-all cursor-pointer"
                  >
                    <option value="latest">Sort by: Latest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* ACTIVE FILTER CHIP */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 items-center">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value) return null;
                    const label = key === 'minPrice' ? `Min: ${parseInt(value).toLocaleString()}` : key === 'maxPrice' ? `Max: ${parseInt(value).toLocaleString()}` : value;
                    return (
                      <span 
                        key={key} 
                        className="font-heading font-bold text-[11px] uppercase tracking-[0.04em] inline-flex items-center gap-1 bg-[#eece00] text-[#000000] px-3 py-1.5 rounded-full"
                      >
                        {label}
                        <button onClick={() => removeFilter(key)} className="hover:opacity-70 cursor-pointer">✕</button>
                      </span>
                    );
                  })}
                  <button 
                    onClick={() => setFilters({condition: "", make: "", model: "", minYear: "", maxYear: "", minPrice: "", maxPrice: "", fuelType: "", transmission: "", city: ""})} 
                    className="font-heading font-black text-xs uppercase tracking-[0.04em] text-[#eece00] hover:underline cursor-pointer ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Car Grid/List */}
              {isLoading ? (
                <div className="flex justify-center items-center py-32">
                  <div className="w-10 h-10 border-4 border-[#eece00] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : sortedCars.length > 0 ? (
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                  {sortedCars.map(car => (
                    <CarCard key={car.id} car={car} view={viewMode} theme="light" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-[#e5e5e5]">
                  <h3 className="font-heading font-extrabold text-[24px] text-black mb-2">No vehicles found</h3>
                  <p className="font-body font-normal text-[15px] text-[#666666] mb-6">Try adjusting your filters to find what you're looking for.</p>
                  <Button onClick={() => setFilters({condition: "", make: "", model: "", minYear: "", maxYear: "", minPrice: "", maxPrice: "", fuelType: "", transmission: "", city: ""})} variant="dark">
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* PAGINATION */}
              {sortedCars.length > 0 && (
                <button className="font-heading font-black text-[14px] tracking-[0.04em] uppercase w-full py-3 bg-[#000000] text-[#eece00] rounded-xl border-2 border-[#000000] hover:bg-[#eece00] hover:text-[#000000] transition-all duration-200 mt-8 cursor-pointer">
                  Load More Cars
                </button>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <CarsContent />
    </Suspense>
  );
}
