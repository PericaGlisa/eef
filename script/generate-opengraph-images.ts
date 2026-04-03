import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const SITE_CONFIG = {
  name: "Eko Elektrofrigo",
  tagline: "Industrijski Rashladni Sistemi",
  colors: {
    // Primary brand colors from the website
    darkBlue: "#0e1035",      // Main dark background
    midnightBlue: "#1a1d5c",  // Secondary dark background
    primary: "#059669",       // green-600 - main accent
    emerald: "#10b981",       // green-500 - bright accent
    secondary: "#047857",     // green-700 - darker accent
    text: "#ffffff",
    lightText: "#e2e8f0",
    muted: "#94a3b8",
  },
  fonts: {
    heading: "Arial Black, Arial, sans-serif",
    body: "Arial, Helvetica, sans-serif"
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
  
  // Create SVG with embedded text - matching website branding
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark blue gradient background (matching website hero sections) -->
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SITE_CONFIG.colors.darkBlue};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${SITE_CONFIG.colors.midnightBlue};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${SITE_CONFIG.colors.darkBlue};stop-opacity:1" />
        </linearGradient>
        
        <!-- Green accent gradient (for decorative elements) -->
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${SITE_CONFIG.colors.primary};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${SITE_CONFIG.colors.emerald};stop-opacity:0.2" />
        </linearGradient>
        
        <!-- Glow effect for text -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
          <feComposite operator="over" in2="SourceGraphic"/>
        </filter>
        
        <!-- Subtle shadow -->
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.4"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <!-- Decorative pattern -->
        <pattern id="gridPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.03)"/>
        </pattern>
      </defs>
      
      <!-- Background: Dark blue gradient (like website) -->
      <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>
      
      <!-- Subtle grid pattern overlay -->
      <rect width="${width}" height="${height}" fill="url(#gridPattern)"/>
      
      <!-- Decorative green glow orbs (matching website accent style) -->
      <circle cx="1100" cy="100" r="300" fill="url(#accentGradient)" opacity="0.4"/>
      <circle cx="100" cy="530" r="250" fill="url(#accentGradient)" opacity="0.3"/>
      
      <!-- Angular decorative element (modern tech feel) -->
      <path d="M 0 400 L 200 400 L 150 450 L 0 450 Z" fill="${SITE_CONFIG.colors.primary}" opacity="0.15"/>
      <path d="M ${width} 200 L ${width-150} 200 L ${width-200} 250 L ${width} 250 Z" fill="${SITE_CONFIG.colors.emerald}" opacity="0.12"/>
      
      <!-- Content container with shadow -->
      <g filter="url(#shadow)">
        <!-- Top section - Company name (smaller, subtle) -->
        <text x="60" y="100" font-family="${SITE_CONFIG.fonts.body}" font-size="32" fill="${SITE_CONFIG.colors.muted}" letter-spacing="2">
          ${SITE_CONFIG.name.toUpperCase()}
        </text>
        
        <!-- Main title (large, bold - like website headings) -->
        <text x="60" y="220" font-family="${SITE_CONFIG.fonts.heading}" font-weight="bold" font-size="84" fill="${SITE_CONFIG.colors.text}">
          ${config.title}
        </text>
        
        <!-- Subtitle with green accent (matching website gradient text effect) -->
        <text x="60" y="290" font-family="${SITE_CONFIG.fonts.body}" font-size="38" fill="${SITE_CONFIG.colors.lightText}">
          ${config.subtitle}
        </text>
        
        <!-- Green separator line (brand accent) -->
        <line x1="60" y1="330" x2="300" y2="330" stroke="${SITE_CONFIG.colors.primary}" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Description (body text) -->
        <text x="60" y="390" font-family="${SITE_CONFIG.fonts.body}" font-size="28" fill="${SITE_CONFIG.colors.muted}">
          ${config.description}
        </text>
      </g>
      
      <!-- Bottom section - Website URL with green accent -->
      <g>
        <rect x="60" y="540" width="180" height="50" rx="8" fill="${SITE_CONFIG.colors.primary}" opacity="0.2"/>
        <text x="150" y="575" font-family="${SITE_CONFIG.fonts.heading}" font-weight="bold" font-size="32" fill="${SITE_CONFIG.colors.emerald}" text-anchor="middle">
          eef.rs
        </text>
      </g>
      
      <!-- Corner accent marks (modern design element) -->
      <path d="M ${width-80} ${height-80} L ${width-20} ${height-80} L ${width-20} ${height-20}" fill="none" stroke="${SITE_CONFIG.colors.primary}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      <path d="M 80 80 L 20 80 L 20 20" fill="none" stroke="${SITE_CONFIG.colors.emerald}" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
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
