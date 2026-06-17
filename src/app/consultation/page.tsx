"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  budget: z.string().min(1, "Please select a budget"),
  condition: z.string().min(1, "Please select a condition"),
  carType: z.string().min(1, "Please select a car type"),
  brand: z.string(),
  fuel: z.string().min(1, "Please select a fuel preference"),
  notes: z.string(),
  time: z.string().min(1, "Please select a preferred contact time"),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export default function ConsultationPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = (data: ConsultationFormValues) => {
    toast.success("✅ Consultation booked! Our team will call you within 2 hours.");
    reset();
  };

  const inputClass = `font-body w-full border border-[#dddddd] rounded-md px-3 py-3 text-sm text-[#000000] focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none transition-all duration-200 bg-white`;
  const labelClass = `font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f9f9f9]">
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-[#000000] text-white relative border-b-4 border-[#eece00]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
            <h1 className="font-heading font-black text-[38px] md:text-[56px] lg:text-[68px] leading-[1.05] mb-6 text-white uppercase tracking-tight">Not Sure Which Car to Buy?</h1>
            <p className="font-body font-normal text-[16px] md:text-[18px] leading-relaxed text-[#cccccc] max-w-2xl mx-auto mb-10">
              Book a FREE consultation with our automotive experts. Tell us your needs — we'll find your perfect match.
            </p>
            <Button onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })} variant="primary" className="px-10 py-4 text-lg">
              Book Now
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-[#ffffff] border-b border-[#e5e5e5]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center flex flex-col items-center mb-12">
              <SectionHeading label="PROCESS" title="How It Works" theme="light" align="center" />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center relative">
              <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10 -translate-y-1/2"></div>
              
              <div className="flex flex-col items-center bg-white z-10 px-4 mb-8 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-[#eece00] text-[#000000] font-extrabold text-2xl flex items-center justify-center mb-4 border-4 border-white shadow-md select-none">1</div>
                <h4 className="font-heading font-bold text-[18px] text-black text-center">Fill the Form</h4>
                <p className="font-body text-xs text-[#666666] text-center max-w-[200px] mt-2 leading-relaxed">Provide your budget and preferences.</p>
              </div>
              
              <div className="flex flex-col items-center bg-white z-10 px-4 mb-8 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-[#eece00] text-[#000000] font-extrabold text-2xl flex items-center justify-center mb-4 border-4 border-white shadow-md select-none">2</div>
                <h4 className="font-heading font-bold text-[18px] text-black text-center">Expert Contacts You</h4>
                <p className="font-body text-xs text-[#666666] text-center max-w-[200px] mt-2 leading-relaxed">We review your needs and call you back.</p>
              </div>
              
              <div className="flex flex-col items-center bg-white z-10 px-4">
                <div className="w-16 h-16 rounded-full bg-[#eece00] text-[#000000] font-extrabold text-2xl flex items-center justify-center mb-4 border-4 border-white shadow-md select-none">3</div>
                <h4 className="font-heading font-bold text-[18px] text-black text-center">Get Recommendations</h4>
                <p className="font-body text-xs text-[#666666] text-center max-w-[200px] mt-2 leading-relaxed">Find the perfect car without the hassle.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Form & Benefits */}
        <section id="consultation-form" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Info Panel - Benefits */}
              <div className="lg:w-[35%]">
                <div className="bg-[#000000] text-white p-8 rounded-2xl shadow-xl sticky top-28 border border-[#222222]">
                  <SectionHeading label="WHY BOOK?" title="Consultation Benefits" theme="dark" />
                  <ul className="space-y-6 mt-4 text-left">
                    <li className="flex items-start">
                      <CheckCircle className="text-[#eece00] mr-4 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-heading font-bold text-[16px] mb-1 text-white uppercase tracking-[0.02em]">100% Free</h4>
                        <p className="font-body text-[#999999] text-xs leading-relaxed">No charges or hidden fees for the consultation.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-[#eece00] mr-4 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-heading font-bold text-[16px] mb-1 text-white uppercase tracking-[0.02em]">Expert Advice</h4>
                        <p className="font-body text-[#999999] text-xs leading-relaxed">5+ years of automotive experience at your service.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-[#eece00] mr-4 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-heading font-bold text-[16px] mb-1 text-white uppercase tracking-[0.02em]">Personalized</h4>
                        <p className="font-body text-[#999999] text-xs leading-relaxed">Recommendations based specifically on YOUR needs and budget.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-[#eece00] mr-4 shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="font-heading font-bold text-[16px] mb-1 text-white uppercase tracking-[0.02em]">Quick Response</h4>
                        <p className="font-body text-[#999999] text-xs leading-relaxed">We aim to respond to all inquiries within 2 hours.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="lg:w-[65%] bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#e5e5e5] text-left">
                <SectionHeading label="YOUR DETAILS" title="Consultation Details" theme="light" />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input {...register("name")} type="text" className={inputClass} placeholder="Your Name" />
                      {errors.name && <span className="font-body text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number *</label>
                      <input {...register("phone")} type="tel" className={inputClass} placeholder="0300 0000000" />
                      {errors.phone && <span className="font-body text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input {...register("email")} type="email" className={inputClass} placeholder="you@example.com" />
                      {errors.email && <span className="font-body text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                    </div>
                    <div>
                      <label className={labelClass}>Budget (PKR) *</label>
                      <select {...register("budget")} className={inputClass}>
                        <option value="">Select Budget</option>
                        <option value="Under 20L">Under 20 Lakh</option>
                        <option value="20L-40L">20 Lakh – 40 Lakh</option>
                        <option value="40L-70L">40 Lakh – 70 Lakh</option>
                        <option value="70L-1Cr">70 Lakh – 1 Crore</option>
                        <option value="Above 1Cr">Above 1 Crore</option>
                      </select>
                      {errors.budget && <span className="font-body text-red-500 text-xs mt-1 block">{errors.budget.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}>Condition *</label>
                      <select {...register("condition")} className={inputClass}>
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                        <option value="Both">Both</option>
                      </select>
                      {errors.condition && <span className="font-body text-red-500 text-xs mt-1 block">{errors.condition.message}</span>}
                    </div>
                    <div>
                      <label className={labelClass}>Car Type *</label>
                      <select {...register("carType")} className={inputClass}>
                        <option value="">Select Type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Van">Van</option>
                        <option value="Any">Any</option>
                      </select>
                      {errors.carType && <span className="font-body text-red-500 text-xs mt-1 block">{errors.carType.message}</span>}
                    </div>
                    <div>
                      <label className={labelClass}>Fuel Pref *</label>
                      <select {...register("fuel")} className={inputClass}>
                        <option value="">Select Fuel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                        <option value="No Preference">No Preference</option>
                      </select>
                      {errors.fuel && <span className="font-body text-red-500 text-xs mt-1 block">{errors.fuel.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Preferred Brand (Optional)</label>
                      <input {...register("brand")} type="text" className={inputClass} placeholder="e.g. Toyota, Honda..." />
                    </div>
                    <div>
                      <label className={labelClass}>Contact Time *</label>
                      <select {...register("time")} className={inputClass}>
                        <option value="">Select Time</option>
                        <option value="Morning">Morning (9am - 12pm)</option>
                        <option value="Afternoon">Afternoon (12pm - 4pm)</option>
                        <option value="Evening">Evening (4pm - 7pm)</option>
                      </select>
                      {errors.time && <span className="font-body text-red-500 text-xs mt-1 block">{errors.time.message}</span>}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Additional Notes</label>
                    <textarea {...register("notes")} rows={4} className={inputClass} placeholder="Tell us anything else that might help..." />
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="font-heading font-black text-[15px] tracking-[0.04em] uppercase w-full py-4 bg-[#eece00] text-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00] transition-colors border border-transparent hover:border-[#eece00] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Book My Free Consultation"}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
