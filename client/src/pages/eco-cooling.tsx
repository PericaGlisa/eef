import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const products = [
  {
    title: "Rashladne Komore",
    desc: "Industrijske komore svih dimenzija sa preciznom kontrolom temperature i vlažnosti.",
    specs: ["Panelna gradnja", "Hermetička vrata", "LED rasveta"]
  },
  {
    title: "Tuneli za Smrzavanje",
    desc: "Brzo smrzavanje proizvoda uz očuvanje ćelijske strukture i kvaliteta.",
    specs: ["-40°C režim", "Inverter ventilatori", "Kontinuirani rad"]
  },
  {
    title: "Čileri & Agregati",
    desc: "Visokoefikasni rashladni agregati sa ekološkim freonima i CO2 tehnologijom.",
    specs: ["Bitzer kompresori", "Danfoss automatika", "Heat recovery"]
  },
  {
    title: "ULO Komore",
    desc: "Ultra Low Oxygen tehnologija za dugotrajno čuvanje voća i povrća.",
    specs: ["Kontrola atmosfere", "CO2 scrubberi", "Azot generatori"]
  }
];

export default function EcoCooling() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              Eko <span className="text-primary">Rashlada</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Napredna tehnologija hlađenja koja štedi energiju i čuva planetu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Grid */}
      <section className="py-20 bg-[#0e1035]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group h-[400px] border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-end p-8 hover:border-primary/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                
                {/* Abstract Wireframe Background (CSS only for now) */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:20px_20px]" />

                <div className="relative z-10">
                  <div className="w-12 h-1 bg-primary mb-6 transform origin-left group-hover:scale-x-150 transition-transform" />
                  <h3 className="text-2xl font-bold text-white mb-3">{product.title}</h3>
                  <p className="text-white/60 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                    {product.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.specs.map((spec, i) => (
                      <span key={i} className="text-xs font-mono border border-white/20 px-2 py-1 text-white/40">
                        {spec}
                      </span>
                    ))}
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
