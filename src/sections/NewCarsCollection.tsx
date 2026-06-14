"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";

export default function NewCarsCollection() {
  const [allNewCars, setAllNewCars] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/new-cars')
      .then(res => res.json())
      .then(data => {
        if (data.cars) {
          // Reorder to push aerio and alto-lapin to the end
          const preferredCars = data.cars.filter((car: any) => {
            const lowerSlug = car.slug?.toLowerCase() || '';
            const lowerName = car.model?.toLowerCase() || '';
            return !lowerSlug.includes('aerio') && !lowerSlug.includes('lapin') && !lowerName.includes('aerio') && !lowerName.includes('lapin');
          });
          
          const avoidedCars = data.cars.filter((car: any) => {
            const lowerSlug = car.slug?.toLowerCase() || '';
            const lowerName = car.model?.toLowerCase() || '';
            return lowerSlug.includes('aerio') || lowerSlug.includes('lapin') || lowerName.includes('aerio') || lowerName.includes('lapin');
          });

          setAllNewCars([...preferredCars, ...avoidedCars]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch cars", err);
        setLoading(false);
      });
  }, []);

  const newCars = allNewCars.slice(0, visibleCount);

  return (
    <section className="bg-[#ffffff] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading label="Fresh Stock" title="New Cars" theme="light" />
          <Button variant="dark" href="/cars/new">View All New Cars →</Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-[#eece00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCars.map((car: any) => (
                <CarCard key={car.id} car={car} theme="light" />
              ))}
            </div>
            
            {visibleCount < allNewCars.length && (
              <div className="flex justify-center mt-12">
                <Button variant="dark" onClick={() => setVisibleCount(prev => prev + 6)}>
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
