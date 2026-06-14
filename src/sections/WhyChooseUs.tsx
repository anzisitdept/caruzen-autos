import SectionHeading from "@/components/SectionHeading";
import { FaTrophy, FaDollarSign, FaHandshake, FaWrench } from "react-icons/fa";

export default function WhyChooseUs({ className = "" }: { className?: string }) {
  const reasons = [
    { icon: <FaTrophy className="w-7 h-7" />, title: 'Verified Inventory' },
    { icon: <FaDollarSign className="w-7 h-7" />, title: 'Best Market Prices' },
    { icon: <FaHandshake className="w-7 h-7" />, title: 'Trusted Dealership' },
    { icon: <FaWrench className="w-7 h-7" />, title: 'After-Sale Support' },
  ];

  return (
    <section className={`bg-[#000000] py-20 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading 
          label="Our Promise" 
          title="Why Choose Caruzen Motors"
          subtitle="We go beyond selling cars — we build trust." 
          theme="dark" 
          align="center" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {reasons.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#111111] border border-[#222222] rounded-xl p-6
                         hover:border-[#eece00] transition-all duration-300 group text-left"
            >
              {/* ICON in yellow circle */}
              <div className="w-14 h-14 rounded-full bg-[#eece00] flex items-center justify-center text-2xl mb-4 text-[#000000] font-bold">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-[20px] leading-tight tracking-[0.01em] text-[#ffffff]">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
