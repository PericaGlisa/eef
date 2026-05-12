import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { getNewsItems } from "@/data/news";
import { getServicesContent } from "@/data/services-content";
import { getSolutionsData } from "@/data/solutions";
import { getNewsSeoDetails, getServiceSeoDetails, getSolutionSeoDetails } from "@/data/seo-enhancements";
import { srToEn, enToSr } from "@/lib/route-map";

export const SITE_URL = "https://eef.rs";
export const SITE_NAME = "Eko Elektrofrigo";
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;
const DEFAULT_OG_IMAGE_WIDTH = "1200";
const DEFAULT_OG_IMAGE_HEIGHT = "630";
const DEFAULT_DESCRIPTION_SR =
  "Lider u inženjeringu, projektovanju i održavanju industrijskih rashladnih sistema. Energetski efikasna rešenja, ključ u ruke projekti i 24/7 servisna podrška.";
const DEFAULT_DESCRIPTION_EN =
  "Leader in engineering, design, and maintenance of industrial refrigeration systems. Energy-efficient solutions, turnkey projects, and 24/7 service support.";

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  kind: "default" | "service" | "solution" | "article";
  breadcrumbs: Array<{ name: string; path: string }>;
  image?: string;
  articleDate?: string;
  lastUpdated?: string;
  faq?: Array<{ question: string; answer: string }>;
};

export function normalizePathname(pathname: string) {
  const compact = pathname.replace(/\/{2,}/g, "/");
  const trimmed = compact.length > 1 ? compact.replace(/\/+$/, "") : compact;
  return trimmed.toLowerCase() || "/";
}

export function toAbsoluteUrl(value?: string) {
  if (!value) return DEFAULT_IMAGE;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function parseNewsDate(value: string) {
  const match = value.match(/(\d{1,2})\.\s*([A-Z]{3})\s*(\d{4})/);
  if (!match) return new Date().toISOString().slice(0, 10);
  const monthMap: Record<string, string> = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };
  const day = match[1].padStart(2, "0");
  const month = monthMap[match[2]] ?? "01";
  const year = match[3];
  return `${year}-${month}-${day}`;
}

export function getSeoMeta(pathname: string): SeoMeta {
  const isEnglish = pathname.startsWith("/en");
  const normalizedPath = normalizePathname(pathname);
  
  // For SEO lookup, we use the Serbian version of the path as the key for both languages
  // This avoids duplicating keys and keeps everything in sync
  let lookupPath = normalizedPath;
  
  if (isEnglish) {
    // Try exact match in enToSr first
    if (enToSr[normalizedPath]) {
      lookupPath = enToSr[normalizedPath];
    } else if (enToSr[normalizedPath + "/"]) {
      // Handle cases where the map has a trailing slash (like the homepage /en/)
      lookupPath = enToSr[normalizedPath + "/"];
    } else {
      // Check for subpaths (e.g., /en/news/slug -> /vesti/slug)
      let foundSubpath = false;
      for (const [en, sr] of Object.entries(enToSr)) {
        if (en !== "/en" && normalizedPath.startsWith(en + "/")) {
          lookupPath = sr + normalizedPath.slice(en.length);
          foundSubpath = true;
          break;
        }
      }
      
      if (!foundSubpath) {
        // Fallback: strip /en prefix
        lookupPath = normalizedPath.replace(/^\/en/, "") || "/";
      }
    }
  }

  // Final normalization to ensure lookupPath doesn't have double slashes or trailing slashes (except for /)
  lookupPath = normalizePathname(lookupPath);

  const staticMetaSr: Record<string, SeoMeta> = {
    "/": {
      title: "Eko Elektrofrigo | Industrijska Rashladna Tehnika",
      description: DEFAULT_DESCRIPTION_SR,
      canonicalPath: "/",
      kind: "default",
      breadcrumbs: [{ name: "Početna", path: "/" }],
      image: "/opengraph.jpg",
    },
    "/o-nama": {
      title: "O nama | Eko Elektrofrigo",
      description:
        "Saznajte više o Eko Elektrofrigo timu, iskustvu, standardima kvaliteta i realizovanim projektima u oblasti industrijskog hlađenja.",
      canonicalPath: "/o-nama",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "O nama", path: "/o-nama" },
      ],
      image: "/og-o-nama.jpg",
    },
    "/kontakt": {
      title: "Kontakt | Eko Elektrofrigo",
      description:
        "Kontaktirajte Eko Elektrofrigo tim za projektovanje, izvođenje i servis industrijskih rashladnih sistema.",
      canonicalPath: "/kontakt",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Kontakt", path: "/kontakt" },
      ],
      image: "/og-kontakt.jpg",
    },
    "/usluge": {
      title: "Usluge | Eko Elektrofrigo",
      description:
        "Kompletne usluge industrijskog hlađenja: inženjering, izvođenje, servis, energetska revizija, konsalting i sigurnost.",
      canonicalPath: "/usluge",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Usluge", path: "/usluge" },
      ],
      image: "/og-usluge.jpg",
    },
    "/eko-rashlada": {
      title: "Eko Rashlada | Eko Elektrofrigo",
      description:
        "Napredna rashladna rešenja za skladištenje, smrzavanje, kontrolisanu atmosferu, agregate, čilere i automatizaciju.",
      canonicalPath: "/eko-rashlada",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Eko Rashlada", path: "/eko-rashlada" },
      ],
      image: "/og-eko-rashlada.jpg",
    },
    "/partneri": {
      title: "Partneri | Eko Elektrofrigo",
      description:
        "Pregled strateških partnera i tehnoloških saradnji kompanije Eko Elektrofrigo u industrijskom hlađenju.",
      canonicalPath: "/partneri",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Partneri", path: "/partneri" },
      ],
      image: "/og-partneri.jpg",
    },
    "/dokumentacija": {
      title: "Dokumentacija | Eko Elektrofrigo",
      description:
        "Sertifikati, diplome i tehnička dokumentacija koja potvrđuje kvalitet i usaglašenost sa standardima.",
      canonicalPath: "/dokumentacija",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Dokumentacija", path: "/dokumentacija" },
      ],
      image: "/og-dokumentacija.jpg",
    },
    "/dokumentacija/sertifikati": {
      title: "Sertifikati | Eko Elektrofrigo",
      description:
        "Zvanični ISO sertifikati i potvrde kvaliteta kompanije Eko Elektrofrigo.",
      canonicalPath: "/dokumentacija/sertifikati",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Dokumentacija", path: "/dokumentacija" },
        { name: "Sertifikati", path: "/dokumentacija/sertifikati" },
      ],
      image: "/og-sertifikati.jpg",
    },
    "/dokumentacija/diplome": {
      title: "Diplome | Eko Elektrofrigo",
      description:
        "Pregled diploma i stručnih potvrda kompanije Eko Elektrofrigo.",
      canonicalPath: "/dokumentacija/diplome",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Dokumentacija", path: "/dokumentacija" },
        { name: "Diplome", path: "/dokumentacija/diplome" },
      ],
      image: "/og-diplome.jpg",
    },
    "/reference": {
      title: "Reference | Eko Elektrofrigo",
      description:
        "Projekti i reference Eko Elektrofrigo kompanije širom Srbije i regiona.",
      canonicalPath: "/reference",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Reference", path: "/reference" },
      ],
      image: "/og-reference.jpg",
    },
    "/reference/agrounija": {
      title: "Reference Agrounija | Eko Elektrofrigo",
      description:
        "Detaljan prikaz realizovanog projekta Agrounija i tehničkih rešenja koja su implementirana.",
      canonicalPath: "/reference/agrounija",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Reference", path: "/reference" },
        { name: "Agrounija", path: "/reference/agrounija" },
      ],
      image: "/og-agrounija.jpg",
    },
    "/vesti": {
      title: "Vesti | Eko Elektrofrigo",
      description:
        "Najnovije vesti, događaji i stručni članci iz oblasti industrijskog hlađenja.",
      canonicalPath: "/vesti",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Vesti", path: "/vesti" },
      ],
      image: "/og-blog.jpg",
    },
    "/politika-privatnosti": {
      title: "Politika privatnosti | Eko Elektrofrigo",
      description:
        "Politika privatnosti i način obrade podataka korisnika na sajtu kompanije Eko Elektrofrigo.",
      canonicalPath: "/politika-privatnosti",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Politika privatnosti", path: "/politika-privatnosti" },
      ],
      image: "/og-privacy.jpg",
    },
    "/uslovi-koriscenja": {
      title: "Uslovi korišćenja | Eko Elektrofrigo",
      description:
        "Uslovi korišćenja sajta Eko Elektrofrigo i pravila upotrebe sadržaja.",
      canonicalPath: "/uslovi-koriscenja",
      kind: "default",
      breadcrumbs: [
        { name: "Početna", path: "/" },
        { name: "Uslovi korišćenja", path: "/uslovi-koriscenja" },
      ],
      image: "/og-terms.jpg",
    },
  };

  const staticMetaEn: Record<string, SeoMeta> = {
    "/": {
      title: "Eko Elektrofrigo | Industrial Refrigeration",
      description: DEFAULT_DESCRIPTION_EN,
      canonicalPath: "/en",
      kind: "default",
      breadcrumbs: [{ name: "Home", path: "/en" }],
      image: "/opengraph.jpg",
    },
    "/o-nama": {
      title: "About Us | Eko Elektrofrigo",
      description:
        "Learn about the Eko Elektrofrigo team, experience, quality standards, and completed projects in industrial refrigeration.",
      canonicalPath: "/en/about",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "About Us", path: "/en/about" },
      ],
      image: "/og-o-nama.jpg",
    },
    "/kontakt": {
      title: "Contact | Eko Elektrofrigo",
      description:
        "Contact the Eko Elektrofrigo team for design, installation, and service of industrial refrigeration systems.",
      canonicalPath: "/en/contact",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Contact", path: "/en/contact" },
      ],
      image: "/og-kontakt.jpg",
    },
    "/usluge": {
      title: "Services | Eko Elektrofrigo",
      description:
        "Complete industrial refrigeration services: engineering, installation, maintenance, energy auditing, consulting, and safety.",
      canonicalPath: "/en/services",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Services", path: "/en/services" },
      ],
      image: "/og-usluge.jpg",
    },
    "/eko-rashlada": {
      title: "Eco Cooling | Eko Elektrofrigo",
      description:
        "Advanced refrigeration solutions for cold storage, freezing, controlled atmosphere, units, chillers, and automation.",
      canonicalPath: "/en/eco-cooling",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Eco Cooling", path: "/en/eco-cooling" },
      ],
      image: "/og-eko-rashlada.jpg",
    },
    "/partneri": {
      title: "Partners | Eko Elektrofrigo",
      description:
        "Overview of strategic partners and technological collaborations of Eko Elektrofrigo in industrial refrigeration.",
      canonicalPath: "/en/partners",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Partners", path: "/en/partners" },
      ],
      image: "/og-partneri.jpg",
    },
    "/dokumentacija": {
      title: "Documentation | Eko Elektrofrigo",
      description:
        "Certificates, diplomas, and technical documentation confirming quality and compliance with standards.",
      canonicalPath: "/en/documentation",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Documentation", path: "/en/documentation" },
      ],
      image: "/og-dokumentacija.jpg",
    },
    "/dokumentacija/sertifikati": {
      title: "Certificates | Eko Elektrofrigo",
      description:
        "Official ISO certificates and quality certifications of Eko Elektrofrigo.",
      canonicalPath: "/en/documentation/certificates",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Documentation", path: "/en/documentation" },
        { name: "Certificates", path: "/en/documentation/certificates" },
      ],
      image: "/og-sertifikati.jpg",
    },
    "/dokumentacija/diplome": {
      title: "Diplomas | Eko Elektrofrigo",
      description:
        "Overview of diplomas and professional certifications of Eko Elektrofrigo.",
      canonicalPath: "/en/documentation/diplomas",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Documentation", path: "/en/documentation" },
        { name: "Diplomas", path: "/en/documentation/diplomas" },
      ],
      image: "/og-diplome.jpg",
    },
    "/reference": {
      title: "References | Eko Elektrofrigo",
      description:
        "Projects and references of Eko Elektrofrigo across Serbia and the region.",
      canonicalPath: "/en/references",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "References", path: "/en/references" },
      ],
      image: "/og-reference.jpg",
    },
    "/reference/agrounija": {
      title: "Agrounija Reference | Eko Elektrofrigo",
      description:
        "Detailed overview of the completed Agrounija project and the technical solutions implemented.",
      canonicalPath: "/en/references/agrounija",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "References", path: "/en/references" },
        { name: "Agrounija", path: "/en/references/agrounija" },
      ],
      image: "/og-agrounija.jpg",
    },
    "/vesti": {
      title: "News | Eko Elektrofrigo",
      description:
        "Latest news, events, and expert articles from the field of industrial refrigeration.",
      canonicalPath: "/en/news",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "News", path: "/en/news" },
      ],
      image: "/og-blog.jpg",
    },
    "/politika-privatnosti": {
      title: "Privacy Policy | Eko Elektrofrigo",
      description:
        "Privacy policy and user data processing practices on the Eko Elektrofrigo website.",
      canonicalPath: "/en/privacy",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Privacy Policy", path: "/en/privacy" },
      ],
      image: "/og-privacy.jpg",
    },
    "/uslovi-koriscenja": {
      title: "Terms of Use | Eko Elektrofrigo",
      description:
        "Terms of use of the Eko Elektrofrigo website and content usage rules.",
      canonicalPath: "/en/terms",
      kind: "default",
      breadcrumbs: [
        { name: "Home", path: "/en" },
        { name: "Terms of Use", path: "/en/terms" },
      ],
      image: "/og-terms.jpg",
    },
  };

  const staticMeta = isEnglish ? staticMetaEn : staticMetaSr;

  // 1. Check static meta first
  if (staticMeta[lookupPath]) {
    return staticMeta[lookupPath];
  }

  // 2. Check dynamic services
  if (lookupPath.startsWith("/usluge/")) {
    const slug = lookupPath.replace("/usluge/", "");
    const servicesContent = getServicesContent(isEnglish);
    const serviceSeoDetails = getServiceSeoDetails(isEnglish);
    const service = servicesContent.find((item: { id: string }) => item.id === slug);
    const serviceSeo = serviceSeoDetails[slug];
    if (service) {
      return {
        title: `${service.title} | ${isEnglish ? "Services" : "Usluge"} | Eko Elektrofrigo`,
        description: service.shortDesc,
        canonicalPath: normalizedPath,
        kind: "service",
        image: service.image,
        lastUpdated: serviceSeo?.lastUpdated,
        faq: serviceSeo?.faqs ?? [],
        breadcrumbs: [
          { name: isEnglish ? "Home" : "Početna", path: isEnglish ? "/en" : "/" },
          { name: isEnglish ? "Services" : "Usluge", path: isEnglish ? "/en/services" : "/usluge" },
          { name: service.title, path: normalizedPath },
        ],
      };
    }
  }

  if (lookupPath.startsWith("/eko-rashlada/")) {
    const slug = lookupPath.replace("/eko-rashlada/", "");
    const solutionsData = getSolutionsData(isEnglish);
    const solutionSeoDetails = getSolutionSeoDetails(isEnglish);
    const solution = solutionsData.find((item: { id: string }) => item.id === slug);
    const solutionSeo = solutionSeoDetails[slug];
    if (solution) {
      return {
        title: `${solution.title} | ${isEnglish ? "Eco Cooling" : "Eko Rashlada"} | Eko Elektrofrigo`,
        description: solution.shortDesc,
        canonicalPath: normalizedPath,
        kind: "solution",
        image: solution.image,
        lastUpdated: solutionSeo?.lastUpdated,
        faq: solutionSeo?.faqs ?? [],
        breadcrumbs: [
          { name: isEnglish ? "Home" : "Početna", path: isEnglish ? "/en" : "/" },
          { name: isEnglish ? "Eco Cooling" : "Eko Rashlada", path: isEnglish ? "/en/eco-cooling" : "/eko-rashlada" },
          { name: solution.title, path: normalizedPath },
        ],
      };
    }
  }

  if (lookupPath.startsWith("/vesti/")) {
    const slug = lookupPath.replace("/vesti/", "");
    const newsItems = getNewsItems(isEnglish);
    const newsSeoDetails = getNewsSeoDetails(isEnglish);
    // Try to find by slug first
    let post = newsItems.find((item: { slug: string }) => item.slug === slug);

    // Fallback 1: check if the slug belongs to the OTHER language
    if (!post) {
      const otherNewsItems = getNewsItems(!isEnglish);
      const otherPost = otherNewsItems.find((item: { slug: string }) => item.slug === slug);
      if (otherPost) {
        post = newsItems.find((item: { id: number }) => item.id === otherPost.id);
      }
    }

    // Fallback 2: try to find by ID if slug is a number
    if (!post && !isNaN(Number(slug))) {
      post = newsItems.find((item: { id: number }) => item.id === Number(slug));
    }
    const newsSeo = post ? newsSeoDetails[post.id] : undefined;
    if (post) {
      return {
        title: `${post.title} | ${isEnglish ? "News" : "Vesti"} | Eko Elektrofrigo`,
        description: post.desc,
        canonicalPath: normalizedPath,
        kind: "article",
        image: post.image, // Use post's featured image
        articleDate: parseNewsDate(post.date),
        lastUpdated: parseNewsDate(post.date),
        faq: newsSeo?.faqs ?? [],
        breadcrumbs: [
          { name: isEnglish ? "Home" : "Početna", path: isEnglish ? "/en" : "/" },
          { name: isEnglish ? "News" : "Vesti", path: isEnglish ? "/en/news" : "/vesti" },
          { name: post.title, path: normalizedPath },
        ],
      };
    }
  }

  return {
    title: isEnglish ? "Page Not Found | Eko Elektrofrigo" : "Stranica nije pronađena | Eko Elektrofrigo",
    description: isEnglish ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_SR,
    canonicalPath: normalizedPath,
    kind: "default",
    breadcrumbs: [{ name: isEnglish ? "Home" : "Početna", path: isEnglish ? "/en" : "/" }],
  };
}

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function removeMetaByName(name: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.remove();
}

function removeMetaByProperty(property: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.remove();
}

function getImageMimeType(imageUrl: string) {
  const cleanUrl = imageUrl.split("?")[0].toLowerCase();
  if (cleanUrl.endsWith(".jpg") || cleanUrl.endsWith(".jpeg")) return "image/jpeg";
  if (cleanUrl.endsWith(".png")) return "image/png";
  if (cleanUrl.endsWith(".webp")) return "image/webp";
  return "image/jpeg";
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    name: "Eko Elektrofrigo d.o.o.",
    alternateName: "EEF",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.png`,
    image: DEFAULT_IMAGE,
    telephone: "+381113757287",
    faxNumber: "+381113757288",
    email: "office@eef.rs",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Svetolika Nikačevića 11",
      addressLocality: "Beograd",
      postalCode: "11000",
      addressCountry: "RS",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.7866,
      longitude: 20.4489,
    },
    areaServed: [
      { "@type": "Country", name: "Serbia" },
      { "@type": "Country", name: "Bosnia and Herzegovina" },
      { "@type": "Country", name: "Montenegro" },
      { "@type": "Country", name: "North Macedonia" },
      { "@type": "Country", name: "Croatia" }
    ],
    sameAs: [
      "https://www.linkedin.com/feed/update/urn:li:activity:6899988285712596994",
      // Dodaj druge društvene mreže ako postoje
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "07:30",
      closes: "15:30",
      validFrom: new Date().toISOString().split('-')[0] // Current year
    },
    priceRange: "$$$",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    makesOffer: {
      "@type": "OfferCatalog",
      name: "HVAC & Industrial Cooling Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Industrial Refrigeration Systems"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cold Storage Solutions"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "HVAC Engineering"
          }
        }
      ]
    }
  };
}

function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "sr-Latn-RS",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/vesti?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function upsertOrganizationJsonLd() {
  const data = getOrganizationJsonLd();

  let tag = document.head.querySelector<HTMLScriptElement>('script[data-seo="org-jsonld"]');
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "org-jsonld");
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

function upsertWebsiteJsonLd() {
  const data = getWebSiteJsonLd();
  let tag = document.head.querySelector<HTMLScriptElement>('script[data-seo="website-jsonld"]');
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "website-jsonld");
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

function upsertPageJsonLd(data: unknown[]) {
  let tag = document.head.querySelector<HTMLScriptElement>('script[data-seo="page-jsonld"]');
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.setAttribute("data-seo", "page-jsonld");
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data.length === 1 ? data[0] : data);
}

function upsertAlternateLinks(pathname: string) {
  const isEnglish = pathname.startsWith("/en");
  const srPath = isEnglish ? (enToSr[pathname] || pathname.replace(/^\/en/, "") || "/") : pathname;
  const enPath = isEnglish ? pathname : (srToEn[pathname] || `/en${pathname === "/" ? "" : pathname}`);

  const alternates = [
    { hreflang: "sr-Latn-RS", href: `${SITE_URL}${srPath === "/" ? "" : srPath}` },
    { hreflang: "en", href: `${SITE_URL}${enPath === "/" ? "" : enPath}` },
    { hreflang: "x-default", href: `${SITE_URL}${srPath === "/" ? "" : srPath}` },
  ];

  document.head.querySelectorAll('link[rel="alternate"][data-seo="hreflang"]').forEach((item) => item.remove());
  alternates.forEach((entry) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", entry.hreflang);
    link.setAttribute("href", entry.href);
    link.setAttribute("data-seo", "hreflang");
    document.head.appendChild(link);
  });
}

export function buildPageSchemas(meta: SeoMeta, canonicalUrl: string, pageImage: string) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: meta.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };

  const schemas: unknown[] = [breadcrumbJsonLd];
  if (meta.kind === "article") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title.replace(" | Vesti | Eko Elektrofrigo", ""),
      description: meta.description,
      image: [pageImage],
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "Organization",
        name: "Eko Elektrofrigo d.o.o.",
      },
      publisher: {
        "@type": "Organization",
        name: "Eko Elektrofrigo d.o.o.",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/logo.png`,
        },
      },
      datePublished: meta.articleDate ?? new Date().toISOString().slice(0, 10),
      dateModified: meta.articleDate ?? new Date().toISOString().slice(0, 10),
    });
  }

  if (meta.kind === "service" || meta.kind === "solution") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: meta.title.split(" | ")[0],
      description: meta.description,
      provider: {
        "@type": "Organization",
        name: "Eko Elektrofrigo d.o.o.",
        url: SITE_URL,
      },
      areaServed: "RS",
      url: canonicalUrl,
      image: pageImage,
      dateModified: meta.lastUpdated ?? new Date().toISOString().slice(0, 10),
    });
  }

  if (meta.faq && meta.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return schemas;
}

export function getGlobalSchemas() {
  return [getOrganizationJsonLd(), getWebSiteJsonLd()];
}

export function SeoManager() {
  const [pathname] = useLocation();
  const meta = useMemo(() => getSeoMeta(pathname), [pathname]);

  useEffect(() => {
    const isEnglish = pathname.startsWith("/en");
    const canonicalUrl = `${SITE_URL}${meta.canonicalPath === "/" ? "" : meta.canonicalPath}`;
    const pageImage = toAbsoluteUrl(meta.image);
    const ogType = meta.kind === "article" ? "article" : "website";
    const imageType = getImageMimeType(pageImage);
    const imageAlt = `${meta.title} | ${SITE_NAME}`;

    document.title = meta.title;
    upsertMetaByName("description", meta.description);
    upsertMetaByName("robots", "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1");

    upsertMetaByProperty("og:title", meta.title);
    upsertMetaByProperty("og:description", meta.description);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:site_name", SITE_NAME);
    upsertMetaByProperty("og:locale", isEnglish ? "en_US" : "sr_RS");
    upsertMetaByProperty("og:image", pageImage);
    upsertMetaByProperty("og:image:secure_url", pageImage);
    upsertMetaByProperty("og:image:type", imageType);
    upsertMetaByProperty("og:image:width", DEFAULT_OG_IMAGE_WIDTH);
    upsertMetaByProperty("og:image:height", DEFAULT_OG_IMAGE_HEIGHT);
    upsertMetaByProperty("og:image:alt", imageAlt);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", meta.title);
    upsertMetaByName("twitter:description", meta.description);
    upsertMetaByName("twitter:image", pageImage);
    upsertMetaByName("twitter:image:alt", imageAlt);

    if (meta.kind === "article") {
      const published = meta.articleDate ?? new Date().toISOString().slice(0, 10);
      const modified = meta.lastUpdated ?? published;
      upsertMetaByProperty("article:published_time", published);
      upsertMetaByProperty("article:modified_time", modified);
    } else {
      removeMetaByProperty("article:published_time");
      removeMetaByProperty("article:modified_time");
    }
    removeMetaByName("twitter:site");

    upsertCanonical(canonicalUrl);
    upsertAlternateLinks(meta.canonicalPath);
    upsertOrganizationJsonLd();
    upsertWebsiteJsonLd();

    upsertPageJsonLd(buildPageSchemas(meta, canonicalUrl, pageImage));
  }, [meta]);

  return null;
}
