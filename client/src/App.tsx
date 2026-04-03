import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Component, ReactNode, Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { SeoManager } from "@/components/SeoManager";

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
const GroqDiagnostic = lazy(() => import("@/pages/groq-diagnostic"));

const NewAIChat = lazy(() => import("@/components/chat/App"));

class ChatBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Chat crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

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

function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation(to);
  }, [setLocation, to]);
  return null;
}

function Router() {
  useSmoothScroll();
  
  return (
    <Suspense fallback={<div className="min-h-svh bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about">
          <RedirectTo to="/o-nama" />
        </Route>
        <Route path="/contact">
          <RedirectTo to="/kontakt" />
        </Route>
        <Route path="/services">
          <RedirectTo to="/usluge" />
        </Route>
        <Route path="/services/:slug">
          {(params) => {
            const slugMap: Record<string, string> = {
              engineering: "inzenjering",
              execution: "izvodjenje",
              maintenance: "servis",
              "energy-audit": "energetska-revizija",
              consulting: "konsalting",
              safety: "sigurnost",
            };
            const slug = params?.slug ? slugMap[params.slug] ?? params.slug : "";
            return <RedirectTo to={`/usluge/${slug}`} />;
          }}
        </Route>
        <Route path="/eco-cooling">
          <RedirectTo to="/eko-rashlada" />
        </Route>
        <Route path="/eco-cooling/:slug">
          {(params) => <RedirectTo to={`/eko-rashlada/${params.slug}`} />}
        </Route>
        <Route path="/partners">
          <RedirectTo to="/partneri" />
        </Route>
        <Route path="/documentation">
          <RedirectTo to="/dokumentacija" />
        </Route>
        <Route path="/documentation/certificates">
          <RedirectTo to="/dokumentacija/sertifikati" />
        </Route>
        <Route path="/documentation/diplomas">
          <RedirectTo to="/dokumentacija/diplome" />
        </Route>
        <Route path="/references">
          <RedirectTo to="/reference" />
        </Route>
        <Route path="/references/agrounija">
          <RedirectTo to="/reference/agrounija" />
        </Route>
        <Route path="/blog">
          <RedirectTo to="/vesti" />
        </Route>
        <Route path="/news/:id">
          {(params) => <RedirectTo to={`/vesti/${params.id}`} />}
        </Route>
        <Route path="/privacy">
          <RedirectTo to="/politika-privatnosti" />
        </Route>
        <Route path="/terms">
          <RedirectTo to="/uslovi-koriscenja" />
        </Route>
        <Route path="/o-nama" component={About} />
        <Route path="/kontakt" component={Contact} />
        <Route path="/usluge" component={Services} />
        <Route path="/usluge/:slug" component={ServiceDetail} />
        <Route path="/eko-rashlada" component={EcoCooling} />
        <Route path="/eko-rashlada/:slug" component={SolutionDetail} />
        <Route path="/partneri" component={Partners} />
        <Route path="/dokumentacija" component={Documentation} />
        <Route path="/dokumentacija/sertifikati" component={Documentation} />
        <Route path="/dokumentacija/diplome" component={Documentation} />
        <Route path="/reference" component={References} />
        <Route path="/reference/agrounija" component={ProjectAgrounija} />
        <Route path="/vesti" component={Blog} />
        <Route path="/vesti/:id" component={NewsPost} />
        <Route path="/politika-privatnosti" component={Privacy} />
        <Route path="/uslovi-koriscenja" component={Terms} />
        <Route path="/groq-dijagnostika" component={GroqDiagnostic} />
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

  useEffect(() => {
    const prefetchRoutes = () => {
      void Promise.allSettled([
        import("@/pages/about"),
        import("@/pages/contact"),
        import("@/pages/services"),
        import("@/pages/service-detail"),
        import("@/pages/eco-cooling"),
        import("@/pages/solution-detail"),
        import("@/pages/partners"),
        import("@/pages/documentation"),
        import("@/pages/references"),
        import("@/pages/project-agrounija"),
        import("@/pages/blog"),
        import("@/pages/news-post"),
        import("@/pages/privacy"),
        import("@/pages/terms"),
        import("@/pages/not-found"),
        import("@/components/chat/App"),
      ]);
    };

    if (typeof globalThis.requestIdleCallback === "function") {
      const idleId = globalThis.requestIdleCallback(prefetchRoutes, { timeout: 1400 });
      return () => globalThis.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(prefetchRoutes, 900);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <NoiseOverlay />
        <SeoManager />
        <ChatBoundary>
          <Suspense fallback={null}>{showChat ? <NewAIChat /> : null}</Suspense>
        </ChatBoundary>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
