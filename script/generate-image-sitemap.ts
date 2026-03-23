import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { getSeoImageEntries } from "./seo-routes";

const SITE_URL = "https://eef.rs";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toAbsoluteUrl(value: string) {
  if (value.startsWith("https://") || value.startsWith("http://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function toXml() {
  const body = getSeoImageEntries()
    .map((entry) => {
      const loc = toAbsoluteUrl(entry.loc === "/" ? "" : entry.loc);
      const images = entry.images
        .map((image) => `    <image:image>\n      <image:loc>${xmlEscape(toAbsoluteUrl(image))}</image:loc>\n    </image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n${images}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
}

export async function generateImageSitemap() {
  const outputPath = path.resolve(process.cwd(), "client/public/image-sitemap.xml");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, toXml(), "utf8");
}
