import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { NewsTicker } from "@/components/home/NewsTicker";
import { Showcase } from "@/components/home/Showcase";
import { SocialProof } from "@/components/home/SocialProof";
import { BentoServices } from "@/components/home/BentoServices";
import { WebshopCTA } from "@/components/home/WebshopCTA";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <NewsTicker />
        <SocialProof />
        <BentoServices />
        <Showcase />
        <WebshopCTA />
      </main>
      <Footer />
    </div>
  );
}
