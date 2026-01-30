import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  DraftingCompass, Factory, Wrench, BarChart3, Lightbulb, ShieldCheck, ArrowUpRight
} from "lucide-react";
import { Link } from "wouter";

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

export default function Services() {
  const coreServices = servicesData.slice(0, 2);
  const operationalServices = servicesData.slice(2, 4);
  const advisoryServices = servicesData.slice(4, 6);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden bg-[#0e1035]">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              Naše <span className="text-primary">Usluge</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Sveobuhvatna rešenja za vaše rashladne potrebe. Od koncepta do realizacije.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Core Engineering (Dark) */}
      <section className="py-16 md:py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Background Details */}
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Inženjering & <span className="text-primary">Izvođenje</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Link href={service.link} className="group border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-[0_0_30px_rgba(86,170,74,0.15)] h-full cursor-pointer block">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:20px_20px]" />

                    <div className="relative z-10">
                      {/* @ts-ignore */}
                      {service.image ? (
                        <div className="mb-6 -mx-8 -mt-8 h-48 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#0e1035]/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 right-8 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-primary z-20 border border-white/10">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 flex items-center justify-between">
                        {service.title}
                        <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-white/60 text-sm mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {service.features.map((feature, i) => (
                          <span key={i} className="text-xs font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-white/50 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Operational (Light) */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
        {/* Soft Transition Gradient from Dark */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035] to-transparent pointer-events-none z-10 opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 text-left md:text-right">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#171A54] mb-4">
              Operativna <span className="text-primary">Podrška</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mr-auto md:mr-0 md:ml-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {operationalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Link href={service.link} className="group bg-white border border-slate-200 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-xl h-full cursor-pointer block">
                    <div className="relative z-10">
                      {/* @ts-ignore */}
                      {service.image ? (
                        <div className="mb-6 -mx-8 -mt-8 h-48 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#171A54]/10 group-hover:bg-transparent transition-all duration-300 z-10" />
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 right-8 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary z-20 shadow-lg border border-slate-100">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                          <div className="w-10 h-10 rounded-full bg-[#171A54]/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-heading font-bold text-[#171A54] mb-4 group-hover:text-primary transition-colors duration-300 flex items-center justify-between">
                        {service.title}
                        <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-[#171A54]/70 text-sm mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {service.features.map((feature, i) => (
                          <span key={i} className="text-xs font-mono border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full text-slate-500 group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Advisory & QA (Dark) */}
      <section className="py-16 md:py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Soft Transition Gradient from Light */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F7FA] to-transparent pointer-events-none z-10 opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ekspertiza & <span className="text-primary">Kvalitet</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisoryServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <Link href={service.link} className="group border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-[0_0_30px_rgba(86,170,74,0.15)] h-full cursor-pointer block">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:20px_20px]" />

                    <div className="relative z-10">
                      {/* @ts-ignore */}
                      {service.image ? (
                        <div className="mb-6 -mx-8 -mt-8 h-48 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#0e1035]/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute bottom-4 right-8 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-primary z-20 border border-white/10">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      
                      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 flex items-center justify-between">
                        {service.title}
                        <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-white/60 text-sm mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {service.features.map((feature, i) => (
                          <span key={i} className="text-xs font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-white/50 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}