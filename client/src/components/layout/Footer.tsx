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
        {/* ROW 1: Brand, Links, Certificates, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Intro */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img 
                src="/assets/logo.png" 
                alt="EEF" 
                className="h-24 w-auto brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-500" 
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Porodično preduzeće osnovano 1996. godine. Lider u industrijskoj rashladi i energetskoj efikasnosti. Gradimo finansijske tvrđave kroz inženjering.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Kompanija</h4>
            <ul className="space-y-4">
              {[
                { name: 'O nama', href: '/about' },
                { name: 'Usluge', href: '/services' },
                { name: 'Reference', href: '/references' },
                { name: 'Partneri', href: '/partners' },
                { name: 'Kontakt', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/80 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-primary transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: ISO Download */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Sertifikati</h4>
            <Link href="/documentation">
              <div className="group cursor-pointer p-6 border border-white/10 hover:border-primary/50 bg-white/5 transition-all duration-300 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                   <FileText className="w-8 h-8 text-white/50 group-hover:text-primary transition-colors" />
                   <div className="px-2 py-1 bg-primary/20 rounded text-[10px] text-primary font-mono border border-primary/30">AKTIVAN</div>
                </div>
                <h5 className="font-heading font-bold text-lg mb-1 relative z-10">ISO 9001:2015</h5>
                <p className="text-xs text-white/50 mb-4 relative z-10">Sistem menadžmenta kvalitetom</p>
                <div className="flex items-center text-primary text-xs font-mono uppercase tracking-wider relative z-10">
                  Preuzmi PDF <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
                {/* Decorative ISO Ring */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full border-4 border-white/5 group-hover:border-primary/20 transition-colors duration-500" />
              </div>
            </Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Bilten</h4>
            <p className="text-white/60 text-sm">
              Budite u toku sa najnovijim vestima i tehnologijama u rashladnoj industriji.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Vaša email adresa" 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 h-12"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
                Prijavi se <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* ROW 2: Contact Information (Dedicated Strip) */}
        <div className="border-t border-white/5 pt-12 pb-12 mb-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded border border-white/10">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Adresa</h4>
                    <p className="text-white/80 text-sm">Svetolika Nikačevića 11</p>
                    <p className="text-white/80 text-sm">Beograd, Srbija</p>
                 </div>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded border border-white/10">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                 </div>
                 <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Telefoni</h4>
                    <a href="tel:+381113757287" className="text-white/80 text-sm hover:text-primary transition-colors block mb-1">+381 11 375 72 87</a>
                    <a href="tel:+381113757288" className="text-white/80 text-sm hover:text-primary transition-colors block">+381 11 375 72 88</a>
                 </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-white/5 rounded border border-white/10">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                 </div>
                 <div className="w-full">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">Email Kontakti</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <a href="mailto:office@eef.rs" className="text-white/80 text-sm hover:text-primary transition-colors block">office@eef.rs</a>
                      <a href="mailto:prodaja@eef.rs" className="text-white/80 text-sm hover:text-primary transition-colors block">prodaja@eef.rs</a>
                      <a href="mailto:tehnika@eef.rs" className="text-white/80 text-sm hover:text-primary transition-colors block">tehnika@eef.rs</a>
                      <a href="mailto:servis@eef.rs" className="text-white/80 text-sm hover:text-primary transition-colors block">servis@eef.rs</a>
                    </div>
                 </div>
              </div>
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
