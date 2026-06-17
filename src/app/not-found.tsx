import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="font-heading font-black text-9xl text-[#eece00] tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(238,206,0,0.5)]">
          404
        </h1>
        <div className="w-24 h-2 bg-white mb-8 mx-auto rounded-full"></div>
        <h2 className="font-heading font-extrabold text-[32px] md:text-[40px] text-white mb-4.5">
          Oops! This page doesn't exist.
        </h2>
        <p className="font-body font-normal text-[16px] leading-[1.75] text-[#aaaaaa] mb-12 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button
          href="/"
          variant="primary"
          className="px-10 py-4 text-lg shadow-[0_0_20px_rgba(238,206,0,0.3)] hover:shadow-[0_0_30px_rgba(238,206,0,0.5)]"
        >
          Go Back Home
        </Button>
      </main>
      <Footer />
    </div>
  );
}
