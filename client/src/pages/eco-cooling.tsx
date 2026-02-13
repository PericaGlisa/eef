import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { solutionsData } from "@/data/solutions";
import { ArrowRight, Leaf, Zap, Award, BarChart3, CheckCircle2, ChevronRight, Wind, Snowflake, Settings } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function EcoCooling() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const storageSolutions = solutionsData.slice(0, 3);
  const machinerySolutions = solutionsData.slice(3, 5);
  const infrastructureSolutions = solutionsData.slice(5, 7);

  const stats = [
    { value: "30+", label: "Godina Iskustva", icon: Award },
    { value: "500+", label: "Završenih Projekata", icon: CheckCircle2 },
    { value: "40%", label: "Ušteda Energije", icon: Leaf },
    { value: "24/7", label: "Tehnička Podrška", icon: Zap },
  ];

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section - Standardized & Modernized */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/70 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             <img 
               src="/assets/portfolio-cold-room.webp" 
               alt="Industrial Cooling"  
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-mono mb-6 backdrop-blur-md"
            >
              <Leaf className="w-4 h-4" />
              <span className="tracking-widest uppercase">Održiva Budućnost</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl"
            >
              Inženjering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Hladnog Lanca</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed mb-10 border-l-4 border-primary pl-6"
            >
              Napredna tehnologija hlađenja koja štedi energiju i čuva kvalitet vaših proizvoda. 
              Od projektovanja do realizacije po principu "ključ u ruke".
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 text-lg rounded-full" asChild>
                <Link href="/contact">Zakažite Konsultacije <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-8 h-14 text-lg rounded-full backdrop-blur-sm" asChild>
                <Link href="/references">Pogledajte Reference</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#0e1035]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 flex flex-col items-center text-center group border border-slate-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl font-bold text-[#171A54] mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section - Storage */}
      <section className="py-24 bg-[#0e1035] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Main Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Sveobuhvatna <span className="text-primary">Rešenja</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
              Naša ekspertiza pokriva svaki aspekt industrijskog hlađenja, od skladištenja do automatizacije.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Snowflake className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Skladišna Tehnologija</h2>
              <p className="text-white/50 text-sm">Očuvanje kvaliteta i svežine</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storageSolutions.map((solution, index) => {
               const Icon = solution.icon;
               return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white/5 border border-white/10 hover:border-primary/50 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg">
                         <Icon className="w-7 h-7" />
                       </div>
                       <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-primary group-hover:text-primary transition-colors">
                         <ChevronRight className="w-4 h-4" />
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{solution.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                      {solution.shortDesc}
                    </p>
                    
                    <div className="space-y-3 pt-6 border-t border-white/10">
                      {solution.specs.slice(0, 3).map((spec, i) => (
                        <div key={i} className="flex items-center text-xs text-white/50 font-mono">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </Link>
               );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Machinery (Rashladna Tehnika) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-12 justify-end text-right">
            <div>
              <h2 className="text-3xl font-bold text-[#171A54]">Rashladna Tehnika</h2>
              <p className="text-slate-500 text-sm">Srce svakog sistema</p>
            </div>
            <div className="p-3 bg-[#171A54]/5 rounded-xl text-[#171A54]">
              <Wind className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {machinerySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 cursor-pointer"
                  >
                    <div className="grid md:grid-cols-2 h-full">
                      <div className="relative h-64 md:h-full overflow-hidden">
                         <div className="absolute inset-0 bg-[#171A54]/20 group-hover:bg-transparent transition-colors z-10" />
                         <img 
                           src={solution.image} 
                           alt={solution.title} 
                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                         />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-[#171A54] z-20">
                           PREMIUM OPREMA
                         </div>
                      </div>
                      
                      <div className="p-8 flex flex-col justify-center">
                        <Icon className="w-10 h-10 text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-[#171A54] mb-3">{solution.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                          {solution.shortDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {solution.specs.map((spec, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Infrastructure (Infrastruktura & Kontrola) */}
      <section className="py-24 bg-[#1a1c4b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-16">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Infrastruktura & Kontrola</h2>
              <p className="text-blue-200/50 text-sm">Automatizacija i optimizacija procesa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {infrastructureSolutions.map((solution, index) => {
               const Icon = solution.icon;
               return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-1 rounded-3xl hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="bg-[#0e1035] rounded-[22px] p-8 h-full relative overflow-hidden">
                      {/* Tech Background Effect */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                           <Icon className="w-12 h-12 text-primary mb-4" />
                           <ArrowRight className="w-6 h-6 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3">{solution.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-8">
                          {solution.shortDesc}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {solution.specs.map((spec, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs text-blue-100/70 font-mono text-center group-hover:border-primary/30 transition-colors">
                              {spec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
               );
            })}
          </div>
        </div>
      </section>

      {/* Why Eko Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-[#171A54] mb-4">
               Zašto <span className="text-primary">Eko Elektrofrigo?</span>
             </h2>
             <p className="text-slate-500 max-w-2xl mx-auto">
               Kombinujemo decenijsko iskustvo sa najnovijim tehnološkim dostignućima kako bismo vam pružili rešenja koja traju.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 title: "Energetska Efikasnost",
                 desc: "Naši sistemi su dizajnirani da minimizuju potrošnju energije, smanjujući operativne troškove i ekološki otisak.",
                 icon: Leaf,
                 color: "text-green-500",
                 bg: "bg-green-50"
               },
               {
                 title: "Vrhunska Tehnologija",
                 desc: "Koristimo opremu renomiranih svetskih proizvođača (Bitzer, Danfoss, Isolcell) garantujući pouzdanost i dugovečnost.",
                 icon: Award,
                 color: "text-blue-500",
                 bg: "bg-blue-50"
               },
               {
                 title: "Sveobuhvatna Podrška",
                 desc: "Od inicijalnog koncepta i projektovanja, preko instalacije, do 24/7 servisne podrške i održavanja.",
                 icon: Settings,
                 color: "text-orange-500",
                 bg: "bg-orange-50"
               }
             ].map((item, i) => (
               <div key={i} className="p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                 <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                   <item.icon className="w-7 h-7" />
                 </div>
                 <h3 className="text-xl font-bold text-[#171A54] mb-3">{item.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">
                   {item.desc}
                 </p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Section - Modernized */}
      <section className="py-24 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#0e1035] z-0">
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
          
          {/* Animated Background Elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.05, 0.1, 0.05] 
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-sm font-medium tracking-wide uppercase">Dostupni smo za vaš projekat</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Spremni za <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Unapređenje?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/60 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Naš inženjerski tim je spreman da analizira vaše potrebe i kreira optimalno rešenje koje štedi energiju i novac.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-14 text-lg rounded-full shadow-[0_0_30px_rgba(86,170,74,0.3)] hover:shadow-[0_0_50px_rgba(86,170,74,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto" asChild>
                <Link href="/contact" className="flex items-center gap-2">
                  Zatražite Ponudu
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 hover:border-white/20 font-bold px-10 h-14 text-lg rounded-full backdrop-blur-sm transition-all w-full sm:w-auto" asChild>
                <a href="tel:+381113757287" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  +381 11 375 7287
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-white/40"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Besplatna konsultacija</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Izlazak na teren</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Garancija kvaliteta</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
