import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";
import { Linkedin, Mail, Lightbulb, Wrench, Factory, Key, ShieldCheck, GraduationCap, Truck, Settings, DraftingCompass, Cpu, FileCode, Database } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";
import { getCounterpartPath } from "@/lib/route-map";

export default function About() {
  const { t } = useTranslation();
  const { lang, isEnglish } = useLang();
  const l = (srHref: string) => isEnglish ? getCounterpartPath(srHref, "en") : srHref;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const values = useMemo(() => [
    {
      title: t("about.valuesInnovation"),
      desc: t("about.valuesInnovationDesc"),
      icon: Lightbulb
    },
    {
      title: t("about.valuesEngineering"),
      desc: t("about.valuesEngineeringDesc"),
      icon: Wrench
    },
    {
      title: t("about.valuesManufacturing"),
      desc: t("about.valuesManufacturingDesc"),
      icon: Factory
    },
    {
      title: t("about.valuesTurnkey"),
      desc: t("about.valuesTurnkeyDesc"),
      icon: Key
    },
    {
      title: t("about.valuesReliability"),
      desc: t("about.valuesReliabilityDesc"),
      icon: ShieldCheck
    },
    {
      title: t("about.valuesEducation"),
      desc: t("about.valuesEducationDesc"),
      icon: GraduationCap
    },
    {
      title: t("about.valuesDistribution"),
      desc: t("about.valuesDistributionDesc"),
      icon: Truck
    },
    {
      title: t("about.valuesSupport"),
      desc: t("about.valuesSupportDesc"),
      icon: Settings
    }
  ], [t]);

  const history = useMemo(() => [
    {
      year: "1996",
      title: t("about.history1996Title"),
      desc: t("about.history1996Desc"),
      stats: t("about.history1996Stats"),
      image: "/assets/history/1996.webp"
    },
    {
      year: "1998",
      title: t("about.history1998Title"),
      desc: t("about.history1998Desc"),
      stats: t("about.history1998Stats"),
      image: "/assets/history/1998.webp"
    },
    {
      year: "2000",
      title: t("about.history2000Title"),
      desc: t("about.history2000Desc"),
      stats: t("about.history2000Stats"),
      image: "/assets/history/2000.webp"
    },
    {
      year: "2002",
      title: t("about.history2002Title"),
      desc: t("about.history2002Desc"),
      stats: t("about.history2002Stats"),
      image: "/assets/history/2002.webp"
    },
    {
      year: "2006",
      title: t("about.history2006Title"),
      desc: t("about.history2006Desc"),
      stats: t("about.history2006Stats"),
      image: "/assets/history/2006.webp"
    },
    {
      year: "2009",
      title: t("about.history2009Title"),
      desc: t("about.history2009Desc"),
      stats: t("about.history2009Stats"),
      image: "/assets/history/2009.webp"
    },
    {
      year: "2012",
      title: t("about.history2012Title"),
      desc: t("about.history2012Desc"),
      stats: t("about.history2012Stats"),
      image: "/assets/history/2012.webp"
    },
    {
      year: "2014",
      title: t("about.history2014Title"),
      desc: t("about.history2014Desc"),
      stats: t("about.history2014Stats"),
      image: "/assets/history/2014.webp"
    },
    {
      year: "2020",
      title: t("about.history2020Title"),
      desc: t("about.history2020Desc"),
      stats: t("about.history2020Stats"),
      image: "/assets/history/2020.webp"
    }
  ], [t]);

  const team = useMemo(() => [
    { name: "Boban Čelarević", role: t("about.roleTechnicalSupport"), gender: "male" as const, email: "celarevic.boban@eef.rs" },
    { name: "Damjan Novaković", role: t("about.roleMechanicalEngineer"), gender: "male" as const, email: "novakovic.damjan@eef.rs" },
    { name: "Milan Parić", role: t("about.roleMechanicalEngineer"), gender: "male" as const, email: "paric.milan@eef.rs" },
    { name: "Marica Marinković", role: t("about.roleMechanicalEngineer"), gender: "female" as const, email: "marinkovic.marica@eef.rs" },
    { name: "Uroš Milošević", role: t("about.roleMechanicalEngineer"), gender: "male" as const, email: "milosevic.uros@eef.rs" },
    { name: "Dane Cvijan", role: t("about.roleMechanicalEngineer"), gender: "male" as const, email: "cvijan.dane@eef.rs" }
  ], [t]);

  const engineeringItems = useMemo(() => [
    { icon: DraftingCompass, title: t("about.engineeringCad"), desc: t("about.engineeringCadDesc") },
    { icon: Cpu, title: t("about.engineeringThermal"), desc: t("about.engineeringThermalDesc") },
    { icon: FileCode, title: t("about.engineeringPlc"), desc: t("about.engineeringPlcDesc") },
    { icon: Database, title: t("about.engineeringMonitoring"), desc: t("about.engineeringMonitoringDesc") }
  ], [t]);

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-[#0e1035]/60 z-10 mix-blend-multiply" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />

          <motion.img 
            src="/assets/hero-bg.jpg" 
            alt={isEnglish ? "About Us Background" : "O nama pozadina"}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase">{t("about.heroBadge")}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight">
              {t("about.heroHeadline1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">{t("about.heroHeadline2")}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-10 border-l-2 border-primary/50 pl-6">
              {t("about.heroSubheadline")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engineering DNA Section */}
      <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-4xl font-bold text-[#171A54] mb-6">
                 {t("about.engineeringTitle")}
               </h2>
               <p className="text-[#171A54]/70 text-lg leading-relaxed mb-8">
                 {t("about.engineeringDesc")}
               </p>
               
               <div className="grid grid-cols-2 gap-6">
                 {engineeringItems.map((item, i) => (
                   <div key={i} className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                       <item.icon className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-bold text-[#171A54] text-sm">{item.title}</h4>
                       <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
             
             <div className="relative">
               <div className="absolute -inset-4 bg-primary/5 rounded-3xl -rotate-2" />
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                 <img src="/assets/service-engineering.webp" alt={isEnglish ? "Engineering" : "Inženjering"} className="w-full h-auto" />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-mono uppercase font-bold text-[#171A54]">{t("about.softwareStack")}</span>
                   </div>
                   <div className="flex gap-2">
                     <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">Revit</span>
                     <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">AutoCAD</span>
                     <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-slate-600">EPLAN</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-[#F8FAFC] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A54] mb-4">
              {t("about.valuesTitle")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              {t("about.valuesSubtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#171A54] mb-3">{val.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Timeline */}
      <section className="py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white">{t("about.historyTitle")}</h2>
          </div>

          <div className="relative">
             {/* Center Line */}
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2">
                <motion.div 
                  className="w-full bg-gradient-to-b from-primary via-primary to-transparent origin-top"
                  style={{ scaleY, height: "100%" }}
                />
             </div>

             <div className="space-y-24">
               {history.map((item, i) => (
                 <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`flex flex-col md:flex-row gap-8 md:gap-20 items-center ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                 >
                   {/* Text Content */}
                   <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <span className="text-6xl font-bold text-white/5 block mb-2 font-heading">{item.year}</span>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/60 leading-relaxed mb-4">{item.desc}</p>
                      <span className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-primary text-xs font-mono uppercase tracking-wider">
                        {item.stats}
                      </span>
                   </div>

                   {/* Center Point */}
                   <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-[#0e1035] bg-primary shadow-[0_0_20px_rgba(86,170,74,0.5)] z-20 flex items-center justify-center">
                     <div className="w-2 h-2 bg-white rounded-full" />
                   </div>

                   {/* Image Content */}
                   <div className="flex-1 w-full pl-12 md:pl-0">
                     <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video group">
                       <div className="absolute inset-0 bg-[#0e1035]/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                       <img 
                         src={item.image} 
                         alt={item.title} 
                         className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                       />
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <div>
               <h2 className="text-4xl font-bold text-[#171A54] mb-4">
                 {t("about.teamTitle")}
               </h2>
               <p className="text-slate-500 max-w-xl">
                 {t("about.teamSubtitle")}
               </p>
             </div>
             <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
               <Link href={l("/kontakt")}>{t("about.teamJoin")}</Link>
             </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[5/6]">
                    <div className="absolute inset-0 bg-[#171A54]/10 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={member.gender === "female" ? "/assets/team-expert-female.webp" : "/assets/team-expert-male.webp"} 
                      alt={member.name} 
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied) return;
                        img.dataset.fallbackApplied = "true";
                        img.src = "/assets/team-professional.png";
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Hover Info */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0e1035] to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                      <div className="flex gap-3 justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <a
                          href={`mailto:${member.email}`}
                          aria-label={`${t("about.ariaEmail")}: ${member.email}`}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#171A54]">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
