import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [location] = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show on home page or initial load
    if (location !== "/") {
      setLoading(false);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-[#171A54] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="w-full h-full bg-[url('/assets/grid-pattern.svg')] bg-repeat opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-between items-end mb-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-mono text-xs uppercase tracking-widest"
          >
            Inicijalizacija Sistema
          </motion.div>
          <motion.div 
            className="text-white font-mono text-4xl font-bold"
          >
            {Math.min(100, Math.floor(progress))}%
          </motion.div>
        </div>

        <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono text-white/40 uppercase">
          <div className="flex flex-col gap-1">
            <span>Provera Memorije</span>
            <span className={progress > 30 ? "text-primary" : "text-white/20"}>
              {progress > 30 ? "OK" : "ČEKANJE..."}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Glavni Moduli</span>
            <span className={progress > 60 ? "text-primary" : "text-white/20"}>
              {progress > 60 ? "UČITANO" : "ČEKANJE..."}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Sigurnosni Protokol</span>
            <span className={progress > 90 ? "text-primary" : "text-white/20"}>
              {progress > 90 ? "SIGURNO" : "ČEKANJE..."}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
