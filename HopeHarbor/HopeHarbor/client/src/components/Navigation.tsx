import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout, isAuthenticated, isAdmin, isOwner } = useAuth();

  const publicNavItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/work", label: "Our Work" },
    { href: "/stories", label: "Stories" },
    { href: "/recognition", label: "Recognition" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact Us" },
  ];

  const adminNavItems = [
    { href: "/admin-dashboard", label: "Dashboard" },
  ];

  const ownerNavItems = [
    { href: "/owner-dashboard", label: "Dashboard" },
  ];

  const getNavItems = () => {
    if (isOwner) return ownerNavItems;
    if (isAdmin) return adminNavItems;
    return publicNavItems;
  };

  const navItems = getNavItems();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
   <nav className="bg-white/50 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" onClick={handleLinkClick}>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">Hands With Care</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                  location === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Info & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user?.role === "admin" ? "Admin" : user?.role === "owner" ? "Owner" : "User"}: {user?.username}
                </span>
                <Button
                  onClick={logout}
                  variant="destructive"
                  size="sm"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`block px-3 py-2 text-base font-medium transition-colors ${
                        location === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {isAuthenticated && (
                    <div className="pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground mb-2">
                        {user?.role === "admin" ? "Admin" : user?.role === "owner" ? "Owner" : "User"}: {user?.username}
                      </div>
                      <Button
                        onClick={() => {
                          logout();
                          handleLinkClick();
                        }}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}