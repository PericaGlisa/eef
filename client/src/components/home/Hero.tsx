import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowRight, Cpu, Snowflake, Wind, Settings, Zap } from "lucide-react";

const FloatingIcon = ({ icon: Icon, initialX, initialY, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: initialX, y: initialY }}
    animate={{ 
        opacity: [0.05, 0.15, 0.05], 
        y: [initialY, initialY - 30, initialY],
        rotate: [0, 10, -10, 0]
    }}
    transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay: delay,
        ease: "easeInOut"
    }}
    className="absolute text-primary/20 pointer-events-none z-10"
  >
    <Icon size={64} strokeWidth={1} />
  </motion.div>
);

const heroSlides = [
  "/assets/hero-slide-1.webp",
  "/assets/hero-slide-2.webp",
  "/assets/hero-slide-3.webp",
  "/assets/hero-slide-4.webp",
  "/assets/hero-slide-5.webp"
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [firstSlideReady, setFirstSlideReady] = useState(false);
  const [enableBackgroundMotion, setEnableBackgroundMotion] = useState(false);
  const reduceMotion = useReducedMotion();

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldAnimateBackground = !isMobile && !reduceMotion;

  useEffect(() => {
    const img = new Image();
    img.src = heroSlides[0];
    img.onload = () => setFirstSlideReady(true);
  }, []);

  useEffect(() => {
    if (!shouldAnimateBackground || !firstSlideReady) {
      setCurrentSlide(0);
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [shouldAnimateBackground, firstSlideReady]);

  useEffect(() => {
    if (!shouldAnimateBackground) return;
    const nextIndex = (currentSlide + 1) % heroSlides.length;
    const img = new Image();
    img.src = heroSlides[nextIndex];
  }, [currentSlide, shouldAnimateBackground]);

  useEffect(() => {
    if (!firstSlideReady) return;
    const rafId = window.requestAnimationFrame(() => setEnableBackgroundMotion(true));
    return () => window.cancelAnimationFrame(rafId);
  }, [firstSlideReady]);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[100dvh] md:h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Image Layer with Overlay */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <motion.img 
          src={heroSlides[currentSlide]}
          alt={currentSlide === 0 ? "Industrijska rashladna tehnika" : `Slide ${currentSlide + 1}`}
          initial={false}
          animate={
            enableBackgroundMotion && shouldAnimateBackground
              ? {
                  opacity: 1,
                  scale: 1.12,
                  x: ["0%", "-1.5%", "0%", "1.5%", "0%"],
                  y: ["0%", "-1.5%", "0%", "1.5%", "0%"],
                }
              : { opacity: 1, scale: 1.02, x: "0%", y: "0%" }
          }
          transition={
            enableBackgroundMotion && shouldAnimateBackground
              ? {
                  scale: { duration: 22, ease: "linear" },
                  x: { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  y: { duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                }
              : { opacity: { duration: 0 } }
          }
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          loading={currentSlide === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={currentSlide === 0 ? "high" : "low"}
          width={1920}
          height={1080}
          onLoad={() => {
            if (currentSlide === 0) setFirstSlideReady(true);
          }}
        />
        
         {/* Lightened overlays for reliability/clarity */}
        <div className="absolute inset-0 bg-[#0e1035]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-[#0e1035]/40 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(86,170,74,0.03),transparent_70%)]" /> {/* Subtle brand green tint */}
         
         {/* Technical Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]" />
         
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" />
      </motion.div>

      {/* Floating Technical Icons - Hidden on mobile for better performance */}
      {!reduceMotion && (
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcon icon={Snowflake} initialX="10%" initialY="20%" delay={0} />
          <FloatingIcon icon={Cpu} initialX="85%" initialY="15%" delay={2} />
          <FloatingIcon icon={Wind} initialX="75%" initialY="65%" delay={1} />
          <FloatingIcon icon={Settings} initialX="15%" initialY="70%" delay={3} />
          <FloatingIcon icon={Zap} initialX="50%" initialY="85%" delay={1.5} />
      </div>
      )}



      {/* Content Layer */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 h-full flex flex-col justify-center pt-32 pb-16 sm:pt-32 sm:pb-20 md:pt-20 md:pb-0 lg:pt-32">
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-widest mb-6 hover:bg-white/10 transition-colors cursor-default shadow-[0_0_20px_rgba(86,170,74,0.1)] group"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(86,170,74,0.8)] group-hover:scale-150 transition-transform"></span>
            Lider u industrijskoj rashladi
          </motion.div>

          <div className="space-y-4 relative">
            <div className="absolute -inset-20 bg-primary/20 blur-[120px] rounded-full opacity-40 pointer-events-none" />
            
            {/* Split Headline for Modern Look */}
            <motion.h1 
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-[0.9] font-heading tracking-tight drop-shadow-2xl"
            >
              Inženjerska <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50 relative">
                Izvrsnost.
                <svg className="absolute -bottom-4 left-0 w-1/2 h-4 text-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/60 font-light max-w-2xl border-l-2 border-primary/30 pl-6 mt-6"
            >
              Projektovanje, izvođenje i održavanje <span className="text-white font-medium">najsavremenijih</span> rashladnih sistema.
            </motion.p>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="text-base sm:text-lg text-white/40 font-mono h-[32px] flex items-center gap-3 mt-4"
          >
             <div className="w-1 h-8 bg-primary/50" />
            <TypewriterText text="30 godina tradicije. 350+ projekata." />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 pt-8"
          >
            <Magnetic>
              <Button 
                size="lg" 
                className="relative bg-primary hover:bg-primary/90 text-white px-6 py-3 text-base md:px-9 md:py-6 md:text-lg overflow-hidden group border border-white/10 shadow-[0_0_30px_rgba(86,170,74,0.35)] hover:shadow-[0_0_60px_rgba(86,170,74,0.55)] transition-all duration-500 rounded-full"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                asChild
              >
                <Link href="/kontakt">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  Zatražite rešenje <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button 
                size="lg" 
                variant="ghost" 
                className="text-white/70 hover:text-white px-6 py-3 text-base md:px-6 md:py-6 md:text-lg transition-all duration-300 rounded-full"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                asChild
              >
                <Link href="/eko-rashlada">Pogledajte rešenja</Link>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: isMobile ? 1.9 : 1.2 }}
            className="flex flex-wrap items-center gap-3 text-[10px] sm:text-xs uppercase tracking-widest text-white/50"
          >
            <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">350+ projekata</span>
            <span className="px-3 py-2 rounded-full bg-white/5 border border-white/10">ISO 9001</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-6 flex md:hidden flex-col items-center gap-2 text-white/50"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-primary/80">Skrolujte dalje</span>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-2 md:bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-primary/80">Skrolujte dalje</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
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
    <span>
      {displayedText}
    </span>
  );
}
