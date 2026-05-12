/**
 * Bidirectional route mapping between Serbian (default) and English URLs.
 * Serbian routes have no prefix, English routes have /en/ prefix.
 */

export const srToEn: Record<string, string> = {
  "/": "/en/",
  "/o-nama": "/en/about",
  "/kontakt": "/en/contact",
  "/usluge": "/en/services",
  "/usluge/inzenjering": "/en/services/engineering",
  "/usluge/izvodjenje": "/en/services/execution",
  "/usluge/servis": "/en/services/maintenance",
  "/usluge/energetska-revizija": "/en/services/energy-audit",
  "/usluge/konsalting": "/en/services/consulting",
  "/usluge/sigurnost": "/en/services/safety",
  "/eko-rashlada": "/en/eco-cooling",
  "/eko-rashlada/rashladne-komore": "/en/eco-cooling/cold-rooms",
  "/eko-rashlada/tuneli-za-smrzavanje": "/en/eco-cooling/freezing-tunnels",
  "/eko-rashlada/ulo-komore": "/en/eco-cooling/ulo-rooms",
  "/eko-rashlada/rashladni-agregati": "/en/eco-cooling/cooling-units",
  "/eko-rashlada/cileri": "/en/eco-cooling/chillers",
  "/eko-rashlada/elektro-ormani": "/en/eco-cooling/electrical-cabinets",
  "/eko-rashlada/termoizolacija": "/en/eco-cooling/thermal-insulation",
  "/partneri": "/en/partners",
  "/dokumentacija": "/en/documentation",
  "/dokumentacija/sertifikati": "/en/documentation/certificates",
  "/dokumentacija/diplome": "/en/documentation/diplomas",
  "/reference": "/en/references",
  "/reference/agrounija": "/en/references/agrounija",
  "/vesti": "/en/news",
  "/politika-privatnosti": "/en/privacy",
  "/uslovi-koriscenja": "/en/terms",
  "/groq-dijagnostika": "/en/groq-diagnostic",
};

export const enToSr: Record<string, string> = Object.fromEntries(
  Object.entries(srToEn).map(([sr, en]) => [en, sr])
);

/**
 * Get the counterpart URL for a given path and target language.
 */
export function getCounterpartPath(path: string, targetLang: "sr" | "en"): string {
  const normalized = path.replace(/\/$/, "") || "/";

  if (targetLang === "en") {
    // If already English, return as-is
    if (path.startsWith("/en/")) return path;
    
    // Check for exact match first
    if (srToEn[normalized]) return srToEn[normalized];

    // Check for subpaths (e.g., /vesti/slug -> /en/news/slug)
    for (const [sr, en] of Object.entries(srToEn)) {
      if (sr !== "/" && normalized.startsWith(sr + "/")) {
        return en + normalized.slice(sr.length);
      }
    }

    return `/en${normalized}`;
  }

  // targetLang === "sr"
  if (path.startsWith("/en")) {
    const withoutPrefix = normalized.replace(/^\/en/, "") || "/";
    
    // Check for exact match first
    if (enToSr[normalized]) return enToSr[normalized];

    // Check for subpaths (e.g., /en/news/slug -> /vesti/slug)
    for (const [en, sr] of Object.entries(enToSr)) {
      if (en !== "/en" && normalized.startsWith(en + "/")) {
        return sr + normalized.slice(en.length);
      }
    }

    return withoutPrefix;
  }
  return path;
}

/**
 * Strip /en prefix from a path for route matching.
 */
export function stripEnPrefix(path: string): string {
  if (path.startsWith("/en/")) {
    return path.slice(3) || "/";
  }
  if (path === "/en") return "/";
  return path;
}

/**
 * Check if a path is an English route.
 */
export function isEnglishPath(path: string): boolean {
  return path.startsWith("/en");
}
