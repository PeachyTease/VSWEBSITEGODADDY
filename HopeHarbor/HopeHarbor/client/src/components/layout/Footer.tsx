import { Link } from "wouter";
import { HeartHandshake, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Hands With Care</h3>
                <p className="text-sm text-white/70">Empowering Children & Communities</p>
              </div>
            </div>
            <p className="text-white/70 mb-6" data-testid="text-footer-description">
              A nonprofit organization dedicated to transforming the lives of vulnerable children and communities 
              through sustainable development programs and emergency relief efforts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-youtube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/70 hover:text-white transition-colors" data-testid="link-footer-programs">
                  Our Programs
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-impact-stories">
                  Impact Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-annual-reports">
                  Annual Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-careers">
                  Careers
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get Involved</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-sponsor-child">
                  Sponsor a Child
                </a>
              </li>
              <li>
                <Link href="/donate" className="text-white/70 hover:text-white transition-colors" data-testid="link-footer-donate">
                  Make a Donation
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-volunteer">
                  Volunteer
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-corporate-partnership">
                  Corporate Partnership
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors" data-testid="link-fundraise">
                  Fundraise
                </a>
              </li>
              <li>
                <Link href="/admin-secret-portal" className="text-white/70 hover:text-white transition-colors" data-testid="link-admin-portal">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for impact stories and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-primary"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm" data-testid="text-copyright">
              © 2025 Hands With Care. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="link-privacy">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="link-terms">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="link-cookies">
                Cookie Policy
              </a>
              <Link href="/owner-secret-portal" className="text-white/70 hover:text-white text-sm transition-colors" data-testid="link-owner-portal">
                Owner Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
