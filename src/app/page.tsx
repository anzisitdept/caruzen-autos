import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import AdvancedSearchBar from "@/sections/AdvancedSearchBar";
import FeaturedVehicles from "@/sections/FeaturedVehicles";
import BrowseByBrand from "@/sections/BrowseByBrand";
import NewCarsCollection from "@/sections/NewCarsCollection";
import UsedCarsCollection from "@/sections/UsedCarsCollection";
import WhyChooseUs from "@/sections/WhyChooseUs";
import Testimonials from "@/sections/Testimonials";
import FinalCTA from "@/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/*<AdvancedSearchBar />*/}
        <FeaturedVehicles />
        <BrowseByBrand />
        <NewCarsCollection />
        <UsedCarsCollection />
        <WhyChooseUs />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
