import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FileText, Download, ShieldCheck } from "lucide-react";

const docs = [
  { 
    title: "Sertifikat Br. ES-0038", 
    subtitle: "Usaglašen sa zahtevima standarda SRPS ISO 14001:2015.",
    type: "Sertifikat",
    date: "2024",
    fileUrl: "/assets/documents/sertifikat-es-0038.pdf"
  },
  { 
    title: "Sertifikat Br. OH-0055", 
    subtitle: "Usaglašen sa zahtevima standarda SRPS ISO 45001:2018.",
    type: "Sertifikat",
    date: "2024",
    fileUrl: "/assets/documents/sertifikat-oh-0055.pdf"
  },
  { 
    title: "Sertifikat Br. QS-0211", 
    subtitle: "Usaglašen sa zahtevima standarda SRPS ISO 9001:2015.",
    type: "Sertifikat",
    date: "2024",
    fileUrl: "/assets/documents/sertifikat-qs-0211.pdf"
  },
  { 
    title: "Danfoss Partner Diploma", 
    subtitle: "Platinum i gold partner.",
    type: "Partnerstvo",
    date: "2024",
    fileUrl: "/assets/documents/danfoss-partner-diploma.pdf"
  },
  { 
    title: "Bitzer sertifikat", 
    subtitle: "Ovlašćeni servisni partner.",
    type: "Sertifikat",
    date: "Jun 2022",
    fileUrl: "/assets/documents/bitzer-sertifikat.pdf"
  }
];

export default function Documentation() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              Sertifikati
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Kvalitet i bezbednost su naši prioriteti. Posedujemo sve neophodne sertifikate i licence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Docs List */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
        {/* Soft transition gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035]/5 to-transparent pointer-events-none z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {docs.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all rounded-2xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#171A54]/5 flex-shrink-0 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ShieldCheck className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#171A54] mb-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                    <p className="text-[#171A54]/70 text-sm mb-3 leading-relaxed">{doc.subtitle}</p>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-[#171A54]/5 text-[#171A54]/60 border border-[#171A54]/10">
                         {doc.type}
                       </span>
                       {doc.date && (
                         <span className="text-xs text-[#171A54]/40 border-l border-[#171A54]/10 pl-3">
                           {doc.date}
                         </span>
                       )}
                    </div>
                  </div>
                </div>
                
                <a 
                  href={doc.fileUrl} 
                  download 
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#171A54]/40 hover:bg-primary hover:border-primary hover:text-white transition-all ml-0 md:ml-6 mt-6 md:mt-0 flex-shrink-0"
                  title="Preuzmi dokument"
                >
                  <Download className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
