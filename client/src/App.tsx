import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Services from "@/pages/services";
import ServiceDetail from "@/pages/service-detail";
import EcoCooling from "@/pages/eco-cooling";
import SolutionDetail from "@/pages/solution-detail";
import Partners from "@/pages/partners";
import Documentation from "@/pages/documentation";
import Certificates from "@/pages/certificates";
import Diplomas from "@/pages/diplomas";
import References from "@/pages/references";
import ProjectAgrounija from "@/pages/project-agrounija";
import Blog from "@/pages/blog";
import NewsPost from "@/pages/news-post";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { Preloader } from "@/components/layout/Preloader";
import { ChatWidget } from "@/components/ChatWidget";

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
      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/eco-cooling" component={EcoCooling} />
      <Route path="/eco-cooling/:slug" component={SolutionDetail} />
      <Route path="/partners" component={Partners} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/documentation/certificates" component={Certificates} />
      <Route path="/documentation/diplomas" component={Diplomas} />
      <Route path="/references" component={References} />
      <Route path="/references/agrounija" component={ProjectAgrounija} />
      <Route path="/blog" component={Blog} />
      <Route path="/news/:id" component={NewsPost} />
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
        <ChatWidget />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
