import { Link } from "wouter";
import { newsItems } from "@/data/news";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Blog() {
  return (
    <div className="bg-[#0a0c29] min-h-screen text-white selection:bg-primary selection:text-white">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Arhiva Vesti
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl">
              Najnovije informacije, događaji i uspesi kompanije Eko Elektrofrigo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, i) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full rounded-xl backdrop-blur-sm overflow-hidden"
                >
                  {item.image && (
                    <div className="h-48 w-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-[#0a0c29]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-start items-start mb-4">
                      <span className="text-primary text-[10px] uppercase tracking-wider border border-primary/20 bg-primary/10 px-2 py-1 rounded-full">{item.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-3">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-6 flex-grow line-clamp-4 leading-relaxed">
                      {item.desc}
                    </p>
                    
                    <div className="flex items-center text-white/40 text-xs group-hover:text-primary transition-colors mt-auto uppercase tracking-widest font-mono">
                      Pročitaj više <ArrowUpRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
