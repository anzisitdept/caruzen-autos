import Link from "next/link";
import Button from "@/components/Button";

export default function FinalCTA() {
  return (
    <section className="bg-[#eece00] py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-heading font-bold text-[11px] uppercase tracking-[0.22em] text-[#000000] mb-3.5 opacity-60">
          Get Started Today
        </p>
        <h2 className="font-heading font-extrabold text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.01em] text-[#000000] mb-4.5">
          Ready to Find Your Next Car?
        </h2>
        <p className="font-body font-normal text-[16px] leading-[1.75] text-[#000000] mb-10 opacity-75">
          Browse our full inventory or let our team help you find the perfect match.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* On yellow bg — use dark button */}
          <Button variant="dark" size="lg" href="/cars">Browse All Cars</Button>
          <Link href="/consultation"
             className="font-heading font-black text-[16px] tracking-[0.04em] uppercase inline-flex items-center px-8 py-4
                        border-2 border-[#000000] rounded-md hover:bg-[#000000] hover:text-[#eece00]
                        transition-all duration-200 cursor-pointer">
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
