import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Scale, FileWarning, AlertCircle, Copyright, Gavel, CheckCircle, Globe, FileText } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30 text-slate-300">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0F19]">
          <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-widest mb-6">
              <Scale className="w-3 h-3" />
              Pravne odredbe
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              Uslovi <span className="text-primary">Korišćenja</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              Molimo vas da pažljivo pročitate uslove korišćenja pre upotrebe veb-sajta Eko Elektrofrigo d.o.o.
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
                <a href="#prihvatanje" className="block text-sm text-primary font-medium">1. Prihvatanje uslova</a>
                <a href="#intelektualna" className="block text-sm text-slate-500 hover:text-white transition-colors">2. Intelektualna svojina</a>
                <a href="#upotreba" className="block text-sm text-slate-500 hover:text-white transition-colors">3. Ograničenja upotrebe</a>
                <a href="#odricanje" className="block text-sm text-slate-500 hover:text-white transition-colors">4. Odricanje od odgovornosti</a>
                <a href="#linkovi" className="block text-sm text-slate-500 hover:text-white transition-colors">5. Linkovi trećih strana</a>
                <a href="#izmene" className="block text-sm text-slate-500 hover:text-white transition-colors">6. Izmene uslova</a>
                <a href="#nadleznost" className="block text-sm text-slate-500 hover:text-white transition-colors">7. Nadležnost</a>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-16">
              
              {/* Section 1 */}
              <div id="prihvatanje" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">1. Prihvatanje uslova</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Pristupanjem i korišćenjem veb-sajta Eko Elektrofrigo (www.eef.rs), prihvatate da budete obavezani ovim Uslovima korišćenja, svim važećim zakonima i propisima, i slažete se da ste odgovorni za usklađenost sa svim važećim lokalnim zakonima. Ako se ne slažete sa bilo kojim od ovih uslova, zabranjeno vam je korišćenje ili pristup ovom sajtu.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="intelektualna" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Copyright className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">2. Intelektualna svojina</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Sav sadržaj na ovom sajtu, uključujući ali ne ograničavajući se na tekst, grafiku, logotipe, ikone, slike, audio klipove, digitalna preuzimanja i softver, vlasništvo je Eko Elektrofrigo d.o.o. ili njegovih dobavljača sadržaja i zaštićen je međunarodnim zakonima o autorskim pravima.
                  </p>
                  <p className="mt-4">
                    Brending, logotipi i žigovi prikazani na sajtu su registrovani i neregistrovani žigovi kompanije Eko Elektrofrigo i njenih partnera.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div id="upotreba" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileWarning className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">3. Ograničenja upotrebe</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">Dozvoljeno vam je da privremeno preuzmete jednu kopiju materijala (informacija ili softvera) na sajtu Eko Elektrofrigo samo za lično, nekomercijalno privremeno gledanje. Ovo je davanje licence, a ne prenos vlasništva, i pod ovom licencom ne smete:</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>Modifikovati ili kopirati materijale;</li>
                    <li>Koristiti materijale u bilo koje komercijalne svrhe ili za bilo kakvo javno prikazivanje (komercijalno ili nekomercijalno);</li>
                    <li>Pokušati dekompajlirati ili vršiti obrnuti inženjering bilo kog softvera koji se nalazi na sajtu;</li>
                    <li>Ukloniti bilo kakve autorske ili druge vlasničke oznake sa materijala; ili</li>
                    <li>Preneti materijale drugoj osobi ili "kopirati" materijale na bilo koji drugi server.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div id="odricanje" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">4. Odricanje od odgovornosti</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Materijali na sajtu Eko Elektrofrigo se pružaju "kakvi jesu". Eko Elektrofrigo ne daje nikakve garancije, izričite ili podrazumevane, i ovim se odriče i negira sve druge garancije, uključujući bez ograničenja, podrazumevane garancije ili uslove prodajnosti, prikladnosti za određenu svrhu ili nekršenja intelektualne svojine ili drugih prava.
                  </p>
                  <p className="mt-4">
                    Dalje, Eko Elektrofrigo ne garantuje niti daje bilo kakve izjave u vezi sa tačnošću, verovatnim rezultatima ili pouzdanošću korišćenja materijala na svom internet sajtu ili na drugi način u vezi sa takvim materijalima ili na bilo kojim sajtovima povezanim sa ovim sajtom.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="linkovi" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">5. Linkovi trećih strana</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Eko Elektrofrigo nije pregledao sve sajtove povezane sa svojim internet sajtom i nije odgovoran za sadržaj bilo kog takvog povezanog sajta. Uključivanje bilo kog linka ne podrazumeva odobravanje sajta od strane Eko Elektrofrigo. Korišćenje bilo kog takvog povezanog veb-sajta je na sopstveni rizik korisnika.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div id="izmene" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">6. Izmene uslova</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Eko Elektrofrigo može revidirati ove uslove korišćenja u bilo koje vreme bez prethodne najave. Koristeći ovaj sajt slažete se da ćete biti obavezni tadašnjim verzijama ovih uslova korišćenja.
                  </p>
                  <p className="mt-4">
                    Preporučujemo vam da redovno proveravate ovu stranicu radi eventualnih izmena. Vaše nastavno korišćenje sajta nakon objavljivanja izmena predstavlja vaše prihvatanje tih izmena.
                  </p>
                </div>
              </div>
              {/* Section 7 */}
              <div id="nadleznost" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">7. Merodavno pravo</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    Ovi uslovi i odredbe se regulišu i tumače u skladu sa zakonima Republike Srbije i vi se neopozivo podvrgavate isključivoj nadležnosti sudova u toj državi ili lokaciji.
                  </p>
                </div>
              </div>

              {/* Contact Block */}
              <div className="scroll-mt-32 p-8 rounded-2xl bg-white/5 border border-white/10 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">Imate pitanja o uslovima?</h3>
                <p className="text-slate-400 mb-6">
                  Slobodno nas kontaktirajte za sva dodatna pojašnjenja.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                    Kontaktirajte nas
                  </a>
                  <a href="mailto:office@eef.rs" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                    office@eef.rs
                  </a>
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
