import { motion } from "framer-motion";
import { ShoppingCart, Package, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WebshopCTA() {
  return (
    <section className="py-8 md:py-12 bg-[#F5F7FA] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="bg-[#0e1035] rounded-3xl relative overflow-hidden shadow-xl max-w-5xl mx-auto">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-primary/20 blur-[80px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-blue-500/10 blur-[60px] rounded-full pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
          
          {/* Decorative large icon */}
          <motion.div 
            animate={{ 
              rotate: [-15, -10, -15],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute right-[-20px] bottom-[-20px] pointer-events-none"
          >
            <ShoppingCart className="w-64 h-64 text-white/[0.03]" />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8 relative z-10">
            {/* Content Side */}
            <div className="max-w-2xl text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-2 mb-3"
              >
                <div className="h-px w-6 bg-primary"></div>
                <span className="text-primary font-mono text-[10px] uppercase tracking-widest">Web Shop</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-3 leading-tight"
              >
                Sva oprema <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">na jedan klik.</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-sm md:text-base mb-6 leading-relaxed"
              >
                3.000+ artikala. Najširi asortiman rashladne opreme i delova.
              </motion.p>

              {/* Compact Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6"
              >
                {[
                  { icon: Truck, text: "Brza Isporuka" },
                  { icon: ShieldCheck, text: "Garancija" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/5">
                    <item.icon className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span className="text-[10px] md:text-xs font-medium text-white/80 uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Action Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex-shrink-0"
            >
              <a href="https://ekoelektrofrigo.rs" target="_blank" rel="noopener noreferrer">
                <Button className="relative bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-2xl text-base font-bold shadow-[0_0_20px_rgba(86,170,74,0.4)] hover:shadow-[0_0_30px_rgba(86,170,74,0.6)] transition-all transform hover:-translate-y-1 group overflow-hidden">
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                  
                  {/* Auto Shimmer (Every 3s) */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                    initial={{ x: "-150%" }}
                    animate={{ x: "150%" }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatDelay: 3, 
                      duration: 1.5, 
                      ease: "easeInOut" 
                    }} 
                  />

                  <span className="relative z-20 flex items-center">
                    Posetite Web Shop
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
