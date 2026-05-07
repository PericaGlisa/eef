import { motion } from "framer-motion";
import { ArrowUpRight, DraftingCompass, Wrench, ShieldCheck, Lightbulb, BarChart3, Factory } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";
import { getCounterpartPath } from "@/lib/route-map";

export function BentoServices() {
  const { t, tArray } = useTranslation();
  const { isEnglish } = useLang();
  const l = (srHref: string) => isEnglish ? getCounterpartPath(srHref, "en") : srHref;

  const services = [
    {
      title: t("bento.engineeringTitle"),
      description: t("bento.engineeringDesc"),
      icon: DraftingCompass,
      image: "/assets/service-engineering.webp",
      tags: tArray("bento.engineeringTags"),
      features: tArray("bento.engineeringFeatures"),
      link: l("/usluge/inzenjering")
    },
    {
      title: t("bento.executionTitle"),
      description: t("bento.executionDesc"),
      icon: Factory,
      image: "/assets/service-execution.webp",
      tags: tArray("bento.executionTags"),
      features: tArray("bento.executionFeatures"),
      link: l("/usluge/izvodjenje")
    },
    {
      title: t("bento.serviceTitle"),
      description: t("bento.serviceDesc"),
      icon: Wrench,
      image: "/assets/service-maintenance.webp",
      tags: tArray("bento.serviceTags"),
      features: tArray("bento.serviceFeatures"),
      link: l("/usluge/servis")
    },
    {
      title: t("bento.energyTitle"),
      description: t("bento.energyDesc"),
      icon: BarChart3,
      image: "/assets/service-energy.webp",
      tags: tArray("bento.energyTags"),
      features: tArray("bento.energyFeatures"),
      link: l("/usluge/energetska-revizija")
    },
    {
      title: t("bento.consultingTitle"),
      description: t("bento.consultingDesc"),
      icon: Lightbulb,
      image: "/assets/service-consulting.webp",
      tags: tArray("bento.consultingTags"),
      features: tArray("bento.consultingFeatures"),
      link: l("/usluge/konsalting")
    },
    {
      title: t("bento.safetyTitle"),
      description: t("bento.safetyDesc"),
      icon: ShieldCheck,
      image: "/assets/service-safety.webp",
      tags: tArray("bento.safetyTags"),
      badges: tArray("bento.safetyBadges"),
      features: tArray("bento.safetyFeatures"),
      link: l("/usluge/sigurnost")
    }
  ];

  return (
    <section className="content-auto py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
      {/* Soft transition gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035]/5 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0e1035]/5 to-transparent pointer-events-none z-10" />

      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#171A54]/10 to-transparent" />
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#171A54]/10 text-primary font-mono text-xs uppercase tracking-widest mb-4 backdrop-blur-sm shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {t("bento.badge")}
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#171A54] max-w-2xl">
              {t("bento.title").split(" ").map((word: string, i: number, arr: string[]) => (
                i === arr.length - 1 ? <span key={i} className="text-primary">{word}</span> : <span key={i}>{word} </span>
              ))}
            </h2>
          </div>
          <div className="max-w-md text-[#171A54]/70 text-left md:text-right">
            <p>{t("bento.subtitle")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={service.link} className="block h-full">
                  <div className="group relative bg-white border border-slate-200 hover:border-primary/50 transition-all duration-500 rounded-3xl p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-primary/5 cursor-pointer overflow-hidden">
                    
                    {/* Background Gradient Blob */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                    {/* Image Section */}
                    {/* @ts-ignore */}
                    {service.image ? (
                      <div className="relative overflow-hidden rounded-2xl mb-6 -mx-8 -mt-8 h-48">
                        <div className="absolute inset-0 bg-[#171A54]/10 group-hover:bg-transparent transition-all duration-300 z-10" />
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary z-20 shadow-lg border border-white/20 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-[#171A54]/5 border border-[#171A54]/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                          <Icon className="w-7 h-7" />
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="flex flex-col h-full relative z-10">
                      <h3 className="text-2xl font-bold text-[#171A54] mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                        {service.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                      </h3>
                      
                      <p className="text-[#171A54]/70 mb-6 text-sm leading-relaxed flex-grow font-medium">
                        {service.description}
                      </p>

                      <div className="space-y-5 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#171A54]/5 text-[#171A54]/70 border border-[#171A54]/10 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="pt-5 border-t border-slate-100 group-hover:border-primary/10 transition-colors">
                          <ul className="grid grid-cols-1 gap-2">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs font-medium text-[#171A54]/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
