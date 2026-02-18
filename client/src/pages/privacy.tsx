import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, Globe } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 text-slate-300">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]">
          <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
              <Shield className="w-3 h-3" />
              Vaša privatnost je prioritet
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              Politika <span className="text-primary">Privatnosti</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Eko Elektrofrigo se obavezuje da će čuvati vašu privatnost i transparentno upravljati vašim podacima u skladu sa zakonima Republike Srbije.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Navigation / TOC (Sticky) */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 space-y-2 border-l border-white/10 pl-6">
                <a href="#uvod" className="block text-sm text-primary font-medium">1. Uvod</a>
                <a href="#prikupljanje" className="block text-sm text-slate-500 hover:text-white transition-colors">2. Prikupljanje podataka</a>
                <a href="#upotreba" className="block text-sm text-slate-500 hover:text-white transition-colors">3. Upotreba podataka</a>
                <a href="#kolacici" className="block text-sm text-slate-500 hover:text-white transition-colors">4. Kolačići (Cookies)</a>
                <a href="#zastita" className="block text-sm text-slate-500 hover:text-white transition-colors">5. Zaštita podataka</a>
                <a href="#prava" className="block text-sm text-slate-500 hover:text-white transition-colors">6. Vaša prava</a>
                <a href="#kontakt" className="block text-sm text-slate-500 hover:text-white transition-colors">7. Kontakt</a>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-16">
              
              {/* Section 1 */}
              <div id="uvod" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">1. Uvodne odredbe</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Ova Politika privatnosti opisuje kako Eko Elektrofrigo d.o.o. ("mi", "nas", "naš") prikuplja, koristi i štiti vaše lične podatke kada posetite naš veb-sajt ili koristite naše usluge. Poštujemo vašu privatnost i posvećeni smo zaštiti vaših ličnih podataka u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije ("Službeni glasnik RS", br. 87/2018).
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="prikupljanje" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">2. Koje podatke prikupljamo?</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">Možemo prikupljati sledeće vrste informacija:</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li><strong>Lični podaci:</strong> Ime, prezime, e-mail adresa, broj telefona i druge informacije koje nam dobrovoljno dostavite putem kontakt formi.</li>
                    <li><strong>Tehnički podaci:</strong> IP adresa, vrsta pretraživača, operativni sistem, vreme posete i stranice koje ste posetili (putem Google Analytics alata).</li>
                    <li><strong>Podaci o korišćenju:</strong> Informacije o tome kako koristite naš sajt kako bismo poboljšali korisničko iskustvo.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div id="upotreba" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Server className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">3. Kako koristimo vaše podatke?</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">Prikupljene podatke koristimo u sledeće svrhe:</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>Za odgovaranje na vaše upite i pružanje traženih informacija ili usluga.</li>
                    <li>Za poboljšanje funkcionalnosti i sadržaja našeg veb-sajta.</li>
                    <li>Za analizu posećenosti sajta i praćenje statistike korišćenja.</li>
                    <li>Za ispunjavanje zakonskih obaveza.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div id="kolacici" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">4. Kolačići (Cookies)</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Naš sajt koristi "kolačiće" (cookies) – male tekstualne datoteke koje se čuvaju na vašem uređaju. Koristimo ih za analizu saobraćaja (Google Analytics) i poboljšanje korisničkog iskustva.
                  </p>
                  <p className="mt-4">
                    Možete kontrolisati ili izbrisati kolačiće putem podešavanja vašeg internet pretraživača. Imajte na umu da onemogućavanje kolačića može uticati na funkcionalnost određenih delova sajta.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="zastita" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">5. Zaštita podataka</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Preduzimamo odgovarajuće tehničke i organizacione mere kako bismo zaštitili vaše lične podatke od neovlašćenog pristupa, gubitka, zloupotrebe ili izmene. Pristup vašim podacima ograničen je samo na ovlašćena lica kojima su ti podaci neophodni za obavljanje posla.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div id="prava" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">6. Vaša prava</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">U skladu sa zakonom, imate pravo na:</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li><strong>Pristup:</strong> Pravo da znate koje podatke imamo o vama.</li>
                    <li><strong>Ispravku:</strong> Pravo da tražite ispravku netačnih podataka.</li>
                    <li><strong>Brisanje:</strong> Pravo da tražite brisanje vaših podataka ("pravo na zaborav").</li>
                    <li><strong>Ograničenje obrade:</strong> Pravo da ograničite način na koji koristimo vaše podatke.</li>
                    <li><strong>Prigovor:</strong> Pravo da uložite prigovor na obradu podataka.</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div id="kontakt" className="scroll-mt-32 p-8 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">7. Kontaktirajte nas</h2>
                <p className="text-slate-400 mb-6">
                  Ako imate bilo kakvih pitanja u vezi sa ovom Politikom privatnosti ili želite da ostvarite svoja prava, možete nas kontaktirati:
                </p>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-white">Eko Elektrofrigo d.o.o.</strong></p>
                  <p>Adresa: Svetolika Nikačevića 11, Beograd</p>
                  <p>Email: <a href="mailto:office@eef.rs" className="text-primary hover:underline">office@eef.rs</a></p>
                  <p>Telefon: +381 11 375 72 87</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
