"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { MapPin, Phone, Mail, Clock, MessageSquare, Camera, Video, Phone as WhatsApp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import carsData from "@/data/cars.json";
import CarCard from "@/components/CarCard";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success("✅ Message sent! We'll get back to you within 24 hours.");
    reset();
  };

  const inputClass = `font-body w-full border border-[#dddddd] rounded-md px-3 py-3 text-sm text-[#000000] focus:border-[#eece00] focus:ring-2 focus:ring-[#eece00]/25 outline-none transition-all duration-200 bg-white`;
  const labelClass = `font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#333333] mb-2 block`;

  // Get cars listed on the home page
  const featuredCars = carsData.filter((car) => car.featured).slice(0, 4);
  const newCars = carsData.filter((car) => car.condition === "new").slice(0, 3);
  const usedCars = carsData.filter((car) => car.condition === "used").slice(0, 3);
  
  const allHomeCarsMap = new Map();
  [...featuredCars, ...newCars, ...usedCars].forEach(car => {
    allHomeCarsMap.set(car.id, car);
  });
  const allHomeCars = Array.from(allHomeCarsMap.values());

  return (
    <>
      <Header />
      <main className="pt-[80px] pb-20 bg-[#f9f9f9] min-h-screen">
        
        {/* NEW CONTACT HERO */}
        <section className="bg-[#111111] relative overflow-hidden mb-16">

          {/* YELLOW TOP BORDER */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#eece00] z-10" />

          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* ── LEFT: HEADLINE + CTA ── */}
              <div className="py-16 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-[#1e1e1e]">

                {/* EYEBROW */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#eece00] flex-shrink-0" />
                  <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#eece00]">
                    Support
                  </p>
                </div>

                {/* H1 */}
                <h1 className="font-heading font-black text-[54px] md:text-[60px]
                               leading-[1.0] tracking-[-0.01em] text-[#ffffff] mb-5">
                  Let's Get You<br />
                  Behind the <span className="text-[#eece00]">Wheel.</span>
                </h1>

                {/* SUBTEXT */}
                <p className="font-body text-[15px] text-[#777777] leading-[1.75]
                              max-w-[380px] mb-8">
                  We're here to help you find your perfect car. Our team responds
                  within 2 hours — no waiting, no runaround.
                </p>

                {/* CTA BUTTONS */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact-form"
                    className="bg-[#eece00] text-[#000000] font-heading font-black
                               text-[13px] uppercase tracking-[0.05em]
                               px-7 py-3 rounded-[6px]
                               hover:bg-[#ffffff] hover:text-[#000000]
                               transition-all duration-200"
                  >
                    Send a Message
                  </a>
                  <a
                    href="tel:03473931287"
                    className="bg-transparent text-[#ffffff] font-heading font-bold
                               text-[13px] uppercase tracking-[0.05em]
                               px-7 py-3 rounded-[6px]
                               border border-[#333333]
                               hover:border-[#eece00] hover:text-[#eece00]
                               transition-all duration-200"
                  >
                    Call Now
                  </a>
                </div>

              </div>

              {/* ── RIGHT: CONTACT INFO CARDS ── */}
              <div className="py-16 pl-0 md:pl-12 flex flex-col justify-center gap-4">

                {[
                  {
                    icon: MapPin,
                    label: 'Showroom',
                    value: 'Sukkur, Pakistan',
                  },
                  {
                    icon: Phone,
                    label: 'Call Us',
                    value: '0347 3931287',
                  },
                  {
                    icon: Clock,
                    label: 'Working Hours',
                    value: 'Mon–Sat, 9AM–7PM',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                  <div
                    key={item.label}
                    className="bg-[#1a1a1a] border border-[#222222] rounded-[10px]
                               px-5 py-4 flex items-center gap-4
                               hover:border-[#eece00] transition-all duration-200"
                  >
                    {/* YELLOW ICON SQUARE */}
                    <div className="w-[40px] h-[40px] bg-[#eece00] rounded-[8px]
                                    flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#000000]" aria-hidden="true" />
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="font-body font-medium text-[10px] text-[#555555]
                                    uppercase tracking-[0.1em] mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-heading font-bold text-[17px] text-[#ffffff]
                                    leading-none">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )})}

                {/* WHATSAPP CTA CARD */}
                <a
                  href="https://wa.me/923473931287"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] border border-[#222222] rounded-[10px]
                             px-5 py-4 flex items-center gap-4
                             hover:border-[#25D366] transition-all duration-200 group"
                >
                  <div className="w-[40px] h-[40px] bg-[#25D366] rounded-[8px]
                                  flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp size={20} className="text-[#ffffff]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-[10px] text-[#555555]
                                  uppercase tracking-[0.1em] mb-0.5">
                      Prefer WhatsApp?
                    </p>
                    <p className="font-heading font-bold text-[17px] text-[#eece00]
                                  leading-none group-hover:text-[#ffffff] transition-colors">
                      Chat With Us →
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </div>

        </section>

        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div id="contact-form" className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden p-10 text-left">
              <SectionHeading label="INQUIRY" title="Send Us a Message" theme="light" />
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input {...register("name")} type="text" className={inputClass} placeholder="Enter your full name" />
                    {errors.name && <span className="font-body text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input {...register("phone")} type="tel" className={inputClass} placeholder="0300 0000000" />
                    {errors.phone && <span className="font-body text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input {...register("email")} type="email" className={inputClass} placeholder="abc@gmail.com" />
                    {errors.email && <span className="font-body text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                  </div>
                  <div>
                    <label className={labelClass}>Subject</label>
                    <select {...register("subject")} className={inputClass}>
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Buy a Car">Buy a Car</option>
                      <option value="Sell a Car">Sell a Car</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <span className="font-body text-red-500 text-xs mt-1 block">{errors.subject.message}</span>}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Message</label>
                  <textarea {...register("message")} rows={5} className={inputClass} placeholder="How can we help you?" />
                  {errors.message && <span className="font-body text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="font-heading font-black text-[15px] tracking-[0.04em] uppercase w-full py-4 bg-[#eece00] text-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00] transition-colors border border-transparent hover:border-[#eece00] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="mt-12 w-full h-[400px] rounded-2xl overflow-hidden shadow-sm border border-[#e5e5e5]">
            <iframe
              title="Caruzen Motors Location"
              src="https://maps.google.com/maps?q=Shop%20%23%2010,11,%20Arif%20Builder%20Sector%205%20Sukkur%20Town%20Ship%20Sukkur%20,%20Sukkur,%20Pakistan,%2065200&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Cars Display Section */}
          <div className="mt-20">
            <div className="text-center flex flex-col items-center mb-10">
              <SectionHeading label="OUR COLLECTION" title="Vehicles Available" theme="light" align="center" />
              <p className="font-body text-lg text-[#666666] max-w-xl mt-4">Browse some of the vehicles currently featured on our home page.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allHomeCars.map(car => (
                <CarCard key={car.id} car={car} theme="light" />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button href="/cars" variant="dark">View All Cars</Button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
