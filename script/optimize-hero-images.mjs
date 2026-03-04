import { Transformer, ResizeFit } from "@napi-rs/image";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const assetsDir = path.join(projectRoot, "client", "public", "assets");

function formatBytes(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

async function fileSize(filePath) {
  const info = await stat(filePath);
  return info.size;
}

async function ensureMaxWidthWebp({
  filePath,
  maxWidth,
  quality,
}) {
  const input = await readFile(filePath);
  const base = new Transformer(input);
  const meta = await base.metadata();

  if (!meta.width || meta.width <= maxWidth) {
    return { changed: false, width: meta.width ?? null };
  }

  const t = new Transformer(input);
  t.resize({ width: maxWidth, fit: ResizeFit.Inside });
  const out = await t.webp(quality);
  await writeFile(filePath, out);

  const nextMeta = await new Transformer(out).metadata();
  return { changed: true, width: nextMeta.width ?? null };
}

async function writeVariant({
  sourcePath,
  outPath,
  targetWidth,
  quality,
}) {
  const input = await readFile(sourcePath);
  const base = new Transformer(input);
  const meta = await base.metadata();

  const t = new Transformer(input);
  if (meta.width && meta.width > targetWidth) {
    t.resize({ width: targetWidth, fit: ResizeFit.Inside });
  }
  const out = await t.webp(quality);
  await writeFile(outPath, out);
}

async function main() {
  const files = (await readdir(assetsDir))
    .filter((f) => /^hero-slide-\d+\.webp$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    throw new Error(`No hero-slide-*.webp files found in ${assetsDir}`);
  }

  console.log(`Hero assets: ${assetsDir}`);

  for (const file of files) {
    const full = path.join(assetsDir, file);
    const before = await fileSize(full);
    const result = await ensureMaxWidthWebp({
      filePath: full,
      maxWidth: 1920,
      quality: 80,
    });
    const after = await fileSize(full);

    const suffix = result.changed ? "optimized" : "kept";
    console.log(
      `${file} (${suffix}) width=${result.width ?? "?"} ${formatBytes(before)} -> ${formatBytes(after)}`,
    );
  }

  const hero1 = path.join(assetsDir, "hero-slide-1.webp");
  await writeVariant({
    sourcePath: hero1,
    outPath: path.join(assetsDir, "hero-slide-1-768.webp"),
    targetWidth: 768,
    quality: 70,
  });
  await writeVariant({
    sourcePath: hero1,
    outPath: path.join(assetsDir, "hero-slide-1-1280.webp"),
    targetWidth: 1280,
    quality: 74,
  });

  const v768 = await fileSize(path.join(assetsDir, "hero-slide-1-768.webp"));
  const v1280 = await fileSize(path.join(assetsDir, "hero-slide-1-1280.webp"));
  console.log(`hero-slide-1-768.webp ${formatBytes(v768)}`);
  console.log(`hero-slide-1-1280.webp ${formatBytes(v1280)}`);
}

await main();
