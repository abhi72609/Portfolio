
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../components/home/HeroSection";
import TemplateSection from "../components/home/TemplateSection";
import FeaturesSection from "../components/home/FeaturesSection";
import About from "../components/home/About";
import CTASection from "../components/home/CTASection";

function HomePage() {
  return (
    <div className="min-h-screen bg-[#050605] text-[#F2F4F2]">
      <Navbar />

      <main>
        <HeroSection />
        <TemplateSection />
        <FeaturesSection />
        <About />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
