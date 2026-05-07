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
      <div className={`relative flex items-center bg-white/5 border border-white/10 rounded-full p-1 min-w-[120px] ${className}`}>
        {/* Active Background - Always at the first position visually */}
        <div
          className="absolute left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] rounded-full bg-white shadow-[0_2px_10px_rgba(255,255,255,0.2)] z-0"
        />
        
        {/* Active Language Button */}
        <button
          onClick={() => {}} // Already active
          className="relative z-10 flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#0a0c29] cursor-default"
        >
          <div className="w-1 h-1 rounded-full bg-[#0a0c29] animate-pulse" />
          {isEnglish ? "EN" : "SR"}
        </button>

        {/* Inactive Language Button */}
        <button
          onClick={toggleLanguage}
          className="relative z-10 flex-1 flex items-center justify-center px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors cursor-pointer"
        >
          {isEnglish ? "SR" : "EN"}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`group relative flex items-center gap-2.5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-white/10 bg-white/5 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer active:scale-95 ${className}`}
      aria-label={isEnglish ? "Switch to Serbian" : "Switch to English"}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-all duration-300" />
        <span className="text-white">{isEnglish ? "EN" : "SR"}</span>
      </div>
      
      <div className="w-px h-2.5 bg-white/10" />
      
      <div className="flex items-center gap-1.5 opacity-40 transition-opacity group-hover:opacity-70">
        <span>{isEnglish ? "SR" : "EN"}</span>
      </div>
    </button>
  );
}
