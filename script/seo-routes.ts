import { newsItems } from "../client/src/data/news";
import { servicesContent } from "../client/src/data/services-content";
import { solutionsData } from "../client/src/data/solutions";

export type SeoRouteEntry = {
  loc: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

const staticEntries: SeoRouteEntry[] = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/o-nama", changefreq: "monthly", priority: "0.8" },
  { loc: "/kontakt", changefreq: "monthly", priority: "0.8" },
  { loc: "/usluge", changefreq: "weekly", priority: "0.9" },
  { loc: "/eko-rashlada", changefreq: "weekly", priority: "0.9" },
  { loc: "/partneri", changefreq: "monthly", priority: "0.7" },
  { loc: "/dokumentacija", changefreq: "monthly", priority: "0.7" },
  { loc: "/dokumentacija/sertifikati", changefreq: "monthly", priority: "0.7" },
  { loc: "/dokumentacija/diplome", changefreq: "monthly", priority: "0.7" },
  { loc: "/reference", changefreq: "monthly", priority: "0.8" },
  { loc: "/reference/agrounija", changefreq: "monthly", priority: "0.7" },
  { loc: "/vesti", changefreq: "weekly", priority: "0.8" },
  { loc: "/politika-privatnosti", changefreq: "yearly", priority: "0.4" },
  { loc: "/uslovi-koriscenja", changefreq: "yearly", priority: "0.4" },
];

export function getSeoRouteEntries() {
  const dynamicServices = servicesContent.map((item) => ({
    loc: `/usluge/${item.id}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  }));

  const dynamicSolutions = solutionsData.map((item) => ({
    loc: `/eko-rashlada/${item.id}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  }));

  const dynamicNews = newsItems.map((item) => ({
    loc: `/vesti/${item.id}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  }));

  const seen = new Set<string>();
  return [...staticEntries, ...dynamicServices, ...dynamicSolutions, ...dynamicNews].filter((entry) => {
    if (seen.has(entry.loc)) return false;
    seen.add(entry.loc);
    return true;
  });
}

export function getCanonicalRoutes() {
  return getSeoRouteEntries().map((entry) => entry.loc);
}
