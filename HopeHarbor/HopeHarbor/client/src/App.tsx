import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Work from "@/pages/work";
import Stories from "@/pages/stories";
import Recognition from "@/pages/recognition";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import AdminDashboard from "@/pages/admin-dashboard";
import OwnerDashboard from "@/pages/owner-dashboard";
import Donation from "@/pages/donation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/work" component={Work} />
      <Route path="/stories" component={Stories} />
      <Route path="/recognition" component={Recognition} />
      <Route path="/donate" component={Donation} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/admin-secret-portal" component={AdminDashboard} />
      <Route path="/owner-dashboard" component={OwnerDashboard} />
      <Route path="/owner-secret-portal" component={OwnerDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
