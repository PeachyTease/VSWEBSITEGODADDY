import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function Programs() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-programs-title">
              Our Programs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-programs-description">
              Explore our comprehensive programs and initiatives that are making a real difference in communities worldwide.
            </p>
          </div>

          {/* Program Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Education Programs */}
            <Card className="shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Education programs" 
                className="w-full h-48 object-cover"
                data-testid="img-education-programs"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Education Programs</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive educational initiatives designed to improve literacy rates and provide quality learning opportunities.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Digital Learning Centers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Teacher Training Programs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Scholarship Initiatives</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Adult Literacy Programs</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2" data-testid="text-education-impact">
                    Impact: 15,000+ students reached
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Programs */}
            <Card className="shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Healthcare programs" 
                className="w-full h-48 object-cover"
                data-testid="img-healthcare-programs"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Healthcare Access</h3>
                <p className="text-muted-foreground mb-4">
                  Mobile clinics and health education programs bringing essential medical services to underserved areas.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Mobile Medical Units</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Vaccination Campaigns</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Maternal Health Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Mental Health Awareness</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2" data-testid="text-healthcare-impact">
                    Impact: 25,000+ patients served
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Infrastructure Programs */}
            <Card className="shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Infrastructure programs" 
                className="w-full h-48 object-cover"
                data-testid="img-infrastructure-programs"
              />
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Infrastructure</h3>
                <p className="text-muted-foreground mb-4">
                  Building sustainable infrastructure solutions that improve quality of life and economic opportunities.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Water Wells & Sanitation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Solar Power Systems</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Community Centers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3" />
                    <span className="text-sm">Road Improvements</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2" data-testid="text-infrastructure-impact">
                    Impact: 120+ projects completed
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card className="bg-muted">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-foreground mb-8">
                Recent Project Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Solar School Initiative - Kenya
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Installed solar power systems in 15 rural schools, providing reliable electricity for 3,000+ students.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Completed: March 2024</span>
                      <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs font-medium">
                        Completed
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Clean Water Project - Bangladesh
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Built 25 water wells serving 8,000 community members with access to clean drinking water.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Completed: February 2024</span>
                      <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-xs font-medium">
                        Completed
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
