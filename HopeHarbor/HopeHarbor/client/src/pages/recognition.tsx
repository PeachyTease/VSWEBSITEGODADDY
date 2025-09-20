import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Star, Medal, Users, Globe } from "lucide-react";

export default function Recognition() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-recognition-title">
              Awards and Recognition
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-recognition-description">
              Our commitment to transparency, impact, and innovation has been recognized by leading organizations worldwide. These awards reflect our dedication to creating lasting change in the communities we serve.
            </p>
          </div>

          {/* Major Awards */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Award 1 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Excellence in Humanitarian Impact</h3>
                    <p className="text-muted-foreground">Global Humanitarian Awards 2024</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Recognized for our outstanding work in emergency response and sustainable development programs that have transformed over 8,500 communities worldwide.
                </p>
              </CardContent>
            </Card>

            {/* Award 2 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Star className="w-12 h-12 text-blue-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Top-Rated Charity</h3>
                    <p className="text-muted-foreground">Charity Navigator 2024</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Awarded the highest 4-star rating for our commitment to accountability, transparency, and efficient use of donor funds.
                </p>
              </CardContent>
            </Card>

            {/* Award 3 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Award className="w-12 h-12 text-green-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Innovation in Child Protection</h3>
                    <p className="text-muted-foreground">UN Children's Fund 2023</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Honored for developing innovative approaches to child protection and education that have reached over 125,000 children globally.
                </p>
              </CardContent>
            </Card>

            {/* Award 4 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Medal className="w-12 h-12 text-purple-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Sustainable Development Excellence</h3>
                    <p className="text-muted-foreground">International Development Council 2023</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Recognized for our comprehensive approach to sustainable development that addresses education, healthcare, and economic empowerment.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Certifications and Ratings */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Certifications and Ratings</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">4★</div>
                  <h3 className="font-semibold text-foreground mb-2">Charity Navigator</h3>
                  <p className="text-muted-foreground text-sm">Highest rating for accountability and transparency</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-secondary mb-2">A+</div>
                  <h3 className="font-semibold text-foreground mb-2">Better Business Bureau</h3>
                  <p className="text-muted-foreground text-sm">Accredited charity with highest trust rating</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-lg">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-accent mb-2">96%</div>
                  <h3 className="font-semibold text-foreground mb-2">Program Efficiency</h3>
                  <p className="text-muted-foreground text-sm">Funds directed to programs and services</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partnerships */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Strategic Partnerships</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <Users className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-4">United Nations Partnership</h3>
                  <p className="text-muted-foreground">
                    Official consultative status with the UN Economic and Social Council, collaborating on global development initiatives and emergency response efforts.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <Globe className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-4">Global Alliance Member</h3>
                  <p className="text-muted-foreground">
                    Active member of the Global Partnership for Sustainable Development, working with 200+ organizations to achieve the UN Sustainable Development Goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recognition Timeline */}
          <div className="bg-primary/5 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Recognition Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2024</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Excellence in Humanitarian Impact Award</h4>
                  <p className="text-muted-foreground">Global Humanitarian Awards</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2023</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Innovation in Child Protection</h4>
                  <p className="text-muted-foreground">UN Children's Fund</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2022</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Top 10 Most Trusted Charities</h4>
                  <p className="text-muted-foreground">Forbes Magazine</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2021</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Outstanding Emergency Response</h4>
                  <p className="text-muted-foreground">International Rescue Committee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}