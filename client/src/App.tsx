import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import EcoCooling from "@/pages/eco-cooling";
import Partners from "@/pages/partners";
import Documentation from "@/pages/documentation";
import References from "@/pages/references";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Preloader } from "@/components/layout/Preloader";

function NoiseOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay overflow-hidden">
      <div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-repeat animate-grain" 
        style={{ backgroundImage: "url('/assets/noise.svg')" }} 
      />
    </div>
  );
}

function Router() {
  useSmoothScroll();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/services" component={Services} />
      <Route path="/eco-cooling" component={EcoCooling} />
      <Route path="/partners" component={Partners} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/references" component={References} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Preloader />
        <NoiseOverlay />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
