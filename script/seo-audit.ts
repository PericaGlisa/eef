import { readdir, readFile } from "fs/promises";
import path from "path";

type HtmlPage = {
  route: string;
  filePath: string;
  html: string;
};

function normalizeRoute(value: string) {
  const withoutHash = value.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  const compact = withoutQuery.replace(/\/{2,}/g, "/");
  if (!compact) return "/";
  if (compact === "/") return "/";
  return compact.endsWith("/") ? compact.slice(0, -1).toLowerCase() : compact.toLowerCase();
}

async function collectHtmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function filePathToRoute(publicDir: string, filePath: string) {
  const rel = path.relative(publicDir, filePath).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.replace(/\/index\.html$/, "")}`;
  return `/${rel.replace(/\.html$/, "")}`;
}

function getTagContent(html: string, pattern: RegExp) {
  const match = html.match(pattern);
  return match?.[1]?.trim() || "";
}

function collectInternalLinks(html: string) {
  const links: string[] = [];
  const regex = /<a\s[^>]*href="([^"]+)"/gi;
  let match = regex.exec(html);
  while (match) {
    links.push(match[1]);
    match = regex.exec(html);
  }
  return links;
}

async function run() {
  const publicDir = path.resolve(process.cwd(), "dist/public");
  const htmlFilePaths = await collectHtmlFiles(publicDir);
  const pages: HtmlPage[] = [];

  for (const filePath of htmlFilePaths) {
    const html = await readFile(filePath, "utf8");
    pages.push({
      route: normalizeRoute(filePathToRoute(publicDir, filePath)),
      filePath,
      html,
    });
  }

  const routeSet = new Set(pages.map((page) => page.route));
  const titleIndex = new Map<string, string[]>();
  const descriptionIndex = new Map<string, string[]>();
  const issues: string[] = [];

  for (const page of pages) {
    const title = getTagContent(page.html, /<title>([\s\S]*?)<\/title>/i);
    const description = getTagContent(page.html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
    const canonical = getTagContent(page.html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);

    if (!title) issues.push(`Missing <title>: ${page.route}`);
    if (!description) issues.push(`Missing meta description: ${page.route}`);
    if (!canonical) issues.push(`Missing canonical: ${page.route}`);

    if (title) {
      const list = titleIndex.get(title) ?? [];
      list.push(page.route);
      titleIndex.set(title, list);
    }
    if (description) {
      const list = descriptionIndex.get(description) ?? [];
      list.push(page.route);
      descriptionIndex.set(description, list);
    }

    for (const href of collectInternalLinks(page.html)) {
      if (!href || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#")) continue;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (!href.startsWith("/")) continue;
      const route = normalizeRoute(href);
      if (route.includes(".")) continue;
      if (!routeSet.has(route)) {
        issues.push(`Broken internal link: ${page.route} -> ${href}`);
      }
    }
  }

  for (const [title, routes] of titleIndex.entries()) {
    if (title && routes.length > 1) issues.push(`Duplicate title "${title}" on: ${routes.join(", ")}`);
  }
  for (const [description, routes] of descriptionIndex.entries()) {
    if (description && routes.length > 1) {
      issues.push(`Duplicate description "${description}" on: ${routes.join(", ")}`);
    }
  }

  if (issues.length > 0) {
    console.error("SEO audit failed:");
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exit(1);
  }

  console.log(`SEO audit passed for ${pages.length} prerendered HTML files.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
