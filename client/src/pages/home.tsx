import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { NewsTicker } from "@/components/home/NewsTicker";
import { ImpactDashboard } from "@/components/home/ImpactDashboard";
import { Showcase } from "@/components/home/Showcase";
import { ROICalculator } from "@/components/home/ROICalculator";
import { Concierge } from "@/components/home/Concierge";
import { SocialProof } from "@/components/home/SocialProof";
import { ESGGenerator } from "@/components/home/ESGGenerator";
import { BentoServices } from "@/components/home/BentoServices";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <NewsTicker />
        <SocialProof />
        <BentoServices />
        <ImpactDashboard />
        <Concierge />
        <Showcase />
        <ESGGenerator />
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
}
