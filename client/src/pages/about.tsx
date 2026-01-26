import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const history = [
  {
    year: "1996",
    title: "Osnivanje",
    desc: "Početak porodičnog biznisa sa vizijom uvođenja zapadnih standarda u rashladnu tehniku.",
    stats: "2 Inženjera"
  },
  {
    year: "2006",
    title: "Industrijski Skok",
    desc: "Prvi veliki ugovor sa kompanijom Matijević. Implementacija CO2 sistema.",
    stats: "15 MW Instalirano"
  },
  {
    year: "2015",
    title: "Liderstvo",
    desc: "Postajemo glavni partner za Danfoss u regionu. Širenje na tržišta Crne Gore i BiH.",
    stats: "150+ Projekata"
  },
  {
    year: "2026",
    title: "The Green Vanguard",
    desc: "Transformacija u tehnološkog lidera zelene energije. AI monitoring i potpuna automatizacija.",
    stats: "50 GWh Uštede"
  }
];

export default function About() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-bold text-white mb-8"
          >
            Naše <span className="text-primary">Nasleđe</span>
          </motion.h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Od male porodične firme do regionalnog lidera u energetskoj efikasnosti. Ovo je putanja inženjerske izvrsnosti.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />
        
        <div className="container mx-auto px-6">
          {history.map((item, i) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center justify-between gap-12 mb-32 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div className="text-8xl font-heading font-bold text-white/5 md:text-white/10 mb-4">{item.year}</div>
                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 mb-4">{item.desc}</p>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-mono text-sm">
                  {item.stats}
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#56AA4A]" />
              </div>

              <div className="flex-1">
                 {/* Image Placeholder */}
                 <div className="aspect-video bg-white/5 border border-white/10 rounded-lg overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[#171A54]/50 group-hover:bg-transparent transition-colors duration-500" />
                    <img 
                      src={i === 0 ? "/assets/team-professional.png" : "/assets/project-drone.png"} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110 transform"
                    />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
