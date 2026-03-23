import { getCanonicalRoutes } from "./seo-routes";

const defaultSiteUrl = "https://eef.rs";

export type GscMonitorConfig = {
  siteUrl: string;
  propertyUrl: string;
  sitemaps: string[];
  keyUrls: string[];
  primaryKeywords: string[];
  alertThresholds: {
    minIndexedRatio: number;
    maxSoft404: number;
    maxHard404: number;
    maxIndexedDropPct: number;
    maxSoft404Increase: number;
    maxHard404Increase: number;
  };
  alertStatePath: string;
};

function normalizeSiteUrl(url: string) {
  const normalized = url.trim().replace(/\/+$/, "");
  return normalized || defaultSiteUrl;
}

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getGscMonitorConfig(): GscMonitorConfig {
  const siteUrl = normalizeSiteUrl(process.env.GSC_SITE_URL ?? defaultSiteUrl);
  const propertyUrl = process.env.GSC_PROPERTY_URL?.trim() || `${siteUrl}/`;
  const sitemaps = [
    process.env.GSC_SITEMAP_MAIN?.trim() || `${siteUrl}/sitemap.xml`,
    process.env.GSC_SITEMAP_IMAGE?.trim() || `${siteUrl}/image-sitemap.xml`,
  ];
  const keyUrls = getCanonicalRoutes().map((route) => `${siteUrl}${route === "/" ? "" : route}`);
  const primaryKeywords = [
    "industrijsko hlađenje",
    "rashladni sistemi",
    "rashladne komore",
    "tuneli za smrzavanje",
    "ulo komore",
    "energetska revizija",
    "servis rashladnih sistema",
    "eko elektrofrigo",
  ];

  return {
    siteUrl,
    propertyUrl,
    sitemaps,
    keyUrls,
    primaryKeywords,
    alertStatePath: process.env.GSC_ALERT_STATE_PATH || ".seo-monitor-state/latest-alert.json",
    alertThresholds: {
      minIndexedRatio: parseNumber(process.env.SEO_ALERT_MIN_INDEXED_RATIO, 0.85),
      maxSoft404: parseNumber(process.env.SEO_ALERT_MAX_SOFT_404, 0),
      maxHard404: parseNumber(process.env.SEO_ALERT_MAX_HARD_404, 0),
      maxIndexedDropPct: parseNumber(process.env.SEO_ALERT_MAX_INDEXED_DROP_PCT, 0.1),
      maxSoft404Increase: parseNumber(process.env.SEO_ALERT_MAX_SOFT_404_INCREASE, 1),
      maxHard404Increase: parseNumber(process.env.SEO_ALERT_MAX_HARD_404_INCREASE, 1),
    },
  };
}
