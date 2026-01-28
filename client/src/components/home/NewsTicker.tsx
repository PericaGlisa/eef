import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "26. JAN 2026",
    category: "Inovacije",
    title: "EEF lansirao novi sistem za povrat otpadne toplote",
    desc: "Revolucionarna tehnologija koja smanjuje potrošnju energije za 30% u industrijskim postrojenjima."
  },
  {
    id: 2,
    date: "15. JAN 2026",
    category: "Projekti",
    title: "Završen projekat hladnjače 'Delta Agrar' - 5000 tona",
    desc: "Implementacija najsavremenijeg CO2 sistema hlađenja sa potpunom automatizacijom."
  },
  {
    id: 3,
    date: "05. JAN 2026",
    category: "Berza",
    title: "Cena industrijske struje u padu - Pravo vreme za investicije",
    desc: "Analiza tržišta pokazuje povoljne uslove za modernizaciju rashladnih sistema u Q1 2026."
  },
  {
    id: 4,
    date: "20. DEC 2025",
    category: "Sertifikati",
    title: "EEF obnovio ISO 9001 i ISO 14001 sertifikate",
    desc: "Potvrda naše posvećenosti kvalitetu i zaštiti životne sredine prema najvišim svetskim standardima."
  }
];

export function NewsTicker() {
  return (
    <section className="py-24 bg-[#0e1035] border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Vesti Uživo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
              Industrijski <span className="text-primary">Puls</span>
            </h2>
          </div>
          <button className="text-white/60 hover:text-white flex items-center gap-2 transition-colors border-b border-white/20 hover:border-white pb-1">
            Arhiva vesti <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-primary font-mono text-xs font-bold">{item.date}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 rounded-full">{item.category}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-3">
                {item.title}
              </h3>
              
              <p className="text-white/60 text-sm mb-6 flex-grow line-clamp-4">
                {item.desc}
              </p>
              
              <div className="flex items-center text-white/40 text-xs group-hover:text-white transition-colors mt-auto">
                Pročitaj više <ArrowUpRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
