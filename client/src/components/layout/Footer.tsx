import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ArrowRight, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0e1035] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Intro */}
          <div className="space-y-6">
            <img 
              src="/assets/Logo-20260122_112545_1769410803059.png" 
              alt="EEF" 
              className="h-8 w-auto brightness-0 invert" 
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Porodično preduzeće osnovano 1996. godine. Lider u industrijskoj rashladi i energetskoj efikasnosti. Gradimo finansijske tvrđave kroz inženjering.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Kompanija</h4>
            <ul className="space-y-4">
              {['O nama', 'Usluge', 'Projekti', 'Karijera', 'Kontakt'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ISO Download */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Sertifikati</h4>
            <div className="group cursor-pointer p-6 border border-white/10 hover:border-primary/50 bg-white/5 transition-all duration-300 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FileText className="w-8 h-8 text-white/50 group-hover:text-primary mb-4 transition-colors" />
              <h5 className="font-heading font-bold text-lg mb-1">ISO 9001:2015</h5>
              <p className="text-xs text-white/50 mb-4">Sistem menadžmenta kvalitetom</p>
              <div className="flex items-center text-primary text-xs font-mono uppercase tracking-wider">
                Preuzmi PDF <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Ostanite povezani</h4>
            <div className="relative group">
              <Input 
                className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-primary placeholder:text-white/30 text-white transition-colors"
                placeholder="Vaša email adresa"
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute right-0 bottom-1 hover:bg-transparent hover:text-primary text-white/50"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-white/40">
              Prijavite se na naš newsletter za najnovije vesti iz sveta energetike.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <div>© 2026 Eko Elektrofrigo. Sva prava zadržana.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
