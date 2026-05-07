import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Lang = "sr" | "en";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  isEnglish: boolean;
  isSerbian: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "sr",
  setLang: () => {},
  toggleLang: () => {},
  isEnglish: false,
  isSerbian: true,
});

export function useLang() {
  return useContext(LanguageContext);
}

function detectLangFromPath(): Lang {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/en")) return "en";
  }
  return "sr";
}

function detectLangFromStorage(): Lang | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("eef-lang");
    if (stored === "en" || stored === "sr") return stored;
  }
  return null;
}

function detectLangFromBrowser(): Lang {
  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) return "en";
  }
  return "sr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return detectLangFromPath() || detectLangFromStorage() || detectLangFromBrowser();
  });

  const isEnglish = lang === "en";
  const isSerbian = lang === "sr";

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("eef-lang", newLang);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === "sr" ? "en" : "sr");
  }, [lang, setLang]);

  // Sync with URL changes (wouter navigation, back button, direct URL)
  useEffect(() => {
    const syncLang = () => {
      const pathLang = detectLangFromPath();
      if (pathLang !== lang) {
        setLangState(pathLang);
      }
    };
    syncLang();

    // Listen for browser back/forward
    const handlePopState = () => syncLang();
    window.addEventListener("popstate", handlePopState);

    // Listen for pushState/replaceState (used by wouter and other SPA routers)
    // history.pushState does NOT fire popstate, so we patch it
    const originalPushState = history.pushState.bind(history);
    const originalReplaceState = history.replaceState.bind(history);
    history.pushState = (...args: Parameters<typeof history.pushState>) => {
      originalPushState(...args);
      syncLang();
    };
    history.replaceState = (...args: Parameters<typeof history.replaceState>) => {
      originalReplaceState(...args);
      syncLang();
    };

    return () => {
      window.removeEventListener("popstate", handlePopState);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isEnglish, isSerbian }}>
      {children}
    </LanguageContext.Provider>
  );
}
