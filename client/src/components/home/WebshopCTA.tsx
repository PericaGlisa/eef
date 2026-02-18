import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WebshopCTA() {
  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0e1035] rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-slate-200 border border-[#171A54]"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1035] via-[#0e1035]/95 to-transparent z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          
          {/* Decorative large icon */}
          <motion.div 
            animate={{ 
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -right-24 -bottom-24 pointer-events-none opacity-[0.06] z-0"
          >
            <ShoppingCart className="w-[600px] h-[600px] text-white" />
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between p-8 md:p-16 gap-10 relative z-10">
            {/* Content Side */}
            <div className="max-w-2xl text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-2 mb-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-primary text-xs font-mono backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="tracking-widest uppercase">Eko Elektrofrigo Web Shop</span>
                </div>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                Sva oprema <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                  na jedan klik.
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-lg mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0"
              >
                3.000+ artikala na lageru. Najširi asortiman rashladne opreme i rezervnih delova, dostupnih odmah uz brzu isporuku.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                {[
                  { icon: Truck, text: "Brza Isporuka" },
                  { icon: ShieldCheck, text: "Garancija" },
                  { icon: Package, text: "Veliki Lager" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Action Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-shrink-0 relative"
            >
              <a href="https://ekoelektrofrigo.rs" target="_blank" rel="noopener noreferrer" className="group block">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 40px rgba(86,170,74,0.3)",
                      "0 0 70px rgba(86,170,74,0.6)",
                      "0 0 40px rgba(86,170,74,0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.08 }}
                  className="rounded-full"
                >
                  <Button className="relative bg-primary hover:bg-primary/90 text-white px-10 py-8 rounded-full text-xl font-bold transition-all transform overflow-hidden w-full border-2 border-white/20">
                    <span className="relative z-20 flex items-center gap-3">
                      Posetite Web Shop
                      <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                  </Button>
                </motion.div>
                <p className="mt-4 text-center text-xs text-slate-500 font-mono">
                  Direktan pristup lageru 24/7
                </p>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
