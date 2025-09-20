import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, PhoneCall } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = insertContactMessageSchema.extend({
  inquiryType: z.enum(["sponsorship", "donation", "volunteer", "partnership", "general"]),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subscribeUpdates: false,
    }
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will respond soon.",
      });
      reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-contact-description">
              Have questions about our programs or want to learn more about how you can help? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      data-testid="input-first-name"
                      {...register("firstName")} 
                      className={errors.firstName ? "border-destructive" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName"
                      data-testid="input-last-name"
                      {...register("lastName")} 
                      className={errors.lastName ? "border-destructive" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    data-testid="input-email"
                    {...register("email")} 
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    data-testid="input-subject"
                    {...register("subject")} 
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select onValueChange={(value) => setValue("inquiryType", value as any)}>
                    <SelectTrigger data-testid="select-inquiry-type">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sponsorship">Child Sponsorship</SelectItem>
                      <SelectItem value="donation">Donations</SelectItem>
                      <SelectItem value="volunteer">Volunteering</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="general">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.inquiryType && (
                    <p className="text-sm text-destructive mt-1">{errors.inquiryType.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={4}
                    data-testid="textarea-message"
                    {...register("message")} 
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <input 
                    type="checkbox" 
                    id="subscribeUpdates"
                    data-testid="checkbox-subscribe"
                    {...register("subscribeUpdates")}
                    className="rounded border-border"
                  />
                  <Label htmlFor="subscribeUpdates" className="text-sm text-muted-foreground">
                    Subscribe to updates about our programs and impact
                  </Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Address</h4>
                        <p className="text-muted-foreground">
                          123 Hope Street, Makati City<br />Philippines 1200
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Phone</h4>
                        <p className="text-muted-foreground">+63 2 8123 4567</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Email</h4>
                        <p className="text-muted-foreground">info@handswithcare.org</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Office Hours</h4>
                        <p className="text-muted-foreground">
                          Monday - Friday: 8:00 AM - 5:00 PM<br />
                          Saturday: 9:00 AM - 1:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Emergency Response</h3>
                  <p className="text-muted-foreground mb-4">
                    For urgent humanitarian needs or emergency response coordination, please contact our 24/7 emergency line:
                  </p>
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="w-5 h-5 text-accent" />
                    <span className="font-semibold text-accent" data-testid="text-emergency-phone">
                      +63 917 123 4567
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
