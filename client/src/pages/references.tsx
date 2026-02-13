import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { InteractiveMapDashboard } from "@/components/references/InteractiveMapDashboard";
import { internationalLocations } from "@/components/references/internationalLocations";
import { Globe, Map, Building2, Thermometer, Zap, Award, CheckCircle2, Factory, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Spotlight Project Data
const spotlightProject = {
  title: "AGROUNIJA",
  location: "Krčedin, Srbija",
  type: "ULO Hladnjača",
  capacity: "7.500 tona",
  temp: "0.8°C do 1.2°C",
  tech: "Ultra Low Oxygen (ULO)",
  desc: "Vrhunski centar za skladištenje jabuke ukupnog kapaciteta 7.500 tona. Implementirana je najsavremenija ULO tehnologija (faza I i II) koja obezbeđuje premium kvalitet voća za izvoz na svetska tržišta.",
  image: "/assets/projects/agrounija/gallery-1.webp", 
  stats: [
    { label: "Kapacitet", value: "7.500t", icon: Building2 },
    { label: "Režim Rada", value: "1°C", icon: Thermometer },
    { label: "Ušteda Energije", value: "40%", icon: Zap },
    { label: "Tehnologija", value: "ULO", icon: Factory },
  ]
};

export default function References() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section - Technical & Modern */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#0e1035]">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/80 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             <img 
               src="/assets/portfolio-ulo.png" 
               alt="Industrial Refrigeration Projects"  
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-mono mb-8 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              <span className="tracking-wider uppercase">Lider u Industrijskom Hlađenju</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              Inženjersko <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary bg-300% animate-gradient">Nasleđe</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed border-l-4 border-primary/50 pl-6 mb-12">
              Više od 30 godina iskustva u projektovanju i izvođenju najsloženijih rashladnih sistema. 
              Naši projekti su naša najbolja preporuka.
            </p>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
              {[
                { label: "Završenih Projekata", value: "500+" },
                { label: "Zadovoljnih Klijenata", value: "200+" },
                { label: "Godina Iskustva", value: "30+" },
                { label: "Država u Regionu", value: "8" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-white font-heading">{stat.value}</div>
                  <div className="text-sm text-white/40 uppercase tracking-widest font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Spotlight Section - NEW */}
      <section className="py-20 bg-[#0b0d2e] relative border-y border-white/5">
        <div className="container mx-auto px-6">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
             {/* Content */}
             <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase">
                 <CheckCircle2 className="w-4 h-4" />
                 Izdvojeni Projekat
               </div>
               
               <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                 {spotlightProject.title}
               </h2>
               
               <p className="text-lg text-white/60 leading-relaxed">
                 {spotlightProject.desc}
               </p>

               <div className="grid grid-cols-2 gap-4">
                 {spotlightProject.stats.map((stat, i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                     <stat.icon className="w-6 h-6 text-primary mb-3" />
                     <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                     <div className="text-xs text-white/40 uppercase font-mono">{stat.label}</div>
                   </div>
                 ))}
               </div>

               <div className="pt-4">
                 <div className="flex items-center gap-2 text-white/40 text-sm font-mono">
                   <Map className="w-4 h-4" />
                   {spotlightProject.location}
                 </div>
               </div>
             </div>

             {/* Visual */}
             <div className="flex-1 w-full">
               <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/20 group">
                 <img 
                   src={spotlightProject.image} 
                   alt={spotlightProject.title} 
                   className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d2e]/80 via-transparent to-transparent" />
                 
                 {/* Badge */}
                 <div className="absolute bottom-6 left-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-white text-xs font-bold shadow-lg backdrop-blur-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PREMIUM REFERENCA
                    </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Domestic References - Map */}
      <section className="py-24 bg-[#F5F7FA] relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
             <div>
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-primary/10 rounded-lg">
                   <Map className="w-8 h-8 text-primary" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#171A54]">
                   Mapa Projekata
                 </h2>
               </div>
               <p className="text-[#171A54]/60 max-w-xl text-lg">
                 Detaljan pregled naših referenci širom Srbije. 
                 Filtrirajte po gradovima, klijentima i tipu industrije.
               </p>
             </div>
           </div>

           <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#171A54]/5 bg-white">
             <InteractiveMapDashboard />
           </div>
        </div>
      </section>

      {/* Foreign References - Modernized */}
      <section className="py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Background Details */}
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
           <div className="flex items-center gap-4 mb-16">
             <div className="p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
               <Globe className="w-8 h-8 text-primary" />
             </div>
             <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                 Međunarodno Prisustvo
               </h2>
               <p className="text-white/60">
                 Ekspertiza koja prelazi granice.
               </p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {internationalLocations.map((country, i) => (
               <motion.div
                 key={country.country}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="group relative bg-white/5 rounded-2xl p-1 overflow-hidden hover:bg-white/10 transition-colors duration-500 h-[500px] flex flex-col"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <div className="relative bg-[#0e1035]/80 backdrop-blur-xl rounded-xl p-8 h-full border border-white/5 group-hover:border-primary/30 transition-colors flex flex-col">
                   <div className="flex justify-between items-start mb-6 shrink-0">
                     <h3 className="text-2xl font-bold text-white font-heading">
                       {country.country}
                     </h3>
                     <Globe className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors" />
                   </div>
                   
                  <div
                    className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-grow overscroll-contain"
                    data-lenis-prevent
                    onWheel={(e) => {
                      const el = e.currentTarget;
                      el.scrollTop += e.deltaY;
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                     {country.projects.map((proj, j) => (
                       <div key={j} className="relative pl-6 border-l border-white/10 group-hover:border-primary/50 transition-colors">
                         <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#0e1035] border border-white/20 group-hover:border-primary group-hover:bg-primary transition-colors" />
                         
                         <div className="flex flex-col gap-1 mb-2">
                           <div className="flex items-center gap-3 text-xs text-primary font-mono uppercase tracking-wider">
                              <span className="font-bold">{proj.city}</span>
                              <span className="text-white/20">|</span>
                              <span>{proj.year}</span>
                           </div>
                           <h4 className="text-lg font-bold text-white/90 leading-tight group-hover:text-white transition-colors">
                             {proj.client}
                           </h4>
                         </div>
                         <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                           {proj.description}
                         </p>
                       </div>
                     ))}
                   </div>

                   {/* Card Footer Decor */}
                   <div className="absolute bottom-4 right-4 flex gap-1 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                     <div className="w-1 h-1 bg-white rounded-full" />
                     <div className="w-1 h-1 bg-white rounded-full" />
                     <div className="w-1 h-1 bg-white rounded-full" />
                   </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
