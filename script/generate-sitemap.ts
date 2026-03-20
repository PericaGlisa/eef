import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getSeoRouteEntries } from "./seo-routes";

type Entry = {
  loc: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

const SITE_URL = "https://eef.rs";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toXml(entries: Entry[]) {
  const today = new Date().toISOString().slice(0, 10);
  const body = entries
    .map((entry) => {
      const absoluteUrl = `${SITE_URL}${entry.loc === "/" ? "" : entry.loc}`;
      return [
        "  <url>",
        `    <loc>${xmlEscape(absoluteUrl)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export async function generateSitemap() {
  const entries = getSeoRouteEntries();
  const output = toXml(entries);
  const outputPath = path.resolve(process.cwd(), "client/public/sitemap.xml");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, "utf8");
}
