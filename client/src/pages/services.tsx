import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Inženjering & Projektovanje",
    description: "Kompletna izrada projektne dokumentacije za rashladne sisteme svih kapaciteta. Od idejnog rešenja do izvođačkog projekta.",
    features: ["3D Modelovanje", "Termodinamički proračuni", "Energetska optimizacija"]
  },
  {
    title: "Izvođenje Radova",
    description: "Montaža i puštanje u rad industrijskih rashladnih sistema po principu 'ključ u ruke'.",
    features: ["Sertifikovani timovi", "Vrhunska oprema", "Poštovanje rokova"]
  },
  {
    title: "Servis & Održavanje",
    description: "24/7 monitoring i servisna podrška. Preventivno održavanje za maksimalnu pouzdanost.",
    features: ["Odziv unutar 4h", "Originalni rezervni delovi", "Daljinski nadzor"]
  },
  {
    title: "Konsalting",
    description: "Stručno savetovanje u oblasti energetske efikasnosti i odabira optimalnih tehničkih rešenja.",
    features: ["ROI analize", "Studije izvodljivosti", "Tehnička revizija"]
  }
];

export default function Services() {
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
              Naše <span className="text-primary">Usluge</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Sveobuhvatna rešenja za vaše rashladne potrebe. Od koncepta do realizacije.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#0e1035]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-heading font-bold text-primary">{index + 1}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/60 mb-8">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center text-primary font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
                  Saznajte više <ArrowRight className="ml-2 w-4 h-4" />
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
