import "dotenv/config";
import fs from "fs/promises";
import path from "path";

// Performance budget for Core Web Vitals
const PERFORMANCE_BUDGET = {
  // LCP (Largest Contentful Paint) - should be < 2.5s
  lcp: { target: 2500, max: 4000 },
  
  // FID (First Input Delay) - should be < 100ms
  fid: { target: 100, max: 300 },
  
  // CLS (Cumulative Layout Shift) - should be < 0.1
  cls: { target: 0.1, max: 0.25 },
  
  // TTFB (Time to First Byte) - should be < 800ms
  ttfb: { target: 800, max: 1500 },
  
  // Image size budget (per image)
  imageSize: { max: 300 * 1024 }, // 300KB
  
  // Total page weight
  pageWeight: { max: 3 * 1024 * 1024 }, // 3MB
  
  // Number of requests
  requests: { max: 100 }
};

async function analyzePerformance() {
  console.log("🔍 Analyzing Core Web Vitals...\n");
  
  const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");
  const assetsDir = path.join(publicDir, "assets");
  
  // Check image sizes
  console.log("📊 Image Size Analysis:");
  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];
  let totalImageSize = 0;
  let oversizedImages: Array<{ file: string; size: number }> = [];
  
  const scanDirectory = async (dir: string) => {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (imageExtensions.some(ext => entry.name.toLowerCase().endsWith(ext))) {
          const stats = await fs.stat(fullPath);
          totalImageSize += stats.size;
          
          if (stats.size > PERFORMANCE_BUDGET.imageSize.max) {
            oversizedImages.push({
              file: path.relative(publicDir, fullPath),
              size: stats.size
            });
          }
        }
      }
    } catch (error) {
      // Directory might not exist
    }
  };
  
  await scanDirectory(assetsDir);
  
  console.log(`   Total images size: ${(totalImageSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Budget: ${(PERFORMANCE_BUDGET.pageWeight.max / 1024 / 1024).toFixed(2)} MB`);
  
  if (oversizedImages.length > 0) {
    console.log(`\n   ⚠️  ${oversizedImages.length} oversized images found:`);
    oversizedImages.forEach(img => {
      console.log(`      - ${img.file}: ${(img.size / 1024).toFixed(0)} KB`);
    });
  } else {
    console.log("   ✅ All images are within budget");
  }
  
  console.log("\n💡 Recommendations:");
  console.log("   1. Use next-gen formats (WebP, AVIF)");
  console.log("   2. Implement lazy loading for below-fold images");
  console.log("   3. Add explicit width/height to prevent CLS");
  console.log("   4. Preload critical images (hero section)");
  console.log("   5. Compress images with tools like Squoosh or ImageOptim");
}

analyzePerformance().catch(console.error);
