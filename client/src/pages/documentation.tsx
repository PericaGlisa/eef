import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Documentation() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
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
              Pristupite našim zvaničnim sertifikatima, licencama i partnerskim priznanjima.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
        {/* Soft transition gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035]/5 to-transparent pointer-events-none z-10" />
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Certificates Card */}
            <Link href="/documentation/certificates">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
              >
                <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl h-full hover:border-primary/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-[#171A54]/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative z-10">
                    <ShieldCheck className="w-8 h-8 text-[#171A54] group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-3xl font-heading font-bold text-[#171A54] mb-4 group-hover:text-primary transition-colors relative z-10">
                    Sertifikati
                  </h3>
                  
                  <p className="text-[#171A54]/60 mb-8 leading-relaxed relative z-10">
                    Pregledajte naše ISO standarde (9001, 14001, 45001) i ovlašćene servisne sertifikate. Garancija kvaliteta i bezbednosti.
                  </p>
                  
                  <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform relative z-10">
                    Pogledaj sertifikate <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Diplomas Card */}
            <Link href="/documentation/diplomas">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
              >
                <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-3xl h-full hover:border-primary/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-[#171A54]/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 relative z-10">
                    <BookOpen className="w-8 h-8 text-[#171A54] group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-3xl font-heading font-bold text-[#171A54] mb-4 group-hover:text-primary transition-colors relative z-10">
                    Diplome
                  </h3>
                  
                  <p className="text-[#171A54]/60 mb-8 leading-relaxed relative z-10">
                    Priznanja i partnerske diplome koje potvrđuju našu stručnost i dugogodišnju uspešnu saradnju sa liderima u industriji.
                  </p>
                  
                  <div className="flex items-center text-primary font-bold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform relative z-10">
                    Pogledaj diplome <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
