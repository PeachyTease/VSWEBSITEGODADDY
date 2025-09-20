import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, GraduationCap, Home, Droplets, Building } from "lucide-react";

export default function Work() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-work-title">
              Our Work Around the World
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-work-description">
              Through sustainable development programs and emergency relief efforts, we work alongside communities to create lasting change and build hope for the future.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Child Sponsorship */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Child Sponsorship</h3>
                <p className="text-muted-foreground mb-4">
                  Providing education, healthcare, and nurturing to help children reach their full potential.
                </p>
                <div className="text-sm text-primary font-semibold">
                  Over 45,000 children sponsored worldwide
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <GraduationCap className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Education</h3>
                <p className="text-muted-foreground mb-4">
                  Building schools, training teachers, and providing educational resources to transform communities.
                </p>
                <div className="text-sm text-secondary font-semibold">
                  1,200+ schools supported
                </div>
              </CardContent>
            </Card>

            {/* Clean Water */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Droplets className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Clean Water</h3>
                <p className="text-muted-foreground mb-4">
                  Drilling wells, building water systems, and teaching hygiene practices for healthier communities.
                </p>
                <div className="text-sm text-accent font-semibold">
                  850+ water projects completed
                </div>
              </CardContent>
            </Card>

            {/* Healthcare */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Heart className="w-12 h-12 text-destructive mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Healthcare</h3>
                <p className="text-muted-foreground mb-4">
                  Mobile clinics, medical training, and health education to ensure access to quality healthcare.
                </p>
                <div className="text-sm text-destructive font-semibold">
                  2.1M+ people reached with healthcare
                </div>
              </CardContent>
            </Card>

            {/* Emergency Relief */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Home className="w-12 h-12 text-orange-500 mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Emergency Relief</h3>
                <p className="text-muted-foreground mb-4">
                  Rapid response to natural disasters and conflicts, providing immediate aid and long-term recovery support.
                </p>
                <div className="text-sm text-orange-500 font-semibold">
                  500+ emergency responses
                </div>
              </CardContent>
            </Card>

            {/* Community Development */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <Building className="w-12 h-12 text-teal-500 mb-6" />
                <h3 className="text-xl font-bold text-foreground mb-4">Community Development</h3>
                <p className="text-muted-foreground mb-4">
                  Economic empowerment, infrastructure development, and capacity building for sustainable growth.
                </p>
                <div className="text-sm text-teal-500 font-semibold">
                  3,000+ communities transformed
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Global Impact */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Global Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2" data-testid="text-countries-count">42</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2" data-testid="text-communities-count">8,500</div>
                <div className="text-muted-foreground">Communities</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2" data-testid="text-beneficiaries-count">12M+</div>
                <div className="text-muted-foreground">Beneficiaries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-destructive mb-2" data-testid="text-staff-count">65,000</div>
                <div className="text-muted-foreground">Staff & Volunteers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}