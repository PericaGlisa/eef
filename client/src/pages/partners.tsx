import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const partners = [
  { 
    id: "bitzer",
    name: "Bitzer", 
    role: "Distributer za Srbiju",
    description: "Kompanija Eko Elektrofrigo je distributer proizvoda kompanije Bitzer za teritoriju Republike Srbije. Bitzer Group već 86 godina daje ključan doprinos inovativnim proizvodima i uslugama iz oblasti tehnologije hlađenja i klimatizacije. Danas kompanija Bitzer predstavlja vodećeg svetskog proizvođača kompresora, prepoznatljivih po svojoj efikasnosti, operativnoj pouzdanosti i niskim troškovima životog ciklusa u najrazličitijim, kako industrijskim, tako i komercijalnim sistemima hlađenja. Svojim kvalitetom Bitzer kompresori garantuju stabilan i pouzdan rad sistema čiji su ključan deo.",
    products: ["Klipni kompresori", "Vijčani kompresori", "Scroll kompresori"],
    link: "https://www.bitzer.de/us/en/",
    color: "bg-[#00965e]", // Bitzer green approximation
    logo: "/assets/partners/bitzer.png"
  },
  { 
    id: "danfoss",
    name: "Danfoss", 
    role: "Distributer za Srbiju",
    description: "Kompanija Eko Elektrofrigo je distributer proizvoda kompanije Danfoss za teritoriju Republike Srbije. Danfoss predstavlja vodećeg svetskog proizvođača i distributera automatike za industriju hlađenja i klimatizacije. Prodajni asortiman proizvoda za oblast industrijskog hlađenja predstavlja najkompletniji na svetskom tržištu. Primena Danfoss komponenti je široka, od instalacija u komercijalnom hlađenju, do velikih industrijskih sistema hlađenja.",
    subtext: "Danfossov proizvodni program ,,Climate Solutions za hlađenje’’ obuhvata kompletnu i široku paletu ventila (nepovratni, kontrolni i regulacioni, ekspanzioni, sigurnosni, elektromagnetni, zaustavni...), zatim elektronskih kontrolera, prekidača, senzora i transmitera, filtera i hvatača nečistoća, kao i kompresora i kondenzacijskih jedinica.",
    link: "https://www.danfoss.com/sr-rs/",
    color: "bg-[#D5121E]", // Danfoss red
    logo: "/assets/partners/danfoss.png"
  },
  { 
    id: "alfalaval",
    name: "Alfa Laval", 
    role: "Generalni Zastupnik",
    description: "Kompanija Eko Elektrofrigo je generalni zastupnik i distributer proizvoda kompanije Alfa Laval za teritoriju Republike Srbije. Sa iskustvom od 80 godina u inovacijama prenosa toplote, Alfa Laval je danas kompanija koja svojim proizvodima obezbeđuje sigurnost i maksimalne performanse za bilo koju primenu.",
    subtext: "U našoj ponudi proizvoda kompanije Alfa Laval se nalaze pločasti izmenjivači toplote. Predstavljaju savršeno dizajnirane jedinice, optimizovane tako da obezbeđuju vrhunske toplotne performanse, a pre svega maksimalnu pouzdanost. Osmišljeni su i konstruisani na način da postižu najveći mogući toplotni učinak, a najmanji mogući ekološki otisak. Primenu pronalaze u najrazličitijim sistemima koji imaju potrebu za izmenjivačima toplote, od komercijalnog i industrijskog hlađenja, procesnih čilera, pa do toplotnih pumpi.",
    link: "https://www.alfalaval.rs/",
    color: "bg-[#005494]", // Alfa Laval blue
    logo: "/assets/partners/alfalaval.png"
  },
  { 
    id: "luve",
    name: "Alfa Lu-Ve", 
    role: "Distributer za Srbiju",
    description: "Kompanija Eko Elektrofrigo je distributer proizvoda kompanije Alfa Lu-Ve za teritoriju Republike Srbije. Višedecenijsko iskustvo u oblasti proizvodnje i distribucije vazdušnih hladnjaka i kondenzatora svrstava kompaniju Alfa Lu-Ve u jednog od vodećih distributera za ovu vrstu proizvoda u Evropi.",
    subtext: "Proizvodi se odlikuju visokim tehničkim standardima, čiji dizajn je baziran na konkretnim uslovima primene i eksploatacije. Izbor potrebnih hladnjaka vazduha i kondenzatora je moguće izvršiti u širokom dijapazonu ponuđenih modela, čime se osigurava primena najpogodnijeg uređaja za konkretan slučaj. Uređaji su sertifikovani od strane EUROVENTa.",
    link: "https://alfa.luvegroup.com/",
    color: "bg-[#008AC9]", // Lu-Ve blue
    logo: "/assets/partners/luve.png"
  },
  { 
    id: "gvn",
    name: "Güven Soğutma", 
    role: "Premium Partner",
    description: "Güven Soğutma je danas jedan od vodećih brendova na međunarodnom tržištu iz oblasti proizvodnje posuda pod visokim pritiskom i rashladne opreme za industrijski sektor hlađenja. Eko Elektrofrigo u svoje rashladne agregate ugrađuje širok spektar GVN opreme, od resivera, rezervoara ulja, separatora ulja, regulatora nivoa ulja, do filtera i prateće armature. Preko 35 godina iskustva u proizvodnji ove opreme i konstantan rast kompanije garantuju njen najviši kvalitet.",
    link: "http://www.gvn.com.tr/",
    color: "bg-[#E31E24]", // GVN red
    logo: "/assets/partners/gvn.png"
  },
  { 
    id: "isolcell",
    name: "Isolcell", 
    role: "Lider u Kontrolisanoj Atmosferi",
    description: "Posebnu pažnju Eko Elektrofrigo posvećuje projektovanju hladnjača sa kontrolisanom atmosferom. Kako je kod ovakvih sistema kvalitet same opreme presudan za kontrolu atmosfere, Eko Elektrofrigo se odlučio za saradnju sa liderom u oblasti proizvodnje ovakve opreme, kompaniju Isolcell. Kompanija Isolcell predstavlja pionira u ovoj oblasti i proizvođača najkvalitetnije opreme za sisteme sa kontrolisanom atmosferom preko 60 godina.",
    link: "https://www.isolcell.com/en/",
    color: "bg-[#8BC53F]", // Isolcell green
    logo: "/assets/partners/isolcell.png"
  }
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
              Strateški <span className="text-primary">Partneri</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Povezujemo se samo sa najboljima. Naša snaga leži u saradnji sa globalnim liderima 
              koji dele našu viziju kvaliteta, inovacija i pouzdanosti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Sections */}
      <div className="flex flex-col">
        {partners.map((partner, index) => {
          const isLight = index % 2 === 0;
          return (
            <section 
              key={partner.id} 
              className={`py-16 md:py-24 relative overflow-hidden ${isLight ? 'bg-[#F5F7FA]' : 'bg-[#0e1035]'}`}
            >
              {/* Soft transition gradient */}
              <div 
                className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b pointer-events-none z-10 ${
                  isLight ? 'from-[#0e1035]/10' : 'from-[#F5F7FA]/10'
                } to-transparent`} 
              />

              <div className="container mx-auto px-6 relative z-10">
                <PartnerCard partner={partner} index={index} isLight={isLight} />
              </div>
            </section>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}

function PartnerCard({ partner, index, isLight }: { partner: typeof partners[0], index: number, isLight: boolean }) {
  const [imgError, setImgError] = useState(false);
  
  // Dynamic classes based on theme
  const textColor = isLight ? "text-[#171A54]" : "text-white";
  const mutedTextColor = isLight ? "text-[#171A54]/70" : "text-white/70";
  const borderColor = isLight ? "border-[#171A54]/10" : "border-white/10";
  const bgBadge = isLight ? "bg-[#171A54]/5" : "bg-white/5";
  const cardBg = isLight ? "bg-white border-[#171A54]/5 shadow-xl" : "bg-black/20 border-white/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-6">
         <div className="flex items-center gap-4 mb-2">
           <span className={`h-[2px] w-12 ${partner.color}`} />
           <span className="text-primary font-mono uppercase tracking-widest text-sm font-bold">
             {partner.role}
           </span>
         </div>
         
         <h2 className={`text-4xl md:text-5xl font-heading font-bold ${textColor}`}>
           {partner.name}
         </h2>
         
         <div className={`${mutedTextColor} text-lg leading-relaxed space-y-4`}>
           <p>{partner.description}</p>
           {partner.subtext && <p>{partner.subtext}</p>}
         </div>

         {partner.products && (
           <div className="flex flex-wrap gap-3 pt-4">
             {partner.products.map((prod, i) => (
               <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bgBadge} border ${borderColor} text-sm ${isLight ? 'text-[#171A54]/80' : 'text-white/80'}`}>
                 <CheckCircle2 className="w-3 h-3 text-primary" />
                 {prod}
               </div>
             ))}
           </div>
         )}

         <div className="pt-6">
           <Button 
              asChild 
              variant="outline" 
              className={`group ${borderColor} hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 ${textColor}`}
           >
             <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
               Posetite Sajt
               <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </a>
           </Button>
         </div>
      </div>

      {/* Visual Side - Abstract Card */}
      <div className="flex-1 w-full">
        <div className={`relative aspect-square md:aspect-video lg:aspect-square w-full rounded-3xl overflow-hidden border group ${cardBg}`}>
           {/* Background with brand color tint */}
           <div className={`absolute inset-0 ${partner.color} ${isLight ? 'opacity-5' : 'opacity-10'} group-hover:opacity-20 transition-all duration-500`} />
           
           {/* Grid Pattern */}
           <div className={`absolute inset-0 bg-[linear-gradient(${isLight ? 'rgba(23,26,84,0.05)' : 'rgba(255,255,255,0.05)'}_1px,transparent_1px),linear-gradient(90deg,${isLight ? 'rgba(23,26,84,0.05)' : 'rgba(255,255,255,0.05)'}_1px,transparent_1px)] bg-[size:40px_40px] opacity-30`} />

           {/* Center Initial/Logo Placeholder */}
           <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className={`absolute inset-0 ${partner.color} blur-[100px] opacity-20`} />
                
                {/* Logo Image */}
                {!imgError ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback Text */
                  <h3 className={`relative text-6xl md:text-8xl font-heading font-bold ${isLight ? 'text-[#171A54]' : 'text-white'} opacity-20 select-none group-hover:scale-110 transition-transform duration-700`}>
                    {partner.name.split(' ')[0]}
                  </h3>
                )}
              </div>
           </div>

           {/* Corner Accents */}
           <div className={`absolute top-8 left-8 w-16 h-[1px] ${isLight ? 'bg-[#171A54]/20' : 'bg-white/20'}`} />
           <div className={`absolute top-8 left-8 w-[1px] h-16 ${isLight ? 'bg-[#171A54]/20' : 'bg-white/20'}`} />
           
           <div className={`absolute bottom-8 right-8 w-16 h-[1px] ${isLight ? 'bg-[#171A54]/20' : 'bg-white/20'}`} />
           <div className={`absolute bottom-8 right-8 w-[1px] h-16 ${isLight ? 'bg-[#171A54]/20' : 'bg-white/20'}`} />
        </div>
      </div>
    </motion.div>
  );
}
