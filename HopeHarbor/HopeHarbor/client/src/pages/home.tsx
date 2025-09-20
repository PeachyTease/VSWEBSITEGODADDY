import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ImpactStats from "@/components/sections/ImpactStats";
import ProgramsSection from "@/components/sections/ProgramsSection";
import StoriesSection from "@/components/sections/StoriesSection";
import { AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="emergency-banner text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium" data-testid="text-emergency-alert">
              URGENT: Metro Manila Flood Relief - Families need immediate assistance
            </span>
          </div>
          <button 
            className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-md text-sm font-medium transition-colors"
            data-testid="button-emergency-donate"
          >
            Donate Now
          </button>
        </div>
      </div>

      <Header />
      <HeroSection />
      <ImpactStats />
      <ProgramsSection />
      <StoriesSection />
      <Footer />
    </div>
  );
}
