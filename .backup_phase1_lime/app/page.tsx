import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TrainersSection from "@/components/sections/TrainersSection";
import GallerySection from "@/components/sections/GallerySection";
import EquipmentLabSection from "@/components/sections/EquipmentLabSection";
import MembershipSection from "@/components/sections/MembershipSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import WorkoutSection from "@/components/sections/WorkoutSection";
import ProgressSection from "@/components/sections/ProgressSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white selection:bg-[#D7FF00] selection:text-[#080808]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <TrainersSection />
        <GallerySection />
        <EquipmentLabSection />
        <MembershipSection />
        <CalculatorSection />
        <WorkoutSection />
        <ProgressSection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}
