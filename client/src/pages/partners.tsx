import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, CheckCircle2, ArrowRight, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Link } from "wouter";

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
    color: "bg-[#F97316]", // GVN orange
    logo: "/assets/partners/gvn.png"
  },
  { 
    id: "isolcell",
    name: "Isolcell", 
    role: "Lider u Kontrolisanoj Atmosferi",
    description: "Posebnu pažnju Eko Elektrofrigo posvećuje projektovanju hladnjača sa kontrolisanom atmosferom. Kako je kod ovakvih sistema kvalitet same opreme presudan za kontrolu atmosfere, Eko Elektrofrigo se odlučio za saradnju sa liderom u oblasti proizvodnje ovakve opreme, kompaniju Isolcell. Kompanija Isolcell predstavlja pionira u ovoj oblasti i proizvođača najkvalitetnije opreme za sisteme sa kontrolisanom atmosferom preko 60 godina.",
    link: "https://www.isolcell.com/en/",
    color: "bg-[#E31E24]", // Isolcell red
    logo: "/assets/partners/isolcell.png"
  }
];

export default function Partners() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-background min-h-screen" ref={containerRef}>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 md:pt-48 pb-20 md:pb-32 relative overflow-hidden bg-[#0e1035]">
        {/* Modern Technical Background */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/80 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             <img 
               src="/assets/hero-slide-2.jpg" 
               alt="Partners Network"  
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-mono mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Globalna Mreža
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              Strateški <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Partneri</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed border-l-4 border-primary/50 pl-6">
              Povezujemo se samo sa najboljima. Naša snaga leži u saradnji sa globalnim liderima 
              koji dele našu viziju kvaliteta, inovacija i pouzdanosti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-20 z-50 bg-[#0e1035]/80 backdrop-blur-xl border-y border-white/5 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-4 md:justify-center">
             {partners.map((partner) => (
               <button
                 key={partner.id}
                 onClick={() => {
                   document.getElementById(partner.id)?.scrollIntoView({ behavior: 'smooth' });
                 }}
                 className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/5 transition-all group shrink-0"
               >
                 <div className={`w-2 h-2 rounded-full ${partner.color} shadow-[0_0_8px_currentColor] group-hover:scale-125 transition-transform`} />
                 <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors whitespace-nowrap">
                   {partner.name}
                 </span>
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Partners Sections */}
      <div className="flex flex-col">
        {partners.map((partner, index) => {
          // Force light theme for Alfa Lu-Ve, Isolcell, and Danfoss as requested by user
          // Otherwise keep alternating pattern
          const isForceLight = partner.id === 'luve' || partner.id === 'isolcell' || partner.id === 'danfoss';
          const isLight = isForceLight ? true : index % 2 === 0;
          
          return (
            <section 
              id={partner.id}
              key={partner.id} 
              className={`py-24 md:py-32 relative overflow-hidden scroll-mt-32 ${isLight ? 'bg-[#F5F7FA]' : 'bg-[#0e1035]'}`}
            >
              {/* Soft transition gradient */}
              <div 
                className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b pointer-events-none z-10 ${
                  isLight ? 'from-[#0e1035]/5' : 'from-[#F5F7FA]/5'
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
  const bgBadge = isLight ? "bg-white shadow-sm border border-[#171A54]/10" : "bg-white/5 border border-white/10";
  const cardBg = isLight ? "bg-white border-[#171A54]/5 shadow-2xl" : "bg-white/5 border-white/10 backdrop-blur-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
    >
      {/* Content Side */}
      <div className="flex-1 space-y-8">
         <div className="flex items-center gap-4 mb-2">
           <div className="flex items-center gap-2">
             <span className={`h-2 w-2 rounded-full ${partner.color} animate-pulse`} />
             <span className={`h-[1px] w-12 ${isLight ? 'bg-[#171A54]/20' : 'bg-white/20'}`} />
           </div>
           <span className="text-primary font-mono uppercase tracking-widest text-sm font-bold">
             {partner.role}
           </span>
         </div>
         
         <h2 className={`text-4xl md:text-6xl font-heading font-bold ${textColor} leading-tight`}>
           {partner.name}
         </h2>
         
         <div className={`${mutedTextColor} text-lg leading-relaxed space-y-4 font-light`}>
           <p>{partner.description}</p>
           {partner.subtext && <p className="pl-4 border-l-2 border-primary/30 italic">{partner.subtext}</p>}
         </div>

         {partner.products && (
           <div className="flex flex-wrap gap-3 pt-2">
             {partner.products.map((prod, i) => (
               <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${bgBadge} text-sm font-medium ${isLight ? 'text-[#171A54]' : 'text-white/90'} transition-transform hover:-translate-y-1`}>
                 <div className={`w-1.5 h-1.5 rounded-full ${partner.color}`} />
                 {prod}
               </div>
             ))}
           </div>
         )}

         <div className="flex flex-wrap gap-4 pt-6">
           <Button 
              asChild 
              className={`h-12 px-8 rounded-full font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 ${partner.color}`}
           >
             <a href={partner.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
               Posetite Sajt
               <ExternalLink className="w-4 h-4" />
             </a>
           </Button>
           
           <Button 
              asChild 
              variant="outline" 
              className={`h-12 px-8 rounded-full border-2 font-bold hover:bg-transparent transition-all duration-300 ${isLight ? 'border-[#171A54]/10 hover:border-[#171A54] text-[#171A54]' : 'border-white/10 hover:border-white text-white'}`}
           >
             <Link href="/references" className="flex items-center gap-2">
               <MousePointerClick className="w-4 h-4" />
               Pogledajte Reference
             </Link>
           </Button>
         </div>
      </div>

      {/* Visual Side - Tech Card */}
      <div className="flex-1 w-full">
        <div className={`relative aspect-square md:aspect-video lg:aspect-square w-full rounded-[2rem] overflow-hidden border group ${cardBg}`}>
           {/* Technical Grid Overlay */}
           <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.03]" />
           
           {/* Background with brand color tint */}
           <div className={`absolute inset-0 ${partner.color} opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500`} />
           
           {/* Center Initial/Logo Placeholder */}
           <div className="absolute inset-0 flex items-center justify-center p-12 md:p-20">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Glow effect behind logo */}
                <div className={`absolute inset-0 ${partner.color} blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                
                {/* Logo Image */}
                {!imgError ? (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="relative z-10 w-full h-full object-contain drop-shadow-xl filter grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <h3 className={`relative text-6xl md:text-9xl font-heading font-bold ${isLight ? 'text-[#171A54]' : 'text-white'} opacity-10 select-none group-hover:scale-110 transition-transform duration-700`}>
                    {partner.name.split(' ')[0]}
                  </h3>
                )}
              </div>
           </div>

           {/* Tech UI Elements */}
           <div className={`absolute top-0 left-0 p-6 font-mono text-xs tracking-widest opacity-40 ${isLight ? 'text-[#171A54]' : 'text-white'}`}>
             PARTNER_ID: {partner.id.toUpperCase()}
           </div>
           
           <div className="absolute bottom-6 right-6 flex gap-2">
             <div className={`w-2 h-2 rounded-full ${partner.color}`} />
             <div className={`w-2 h-2 rounded-full ${partner.color} opacity-50`} />
             <div className={`w-2 h-2 rounded-full ${partner.color} opacity-25`} />
           </div>

           {/* Corner Accents */}
           <svg className={`absolute top-6 right-6 w-6 h-6 opacity-30 ${isLight ? 'text-[#171A54]' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M5 5h14v14" />
           </svg>
           <svg className={`absolute bottom-6 left-6 w-6 h-6 opacity-30 ${isLight ? 'text-[#171A54]' : 'text-white'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M19 19H5V5" />
           </svg>
        </div>
      </div>
    </motion.div>
  );
}
