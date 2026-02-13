import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  DraftingCompass, Factory, Wrench, BarChart3, Lightbulb, ShieldCheck, 
  ArrowRight, CheckCircle2, Clock, Users, Zap, Phone
} from "lucide-react";
import { Link } from "wouter";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const servicesData = [
  {
    title: "Inženjering & Projektovanje",
    description: "Od idejnog rešenja do izvođačkog projekta. Naš tim inženjera koristi najsavremenije softverske alate za proračun termodinamike i 3D modelovanje.",
    features: ["3D Modelovanje", "Termodinamika", "AutoCAD", "Revit"],
    icon: DraftingCompass,
    image: "/assets/service-engineering.png",
    link: "/services/engineering"
  },
  {
    title: "Izvođenje Radova",
    description: "Montaža industrijskih sistema po principu 'ključ u ruke'. Preciznost u svakom varu, sigurnost u svakom spoju.",
    features: ["Sertifikovani Varioci", "Ključ u Ruke", "Montaža cevovoda"],
    icon: Factory,
    image: "/assets/service-execution.png",
    link: "/services/execution"
  },
  {
    title: "Servis & Održavanje",
    description: "24/7 monitoring i preventivno održavanje. Brz odziv servisnih ekipa širom zemlje.",
    features: ["24/7 Podrška", "Originalni Delovi", "Redovni servisi"],
    icon: Wrench,
    image: "/assets/service-maintenance.png",
    link: "/services/maintenance"
  },
  {
    title: "Energetska Revizija",
    description: "Detaljna analiza potrošnje i ROI proračuni za maksimalnu uštedu.",
    features: ["ROI Analiza", "ISO 50001", "Merenje potrošnje"],
    icon: BarChart3,
    image: "/assets/service-energy.png",
    link: "/services/energy-audit"
  },
  {
    title: "Konsalting",
    description: "Stručno savetovanje za odabir freona i tranziciju na prirodne rashladne fluide.",
    features: ["CO2 Sistemi", "Amonijak", "Studije izvodljivosti"],
    icon: Lightbulb,
    image: "/assets/service-consulting.png",
    link: "/services/consulting"
  },
  {
    title: "Sigurnost & Kvalitet",
    description: "Implementacija najviših standarda bezbednosti i kvaliteta u rashladnoj tehnici.",
    features: ["HACCP", "Bezbednost", "ISO 9001"],
    icon: ShieldCheck,
    image: "/assets/service-safety.png",
    link: "/services/safety"
  }
];

const stats = [
  { value: "24/7", label: "Servisna Podrška", icon: Clock },
  { value: "50+", label: "Stručnih Inženjera", icon: Users },
  { value: "100%", label: "Garancija Kvaliteta", icon: ShieldCheck },
  { value: "ISO", label: "Sertifikovani Procesi", icon: CheckCircle2 },
];

const processSteps = [
  {
    id: 1,
    title: "Analiza & Konsultacije",
    description: "Detaljno sagledavanje vaših potreba i specifičnosti objekta.",
    icon: Lightbulb
  },
  {
    id: 2,
    title: "Projektovanje",
    description: "Izrada precizne tehničke dokumentacije i 3D modela.",
    icon: DraftingCompass
  },
  {
    id: 3,
    title: "Implementacija",
    description: "Stručna montaža i puštanje sistema u rad.",
    icon: Factory
  },
  {
    id: 4,
    title: "Održavanje",
    description: "Redovni servisi i monitoring za dugotrajan rad.",
    icon: Wrench
  }
];

export default function Services() {
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
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/80 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             <img 
              src="/assets/service-engineering.png" 
              alt="Inženjering i projektovanje"  
               className="w-full h-full object-cover"
               onError={(e) => {
                 // Fallback if image doesn't exist
                 e.currentTarget.src = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop";
               }}
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
              <Zap className="w-4 h-4" />
              <span className="tracking-widest uppercase">Ekspertiza na Delu</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl"
            >
              Industrijska <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Izvrsnost</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed mb-10 border-l-4 border-primary pl-6"
            >
              Sveobuhvatna inženjerska rešenja. Od prvog nacrta do dugoročnog održavanja, mi smo vaš pouzdan partner u hladnom lancu.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Main Services Grid */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-6 mb-16 text-center relative z-10">
           <h2 className="text-3xl md:text-5xl font-bold text-[#171A54] mb-6">
             Naše <span className="text-primary">Usluge</span>
           </h2>
           <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
             Pružamo kompletan spektar usluga prilagođenih najzahtevnijim industrijskim standardima.
           </p>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={index} href={service.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group h-full bg-white rounded-3xl border border-slate-100 p-1 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer"
                  >
                    <div className="relative h-full bg-slate-50 rounded-[20px] overflow-hidden flex flex-col">
                      {/* Image Area */}
                      <div className="h-48 relative overflow-hidden">
                         <div className="absolute inset-0 bg-[#171A54]/10 group-hover:bg-transparent transition-all duration-500 z-10" />
                         <img 
                           src={service.image} 
                           alt={service.title} 
                           className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                           onError={(e) => {
                             e.currentTarget.src = "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop";
                           }}
                         />
                         <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl text-primary shadow-lg z-20 group-hover:scale-110 transition-transform">
                           <Icon className="w-6 h-6" />
                         </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold text-[#171A54] mb-3 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                          {service.description}
                        </p>
                        
                        <div className="space-y-2 pt-6 border-t border-slate-200">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center text-xs text-slate-500 font-mono">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2 group-hover:bg-primary transition-colors" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center text-primary font-bold text-sm group-hover:translate-x-2 transition-transform">
                          Saznajte Više <ArrowRight className="ml-2 w-4 h-4" />
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

      {/* Process Section */}
      <section className="py-24 bg-[#0e1035] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Naš <span className="text-primary">Proces</span> Rada
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
              Strukturiran pristup svakom projektu osigurava kvalitet, efikasnost i poštovanje rokova.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-[#171A54] border-4 border-[#0e1035] rounded-full flex items-center justify-center relative z-10 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(86,170,74,0.2)]">
                    <Icon className="w-10 h-10 text-primary" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-[#0e1035] font-bold flex items-center justify-center text-sm border-2 border-[#0e1035]">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed px-4">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Modernized & Compact */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0e1035] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center border border-[#171A54] shadow-2xl shadow-slate-200"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-primary text-xs font-mono mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="tracking-widest uppercase">Spremni za nove izazove</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Započnimo Vaš <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Projekat</span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                Bez obzira da li vam je potreban novi sistem, modernizacija postojećeg ili hitan servis - naš tim inženjera je spreman da odgovori na vaše zahteve.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 text-base rounded-full shadow-[0_0_40px_rgba(86,170,74,0.3)] hover:shadow-[0_0_60px_rgba(86,170,74,0.5)] transition-all transform hover:-translate-y-1 group" asChild>
                  <Link href="/contact">
                    Zatražite Ponudu
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 font-bold px-8 h-14 text-base rounded-full backdrop-blur-sm transition-all" asChild>
                  <a href="tel:+381113757287">
                    <Phone className="mr-2 w-4 h-4" />
                    +381 11 375 72 87
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-xs text-slate-500 font-mono">
                Odgovor u roku od 24h • Besplatna konsultacija
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
