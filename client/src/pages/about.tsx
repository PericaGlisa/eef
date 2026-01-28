import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail, Lightbulb, Wrench, Factory, Key, ShieldCheck, GraduationCap, Truck, Settings } from "lucide-react";

const values = [
  {
    title: "SAVREMENA REŠENJA",
    desc: "Lider u inovacijama od 1996. Koristimo najsavremeniju tehnologiju prilagođenu zahtevima investitora.",
    icon: Lightbulb
  },
  {
    title: "INŽENJERING",
    desc: "30 godina iskustva i tim od 8 inženjera garantuju najviši kvalitet. Kreativan timski rad za ostvarenje vaših zahteva.",
    icon: Wrench
  },
  {
    title: "PROIZVODNJA",
    desc: "Sopstvena radionica sa iskusnim timom majstora gde stvaramo proizvode prema specifičnim zahtevima klijenata.",
    icon: Factory
  },
  {
    title: "KLJUČ U RUKE",
    desc: "Realizacija najsavremenijih projekata hladnjača po principu 'ključ u ruke' sa pouzdanim timom saradnika.",
    icon: Key
  },
  {
    title: "KVALITET I POUZDANOST",
    desc: "Beskompromisan akcenat na kvalitet i pouzdanost usluga i proizvoda za dugoročnu saradnju sa investitorima.",
    icon: ShieldCheck
  },
  {
    title: "TRENING I OBUKA",
    desc: "Organizacija treninga i obuka korisnika prilikom primopredaje proizvoda i objekata.",
    icon: GraduationCap
  },
  {
    title: "DISTRIBUTERI OPREME",
    desc: "Glavni distributer za Bitzer, Danfoss, Alfa Lu-Ve za Srbiju. Isporuka delova i opreme.",
    icon: Truck
  },
  {
    title: "ODRŽAVANJE I SERVIS",
    desc: "Redovno preventivno održavanje i podrška 24/7 uz obezbeđeno snabdevanje rezervnim delovima.",
    icon: Settings
  }
];

const history = [
  {
    year: "1996",
    title: "Osnivanje & Danfoss",
    desc: "Osnivanje Eko Elekofrigo kao trgovačke kompanije i potpisivanje prvog ugovora o distribuciji sa kompanijom Danfoss.",
    stats: "Početak",
    image: "/assets/project-drone.png"
  },
  {
    year: "1998",
    title: "Bitzer & Prvi Inženjering",
    desc: "Potpisivanje ugovora sa Bitzerom. Prvi samostalni inženjering posao rashladnih instalacija u prvom megamarket objektu u Srbiji.",
    stats: "Megamarket",
    image: "/assets/hero-bg.png"
  },
  {
    year: "2000",
    title: "Alfa Laval",
    desc: "Eko Elektrofrigo postaje generalni distributer za proizvode kompanije Alfa Laval.",
    stats: "Distribucija",
    image: "/assets/project-drone.png"
  },
  {
    year: "2002",
    title: "Hladnjače za Maline",
    desc: "Prvo samostalno projektovanje i izvođenje hladnjača za zamrzavanje i skladištenje maline. 5 hladnjača, ukupno 4000 tona.",
    stats: "4000 tona",
    image: "/assets/hero-bg.png"
  },
  {
    year: "2006",
    title: "IM Matijević & Inovacije",
    desc: "Projektovanje za IM Matijević (100t/dan). Prvi 'ključ u ruke' projekat, prva ULO hladnjača (Slankamen) i najveći tuneli za zamrzavanje (Frucom Arilje).",
    stats: "Ključ u ruke",
    image: "/assets/project-drone.png"
  },
  {
    year: "2009",
    title: "Pumpni Sistem R404a",
    desc: "U Industriji mesa Matijević kompletiran pumpni sistem freona R404a za šest pločastih vertikalnih zamrzivača.",
    stats: "R404a Sistem",
    image: "/assets/hero-bg.png"
  },
  {
    year: "2012",
    title: "Energetska Efikasnost",
    desc: "Hladnjača 'Zadrugar' (4000t), energetski najefikasnija u Srbiji sa tri tunela za smrzavanje (3x30t/dan).",
    stats: "Najefikasnija",
    image: "/assets/project-drone.png"
  },
  {
    year: "2014",
    title: "Izlazak na EU Tržište",
    desc: "Prvi projekti Eko Elektrofriga u inostranstvu: Hrvatska, Slovenija, Poljska...",
    stats: "EU Projekti",
    image: "/assets/hero-bg.png"
  },
  {
    year: "2020",
    title: "Celanova ULO",
    desc: "Najveći realizovani projekat: ULO hladnjača za jabuku 'Celanova' u Vršcu, kapaciteta 10,000 tona.",
    stats: "10,000 tona",
    image: "/assets/project-drone.png"
  }
];

const team = [
  { name: "Marko Petrović", role: "Glavni Inženjer", img: "/assets/team-professional.png" },
  { name: "Ana Jovanović", role: "Dizajner Sistema", img: "/assets/team-professional.png" }, // Using placeholder
  { name: "Nikola Đorđević", role: "Servisni Menadžer", img: "/assets/team-professional.png" },
  { name: "Jelena Nikolić", role: "R&D Specijalista", img: "/assets/team-professional.png" }
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
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
              Od Osnivanja do <br />
              <span className="text-primary">Industrijskog Lidera</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              30 godina inovacija, inženjerske preciznosti i posvećenosti energetskoj efikasnosti. 
              Mi nismo samo izvođači radova - mi smo arhitekte održive budućnosti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 bg-background relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold text-white mb-8">
                O Kompaniji <span className="text-primary">Eko Elektrofrigo</span>
              </h2>
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>
                  Kompanija Eko Elektrofrigo d.o.o. je porodično preduzeće osnovano 1996. godine, koje od prvih dana svog poslovanja teži inovativnim rešenjima iz oblasti rashladne tehnike. U sektoru industrijskog hlađenja u Republici Srbiji i regionu, Eko Elektrofrigo je danas jedan od lidera.
                </p>
                <p>
                  Odlikujemo se veoma kompleksnom i jedinstvenom ponudom rashladnih proizvoda, gde se, kao glavni adut, ističe sposobnost za projektovanjem i izvođenjem nestandardizovanih rešenja, potpuno prilagođenih zahtevima investitora.
                </p>
                <p>
                  Kompanija danas pokriva oblast industrijske rashladne opreme, komercijalnih rashladnih uređaja, industrijske opreme za preradu mesa, povrća i voća, sa kompletnom linijom profesionalnih usluga od konsaltinga, projektovanja, prodaje opreme, do montaže i na kraju održavanja.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#0e1035] p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Naša Misija</h3>
              <ul className="space-y-4">
                {[
                  "Kompletan asortiman opreme uz tehničku podršku",
                  "Izbor najoptimalnijih tehničkih rešenja",
                  "Oprema međunarodno priznatih proizvođača",
                  "Stručna i profesionalna montaža",
                  "Redovno održavanje i servis",
                  "Siguran i pouzdan rad"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-[#0e1035]/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-white mb-4">
              Zašto <span className="text-primary">Eko Elektrofrigo?</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Decenije iskustva i posvećenosti kvalitetu nas čine vašim idealnim partnerom.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-background/50 border border-white/5 rounded-xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <val.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative">
        {/* Progress Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 h-full">
           <motion.div 
             className="w-full bg-primary origin-top"
             style={{ scaleY, height: "100%" }}
           />
        </div>
        
        <div className="container mx-auto px-6 pl-12 md:pl-6">
          {history.map((item, i) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center justify-between gap-12 mb-32 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} w-full`}>
                <div className="text-6xl md:text-8xl font-heading font-bold text-white/5 md:text-white/10 mb-4 transition-colors hover:text-primary/20 duration-500 cursor-default">
                  {item.year}
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 mb-4 text-lg">{item.desc}</p>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-none border-l-2 border-primary font-mono text-sm">
                  {item.stats}
                </div>
              </div>
              
              <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12">
                <div className="w-4 h-4 bg-background border-2 border-primary rounded-full z-20" />
                <div className="absolute w-12 h-12 bg-primary/20 rounded-full animate-ping opacity-20" />
              </div>

              <div className="flex-1 w-full">
                 <div className="aspect-video bg-white/5 border border-white/10 overflow-hidden relative group shadow-2xl">
                    <div className="absolute inset-0 bg-[#171A54]/60 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 z-20 mix-blend-overlay" />
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform scale-100 group-hover:scale-105"
                    />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-[#0e1035] border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Upoznajte <span className="text-primary">Inženjere</span>
              </h2>
              <p className="text-white/60 max-w-2xl">
                Tim stručnjaka koji stoji iza svakog uspešnog projekta. Ljudi koji pretvaraju izazove u rešenja.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative bg-white/5 border border-white/10">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:filter group-hover:grayscale group-hover:contrast-125"
                    />
                    {/* Technical Drawing Overlay Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:10px_10px]" />
                    <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 m-4" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-background/90 backdrop-blur-sm border-t border-primary/20 flex justify-center gap-4">
                      <a href="#" className="text-white hover:text-primary"><Linkedin className="w-5 h-5" /></a>
                      <a href="#" className="text-white hover:text-primary"><Mail className="w-5 h-5" /></a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-primary font-mono text-sm">{member.role}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
