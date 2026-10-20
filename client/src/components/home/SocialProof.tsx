import { motion } from "framer-motion";

export function SocialProof() {
  const partners = [
    "Bitzer", "Danfoss", "Alfa Laval", "Alfa Lu-Ve", "Güven Soğutma", 
    "Isolcell", "Sanyo", "Copeland", "Hongsen", "Eko Coolmax"
  ];

  return (
    <section className="content-auto py-10 border-b border-white/5 bg-[#0e1035] overflow-hidden relative z-20">
      <div className="flex items-center h-full" style={{ maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)" }}>
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center"
        >
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center">
              <span
                className="text-5xl md:text-7xl font-bold font-heading text-transparent transition-all duration-500 cursor-default uppercase tracking-widest hover:text-white hover:scale-105 transform px-8 md:px-16 select-none"
                style={{ 
                  WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                  textShadow: "0 0 20px rgba(86,170,74,0.1)"
                }}
              >
                {partner}
              </span>
              <span className="text-primary/80 text-xl md:text-2xl filter drop-shadow-[0_0_8px_rgba(86,170,74,0.8)]">✦</span>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center"
        >
          {partners.map((partner, index) => (
            <div key={`clone-${index}`} className="flex items-center">
              <span
                className="text-5xl md:text-7xl font-bold font-heading text-transparent transition-all duration-500 cursor-default uppercase tracking-widest hover:text-white hover:scale-105 transform px-8 md:px-16 select-none"
                style={{ 
                  WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                  textShadow: "0 0 20px rgba(86,170,74,0.1)"
                }}
              >
                {partner}
              </span>
              <span className="text-primary/80 text-xl md:text-2xl filter drop-shadow-[0_0_8px_rgba(86,170,74,0.8)]">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
    </section>
  );
}
