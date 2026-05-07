import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { getCounterpartPath } from "@/lib/route-map";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "compact", className = "" }: LanguageSwitcherProps) {
  const { lang, isEnglish, setLang } = useLang();
  const [location, setLocation] = useLocation();

  const switchTo = (targetLang: "sr" | "en") => {
    if ((targetLang === "en") === isEnglish) return; // Already on that language
    setLang(targetLang); // Update context immediately so components re-render
    const newPath = getCounterpartPath(location, targetLang);
    setLocation(newPath);
  };

  const toggleLanguage = () => {
    const targetLang: "sr" | "en" = isEnglish ? "sr" : "en";
    switchTo(targetLang);
  };

  if (variant === "full") {
    return (
      <div className={`flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 ${className}`}>
        <button
          onClick={() => switchTo("sr")}
          className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
            !isEnglish
              ? "text-[#0a0c29] bg-white shadow-md scale-105"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Prebaci na srpski"
        >
          SR
        </button>
        <button
          onClick={() => switchTo("en")}
          className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
            isEnglish
              ? "text-[#0a0c29] bg-white shadow-md scale-105"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer active:scale-95 ${className}`}
      aria-label={isEnglish ? "Switch to Serbian" : "Switch to English"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          {isEnglish ? "EN" : "SR"}
        </motion.span>
      </AnimatePresence>
      <span className="w-px h-3 bg-current opacity-30" />
      <span className="opacity-50">
        {isEnglish ? "SR" : "EN"}
      </span>
    </button>
  );
}
