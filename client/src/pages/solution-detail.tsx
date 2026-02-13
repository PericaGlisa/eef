import { useRoute, Link } from "wouter";
import { solutionsData } from "@/data/solutions";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Settings, Phone, FileText, ArrowRight } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SolutionDetail() {
  const [match, params] = useRoute("/eco-cooling/:slug");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  if (!match || !params) return <NotFound />;
  
  const solution = solutionsData.find(s => s.id === params.slug);

  if (!solution) return <NotFound />;

  const Icon = solution.icon;

  // Find next solution for navigation
  const currentIndex = solutionsData.findIndex(s => s.id === params.slug);
  const nextSolution = solutionsData[(currentIndex + 1) % solutionsData.length];

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section - Modernized */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#0e1035]">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/80 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             {/* Use solution image as hero background if available, otherwise fallback */}
             <img 
               src={solution.image || "/assets/hero-bg.jpg"} 
               alt={solution.title} 
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/eco-cooling">
            <Button variant="ghost" className="mb-8 text-white/70 hover:text-white hover:bg-white/10 -ml-4 group backdrop-blur-sm border border-transparent hover:border-white/10">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Nazad na Rešenja
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary backdrop-blur-md border border-white/20 shadow-lg shadow-primary/10">
                <Icon className="w-7 h-7" />
              </div>
              <div className="h-px w-20 bg-gradient-to-r from-white/20 to-transparent" />
              <span className="text-primary font-mono text-sm tracking-widest uppercase">Tehnička Specifikacija</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              {solution.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl font-light leading-relaxed border-l-4 border-primary/50 pl-6">
              {solution.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-20 bg-[#F5F7FA]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Content - Left Column */}
            <div className="lg:col-span-8">
              {/* Featured Image - Enhanced */}
              {solution.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mb-12 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 h-[300px] md:h-[450px] relative group"
                >
                  <div className="absolute inset-0 bg-[#0e1035]/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                  <img 
                    src={solution.image} 
                    alt={solution.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* Image overlay badge */}
                  <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/50 shadow-lg flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-[#0e1035] uppercase tracking-wider">Industrijski Standard</span>
                  </div>
                </motion.div>
              )}

              {/* Content Body */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
              >
                <div 
                  className="prose prose-lg max-w-none text-slate-600 
                    [&_p]:leading-relaxed [&_p]:mb-6 
                    [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-[#0e1035] [&_h3]:mt-10 [&_h3]:mb-6 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-3
                    [&_h4]:text-xl [&_h4]:font-bold [&_h4]:text-primary [&_h4]:mb-3
                    [&_ul]:space-y-3 [&_ul]:my-6
                    [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:pl-0
                    [&_li::before]:content-[''] [&_li::before]:hidden
                    [&_strong]:text-[#0e1035] [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ 
                    __html: solution.fullContent
                      // Add checkmarks to list items via string replacement for visual flair
                      .replace(/<li>/g, '<li><span class="inline-flex items-center justify-center w-5 h-5 mt-1 mr-2 rounded-full bg-primary/10 text-primary flex-shrink-0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>')
                      .replace(/<\/li>/g, '</span></li>')
                  }}
                />
              </motion.div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="lg:col-span-4 space-y-8 sticky top-32 self-start">
              
              {/* Technical Specs Card - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#0e1035] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/10"
              >
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/10 border border-white/10">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    Ključne Karakteristike
                  </h3>
                  
                  <div className="space-y-4">
                    {solution.specs.map((spec, i) => (
                      <div key={i} className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-white/90">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-xs text-white/40 mb-2 uppercase tracking-widest font-mono">Dostupnost</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Dostupno za projektovanje
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action Card - Enhanced */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors" />
                
                <h3 className="text-2xl font-bold text-[#0e1035] mb-3 relative z-10">Zainteresovani?</h3>
                <p className="text-slate-500 mb-8 text-sm leading-relaxed relative z-10">
                  Naš tim inženjera je spreman da odgovori na vaše zahteve i ponudi optimalno rešenje.
                </p>
                
                <div className="grid gap-3 relative z-10">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 h-12 text-base" asChild>
                    <Link href="/contact">
                      <FileText className="w-4 h-4 mr-2" />
                      Zatražite ponudu
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 bg-white text-[#0e1035] hover:bg-slate-50 hover:text-[#0e1035] h-12 text-base"
                    asChild
                  >
                    <Link href="/contact">
                      <Phone className="w-4 h-4 mr-2" />
                      Kontaktirajte nas
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Next Solution Teaser */}
              {nextSolution && (
                <Link href={`/eco-cooling/${nextSolution.id}`}>
                  <div className="block bg-gradient-to-br from-[#0e1035] to-[#1a1d5c] rounded-3xl p-1 cursor-pointer group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
                    <div className="bg-[#0e1035] rounded-[22px] p-6 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowRight className="w-12 h-12 text-white" />
                      </div>
                      
                      <p className="text-xs text-primary font-mono uppercase tracking-widest mb-2">Sledeće Rešenje</p>
                      <h4 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{nextSolution.title}</h4>
                      <p className="text-white/40 text-sm line-clamp-1">{nextSolution.shortDesc}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
