import path from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { PrerenderApp } from "../client/src/PrerenderApp";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_IMAGE,
  getSeoMeta,
  toAbsoluteUrl,
  buildPageSchemas,
  getGlobalSchemas,
} from "../client/src/components/SeoManager";
import { getCanonicalRoutes } from "./seo-routes";

function buildCanonicalUrl(route: string) {
  return `${SITE_URL}${route === "/" ? "" : route}`;
}

function buildHreflangTags(route: string) {
  const canonical = buildCanonicalUrl(route);
  return [
    `<link rel="alternate" hreflang="sr-Latn-RS" href="${canonical}" data-seo="hreflang">`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" data-seo="hreflang">`,
  ].join("");
}

function replaceOrInsert(source: string, pattern: RegExp, value: string, fallback = "") {
  if (pattern.test(source)) return source.replace(pattern, value);
  if (fallback) return source.replace(fallback, `${fallback}${value}`);
  return `${source}${value}`;
}

function applyHeadMeta(html: string, route: string) {
  const meta = getSeoMeta(route);
  const canonicalUrl = buildCanonicalUrl(meta.canonicalPath);
  const image = toAbsoluteUrl(meta.image);
  const ogType = meta.kind === "article" ? "article" : "website";
  const imageType = image.toLowerCase().endsWith(".png")
    ? "image/png"
    : image.toLowerCase().endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  const imageAlt = `${meta.title} | ${SITE_NAME}`;
  const pageSchemas = buildPageSchemas(meta, canonicalUrl, image);
  const schemas = [...getGlobalSchemas(), ...pageSchemas];
  const jsonLd = `<script type="application/ld+json">${JSON.stringify(schemas)}</script>`;

  let output = html;
  output = replaceOrInsert(output, /<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  output = replaceOrInsert(
    output,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${meta.description}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${ogType}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:locale"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:locale" content="sr_RS">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${image || DEFAULT_IMAGE}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${image || DEFAULT_IMAGE}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:type" content="${imageType}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image:width"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:width" content="1200">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image:height"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:height" content="630">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image:alt" content="${imageAlt}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:card" content="summary_large_image">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${meta.title}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${meta.description}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${image || DEFAULT_IMAGE}">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${imageAlt}">`,
    "</head>",
  );
  if (meta.kind === "article") {
    const published = meta.articleDate ?? new Date().toISOString().slice(0, 10);
    const modified = meta.lastUpdated ?? published;
    output = replaceOrInsert(
      output,
      /<meta\s+property="article:published_time"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="article:published_time" content="${published}">`,
      "</head>",
    );
    output = replaceOrInsert(
      output,
      /<meta\s+property="article:modified_time"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="article:modified_time" content="${modified}">`,
      "</head>",
    );
  } else {
    output = output.replace(/<meta\s+property="article:published_time"\s+content="[^"]*"\s*\/?>\s*/gi, "");
    output = output.replace(/<meta\s+property="article:modified_time"\s+content="[^"]*"\s*\/?>\s*/gi, "");
  }
  output = replaceOrInsert(
    output,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">`,
    "</head>",
  );
  output = replaceOrInsert(
    output,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}">`,
    "</head>",
  );
  output = output.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]*" data-seo="hreflang">\s*/gi, "");
  output = output.replace(
    /<script type="application\/ld\+json" data-seo="org-jsonld">[\s\S]*?<\/script>/gi,
    "",
  );
  output = output.replace(
    /<script type="application\/ld\+json" data-seo="website-jsonld">[\s\S]*?<\/script>/gi,
    "",
  );
  output = output.replace(
    /<script type="application\/ld\+json" data-seo="page-jsonld">[\s\S]*?<\/script>/gi,
    "",
  );
  output = output.replace("</head>", `${buildHreflangTags(meta.canonicalPath)}${jsonLd}</head>`);
  return output;
}

export async function prerenderRoutes() {
  const distPublic = path.resolve(process.cwd(), "dist/public");
  const templatePath = path.resolve(distPublic, "index.html");
  const template = await readFile(templatePath, "utf8");
  const routes = getCanonicalRoutes();

  for (const route of routes) {
    const rendered = renderToString(createElement(PrerenderApp, { pathname: route }));
    const withApp = template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`);
    const html = applyHeadMeta(withApp, route);

    if (route === "/") {
      await writeFile(templatePath, html, "utf8");
      continue;
    }

    const outDir = path.resolve(distPublic, route.slice(1));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.resolve(outDir, "index.html"), html, "utf8");
  }
}
