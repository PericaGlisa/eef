export const trackingParams = new Set([
  "gclid",
  "fbclid",
  "msclkid",
  "dclid",
  "_ga",
  "_gl",
  "mc_cid",
  "mc_eid",
]);

export const removedParamKeys = new Set(["filter", "sort", "page", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]);

const allowedParamsByPath = new Map<string, Set<string>>([["/vesti", new Set(["q"])]]);

const serviceSlugMap: Record<string, string> = {
  engineering: "inzenjering",
  execution: "izvodjenje",
  maintenance: "servis",
  "energy-audit": "energetska-revizija",
  consulting: "konsalting",
  safety: "sigurnost",
};

const directRedirects = new Map<string, string>([
  ["/about", "/o-nama"],
  ["/contact", "/kontakt"],
  ["/services", "/usluge"],
  ["/eco-cooling", "/eko-rashlada"],
  ["/partners", "/partneri"],
  ["/documentation", "/dokumentacija"],
  ["/documentation/certificates", "/dokumentacija/sertifikati"],
  ["/documentation/diplomas", "/dokumentacija/diplome"],
  ["/references", "/reference"],
  ["/references/agrounija", "/reference/agrounija"],
  ["/blog", "/vesti"],
  ["/privacy", "/politika-privatnosti"],
  ["/terms", "/uslovi-koriscenja"],
]);

const gonePatterns = [
  /^\/wp-admin(?:\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/old-site(?:\/|$)/i,
  /^\/stari-sajt(?:\/|$)/i,
];

export function resolveLegacyRedirect(pathname: string) {
  if (directRedirects.has(pathname)) return directRedirects.get(pathname);

  const servicesMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (servicesMatch) {
    const slug = serviceSlugMap[servicesMatch[1]] ?? servicesMatch[1];
    return `/usluge/${slug}`;
  }

  const ecoCoolingMatch = pathname.match(/^\/eco-cooling\/([^/]+)$/);
  if (ecoCoolingMatch) return `/eko-rashlada/${ecoCoolingMatch[1]}`;

  const newsMatch = pathname.match(/^\/news\/(\d+)$/);
  if (newsMatch) return `/vesti/${newsMatch[1]}`;

  return undefined;
}

export function isGonePath(pathname: string) {
  return gonePatterns.some((pattern) => pattern.test(pathname));
}

export function normalizeQuery(pathname: string, rawQuery: string) {
  const params = new URLSearchParams(rawQuery);
  const allowed = allowedParamsByPath.get(pathname) ?? new Set<string>();
  let changed = false;
  let hasSearchQuery = false;
  const entries: Array<[string, string]> = [];
  params.forEach((value, key) => {
    entries.push([key, value]);
  });

  for (const [key, value] of entries) {
    const normalizedKey = key.toLowerCase();
    const isTracking = normalizedKey.startsWith("utm_") || trackingParams.has(normalizedKey);
    const isRemoved = removedParamKeys.has(normalizedKey);
    const isAllowed = allowed.has(normalizedKey);
    if (isTracking || isRemoved || !isAllowed) {
      params.delete(key);
      changed = true;
      continue;
    }

    if (normalizedKey === "q") {
      const normalizedValue = value.trim().replace(/\s+/g, " ");
      if (!normalizedValue) {
        params.delete(key);
        changed = true;
        continue;
      }
      if (normalizedValue !== value) {
        params.set(key, normalizedValue);
        changed = true;
      }
      hasSearchQuery = true;
    }
  }

  const sorted = new URLSearchParams();
  const sortedEntries: Array<[string, string]> = [];
  params.forEach((value, key) => {
    sortedEntries.push([key, value]);
  });
  sortedEntries.sort(([a], [b]) => a.localeCompare(b)).forEach(([key, value]) => sorted.append(key, value));
  if (sorted.toString() !== params.toString()) changed = true;

  return {
    query: sorted.toString(),
    changed,
    hasSearchQuery,
  };
}
