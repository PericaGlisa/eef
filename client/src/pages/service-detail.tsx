import { useRoute, Link } from "wouter";
import { servicesContent } from "@/data/services-content";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

export default function ServiceDetail() {
  const [match, params] = useRoute("/services/:slug");
  
  if (!match || !params) return <NotFound />;
  
  const service = servicesContent.find(s => s.id === params.slug);

  if (!service) return <NotFound />;

  const Icon = service.icon;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden bg-[#0e1035]">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/services">
            <Button variant="ghost" className="mb-8 text-white/50 hover:text-white hover:bg-white/5 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Nazad na Usluge
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary backdrop-blur-sm border border-white/10">
                <Icon className="w-8 h-8" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-white/60 max-w-3xl font-light leading-relaxed">
              {service.shortDesc}
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-16 md:py-24 bg-[#F5F7FA]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {service.image && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-10 rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-64 md:h-80 relative group"
                >
                  <div className="absolute inset-0 bg-[#0e1035]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-lg max-w-none text-[#171A54] [&_p]:!text-[#171A54] [&_li]:!text-[#171A54] [&_strong]:!text-[#171A54] prose-headings:font-heading prose-headings:font-bold prose-headings:!text-[#171A54]"
                dangerouslySetInnerHTML={{ __html: service.fullContent }}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Features Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0e1035] rounded-3xl p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px]" />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Ključne prednosti
                </h3>
                <div className="space-y-4 relative z-10">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#171A54] mb-4">Treba vam ova usluga?</h3>
                <p className="text-[#171A54]/60 mb-6 text-sm">Kontaktirajte naš tim za besplatnu konsultaciju.</p>
                <div className="space-y-3">
                  <a href="tel:+381113757287" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-[#171A54]">+381 11 375 72 87</span>
                  </a>
                  <a href="mailto:office@eef.rs" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-[#171A54]">office@eef.rs</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
