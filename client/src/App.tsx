import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const Services = lazy(() => import("@/pages/services"));
const ServiceDetail = lazy(() => import("@/pages/service-detail"));
const EcoCooling = lazy(() => import("@/pages/eco-cooling"));
const SolutionDetail = lazy(() => import("@/pages/solution-detail"));
const Partners = lazy(() => import("@/pages/partners"));
const Documentation = lazy(() => import("@/pages/documentation"));
const References = lazy(() => import("@/pages/references"));
const ProjectAgrounija = lazy(() => import("@/pages/project-agrounija"));
const Blog = lazy(() => import("@/pages/blog"));
const NewsPost = lazy(() => import("@/pages/news-post"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));

const ChatWidget = lazy(() =>
  import("@/components/ChatWidget").then((m) => ({ default: m.ChatWidget })),
);

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
    <Suspense fallback={<div className="min-h-svh bg-background" />}>
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
        <Route path="/documentation/certificates" component={Documentation} />
        <Route path="/documentation/diplomas" component={Documentation} />
        <Route path="/references" component={References} />
        <Route path="/references/agrounija" component={ProjectAgrounija} />
        <Route path="/blog" component={Blog} />
        <Route path="/news/:id" component={NewsPost} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setShowChat(true), 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NoiseOverlay />
        <Suspense fallback={null}>{showChat ? <ChatWidget /> : null}</Suspense>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
