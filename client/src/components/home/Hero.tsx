import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { RevealText } from "@/components/ui/reveal-text";
import { ArrowRight, ChevronDown } from "lucide-react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Image Layer with Overlay */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ 
            scale: 1.2,
            x: ["0%", "-2%", "0%", "2%", "0%"],
            y: ["0%", "-2%", "0%", "2%", "0%"]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "mirror", 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/hero-bg.png')" }}
        />
         <div className="absolute inset-0 bg-[#0e1035]/80 mix-blend-multiply" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent opacity-90" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center pt-24 md:pt-0">
        <div className="max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-widest mb-6 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Inženjerska Izvrsnost
          </motion.div>

          <div className="space-y-2 relative">
            <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
            <RevealText 
              text="Eko Elektrofrigo -" 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-bold text-white leading-[1.1] font-heading tracking-tight" 
              delay={0.2} 
            />
            <RevealText 
              text="Inženjering i projektovanje." 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[90px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 leading-[1.1] font-heading tracking-tight" 
              delay={0.4} 
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-mono h-[32px]"
          >
            <TypewriterText text="30 godina iskustva. 8 vrhunskih inženjera. Bezbroj referenci." />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Magnetic>
              <Button 
                size="lg" 
                className="relative bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg overflow-hidden group border border-white/10"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                Naši Projekti <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-[#171A54] px-8 py-6 text-lg transition-all duration-300"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
              >
                Usluge
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Istraži</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="border-r-2 border-primary animate-pulse pr-1">
      {displayedText}
    </span>
  );
}
