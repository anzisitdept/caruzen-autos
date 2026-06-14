"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdvancedSearchBar() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("All Cars");
  const [makes, setMakes] = useState<string[]>([]);
  const [modelsByMake, setModelsByMake] = useState<Record<string, string[]>>({});
  
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    // Fetch dynamic data to populate makes and models
    fetch('/api/new-cars')
      .then(res => res.json())
      .then(data => {
        if (data.cars) {
          const makeMap: Record<string, Set<string>> = {};
          data.cars.forEach((car: any) => {
            if (!car.make) return;
            if (!makeMap[car.make]) makeMap[car.make] = new Set();
            if (car.model) makeMap[car.make].add(car.model);
          });
          
          const parsedModels: Record<string, string[]> = {};
          Object.keys(makeMap).forEach(make => {
            parsedModels[make] = Array.from(makeMap[make]).sort();
          });
          
          setMakes(Object.keys(makeMap).sort());
          setModelsByMake(parsedModels);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (activeTab === "New Cars") params.append("condition", "new");
    if (activeTab === "Used Cars") params.append("condition", "used");
    
    if (selectedMake) params.append("make", selectedMake);
    if (selectedModel) params.append("model", selectedModel);
    if (minYear) params.append("year", minYear);
    if (maxYear) params.append("maxYear", maxYear);
    
    if (budget) {
      if (budget === "Under 20 Lac") params.append("maxPrice", "2000000");
      if (budget === "20 - 40 Lac") { params.append("minPrice", "2000000"); params.append("maxPrice", "4000000"); }
      if (budget === "40 - 70 Lac") { params.append("minPrice", "4000000"); params.append("maxPrice", "7000000"); }
      if (budget === "70 Lac - 1 Crore") { params.append("minPrice", "7000000"); params.append("maxPrice", "10000000"); }
      if (budget === "Above 1 Crore") params.append("minPrice", "10000000");
    }

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="bg-[#f5f5f5] pt-10 pb-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* SEARCH CARD — floats up, overlaps hero bottom */}
        <div
          className="bg-[#ffffff] rounded-[14px] border border-[#e8e8e8] p-6 md:p-7 -mt-16 md:-mt-20 relative z-20"
          style={{ boxShadow: '0 6px 40px rgba(0,0,0,0.10)' }}
        >

          {/* TABS ROW */}
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#f0f0f0]">
            {['All Cars', 'New Cars', 'Used Cars'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-heading font-black text-[11px] uppercase tracking-[0.08em] px-4 py-2 rounded-[5px] border-none cursor-pointer transition-all duration-150 ${
                  activeTab === tab
                    ? "bg-[#eece00] text-[#000000]"
                    : "bg-transparent text-[#999999] hover:text-[#000000] hover:bg-[#f5f5f5]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* SEARCH FIELDS ROW */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">

            {/* MAKE */}
            <select
              value={selectedMake}
              onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel(""); }}
              className="font-body flex-1 min-w-[120px] bg-[#fafafa] border border-[#e5e5e5]
                         rounded-[7px] px-4 py-[11px] text-[13px] text-[#333333]
                         focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20
                         outline-none cursor-pointer appearance-none"
            >
              <option value="">All Makes</option>
              {makes.length > 0 ? makes.map(m => <option key={m} value={m}>{m}</option>) : (
                <>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Suzuki</option>
                  <option>Kia</option>
                  <option>Hyundai</option>
                </>
              )}
            </select>

            {/* DIVIDER */}
            <div className="hidden md:block w-px h-8 bg-[#e5e5e5] flex-shrink-0" />

            {/* MODEL */}
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake || !modelsByMake[selectedMake]}
              className="font-body flex-1 min-w-[120px] bg-[#fafafa] border border-[#e5e5e5]
                         rounded-[7px] px-4 py-[11px] text-[13px] text-[#333333]
                         focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20
                         outline-none cursor-pointer appearance-none disabled:opacity-50"
            >
              <option value="">All Models</option>
              {selectedMake && modelsByMake[selectedMake] && modelsByMake[selectedMake].map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>

            {/* DIVIDER */}
            <div className="hidden md:block w-px h-8 bg-[#e5e5e5] flex-shrink-0" />

            {/* MIN YEAR */}
            <select
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="font-body flex-1 min-w-[100px] bg-[#fafafa] border border-[#e5e5e5]
                         rounded-[7px] px-4 py-[11px] text-[13px] text-[#333333]
                         focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20
                         outline-none cursor-pointer appearance-none"
            >
              <option value="">Min Year</option>
              {Array.from({length: 15}, (_, i) => 2026 - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {/* DIVIDER */}
            <div className="hidden md:block w-px h-8 bg-[#e5e5e5] flex-shrink-0" />

            {/* MAX YEAR */}
            <select
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="font-body flex-1 min-w-[100px] bg-[#fafafa] border border-[#e5e5e5]
                         rounded-[7px] px-4 py-[11px] text-[13px] text-[#333333]
                         focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20
                         outline-none cursor-pointer appearance-none"
            >
              <option value="">Max Year</option>
              {Array.from({length: 15}, (_, i) => 2026 - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {/* DIVIDER */}
            <div className="hidden md:block w-px h-8 bg-[#e5e5e5] flex-shrink-0" />

            {/* BUDGET */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="font-body flex-1 min-w-[130px] bg-[#fafafa] border border-[#e5e5e5]
                         rounded-[7px] px-4 py-[11px] text-[13px] text-[#333333]
                         focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20
                         outline-none cursor-pointer appearance-none"
            >
              <option value="">Budget (PKR)</option>
              <option>Under 20 Lac</option>
              <option>20 - 40 Lac</option>
              <option>40 - 70 Lac</option>
              <option>70 Lac - 1 Crore</option>
              <option>Above 1 Crore</option>
            </select>

            {/* SEARCH BUTTON — yellow, full height */}
            <button
              onClick={handleSearch}
              className="font-heading font-black text-[13px] tracking-[0.04em] uppercase bg-[#eece00] text-[#000000]
                         px-7 py-[11px] rounded-[7px] border-none cursor-pointer
                         flex items-center gap-2 flex-shrink-0 whitespace-nowrap
                         hover:bg-[#000000] hover:text-[#eece00]
                         transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Cars
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
