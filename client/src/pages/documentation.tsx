import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, Search, Download, FileText, Award, Filter, ExternalLink, ChevronRight, Phone, ArrowRight, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

// Centralized documents data
// KORISNIČKO UPUTSTVO:
// 1. Postavite vaše PDF fajlove u folder: client/public/assets/documents/
// 2. Dodajte novi objekat u ovu listu ispod za svaki novi fajl
const documents = [
  {
    id: "cert-1",
    title: "Sertifikat Br. ES-0038",
    subtitle: "Sistem menadžmenta zaštitom životne sredine",
    standard: "SRPS ISO 14001:2015",
    type: "certificate",
    category: "ISO Standard",
    date: "2024",
    fileUrl: "/assets/documents/Sertifikat Br. ES-0038.pdf"
  },
  {
    id: "cert-2",
    title: "Sertifikat Br. OH-0055",
    subtitle: "Sistem menadžmenta bezbednošću i zdravljem na radu",
    standard: "SRPS ISO 45001:2018",
    type: "certificate",
    category: "ISO Standard",
    date: "2024",
    fileUrl: "/assets/documents/Sertifikat Br. OH-0055.pdf"
  },
  {
    id: "cert-3",
    title: "Sertifikat Br. QS-0211",
    subtitle: "Sistem menadžmenta kvalitetom",
    standard: "SRPS ISO 9001:2015",
    type: "certificate",
    category: "ISO Standard",
    date: "2024",
    fileUrl: "/assets/documents/Sertifikat Br. QS-0211.pdf"
  },
  {
    id: "cert-4",
    title: "Bitzer Sertifikat",
    subtitle: "Ovlašćeni servisni partner za kompresore",
    standard: "Service Partner",
    type: "certificate",
    category: "Partnerstvo",
    date: "Jun 2022",
    fileUrl: "/assets/documents/Bitzer Sertifikat.pdf"
  },
  {
    id: "dip-1",
    title: "Danfoss Partner Diploma",
    subtitle: "Priznanje za izuzetno partnerstvo i stručnost",
    standard: "Platinum & Gold",
    type: "diploma",
    category: "Partnerstvo",
    date: "2024",
    fileUrl: "/assets/documents/Danfoss Partner Diploma.pdf"
  }
];

export default function Documentation() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "certificate" | "diploma">("all");

  useEffect(() => {
    if (location.includes("certificates")) {
      setActiveFilter("certificate");
    } else if (location.includes("diplomas")) {
      setActiveFilter("diploma");
    } else {
      setActiveFilter("all");
    }
  }, [location]);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.standard.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || doc.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/20">
      <Navbar />
      
      {/* Technical Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#0e1035]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0e1035]/90 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1035] via-[#0e1035]/95 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop" 
            alt="Technical Documentation Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Abstract Technical Background */}
        <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-[0.05] z-10" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-mono mb-8 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4" />
              TEHNIČKA DOKUMENTACIJA
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              Usaglašenost <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary bg-300% animate-gradient">i Kvalitet</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed border-l-4 border-primary/50 pl-6 mb-12">
              Pristupite našim zvaničnim sertifikatima, diplomama i tehničkim specifikacijama koje potvrđuju usaglašenost sa najvišim industrijskim standardima.
            </p>

            {/* Quick Stats / Badges */}
            <div className="flex flex-wrap gap-4 md:gap-8">
              {[
                { label: "ISO 9001", desc: "Kvalitet" },
                { label: "ISO 14001", desc: "Ekologija" },
                { label: "ISO 45001", desc: "Bezbednost" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                  <div>
                    <div className="text-white font-bold font-mono text-sm">{badge.label}</div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">{badge.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-24 bg-[#F8FAFC] relative">
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-24 z-30 bg-[#F8FAFC]/80 backdrop-blur-xl p-4 -mx-4 rounded-2xl border border-slate-200/50 shadow-sm">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              {[
                { id: "all", label: "Svi dokumenti" },
                { id: "certificate", label: "Sertifikati" },
                { id: "diploma", label: "Diplome" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilter === tab.id 
                      ? "bg-white text-[#0e1035] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Pretraži dokumente po nazivu ili standardu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
              >
                {/* Card Header Gradient */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary/80 via-primary to-emerald-400" />
                
                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  {/* Icon & Category */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 text-slate-400">
                      {doc.type === 'certificate' ? <ShieldCheck className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      {doc.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mb-6 flex-grow">
                    <h3 className="text-xl font-heading font-bold text-[#0e1035] mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {doc.subtitle}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <FileText className="w-3 h-3" />
                        <span>PDF</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <div className="text-xs font-mono text-slate-400">
                        {doc.standard}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <a 
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 text-[#0e1035] font-semibold text-sm hover:bg-[#0e1035] hover:text-white transition-all duration-300 group/btn"
                  >
                    <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Preuzmi Dokument
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocs.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0e1035] mb-2">Nema pronađenih dokumenata</h3>
              <p className="text-slate-500">Pokušajte sa drugim terminom za pretragu.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveFilter("all");}}
                className="mt-6 text-primary font-semibold hover:underline"
              >
                Prikaži sve dokumente
              </button>
            </div>
          )}

        </div>
      </section>

      {/* CTA Section - Modernized */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0e1035] rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center border border-[#171A54] shadow-2xl shadow-slate-200"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-primary text-xs font-mono mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="tracking-widest uppercase">Tehnička Podrška</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Trebate Više <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Informacija?</span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                Ukoliko vam je potrebna specifična tehnička dokumentacija koja nije izlistana ovde, naš tim inženjera vam stoji na raspolaganju.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 text-base rounded-full shadow-[0_0_40px_rgba(86,170,74,0.3)] hover:shadow-[0_0_60px_rgba(86,170,74,0.5)] transition-all transform hover:-translate-y-1 group" asChild>
                  <Link href="/contact">
                    Kontaktirajte Nas
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 font-bold px-8 h-14 text-base rounded-full backdrop-blur-sm transition-all" asChild>
                  <a href="mailto:office@ekorashlade.com">
                    <Mail className="mr-2 w-4 h-4" />
                    office@ekorashlade.com
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-xs text-slate-500 font-mono">
                Odgovaramo na sve upite u najkraćem roku
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
