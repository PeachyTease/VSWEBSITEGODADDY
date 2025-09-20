import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import DonationModal from "@/components/modals/DonationModal";

export default function HeroSection() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);

  // Animate counter
  useEffect(() => {
    const target = 15000;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setChildrenCount(target);
        clearInterval(timer);
      } else {
        setChildrenCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  const openSponsorshipModal = () => {
    setIsDonationModalOpen(true);
  };

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  return (
    <>
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
                Join the movement. Help children rewrite their stories.
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="text-hero-description">
                Every child deserves a chance at a better future. Your sponsorship provides clean water, education, 
                healthcare, and hope to vulnerable children and their communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={openSponsorshipModal}
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  data-testid="button-sponsor-child"
                >
                  Sponsor a Child Today
                </Button>
                <Button
                  onClick={openDonationModal}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  data-testid="button-make-donation"
                >
                  Make a Donation
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
                alt="Children smiling and learning together" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-hero"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-foreground p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-primary stats-counter" data-testid="text-children-sponsored">
                  {childrenCount.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Children Sponsored</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        selectedProgram="sponsorship"
      />
    </>
  );
}
