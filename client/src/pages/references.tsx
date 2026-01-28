import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { InteractiveMapDashboard } from "@/components/references/InteractiveMapDashboard";
import { Globe, Map } from "lucide-react";

const foreignProjects = [
  {
    country: "Hrvatska",
    projects: [
      { title: "Logistički Centar Zagreb", desc: "Rashladni sistem za distributivni centar." },
      { title: "Hladnjača Osijek", desc: "ULO komore za voće." }
    ]
  },
  {
    country: "Slovenija",
    projects: [
      { title: "Mercator", desc: "Rekonstrukcija sistema u hipermarketima." },
      { title: "Ljubljanske Mlekarne", desc: "Energetska optimizacija." }
    ]
  },
  {
    country: "Poljska",
    projects: [
      { title: "Hortex", desc: "Tuneli za brzo zamrzavanje povrća." }
    ]
  },
  {
    country: "Crna Gora",
    projects: [
      { title: "Voli Trade", desc: "Centralni magacin i logistika." },
      { title: "Luka Bar", desc: "Hladnjača za lučki terminal." }
    ]
  }
];

export default function References() {
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
              Domaće i Strane <span className="text-primary">Reference</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Projekti koji govore više od reči. Od lokalnih lidera do međunarodnih partnerstava, 
              gradimo poverenje kroz inženjersku izvrsnost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Domestic References - Map */}
      <section className="py-20 bg-[#0e1035] relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
             <div>
               <div className="flex items-center gap-4 mb-4">
                 <div className="p-3 bg-primary/10 rounded-lg">
                   <Map className="w-8 h-8 text-primary" />
                 </div>
                 <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                   Domaće Reference
                 </h2>
               </div>
               <p className="text-white/60 max-w-xl text-lg">
                 Istražite našu mrežu projekata širom Srbije. 
                 Koristite interaktivnu tablu za pretragu po gradovima, klijentima i vrstama radova.
               </p>
             </div>
           </div>

           <InteractiveMapDashboard />
        </div>
      </section>

      {/* Foreign References */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
           <div className="flex items-center gap-4 mb-16">
             <div className="p-3 bg-primary/10 rounded-lg">
               <Globe className="w-8 h-8 text-primary" />
             </div>
             <div>
               <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                 Strane Reference
               </h2>
               <p className="text-white/60">
                 Uspešni projekti realizovani širom regiona i Evrope.
               </p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {foreignProjects.map((country, i) => (
               <motion.div
                 key={country.country}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="group relative bg-[#0e1035]/50 rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-[#0e1035]"
               >
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Globe className="w-12 h-12 text-primary" />
                 </div>
                 
                 <h3 className="text-2xl font-bold text-white mb-8 pb-4 border-b border-white/10 group-hover:border-primary/30 transition-colors">
                   {country.country}
                 </h3>
                 
                 <div className="space-y-6">
                   {country.projects.map((proj, j) => (
                     <div key={j} className="relative pl-4 border-l-2 border-white/10 group-hover:border-primary/50 transition-colors">
                       <h4 className="text-lg font-bold text-white/90 mb-1">{proj.title}</h4>
                       <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                         {proj.desc}
                       </p>
                     </div>
                   ))}
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
