import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

export default function StoriesSection() {
  return (
    <section id="impact" className="bg-muted section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-stories-title">
            Stories of Hope
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-stories-description">
            See how your support transforms lives and creates lasting change in communities around the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Maria, a sponsored child who became a teacher" 
              className="rounded-2xl shadow-lg w-full h-auto"
              data-testid="img-success-story"
            />
          </div>
          <div>
            <div className="bg-primary/10 p-2 rounded-lg inline-block mb-4">
              <Quote className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4" data-testid="text-story-title">
              From Sponsored Child to Teacher
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-story-content">
              "Thanks to my sponsor, I was able to complete my education and become a teacher. Now I'm giving back to my community, 
              teaching children just like me who need hope and opportunity. Child sponsorship doesn't just change one life—it creates ripples of change."
            </p>
            <div className="border-l-4 border-primary pl-6 mb-6">
              <p className="font-semibold text-foreground" data-testid="text-story-author">Maria Santos</p>
              <p className="text-muted-foreground">Former Sponsored Child, Now Elementary Teacher</p>
              <p className="text-sm text-muted-foreground">Philippines</p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              data-testid="button-more-stories"
            >
              Read More Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
