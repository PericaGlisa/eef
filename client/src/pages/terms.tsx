import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Scale, FileWarning, AlertCircle, Copyright, Gavel, CheckCircle, Globe, FileText } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";
import { getCounterpartPath } from "@/lib/route-map";

export default function Terms() {
  const { t } = useTranslation();
  const { isEnglish } = useLang();
  const l = (srHref: string) => isEnglish ? getCounterpartPath(srHref, "en") : srHref;

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
              {t("terms.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              {isEnglish ? "Terms of " : "Uslovi "}
              <span className="text-primary">{isEnglish ? "Use" : "Korišćenja"}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {t("terms.intro")}
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
                <a href="#prihvatanje" className="block text-sm text-primary font-medium">{t("terms.tocAcceptance")}</a>
                <a href="#intelektualna" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocIntellectual")}</a>
                <a href="#upotreba" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocRestrictions")}</a>
                <a href="#odricanje" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocDisclaimer")}</a>
                <a href="#linkovi" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocLinks")}</a>
                <a href="#izmene" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocChanges")}</a>
                <a href="#nadleznost" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("terms.tocJurisdiction")}</a>
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
                  <h2 className="text-2xl font-bold text-white">{t("terms.section1Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "By accessing and using the Eko Elektrofrigo website (www.eef.rs), you accept that you will be bound by these Terms of Use, all applicable laws and regulations, and agree that you are responsible for compliance with all applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
                      : "Pristupanjem i korišćenjem veb-sajta Eko Elektrofrigo (www.eef.rs), prihvatate da budete obavezni ovim Uslovima korišćenja, svim važećim zakonima i propisima, i slažete se da ste odgovorni za usklađenost sa svim važećim lokalnim zakonima. Ako se ne slažete sa bilo kojim od ovih uslova, zabranjeno vam je korišćenje ili pristup ovom sajtu."
                    }
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="intelektualna" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Copyright className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section2Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "All content on this site, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Eko Elektrofrigo d.o.o. or its content suppliers and is protected by international copyright laws."
                      : "Sav sadržaj na ovom sajtu, uključujući ali ne ograničavajući se na tekst, grafiku, logotipe, ikone, slike, audio klipove, digitalna preuzimanja i softver, vlasništvo je Eko Elektrofrigo d.o.o. ili njegovih dobavljača sadržaja i zaštićen je međunarodnim zakonima o autorskim pravima."
                    }
                  </p>
                  <p className="mt-4">
                    {isEnglish
                      ? "The branding, logos, and trademarks displayed on the site are registered and unregistered trademarks of Eko Elektrofrigo and its partners."
                      : "Brending, logotipi i žigovi prikazani na sajtu su registrovani i neregistrovani žigovi kompanije Eko Elektrofrigo i njenih partnera."
                    }
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div id="upotreba" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileWarning className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section3Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">
                    {isEnglish
                      ? "You are permitted to temporarily download one copy of the materials (information or software) on the Eko Elektrofrigo site for personal, non-commercial temporary viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:"
                      : "Dozvoljeno vam je da privremeno preuzmete jednu kopiju materijala (informacija ili softvera) na sajtu Eko Elektrofrigo samo za lično, nekomercijalno privremeno gledanje. Ovo je davanje licence, a ne prenos vlasništva, i pod ovom licencom ne smete:"
                    }
                  </p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>{isEnglish ? "Modify or copy the materials;" : "Modifikovati ili kopirati materijale;"}</li>
                    <li>{isEnglish ? "Use the materials for any commercial purpose or for any public display (commercial or non-commercial);" : "Koristiti materijale u bilo koje komercijalne svrhe ili za bilo kakvo javno prikazivanje (komercijalno ili nekomercijalno);"}</li>
                    <li>{isEnglish ? "Attempt to decompile or reverse engineer any software contained on the site;" : "Pokušati dekompajlirati ili vršiti obrnuti inženjering bilo kog softvera koji se nalazi na sajtu;"}</li>
                    <li>{isEnglish ? "Remove any copyright or other proprietary notations from the materials; or" : "Ukloniti bilo kakve autorske ili druge vlasničke oznake sa materijala; ili"}</li>
                    <li>{isEnglish ? "Transfer the materials to another person or \"mirror\" the materials on any other server." : "Preneti materijale drugoj osobi ili \"kopirati\" materijale na bilo koji drugi server."}</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div id="odricanje" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section4Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "The materials on the Eko Elektrofrigo site are provided \"as is\". Eko Elektrofrigo makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other rights."
                      : "Materijali na sajtu Eko Elektrofrigo se pružaju \"kakvi jesu\". Eko Elektrofrigo ne daje nikakve garancije, izričite ili podrazumevane, i ovim se odriče i negira sve druge garancije, uključujući bez ograničenja, podrazumevane garancije ili uslove prodajnosti, prikladnosti za određenu svrhu ili nekršenja intelektualne svojine ili drugih prava."
                    }
                  </p>
                  <p className="mt-4">
                    {isEnglish
                      ? "Furthermore, Eko Elektrofrigo does not warrant or make any representations regarding the accuracy, likely results, or reliability of the use of the materials on its internet site or otherwise relating to such materials or on any sites linked to this site."
                      : "Dalje, Eko Elektrofrigo ne garantuje niti daje bilo kakve izjave u vezi sa tačnošću, verovatnim rezultatima ili pouzdanošću korišćenja materijala na svom internet sajtu ili na drugi način u vezi sa takvim materijalima ili na bilo kojim sajtovima povezanim sa ovim sajtom."
                    }
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="linkovi" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section5Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "Eko Elektrofrigo has not reviewed all sites linked to its internet site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Eko Elektrofrigo of the site. Use of any such linked website is at the user's own risk."
                      : "Eko Elektrofrigo nije pregledao sve sajtove povezane sa svojim internet sajtom i nije odgovoran za sadržaj bilo kog takvog povezanog sajta. Uključivanje bilo kog linka ne podrazumeva odobravanje sajta od strane Eko Elektrofrigo. Korišćenje bilo kog takvog povezanog veb-sajta je na sopstveni rizik korisnika."
                    }
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div id="izmene" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section6Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "Eko Elektrofrigo may revise these terms of use at any time without prior notice. By using this site you agree to be bound by the then-current version of these terms of use."
                      : "Eko Elektrofrigo može revidirati ove uslove korišćenja u bilo koje vreme bez prethodne najave. Koristeći ovaj sajt slažete se da ćete biti obavezni tadašnjim verzijama ovih uslova korišćenja."
                    }
                  </p>
                  <p className="mt-4">
                    {isEnglish
                      ? "We recommend that you regularly check this page for any changes. Your continued use of the site after changes are posted constitutes your acceptance of those changes."
                      : "Preporučujemo vam da redovno proveravate ovu stranicu radi eventualnih izmena. Vaše nastavno korišćenje sajta nakon objavljivanja izmena predstavlja vaše prihvatanje tih izmena."
                    }
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div id="nadleznost" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Gavel className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("terms.section7Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "These terms and conditions are governed by and construed in accordance with the laws of the Republic of Serbia and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location."
                      : "Ovi uslovi i odredbe se regulišu i tumače u skladu sa zakonima Republike Srbije i vi se neopozivo podvrgavate isključivoj nadležnosti sudova u toj državi ili lokaciji."
                    }
                  </p>
                </div>
              </div>

              {/* Contact Block */}
              <div className="scroll-mt-32 p-8 rounded-2xl bg-white/5 border border-white/10 mt-12">
                <h3 className="text-xl font-bold text-white mb-4">{t("terms.contactBlockTitle")}</h3>
                <p className="text-slate-400 mb-6">
                  {t("terms.contactBlockText")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={l("/kontakt")} className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                    {t("terms.contactBtn")}
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
