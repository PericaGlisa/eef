import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const partners = [
  { name: "Danfoss", type: "Strateški Partner", desc: "Globalni lider u rashladnoj tehnici." },
  { name: "Bitzer", type: "Tehnologija Kompresora", desc: "Vrhunski nemački kvalitet kompresora." },
  { name: "Carel", type: "Kontrolni Sistemi", desc: "Napredna automatika i monitoring." },
  { name: "Guntner", type: "Izmenjivači Toplote", desc: "Premium izmenjivači toplote." },
  { name: "Matijević", type: "Klijent", desc: "Dugogodišnja saradnja na industrijskim projektima." },
  { name: "Imlek", type: "Klijent", desc: "Održavanje rashladnih sistema mlekara." },
  { name: "Delta Agrar", type: "Klijent", desc: "ULO hladnjače za voće." },
  { name: "Frikom", type: "Klijent", desc: "Sistemi za duboko zamrzavanje." }
];

export default function Partners() {
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
              Naši <span className="text-primary">Partneri</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Mreža poverenja koju gradimo decenijama. Od svetskih dobavljača do zadovoljnih klijenata.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-[#0e1035]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group aspect-square border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 hover:bg-white/10 transition-colors text-center relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{partner.name}</h3>
                <div className="h-[1px] w-8 bg-primary mb-4 relative z-10" />
                <p className="text-primary text-xs uppercase tracking-widest mb-2 relative z-10">{partner.type}</p>
                <p className="text-white/40 text-sm relative z-10">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
