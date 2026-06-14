"use client";

import { useState, useEffect } from "react";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";

export default function FeaturedVehicles() {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/new-cars')
      .then(res => res.json())
      .then(data => {
        if (data.cars) {
          // Sort by highest price and take top 4
          const sorted = data.cars.sort((a: any, b: any) => b.price - a.price).slice(0, 4);
          setFeaturedCars(sorted);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch featured cars", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#ffffff] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading 
          label="Top Picks" 
          title="Featured Vehicles"
          subtitle="Hand-picked premium listings from our showroom" 
          theme="light" 
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-[#eece00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car: any) => (
              <CarCard key={car.id} car={car} theme="light" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
