import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FileText, Download, ShieldCheck } from "lucide-react";

const docs = [
  { title: "ISO 9001:2015", type: "Sertifikat", size: "1.2 MB" },
  { title: "ISO 14001:2015", type: "Sertifikat", size: "1.1 MB" },
  { title: "Politika Kvaliteta", type: "Dokument", size: "0.8 MB" },
  { title: "Opšti Uslovi Poslovanja", type: "Pravni Akt", size: "2.4 MB" },
  { title: "Katalog Opreme 2025", type: "Brošura", size: "15.6 MB" },
  { title: "Energetska Efikasnost - Vodič", type: "Brošura", size: "5.2 MB" }
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
              Dokumentacija
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Transparentnost je temelj našeg poslovanja. Preuzmite zvanične sertifikate i dokumentaciju.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Docs List */}
      <section className="py-20 bg-[#0e1035]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docs.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center justify-between p-6 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {doc.type === 'Sertifikat' ? (
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    ) : (
                      <FileText className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{doc.title}</h3>
                    <p className="text-white/40 text-sm flex items-center gap-2">
                      <span className="uppercase tracking-wider">{doc.type}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{doc.size}</span>
                    </p>
                  </div>
                </div>
                
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <Download className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
