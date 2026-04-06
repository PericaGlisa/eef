import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { newsItems } from "@/data/news";
import { servicesContent } from "@/data/services-content";
import { solutionsData } from "@/data/solutions";
import { newsSeoDetails, serviceSeoDetails, solutionSeoDetails } from "@/data/seo-enhancements";

export const SITE_URL = "https://eef.rs";
export const SITE_NAME = "Eko Elektrofrigo";
export const DEFAULT_IMAGE = `${SITE_URL}/opengraph.jpg`;
const DEFAULT_OG_IMAGE_WIDTH = "1200";
const DEFAULT_OG_IMAGE_HEIGHT = "630";
const DEFAULT_DESCRIPTION =
  "Lider u inženjeringu, projektovanju i održavanju industrijskih rashladnih sistema. Energetski efikasna rešenja, ključ u ruke projekti i 24/7 servisna podrška.";

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
  const normalizedPath = normalizePathname(pathname);
  const staticMeta: Record<string, SeoMeta> = {
    "/": {
      title: "Eko Elektrofrigo | Industrijska Rashladna Tehnika",
      description: DEFAULT_DESCRIPTION,
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
      image: "/og-reference.jpg",
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

  if (staticMeta[normalizedPath]) return staticMeta[normalizedPath];

  if (normalizedPath.startsWith("/usluge/")) {
    const slug = normalizedPath.replace("/usluge/", "");
    const service = servicesContent.find((item) => item.id === slug);
    const serviceSeo = serviceSeoDetails[slug];
    if (service) {
      return {
        title: `${service.title} | Usluge | Eko Elektrofrigo`,
        description: service.shortDesc,
        canonicalPath: normalizedPath,
        kind: "service",
        image: service.image,
        lastUpdated: serviceSeo?.lastUpdated,
        faq: serviceSeo?.faqs ?? [],
        breadcrumbs: [
          { name: "Početna", path: "/" },
          { name: "Usluge", path: "/usluge" },
          { name: service.title, path: normalizedPath },
        ],
      };
    }
  }

  if (normalizedPath.startsWith("/eko-rashlada/")) {
    const slug = normalizedPath.replace("/eko-rashlada/", "");
    const solution = solutionsData.find((item) => item.id === slug);
    const solutionSeo = solutionSeoDetails[slug];
    if (solution) {
      return {
        title: `${solution.title} | Eko Rashlada | Eko Elektrofrigo`,
        description: solution.shortDesc,
        canonicalPath: normalizedPath,
        kind: "solution",
        image: solution.image,
        lastUpdated: solutionSeo?.lastUpdated,
        faq: solutionSeo?.faqs ?? [],
        breadcrumbs: [
          { name: "Početna", path: "/" },
          { name: "Eko Rashlada", path: "/eko-rashlada" },
          { name: solution.title, path: normalizedPath },
        ],
      };
    }
  }

  if (normalizedPath.startsWith("/vesti/")) {
    const slug = normalizedPath.replace("/vesti/", "");
    // Try to find by slug first
    let post = newsItems.find((item) => item.slug === slug);
    // Fallback: try to find by ID if slug is a number
    if (!post && !isNaN(Number(slug))) {
      post = newsItems.find((item) => item.id === Number(slug));
    }
    const newsSeo = post ? newsSeoDetails[post.id] : undefined;
    if (post) {
      return {
        title: `${post.title} | Vesti | Eko Elektrofrigo`,
        description: post.desc,
        canonicalPath: normalizedPath,
        kind: "article",
        image: post.image,
        articleDate: parseNewsDate(post.date),
        lastUpdated: parseNewsDate(post.date),
        faq: newsSeo?.faqs ?? [],
        breadcrumbs: [
          { name: "Početna", path: "/" },
          { name: "Vesti", path: "/vesti" },
          { name: post.title, path: normalizedPath },
        ],
      };
    }
  }

  return {
    title: "Stranica nije pronađena | Eko Elektrofrigo",
    description: DEFAULT_DESCRIPTION,
    canonicalPath: normalizedPath,
    kind: "default",
    breadcrumbs: [{ name: "Početna", path: "/" }],
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
  const normalized = pathname === "/" ? "" : pathname;
  const alternates = [
    { hreflang: "sr-Latn-RS", href: `${SITE_URL}${normalized}` },
    { hreflang: "x-default", href: `${SITE_URL}${normalized}` },
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
    upsertMetaByProperty("og:locale", "sr_RS");
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
