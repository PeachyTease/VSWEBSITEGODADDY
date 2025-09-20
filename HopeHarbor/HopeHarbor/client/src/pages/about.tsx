import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Target, Award } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">
              About Hands With Care
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">
              For over 30 years, we have been committed to empowering children and communities through sustainable development programs and emergency relief efforts.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To empower the world's most vulnerable children and communities through sustainable development programs that address the root causes of poverty and create lasting change for generations to come.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-secondary mr-4" />
                  <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A world where every child has the opportunity to experience life in all its fullness - a life of hope, joy, and purpose, free from poverty, injustice, and oppression.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="text-center shadow-sm">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Community-Centered</h3>
                  <p className="text-sm text-muted-foreground">
                    We work hand-in-hand with communities to identify and address their unique needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-sm">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Compassionate</h3>
                  <p className="text-sm text-muted-foreground">
                    Our work is driven by love and deep care for those we serve.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-sm">
                <CardContent className="p-6">
                  <Target className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Results-Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    We measure our success by the lasting impact we create in communities.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center shadow-sm">
                <CardContent className="p-6">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Accountable</h3>
                  <p className="text-sm text-muted-foreground">
                    We are transparent stewards of the resources entrusted to us.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Approach */}
          <Card className="bg-muted mb-16">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Approach</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Listen & Learn</h3>
                  <p className="text-muted-foreground">
                    We start by listening to communities to understand their challenges and strengths.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-secondary">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Partner & Plan</h3>
                  <p className="text-muted-foreground">
                    We collaborate with local partners to develop sustainable, community-led solutions.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-accent">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Implement & Impact</h3>
                  <p className="text-muted-foreground">
                    We execute programs with measurable outcomes and lasting positive change.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leadership Team */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Leadership</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-sm">
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                    alt="CEO portrait" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-foreground">Dr. Michael Santos</h3>
                  <p className="text-muted-foreground text-sm">Chief Executive Officer</p>
                  <p className="text-muted-foreground text-xs mt-2">
                    20+ years in international development and humanitarian work
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b494?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                    alt="Program Director portrait" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-foreground">Maria Rodriguez</h3>
                  <p className="text-muted-foreground text-sm">Program Director</p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Expert in child protection and community development programs
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                    alt="Operations Director portrait" 
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-foreground">James Chen</h3>
                  <p className="text-muted-foreground text-sm">Operations Director</p>
                  <p className="text-muted-foreground text-xs mt-2">
                    Specializes in emergency response and disaster relief coordination
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Global Reach */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Global Reach</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-countries-count">12</div>
                  <div className="text-muted-foreground">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2" data-testid="text-communities-count">150</div>
                  <div className="text-muted-foreground">Communities</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2" data-testid="text-partners-count">75</div>
                  <div className="text-muted-foreground">Local Partners</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-years-count">30</div>
                  <div className="text-muted-foreground">Years</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
