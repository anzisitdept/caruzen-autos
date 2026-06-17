"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar from "@/components/FilterSidebar";
import CarCard from "@/components/CarCard";
import carsData from "@/data/cars.json";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Suspense } from "react";

function NewCarsContent() {
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [dbCars, setDbCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    condition: "new",
    make: searchParams.get("make") || "",
    model: searchParams.get("model") || "",
    minYear: searchParams.get("year") || "",
    maxYear: "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    fuelType: searchParams.get("fuelType") || "",
    transmission: searchParams.get("transmission") || "",
    city: searchParams.get("city") || "",
  });

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('/api/new-cars');
        if (res.ok) {
          const data = await res.json();
          // Assume DB cars are all "new" condition implicitly
          const fetchedCars = data.cars.map((c: any) => ({ ...c, condition: "new" }));
          setDbCars(fetchedCars);
        }
      } catch (err) {
        console.error("Failed to fetch cars", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = dbCars.filter((car) => {
    if (car.condition !== "new") return false;
    if (filters.make && car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    if (filters.model && car.model?.toLowerCase() !== filters.model.toLowerCase()) return false;
    if (filters.minYear && car.year < parseInt(filters.minYear)) return false;
    if (filters.maxYear && car.year > parseInt(filters.maxYear)) return false;
    // Price could be stored as string or number, remove commas and parse
    const carPrice = typeof car.price === 'string' ? parseInt(car.price.replace(/\D/g, '')) : car.price;
    if (filters.minPrice && carPrice < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && carPrice > parseInt(filters.maxPrice)) return false;
    if (filters.fuelType && car.fuelType?.toLowerCase() !== filters.fuelType.toLowerCase()) return false;
    if (filters.transmission && car.transmission?.toLowerCase() !== filters.transmission.toLowerCase()) return false;
    if (filters.city && car.city?.toLowerCase() !== filters.city.toLowerCase()) return false;
    return true;
  });

  const availableBrands = Array.from(new Set(dbCars.map(car => car.make))).filter(Boolean) as string[];

  useEffect(() => {
    setVisibleCount(6);
  }, [filters, sortBy]);

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    return b.id - a.id;
  });

  const removeFilter = (key: string) => {
    if (key === "condition") return; // locked
    setFilters({ ...filters, [key]: "" });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="font-heading font-black text-[32px] md:text-[40px] text-black mb-2.5">New Car Inventory</h1>
            <p className="font-body font-normal text-[15px] text-gray-600">Latest models available at Caruzen Motors showroom</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 flex-shrink-0">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                isOpen={isMobileFiltersOpen} 
                setIsOpen={setIsMobileFiltersOpen} 
                lockedCondition="new"
                availableBrands={availableBrands}
              />
            </div>

            <div className="flex-1">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="font-heading font-bold text-xs uppercase tracking-[0.04em] lg:hidden flex items-center text-black"
                  >
                    <SlidersHorizontal size={20} className="mr-2 text-[#eece00]" />
                    Filters {activeFiltersCount > 1 && `(${activeFiltersCount - 1})`}
                  </button>
                  <h2 className="font-heading font-bold text-[18px] text-black hidden lg:block">
                    Showing <span className="text-[#eece00] font-black">{sortedCars.length}</span> results
                  </h2>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-xs uppercase tracking-[0.04em] text-gray-500">Sort by:</span>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="font-body border border-gray-300 rounded focus:ring-[#eece00] focus:border-[#eece00] text-sm p-1.5"
                    >
                      <option value="latest">Latest</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1 border border-gray-200 rounded p-1">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={`p-1 rounded ${viewMode === "grid" ? "bg-gray-200 text-black" : "text-gray-400 hover:text-black"}`}
                    >
                      <LayoutGrid size={18} />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`p-1 rounded ${viewMode === "list" ? "bg-gray-200 text-black" : "text-gray-400 hover:text-black"}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {activeFiltersCount > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {Object.entries(filters).map(([key, value]) => {
                    if (!value || key === "condition") return null;
                    return (
                      <span key={key} className="font-heading font-bold text-[11px] uppercase tracking-[0.04em] inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#eece00] text-black">
                        {key === 'minPrice' ? `Min: ${value}` : key === 'maxPrice' ? `Max: ${value}` : value}
                        <button onClick={() => removeFilter(key)} className="ml-2 focus:outline-none hover:text-gray-700">
                          <X size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {loading ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-heading font-extrabold text-[24px] text-gray-800 mb-2">Loading cars...</h3>
                </div>
              ) : sortedCars.length > 0 ? (
                <>
                  <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                    {sortedCars.slice(0, visibleCount).map(car => (
                      <CarCard key={car.id} car={car} view={viewMode} />
                    ))}
                  </div>
                  
                  {visibleCount < sortedCars.length && (
                    <div className="mt-10 text-center flex justify-center">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="font-heading font-black text-[14px] tracking-[0.04em] uppercase bg-[#eece00] text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                      >
                        Load More Vehicles
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                  <h3 className="font-heading font-extrabold text-[24px] text-gray-800 mb-2">No vehicles found</h3>
                  <p className="font-body font-normal text-[15px] text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function NewCarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NewCarsContent />
    </Suspense>
  );
}
