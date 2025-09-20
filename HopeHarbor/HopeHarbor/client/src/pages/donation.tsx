import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DonationModal from "@/components/modals/DonationModal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Droplets, GraduationCap, Shield, Smartphone } from "lucide-react";
import { useState } from "react";

export default function Donation() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const openDonationModal = (program?: string) => {
    setSelectedProgram(program || null);
    setIsDonationModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-donation-title">
              Make a Difference Today
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-donation-description">
              Your donation helps provide essential support to vulnerable children and communities around the world. 
              Every contribution, no matter the size, creates lasting impact.
            </p>
            <Button 
              size="lg" 
              onClick={() => openDonationModal()}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg"
              data-testid="button-donate-general"
            >
              Donate Now
            </Button>
          </div>

          {/* Donation Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Child Sponsorship */}
            <Card className="donation-card shadow-lg">
              <CardContent className="p-8 text-center">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Child Sponsorship</h3>
                <p className="text-muted-foreground mb-6">
                  Sponsor a child for $39/month and transform their future through education, healthcare, and community development.
                </p>
                <div className="text-3xl font-bold text-primary mb-4">$39<span className="text-lg text-muted-foreground">/month</span></div>
                <Button 
                  className="w-full" 
                  onClick={() => openDonationModal("sponsorship")}
                  data-testid="button-sponsor-child"
                >
                  Sponsor a Child
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Relief */}
            <Card className="donation-card shadow-lg">
              <CardContent className="p-8 text-center">
                <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Emergency Relief</h3>
                <p className="text-muted-foreground mb-6">
                  Help provide immediate life-saving assistance to families affected by disasters and emergencies.
                </p>
                <div className="text-3xl font-bold text-accent mb-4">$50<span className="text-lg text-muted-foreground">+</span></div>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90" 
                  onClick={() => openDonationModal("emergency")}
                  data-testid="button-emergency-relief"
                >
                  Support Relief
                </Button>
              </CardContent>
            </Card>

            {/* Clean Water */}
            <Card className="donation-card shadow-lg">
              <CardContent className="p-8 text-center">
                <Droplets className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Clean Water</h3>
                <p className="text-muted-foreground mb-6">
                  Provide access to clean water and sanitation facilities that prevent disease and save lives.
                </p>
                <div className="text-3xl font-bold text-secondary mb-4">$75<span className="text-lg text-muted-foreground">+</span></div>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90" 
                  onClick={() => openDonationModal("water")}
                  data-testid="button-clean-water"
                >
                  Fund Water
                </Button>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="donation-card shadow-lg">
              <CardContent className="p-8 text-center">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Education</h3>
                <p className="text-muted-foreground mb-6">
                  Give children the tools they need to break free from poverty through quality education programs.
                </p>
                <div className="text-3xl font-bold text-primary mb-4">$100<span className="text-lg text-muted-foreground">+</span></div>
                <Button 
                  className="w-full" 
                  onClick={() => openDonationModal("education")}
                  data-testid="button-education"
                >
                  Support Education
                </Button>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="donation-card shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Healthcare</h3>
                <p className="text-muted-foreground mb-6">
                  Ensure children and families have access to essential medical services and health education.
                </p>
                <div className="text-3xl font-bold text-accent mb-4">$120<span className="text-lg text-muted-foreground">+</span></div>
                <Button 
                  className="w-full bg-accent hover:bg-accent/90" 
                  onClick={() => openDonationModal("healthcare")}
                  data-testid="button-healthcare"
                >
                  Support Health
                </Button>
              </CardContent>
            </Card>

            {/* Custom Amount */}
            <Card className="donation-card shadow-lg border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Choose Your Impact</h3>
                <p className="text-muted-foreground mb-6">
                  Make a donation of any amount to support our comprehensive programs where needed most.
                </p>
                <div className="text-3xl font-bold text-primary mb-4">Custom</div>
                <Button 
                  className="w-full" 
                  onClick={() => openDonationModal()}
                  data-testid="button-custom-donation"
                >
                  Choose Amount
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <Card className="bg-muted mb-16">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">Secure Payment Methods</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary font-bold">💳</div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Credit/Debit Card</h3>
                  <p className="text-muted-foreground text-sm">
                    Secure payments powered by Stripe. We accept Visa, Mastercard, American Express, and more.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600 font-bold text-sm">PayPal</div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">PayPal</h3>
                  <p className="text-muted-foreground text-sm">
                    Fast and secure payments using your PayPal account or PayPal guest checkout.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">GCash</h3>
                  <p className="text-muted-foreground text-sm">
                    Mobile payment option for donors in the Philippines. Manual verification process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Stories */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">Your Donation Creates Real Impact</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-children-helped">25,000+</div>
                  <div className="text-muted-foreground">Children Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2" data-testid="text-communities-served">150</div>
                  <div className="text-muted-foreground">Communities Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2" data-testid="text-projects-completed">500+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />

      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        selectedProgram={selectedProgram}
      />
    </div>
  );
}
