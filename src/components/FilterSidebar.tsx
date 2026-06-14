"use client";

import { X } from "lucide-react";

interface FilterSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  lockedCondition?: string;
  availableBrands?: string[];
  lockedMake?: string;
}

export default function FilterSidebar({
  filters,
  setFilters,
  isOpen,
  setIsOpen,
  lockedCondition,
  availableBrands,
  lockedMake,
}: FilterSidebarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearAll = () => {
    setFilters({
      condition: lockedCondition || "",
      make: lockedMake || "",
      model: "",
      minYear: "",
      maxYear: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      transmission: "",
      city: "",
    });
  };

  const selectClass = `font-body w-full border-[#dddddd] rounded-md focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/20 p-3 border outline-none bg-white text-black text-sm transition-all duration-200`;
  const labelClass = `font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#000000] mb-3 mt-5 block`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#ffffff] shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-full lg:shadow-none lg:bg-transparent ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6 lg:p-6 bg-[#ffffff] border border-[#e5e5e5] rounded-xl lg:sticky lg:top-24 overflow-y-auto">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#eeeeee]">
            <h3 className="font-heading font-extrabold text-[22px] leading-tight tracking-[0.01em] text-[#000000]">Filter Vehicles</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="font-heading font-black text-xs uppercase tracking-[0.04em] text-[#eece00] hover:underline cursor-pointer"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 hover:text-black cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Condition */}
            {!lockedCondition && (
              <div>
                <p className={labelClass}>Condition</p>
                <div className="flex gap-2">
                  {["new", "used"].map((cond) => {
                    const isSelected = filters.condition === cond;
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setFilters({ ...filters, condition: cond })}
                        className={`font-heading font-black text-[12px] tracking-[0.04em] uppercase flex-grow px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer border-2 ${
                          isSelected
                            ? "bg-[#eece00] text-[#000000] border-[#eece00]"
                            : "bg-[#ffffff] text-[#444444] border-[#dddddd] hover:border-[#eece00] hover:text-[#000000]"
                        }`}
                      >
                        {cond === "new" ? "New" : "Used"}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Make */}
            {!lockedMake ? (
              <div>
                <p className={labelClass}>Brand / Make</p>
                <select
                  name="make"
                  value={filters.make}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">All Brands</option>
                  {availableBrands ? (
                    availableBrands.map(brand => (
                      <option key={brand} value={brand} className="capitalize">{brand}</option>
                    ))
                  ) : (
                    <>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Kia">Kia</option>
                      <option value="Hyundai">Hyundai</option>
                    </>
                  )}
                </select>
              </div>
            ) : null}

            {/* Price Range */}
            <div>
              <p className={labelClass}>Price Range</p>
              <div className="flex items-center gap-2">
                <select
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Min</option>
                  <option value="2000000">20 Lakh</option>
                  <option value="4000000">40 Lakh</option>
                  <option value="6000000">60 Lakh</option>
                </select>
                <span className="text-gray-400">-</span>
                <select
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Max</option>
                  <option value="4000000">40 Lakh</option>
                  <option value="6000000">60 Lakh</option>
                  <option value="10000000">1 Crore</option>
                  <option value="50000000">5 Crore</option>
                </select>
              </div>
            </div>

            {/* Year Range */}
            <div>
              <p className={labelClass}>Year</p>
              <div className="flex items-center gap-2">
                <select
                  name="minYear"
                  value={filters.minYear}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Min</option>
                  <option value="2010">2010</option>
                  <option value="2015">2015</option>
                  <option value="2020">2020</option>
                </select>
                <span className="text-gray-400">-</span>
                <select
                  name="maxYear"
                  value={filters.maxYear}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="">Max</option>
                  <option value="2020">2020</option>
                  <option value="2022">2022</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <p className={labelClass}>Fuel Type</p>
              <select
                name="fuelType"
                value={filters.fuelType}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <p className={labelClass}>Transmission</p>
              <select
                name="transmission"
                value={filters.transmission}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Any</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            
            {/* City */}
            <div>
              <p className={labelClass}>City</p>
              <select
                name="city"
                value={filters.city}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">Any City</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
              </select>
            </div>
            
          </div>

          <div className="mt-8 lg:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="font-heading font-black text-[14px] tracking-[0.04em] uppercase w-full py-3 bg-[#eece00] text-black rounded-md hover:bg-black hover:text-[#eece00] transition-colors cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
