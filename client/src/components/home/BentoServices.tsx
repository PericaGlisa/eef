import { motion } from "framer-motion";
import { ArrowUpRight, DraftingCompass, Wrench, ShieldCheck, Lightbulb, BarChart3, Factory, CheckCircle2, Snowflake, Cpu, Layers } from "lucide-react";
import { Link } from "wouter";

const BentoItem = ({ title, description, icon: Icon, className, delay, href, tags, children }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`group relative overflow-hidden bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl p-6 md:p-8 flex flex-col justify-between ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="absolute -right-10 -top-10 bg-primary/20 w-40 h-40 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div>
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">{description}</p>

        {tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag: string, i: number) => (
              <span key={i} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70">
                {tag}
              </span>
            ))}
          </div>
        )}

        {children}
      </div>

      <div className="mt-auto pt-6 flex justify-end">
        <Link href={href || "/services"}>
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  </motion.div>
);

export function BentoServices() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary font-mono text-xs uppercase tracking-widest mb-4 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Ekspertiza
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white max-w-2xl">
              Sveobuhvatna <span className="text-primary">Rešenja</span>
            </h2>
          </div>
          <div className="max-w-md text-white/60 text-right md:text-left">
            <p>Spoj vrhunskog inženjeringa, napredne tehnologije i posvećenosti održivosti.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)]">
          {/* Main Large Item */}
          <BentoItem 
            title="Inženjering & Projektovanje" 
            description="Od idejnog rešenja do izvođačkog projekta. Naš tim inženjera koristi najsavremenije softverske alate za proračun termodinamike i 3D modelovanje."
            icon={DraftingCompass}
            className="md:col-span-2 md:row-span-1"
            delay={0.1}
            href="/services"
            tags={["3D Modelovanje", "Termodinamika", "AutoCAD", "Revit"]}
          >
            <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  Proces Projektovanja
                </h4>
                 <div className="space-y-2">
                    {[
                      "Analiza zahteva",
                      "Izbor opreme",
                      "3D modelovanje",
                      "Optimizacija"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="hidden md:flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full" />
                 <DraftingCompass className="w-24 h-24 text-white/10" />
              </div>
            </div>
            
            {/* Abstract blueprint lines decoration */}
            <div className="absolute right-0 bottom-0 w-64 h-64 opacity-10 pointer-events-none">
               <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white">
                 <path d="M10,10 L90,10 L90,90 L10,90 Z" />
                 <path d="M10,50 L90,50" />
                 <path d="M50,10 L50,90" />
                 <circle cx="50" cy="50" r="30" />
                 <path d="M20,20 L80,80" />
                 <path d="M80,20 L20,80" />
               </svg>
            </div>
          </BentoItem>
          
          {/* Side Items */}
          <BentoItem 
            title="Izvođenje Radova" 
            description="Montaža industrijskih sistema po principu 'ključ u ruke'. Preciznost u svakom varu, sigurnost u svakom spoju."
            icon={Factory}
            className="md:col-span-1 md:row-span-2"
            delay={0.2}
            href="/services"
            tags={["Sertifikovani Varioci", "Ključ u Ruke"]}
          >
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
             
             {/* Construction Crane Graphic */}
             <div className="absolute bottom-0 right-0 w-full h-2/3 opacity-10 pointer-events-none">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" className="text-white w-full h-full">
                  {/* Crane Tower */}
                  <path d="M140,180 L140,40" />
                  <path d="M130,180 L130,40" />
                  {/* Cross Bracing */}
                  <path d="M130,180 L140,160" />
                  <path d="M140,160 L130,140" />
                  <path d="M130,140 L140,120" />
                  <path d="M140,120 L130,100" />
                  <path d="M130,100 L140,80" />
                  <path d="M140,80 L130,60" />
                  <path d="M130,60 L140,40" />
                  
                  {/* Crane Arm */}
                  <path d="M100,40 L180,40" />
                  <path d="M100,40 L140,20" />
                  <path d="M140,20 L180,40" />
                  
                  {/* Cable and Hook */}
                  <path d="M110,40 L110,100" strokeDasharray="4 2" />
                  <path d="M105,100 L115,100 L110,110 Z" fill="currentColor" fillOpacity="0.5" />
                  
                  {/* Load (Pipe Segment) */}
                  <rect x="90" y="115" width="40" height="10" rx="2" stroke="currentColor" />
                </svg>
             </div>

             <div className="mt-auto relative z-10 pt-8">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span>Montaža cevovoda</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span>Elektro ormani</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-white/60">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      <span>Puštanje u rad</span>
                   </div>
                </div>
             </div>
          </BentoItem>
          
          <BentoItem 
            title="Servis & Održavanje" 
            description="24/7 monitoring i preventivno održavanje. Brz odziv servisnih ekipa širom zemlje."
            icon={Wrench}
            className="md:col-span-1 md:row-span-1"
            delay={0.3}
            href="/services"
            tags={["24/7 Podrška", "Originalni Delovi"]}
          />

          <BentoItem 
            title="Energetska Revizija" 
            description="Detaljna analiza potrošnje i ROI proračuni za maksimalnu uštedu."
            icon={BarChart3}
            className="md:col-span-1 md:row-span-1"
            delay={0.4}
            href="/services"
            tags={["ROI Analiza", "ISO 50001"]}
          />

           <BentoItem 
            title="Konsalting" 
            description="Stručno savetovanje za odabir freona i tranziciju na prirodne rashladne fluide."
            icon={Lightbulb}
            className="md:col-span-1 md:row-span-1"
            delay={0.5}
            href="/services"
            tags={["CO2 Sistemi", "Amonijak"]}
          />

           <BentoItem 
            title="Sigurnost & Kvalitet" 
            description="Implementacija najviših standarda bezbednosti i kvaliteta u rashladnoj tehnici."
            icon={ShieldCheck}
            className="md:col-span-2 md:row-span-1"
            delay={0.6}
            href="/services"
            tags={["HACCP", "Bezbednost"]}
          >
            <div className="mt-4 flex gap-4 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="px-3 py-1 border border-white/20 rounded text-xs font-mono">ISO 9001</div>
               <div className="px-3 py-1 border border-white/20 rounded text-xs font-mono">ISO 14001</div>
               <div className="px-3 py-1 border border-white/20 rounded text-xs font-mono">HACCP</div>
            </div>
          </BentoItem>
        </div>
      </div>
    </section>
  );
}
