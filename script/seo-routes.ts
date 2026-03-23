import { newsItems } from "../client/src/data/news";
import { servicesContent } from "../client/src/data/services-content";
import { solutionsData } from "../client/src/data/solutions";

export type SeoRouteEntry = {
  loc: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

export type SeoImageEntry = {
  loc: string;
  images: string[];
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

export function getSeoImageEntries(): SeoImageEntry[] {
  const staticImages: SeoImageEntry[] = [
    { loc: "/", images: ["/assets/hero-slide-1.webp", "/opengraph.jpg"] },
    { loc: "/o-nama", images: ["/assets/hero-bg.jpg"] },
    { loc: "/usluge", images: servicesContent[0]?.image ? [servicesContent[0].image] : [] },
    { loc: "/eko-rashlada", images: solutionsData[0]?.image ? [solutionsData[0].image] : [] },
    { loc: "/reference", images: ["/assets/projects/agrounija/gallery-1.webp"] },
    { loc: "/reference/agrounija", images: ["/assets/projects/agrounija/gallery-1.webp", "/assets/projects/agrounija/logo.png"] },
    { loc: "/vesti", images: newsItems[0]?.image ? [newsItems[0].image] : [] },
  ];

  const serviceImages: SeoImageEntry[] = servicesContent.map((item) => ({
    loc: `/usluge/${item.id}`,
    images: item.image ? [item.image] : [],
  }));
  const solutionImages: SeoImageEntry[] = solutionsData.map((item) => ({
    loc: `/eko-rashlada/${item.id}`,
    images: item.image ? [item.image] : [],
  }));
  const newsImages: SeoImageEntry[] = newsItems.map((item) => ({
    loc: `/vesti/${item.id}`,
    images: item.image ? [item.image] : [],
  }));

  const map = new Map<string, Set<string>>();
  [...staticImages, ...serviceImages, ...solutionImages, ...newsImages].forEach((entry) => {
    if (!map.has(entry.loc)) map.set(entry.loc, new Set());
    entry.images.filter(Boolean).forEach((image) => map.get(entry.loc)?.add(image));
  });

  return [...map.entries()]
    .map(([loc, images]) => ({ loc, images: [...images] }))
    .filter((entry) => entry.images.length > 0);
}
