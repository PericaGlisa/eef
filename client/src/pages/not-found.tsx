import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Home, PhoneCall } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Navbar />
      <main className="relative overflow-hidden bg-[#0b0d2e] pt-44 pb-24 md:pb-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[-120px] h-[420px] w-[420px] rounded-full bg-primary/15 blur-[90px]" />
          <div className="absolute bottom-[-120px] left-[-80px] h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_55%)]" />
        </div>
        <section className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Compass className="h-4 w-4" />
              Stranica nije pronađena
            </div>
            <p className="font-heading text-[clamp(4rem,15vw,8rem)] leading-none font-bold tracking-tight text-white/15">
              404
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-5xl">
              Izgleda da je ova stranica uklonjena ili premeštena
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Vratite se na početnu stranu ili otvorite kontakt stranicu i naš tim će vam pomoći da pronađete informacije koje su vam potrebne.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Nazad na početnu
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link href="/kontakt">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Kontaktirajte nas
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
                <Link href="/vesti">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Pogledaj aktuelne vesti
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
