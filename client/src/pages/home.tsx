import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ImpactDashboard } from "@/components/home/ImpactDashboard";
import { Showcase } from "@/components/home/Showcase";
import { ROICalculator } from "@/components/home/ROICalculator";
import { Concierge } from "@/components/home/Concierge";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ImpactDashboard />
        <Concierge />
        <Showcase />
        <ROICalculator />
      </main>
      <Footer />
    </div>
  );
}
