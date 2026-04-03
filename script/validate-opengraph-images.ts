import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

async function validateOpenGraphImages() {
  console.log("🔍 Validating OpenGraph Images...\n");
  
  const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");
  const ogImage = path.join(publicDir, "opengraph.jpg");
  
  try {
    // Check if file exists
    await fs.access(ogImage);
    console.log("✅ opengraph.jpg exists\n");
    
    // Get file stats
    const stats = await fs.stat(ogImage);
    console.log("📊 File Information:");
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Last Modified: ${stats.mtime}`);
    
    // Try to get image dimensions using sharp (if available)
    try {
      const sharp = require("sharp");
      const metadata = await sharp(ogImage).metadata();
      
      console.log("\n📐 Image Dimensions:");
      console.log(`   Width: ${metadata.width}px`);
      console.log(`   Height: ${metadata.height}px`);
      console.log(`   Format: ${metadata.format}`);
      console.log(`   Channels: ${metadata.channels}`);
      console.log(`   Depth: ${metadata.depth}`);
      console.log(`   Density: ${metadata.density}`);
      
      // Validate dimensions
      const isValidSize = metadata.width === 1200 && metadata.height === 630;
      const isValidFormat = metadata.format === "jpeg" || metadata.format === "jpg";
      const isValidChannels = metadata.channels === 3; // RGB
      
      console.log("\n✅ Validation Results:");
      
      if (isValidSize) {
        console.log("   ✅ Dimensions are correct (1200x630px)");
      } else {
        console.log(`   ⚠️  WARNING: Dimensions should be 1200x630px, got ${metadata.width}x${metadata.height}px`);
        console.log("      Recommended: Resize to 1200x630px for optimal social media sharing");
      }
      
      if (isValidFormat) {
        console.log("   ✅ Format is JPEG (correct)");
      } else {
        console.log(`   ⚠️  WARNING: Format should be JPEG, got ${metadata.format}`);
      }
      
      if (isValidChannels) {
        console.log("   ✅ Color mode is RGB (correct)");
      } else {
        console.log(`   ⚠️  WARNING: Should be RGB color mode, got ${metadata.channels} channels`);
      }
      
      // File size check
      const maxSizeKB = 300; // 300KB recommended
      if (stats.size < maxSizeKB * 1024) {
        console.log(`   ✅ File size is good (${(stats.size / 1024).toFixed(2)} KB < ${maxSizeKB} KB)`);
      } else {
        console.log(`   ⚠️  WARNING: File size is too large (${(stats.size / 1024).toFixed(2)} KB > ${maxSizeKB} KB)`);
        console.log("      Recommended: Compress or resize to under 300KB");
      }
      
    } catch (sharpError) {
      console.log("\n⚠️  Could not analyze image dimensions (sharp not installed)");
      console.log("   Install with: npm install sharp");
      console.log("   Or manually verify:");
      console.log("   - Dimensions: 1200x630px (recommended)");
      console.log("   - Format: JPEG");
      console.log("   - Max size: 300KB");
    }
    
    // Check if image is accessible in build output
    const distPublicDir = path.resolve(import.meta.dirname, "..", "dist", "public");
    const distOgImage = path.join(distPublicDir, "opengraph.jpg");
    
    try {
      await fs.access(distOgImage);
      const distStats = await fs.stat(distOgImage);
      console.log("\n✅ Build Output:");
      console.log("   ✅ opengraph.jpg exists in dist/public/");
      console.log(`   Size: ${(distStats.size / 1024).toFixed(2)} KB`);
    } catch {
      console.log("\n❌ Build Output:");
      console.log("   ❌ ERROR: opengraph.jpg NOT found in dist/public/");
      console.log("   This means the image won't be available on production!");
      console.log("\n   Solution:");
      console.log("   1. Check that opengraph.jpg is in client/public/");
      console.log("   2. Run: npm run build");
      console.log("   3. Verify it copies to dist/public/");
    }
    
    // Summary
    console.log("\n📋 Summary:");
    console.log("   URL on production: https://eef.rs/opengraph.jpg");
    console.log("   Used in meta tags: og:image, og:image:secure_url");
    console.log("   Twitter Card: summary_large_image");
    
  } catch (error: any) {
    console.error("\n❌ Error:");
    console.error(`   ${error.message}`);
    console.error("\n   Make sure opengraph.jpg exists in client/public/");
  }
}

validateOpenGraphImages().catch(console.error);
