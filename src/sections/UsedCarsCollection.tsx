import Button from "@/components/Button";
import CarCard from "@/components/CarCard";
import SectionHeading from "@/components/SectionHeading";
import carsData from "@/data/cars.json";

export default function UsedCarsCollection() {
  const usedCars = carsData.filter((car) => car.condition === "used").slice(0, 3);

  return (
    <section className="bg-[#111111] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading 
            label="Pre-Owned" 
            title="Used Cars"
            subtitle="Certified pre-owned vehicles at great prices" 
            theme="dark" 
          />
          <Button variant="outline-yellow" href="/cars/used">View All Used Cars →</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usedCars.map(car => (
            <CarCard key={car.id} car={car} theme="dark" />
          ))}
        </div>
      </div>
    </section>
  );
}
