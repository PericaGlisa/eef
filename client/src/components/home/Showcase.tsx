import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";
import { getCounterpartPath } from "@/lib/route-map";
import { getSolutionsData } from "@/data/solutions";

export function Showcase() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const { t } = useTranslation();
  const { isEnglish } = useLang();
  const l = (srHref: string) => isEnglish ? getCounterpartPath(srHref, "en") : srHref;

  const solutions = useMemo(() => getSolutionsData(isEnglish), [isEnglish]);

  return (
    <section className="content-auto py-16 md:py-24 bg-background relative transition-colors duration-700 overflow-hidden">
       {/* Background Wireframe Effect based on active product */}
       <div 
         className={`absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 pointer-events-none ${activeProduct ? 'opacity-10' : ''}`}
         style={{ 
            backgroundImage: activeProduct ? `url('${solutions.find((p, i) => i + 1 === activeProduct)?.image}')` : 'none',
            filter: 'grayscale(100%) blur(5px)'
         }}
       />
       
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
               <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-primary font-mono text-xs uppercase tracking-widest">{t("showcase.badge")}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
              {t("showcase.title1")} <span className="text-primary">{t("showcase.title2")}</span>
            </h2>
          </div>
          <Link href={l("/eko-rashlada")}>
            <button className="text-white/60 hover:text-white flex items-center gap-2 transition-colors group cursor-pointer">
              {t("showcase.viewAll")} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {solutions.map((product, i) => {
            const isLast = i === solutions.length - 1;
            return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative h-[320px] overflow-hidden border border-white/10 hover:border-primary/50 cursor-pointer rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${isLast ? 'md:col-span-2 lg:col-span-1 lg:col-start-2 xl:col-span-2 xl:col-start-auto' : ''}`}
              onMouseEnter={() => {
                  setActiveProduct(i + 1);
                  import("@/lib/audio").then(m => m.audio.playHover());
              }}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-[#0e1035]/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Hover Effect: Wireframe/Grid */}
              <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                {/* Top Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {product.title}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  {product.shortDesc}
                </p>
                
                {/* Active Indicator Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              
              <Link href={l(`/eko-rashlada/${product.id}`)} className="absolute inset-0 z-30">
                <span className="sr-only">{isEnglish ? "View details about" : "Pogledajte detalje o"} {product.title}</span>
              </Link>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
