import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import StatsSection from "@/components/sections/StatsSection";
import TrainersSection from "@/components/sections/TrainersSection";
import EquipmentLabSection from "@/components/sections/EquipmentLabSection";
import MembershipSection from "@/components/sections/MembershipSection";
import GallerySection from "@/components/sections/GallerySection";
import ProgressSection from "@/components/sections/ProgressSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import WorkoutSection from "@/components/sections/WorkoutSection";
import ContactSection from "@/components/sections/ContactSection";
import FinalCtaSection from "@/components/sections/FinalCtaSection";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-[#F8FAFC] selection:bg-[#FF5E14] selection:text-[#0A0A0C] relative">
      <CustomCursor />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <StatsSection />
        <TrainersSection />
        <EquipmentLabSection />
        <MembershipSection />
        <GallerySection />
        <ProgressSection />
        <CalculatorSection />
        <WorkoutSection />
        <FinalCtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
