import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Server, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { t } = useTranslation();
  const { isEnglish } = useLang();

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
              {t("privacy.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              {isEnglish ? "Privacy " : "Politika "}
              <span className="text-primary">{isEnglish ? "Policy" : "Privatnosti"}</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
              {t("privacy.intro")}
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
                <a href="#uvod" className="block text-sm text-primary font-medium">{t("privacy.tocIntro")}</a>
                <a href="#prikupljanje" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocCollection")}</a>
                <a href="#upotreba" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocUsage")}</a>
                <a href="#kolacici" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocCookies")}</a>
                <a href="#zastita" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocProtection")}</a>
                <a href="#prava" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocRights")}</a>
                <a href="#kontakt" className="block text-sm text-slate-500 hover:text-white transition-colors">{t("privacy.tocContact")}</a>
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
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section1Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "This Privacy Policy describes how Eko Elektrofrigo d.o.o. (\"we\", \"us\", \"our\") collects, uses, and protects your personal data when you visit our website or use our services. We respect your privacy and are dedicated to protecting your personal data in accordance with the Personal Data Protection Law of the Republic of Serbia (\"Official Gazette of RS\", No. 87/2018)."
                      : "Ova Politika privatnosti opisuje kako Eko Elektrofrigo d.o.o. (\"mi\", \"nas\", \"naš\") prikuplja, koristi i štiti vaše lične podatke kada posetite naš veb-sajt ili koristite naše usluge. Poštujemo vašu privatnost i posvećeni smo zaštiti vaših ličnih podataka u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (\"Službeni glasnik RS\", br. 87/2018)."
                    }
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div id="prikupljanje" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section2Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">{isEnglish ? "We may collect the following types of information:" : "Možemo prikupljati sledeće vrste informacija:"}</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li><strong>{isEnglish ? "Personal data:" : "Lični podaci:"}</strong> {isEnglish ? "Name, surname, email address, phone number, and other information you voluntarily provide through contact forms." : "Ime, prezime, e-mail adresa, broj telefona i druge informacije koje nam dobrovoljno dostavite putem kontakt formi."}</li>
                    <li><strong>{isEnglish ? "Technical data:" : "Tehnički podaci:"}</strong> {isEnglish ? "IP address, browser type, operating system, visit time, and pages visited (via Google Analytics tools)." : "IP adresa, vrsta pretraživača, operativni sistem, vreme posete i stranice koje ste posetili (putem Google Analytics alata)."}</li>
                    <li><strong>{isEnglish ? "Usage data:" : "Podaci o korišćenju:"}</strong> {isEnglish ? "Information about how you use our site so we can improve the user experience." : "Informacije o tome kako koristite naš sajt kako bismo poboljšali korisničko iskustvo."}</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div id="upotreba" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Server className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section3Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">{isEnglish ? "We use the collected data for the following purposes:" : "Prikupljene podatke koristimo u sledeće svrhe:"}</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li>{isEnglish ? "To respond to your inquiries and provide requested information or services." : "Za odgovaranje na vaše upite i pružanje traženih informacija ili usluga."}</li>
                    <li>{isEnglish ? "To improve the functionality and content of our website." : "Za poboljšanje funkcionalnosti i sadržaja našeg veb-sajta."}</li>
                    <li>{isEnglish ? "To analyze site traffic and track usage statistics." : "Za analizu posećenosti sajta i praćenje statistike korišćenja."}</li>
                    <li>{isEnglish ? "To fulfill legal obligations." : "Za ispunjavanje zakonskih obaveza."}</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div id="kolacici" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section4Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "Our site uses \"cookies\" – small text files stored on your device. We use them for traffic analysis (Google Analytics) and improving the user experience."
                      : "Naš sajt koristi \"kolačiće\" (cookies) – male tekstualne datoteke koje se čuvaju na vašem uređaju. Koristimo ih za analizu saobraćaja (Google Analytics) i poboljšanje korisničkog iskustva."
                    }
                  </p>
                  <p className="mt-4">
                    {isEnglish
                      ? "You can control or delete cookies through your internet browser settings. Please note that disabling cookies may affect the functionality of certain parts of the site."
                      : "Možete kontrolisati ili izbrisati kolačiće putem podešavanja vašeg internet pretraživača. Imajte na umu da onemogućavanje kolačića može uticati na funkcionalnost određenih delova sajta."
                    }
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div id="zastita" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section5Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p>
                    {isEnglish
                      ? "We take appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, misuse, or alteration. Access to your data is limited to authorized personnel who need such data to perform their duties."
                      : "Preduzimamo odgovarajuće tehničke i organizacione mere kako bismo zaštitili vaše lične podatke od neovlašćenog pristupa, gubitka, zloupotrebe ili izmene. Pristup vašim podacima ograničen je samo na ovlašćena lica kojima su ti podaci neophodni za obavljanje posla."
                    }
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div id="prava" className="scroll-mt-32 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t("privacy.section6Title")}</h2>
                </div>
                <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
                  <p className="mb-4">{isEnglish ? "In accordance with the law, you have the right to:" : "U skladu sa zakonom, imate pravo na:"}</p>
                  <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                    <li><strong>{isEnglish ? "Access:" : "Pristup:"}</strong> {isEnglish ? "The right to know what data we have about you." : "Pravo da znate koje podatke imamo o vama."}</li>
                    <li><strong>{isEnglish ? "Correction:" : "Ispravku:"}</strong> {isEnglish ? "The right to request correction of inaccurate data." : "Pravo da tražite ispravku netačnih podataka."}</li>
                    <li><strong>{isEnglish ? "Deletion:" : "Brisanje:"}</strong> {isEnglish ? "The right to request deletion of your data (\"right to be forgotten\")." : "Pravo da tražite brisanje vaših podataka (\"pravo na zaborav\")."}</li>
                    <li><strong>{isEnglish ? "Restriction:" : "Ograničenje obrade:"}</strong> {isEnglish ? "The right to restrict how we use your data." : "Pravo da ograničite način na koji koristimo vaše podatke."}</li>
                    <li><strong>{isEnglish ? "Objection:" : "Prigovor:"}</strong> {isEnglish ? "The right to object to data processing." : "Pravo da uložite prigovor na obradu podataka."}</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div id="kontakt" className="scroll-mt-32 p-8 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">{t("privacy.section7Title")}</h2>
                <p className="text-slate-400 mb-6">
                  {t("privacy.contactBlockText")}
                </p>
                <div className="space-y-2 text-slate-300">
                  <p><strong className="text-white">Eko Elektrofrigo d.o.o.</strong></p>
                  <p>{isEnglish ? "Address: " : "Adresa: "}Svetolika Nikačevića 11, {isEnglish ? "Belgrade" : "Beograd"}</p>
                  <p>Email: <a href="mailto:office@eef.rs" className="text-primary hover:underline">office@eef.rs</a></p>
                  <p>{isEnglish ? "Phone: " : "Telefon: "}+381 11 375 72 87</p>
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
