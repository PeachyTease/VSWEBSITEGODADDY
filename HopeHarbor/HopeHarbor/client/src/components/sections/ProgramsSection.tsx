import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldAlert, Users, HeartPulse, Droplets, BookOpen } from "lucide-react";
import { useState } from "react";
import DonationModal from "@/components/modals/DonationModal";

const programs = [
  {
    title: "Child Sponsorship",
    description: "Sponsor a child and transform their future through education, healthcare, and community development programs.",
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: GraduationCap,
    color: "primary",
    buttonText: "Sponsor Now",
    program: "sponsorship",
    testId: "card-sponsorship"
  },
  {
    title: "Emergency Relief",
    description: "Rapid response to natural disasters, conflicts, and emergencies providing immediate life-saving assistance.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: ShieldAlert,
    color: "accent",
    buttonText: "Support Relief",
    program: "emergency",
    testId: "card-emergency"
  },
  {
    title: "Community Development",
    description: "Long-term sustainable development programs that empower communities to break the cycle of poverty.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: Users,
    color: "secondary",
    buttonText: "Learn More",
    program: "community",
    testId: "card-community"
  },
  {
    title: "Health & Nutrition",
    description: "Comprehensive healthcare programs ensuring children and families have access to essential medical services.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: HeartPulse,
    color: "accent",
    buttonText: "Support Health",
    program: "healthcare",
    testId: "card-healthcare"
  },
  {
    title: "Water & Sanitation",
    description: "Providing access to clean water, sanitation facilities, and hygiene education to prevent disease.",
    image: "https://images.unsplash.com/photo-1541844053589-346841d0b34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: Droplets,
    color: "secondary",
    buttonText: "Fund Water",
    program: "water",
    testId: "card-water"
  },
  {
    title: "Education Programs",
    description: "Quality education programs that give children the tools they need to break free from poverty.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    icon: BookOpen,
    color: "primary",
    buttonText: "Support Education",
    program: "education",
    testId: "card-education"
  },
];

export default function ProgramsSection() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleProgramClick = (program: string) => {
    setSelectedProgram(program);
    setIsDonationModalOpen(true);
  };

  return (
    <>
      <section id="programs" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-programs-title">
              Our Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-programs-description">
              We work across multiple sectors to address the root causes of poverty and create lasting change in communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="donation-card bg-card border border-border rounded-xl shadow-sm overflow-hidden"
                data-testid={program.testId}
              >
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                  data-testid={`img-${program.program}`}
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <program.icon className={`w-6 h-6 text-${program.color} mr-3`} />
                    <h3 className="text-xl font-semibold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {program.description}
                  </p>
                  <Button
                    onClick={() => handleProgramClick(program.program)}
                    className={`w-full bg-${program.color} hover:bg-${program.color}/90 text-white transition-colors`}
                    data-testid={`button-${program.program}`}
                  >
                    {program.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        selectedProgram={selectedProgram}
      />
    </>
  );
}
