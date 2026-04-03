import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SITE_CONFIG = {
  name: "Eko Elektrofrigo",
  tagline: "Industrijski Rashladni Sistemi",
  colors: {
    primary: "#059669", // green-600
    secondary: "#047857", // green-700
    accent: "#10b981", // green-500
    text: "#1f2937",
    lightText: "#6b7280",
    background: "#ffffff",
  }
};

const IMAGES_TO_CREATE = [
  {
    filename: "opengraph.jpg",
    title: "Eko Elektrofrigo",
    subtitle: "Lider u industrijskom rashlađivanju",
    description: "Inženjering • Projektovanje • Održavanje"
  },
  {
    filename: "og-usluge.jpg",
    title: "Naše Usluge",
    subtitle: "Kompletna rešenja za industriju",
    description: "Inženjering • Izvođenje • Servis • Energetska Efikasnost"
  },
  {
    filename: "og-reference.jpg",
    title: "Naše Reference",
    subtitle: "Poverenje vodećih kompanija",
    description: "Agrounija • Danfoss • Bitzer • I mnogi drugi"
  },
  {
    filename: "og-o-nama.jpg",
    title: "O Nama",
    subtitle: "Tradicija i ekspertiza od 1990.",
    description: "30+ godina iskustva u industriji"
  },
  {
    filename: "og-blog.jpg",
    title: "Blog &amp; Vesti",
    subtitle: "Stručni saveti i novosti",
    description: "Aktuelnosti iz sveta rashladne tehnike"
  },
  {
    filename: "og-kontakt.jpg",
    title: "Kontaktirajte Nas",
    subtitle: "Tu smo za vas 24/7",
    description: "+381 11 3757 287 • office@eef.rs"
  },
  {
    filename: "og-eko-rashlada.jpg",
    title: "Eko Rashlada",
    subtitle: "Energetski efikasna rešenja",
    description: "ULO komore • Agregati • Hladnjače"
  },
  {
    filename: "og-sigurnost.jpg",
    title: "Sigurnost Postrojenja",
    subtitle: "Usklađenost sa propisima",
    description: "Atestiranje • Revizija • Sertifikacija"
  }
];

async function generateOpenGraphImage(config: typeof IMAGES_TO_CREATE[0]) {
  const width = 1200;
  const height = 630;
  
  // Create SVG with embedded text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradient -->
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SITE_CONFIG.colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${SITE_CONFIG.colors.secondary};stop-opacity:1" />
        </linearGradient>
        
        <!-- Shadow filter -->
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Logo pattern -->
        <pattern id="logoPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="30" fill="rgba(255,255,255,0.05)"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Subtle pattern overlay -->
      <rect width="${width}" height="${height}" fill="url(#logoPattern)"/>
      
      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="200" fill="rgba(255,255,255,0.05)"/>
      <circle cx="1100" cy="530" r="150" fill="rgba(255,255,255,0.05)"/>
      
      <!-- Content container -->
      <g filter="url(#shadow)">
        <!-- Top section - Company name -->
        <text x="60" y="120" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="48" fill="white">
          ${SITE_CONFIG.name}
        </text>
        
        <!-- Middle section - Main title -->
        <text x="60" y="240" font-family="Arial, Helvetica, sans-serif" font-weight="bold" font-size="72" fill="white">
          ${config.title}
        </text>
        
        <!-- Subtitle -->
        <text x="60" y="320" font-family="Arial, Helvetica, sans-serif" font-size="42" fill="rgba(255,255,255,0.9)">
          ${config.subtitle}
        </text>
        
        <!-- Separator line -->
        <line x1="60" y1="360" x2="400" y2="360" stroke="rgba(255,255,255,0.5)" stroke-width="3"/>
        
        <!-- Description -->
        <text x="60" y="430" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="rgba(255,255,255,0.8)">
          ${config.description}
        </text>
      </g>
      
      <!-- Bottom section - Website URL -->
      <g>
        <text x="60" y="580" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="rgba(255,255,255,0.7)">
          eef.rs
        </text>
      </g>
      
      <!-- Corner accent -->
      <path d="M 1050 480 L 1140 480 L 1140 570" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
    </svg>
  `;
  
  return await sharp(Buffer.from(svg))
    .resize(width, height)
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();
}

async function optimizeExistingImage(inputPath: string, outputPath: string) {
  console.log("\n🔧 Optimizing existing image...");
  
  const metadata = await sharp(inputPath).metadata();
  console.log(`   Original: ${metadata.width}x${metadata.height}px`);
  
  // Resize to optimal dimensions and compress
  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 85, progressive: true })
    .toFile(outputPath);
  
  const stats = await fs.stat(outputPath);
  console.log(`   Optimized: 1200x630px, ${(stats.size / 1024).toFixed(2)} KB`);
}

async function main() {
  console.log("🎨 Generating OpenGraph Images...\n");
  
  const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");
  
  // First, optimize the original image if needed
  const originalImage = path.join(publicDir, "opengraph.jpg");
  const backupImage = path.join(publicDir, "opengraph-original-backup.jpg");
  
  try {
    await fs.access(originalImage);
    
    // Backup original
    await fs.copyFile(originalImage, backupImage);
    console.log("✅ Backed up original image\n");
    
    // Optimize it
    await optimizeExistingImage(originalImage, originalImage);
  } catch (error) {
    console.log("⚠️  No existing image to optimize\n");
  }
  
  // Generate all images
  for (const config of IMAGES_TO_CREATE) {
    const outputPath = path.join(publicDir, config.filename);
    
    try {
      const imageBuffer = await generateOpenGraphImage(config);
      await fs.writeFile(outputPath, imageBuffer);
      
      const stats = await fs.stat(outputPath);
      console.log(`✅ Generated: ${config.filename}`);
      console.log(`   Title: ${config.title}`);
      console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB\n`);
    } catch (error: any) {
      console.error(`❌ Failed to generate ${config.filename}:`, error.message);
    }
  }
  
  console.log("\n✨ All OpenGraph images generated successfully!");
  console.log("\n📋 Next Steps:");
  console.log("   1. Update SeoManager.tsx to use specific images per page");
  console.log("   2. Test with Facebook Debugger");
  console.log("   3. Verify on production");
}

main().catch(console.error);
