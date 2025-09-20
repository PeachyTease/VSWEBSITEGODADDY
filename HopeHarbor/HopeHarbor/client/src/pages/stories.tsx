import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Stories() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-stories-title">
              Stories of Hope and Transformation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-stories-description">
              Real stories from the communities we serve, showcasing the incredible resilience and hope that emerges when people are given the tools to create lasting change.
            </p>
          </div>

          {/* Featured Stories */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Story 1 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Maria's Journey to Education</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Thanks to the sponsorship program, I was able to complete my education and become the first person in my family to attend university. Now I'm a teacher in my community, helping other children achieve their dreams just like mine came true."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">M</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Maria Santos</div>
                    <div className="text-sm text-muted-foreground">Philippines • Sponsored Child Graduate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story 2 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Clean Water Changes Everything</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Before the well was built, I walked 6 hours every day to fetch water for my family. Now my daughters can go to school instead of walking for water. Our entire village has been transformed."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold text-lg">A</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Amara Kone</div>
                    <div className="text-sm text-muted-foreground">Mali • Community Leader</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story 3 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">From Refugee to Entrepreneur</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "The microfinance program gave me the chance to start my own business when we fled to Jordan. Three years later, I employ 15 people from my community and can provide for my children's education."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">O</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Omar Al-Hassan</div>
                    <div className="text-sm text-muted-foreground">Jordan • Small Business Owner</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story 4 */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-teal-500 mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Healing After Disaster</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "After the earthquake destroyed our village, we thought everything was lost. But the emergency response team arrived quickly, and now we have a stronger, more resilient community than before."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-bold text-lg">C</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Carlos Mendez</div>
                    <div className="text-sm text-muted-foreground">Guatemala • Village Elder</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Statistics */}
          <div className="bg-primary/5 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">Stories by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2" data-testid="text-stories-children">125,000+</div>
                <div className="text-muted-foreground">Children's Lives Changed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-stories-communities">8,500+</div>
                <div className="text-muted-foreground">Communities Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2" data-testid="text-stories-families">450,000+</div>
                <div className="text-muted-foreground">Families Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-500 mb-2" data-testid="text-stories-countries">42</div>
                <div className="text-muted-foreground">Countries Reached</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Be Part of the Next Story</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every donation, sponsorship, and act of support helps write a new story of hope and transformation.
            </p>
            <div className="space-x-4">
              <a 
                href="/donate" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="button-stories-donate"
              >
                Donate Now
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                data-testid="button-stories-contact"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}