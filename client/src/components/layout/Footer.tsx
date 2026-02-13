import { Link } from "wouter";
import { FileText, ArrowRight, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Vibrant Background Gradients - "Veseliji" vibe */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* ROW 1: Main Content (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-20">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-8">
            <Link href="/" className="inline-block group">
              <img 
                src="/assets/logo.png" 
                alt="EEF" 
                className="h-20 md:h-28 w-auto brightness-0 invert group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500" 
              />
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Porodično preduzeće osnovano 1996. godine. Lider u industrijskoj rashladi i energetskoj efikasnosti. 
              <span className="block mt-2 text-primary font-medium">Gradimo finansijske tvrđave kroz inženjering.</span>
            </p>
            <div className="flex gap-4">
               <a href="https://www.linkedin.com/feed/update/urn:li:activity:6899988285712596994" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group">
                  <Linkedin className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Enhanced) */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Istraži
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Eko Rashlada', href: '/eco-cooling' },
                { name: 'Usluge', href: '/services' },
                { name: 'Kompanija', href: '/about' },
                { name: 'Partneri', href: '/partners' },
                { name: 'Reference', href: '/references' },
                { name: 'Dokumentacija', href: '/documentation' },
                { name: 'Kontakt', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 text-primary/0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Certificates (Visual Card) */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Kvalitet
            </h4>
            <Link href="/documentation/certificates">
              <div className="group cursor-pointer p-8 border border-white/10 hover:border-primary/50 bg-gradient-to-br from-white/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-500 rounded-2xl relative overflow-hidden shadow-2xl hover:shadow-primary/20">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <FileText className="w-24 h-24" />
                </div>
                
                <div className="relative z-10">
                   <div className="px-3 py-1 inline-block bg-primary/20 rounded-full text-xs font-bold text-primary border border-primary/30 mb-4">
                      ISO STANDARDI
                   </div>
                   <h5 className="font-heading font-bold text-2xl mb-2 text-white group-hover:text-primary transition-colors">9001 • 14001 • 45001</h5>
                   <p className="text-sm text-slate-400 mb-6">Integrisani sistem menadžmenta kvaliteta</p>
                   <div className="flex items-center text-white text-sm font-bold group-hover:gap-4 transition-all duration-300">
                     Pogledaj sertifikate <ArrowRight className="w-4 h-4 ml-2 text-primary" />
                   </div>
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* ROW 2: Contact Info Cards (Redesigned) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-t border-white/5 pt-12">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm mb-1">Lokacija</h4>
                    <p className="text-slate-400 text-sm">Svetolika Nikačevića 11</p>
                    <p className="text-slate-400 text-sm">Beograd, Srbija</p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm mb-1">Pozovite nas</h4>
                    <a href="tel:+381113757287" className="text-slate-400 text-sm block hover:text-primary transition-colors">+381 11 375 72 87</a>
                    <a href="tel:+381113757288" className="text-slate-400 text-sm block hover:text-primary transition-colors">+381 11 375 72 88</a>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Mail className="w-6 h-6" />
                </div>
                <div className="w-full">
                    <h4 className="font-bold text-white text-sm mb-1">Email Kontakti</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <a href="mailto:office@eef.rs" className="text-slate-400 text-sm hover:text-primary transition-colors block">office@eef.rs</a>
                      <a href="mailto:prodaja@eef.rs" className="text-slate-400 text-sm hover:text-primary transition-colors block">prodaja@eef.rs</a>
                      <a href="mailto:tehnika@eef.rs" className="text-slate-400 text-sm hover:text-primary transition-colors block">tehnika@eef.rs</a>
                      <a href="mailto:servis@eef.rs" className="text-slate-400 text-sm hover:text-primary transition-colors block">servis@eef.rs</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Eko Elektrofrigo. Sva prava zadržana.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
             <Link href="/privacy" className="hover:text-white transition-colors">Politika privatnosti</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Uslovi korišćenja</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
