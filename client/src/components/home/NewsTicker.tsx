import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { newsItems } from "@/data/news";

export function NewsTicker() {
  return (
    <section className="py-24 bg-[#F5F7FA] border-t border-[#171A54]/5 overflow-hidden relative">
      {/* Soft transition gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0e1035]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-mono text-xs tracking-widest uppercase">Vesti Uživo</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#171A54]">
              Industrijski <span className="text-primary">Puls</span>
            </h2>
          </div>
          <button className="text-[#171A54]/60 hover:text-[#171A54] flex items-center gap-2 transition-colors border-b border-[#171A54]/20 hover:border-[#171A54] pb-1">
            Arhiva vesti <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-200 p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full rounded-xl"
              >
                <div className="flex justify-end items-start mb-4">
                  <span className="text-[#171A54]/50 text-[10px] uppercase tracking-wider border border-[#171A54]/10 bg-[#171A54]/5 px-2 py-1 rounded-full">{item.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-[#171A54] mb-3 group-hover:text-primary transition-colors line-clamp-3">
                  {item.title}
                </h3>
                
                <p className="text-[#171A54]/70 text-sm mb-6 flex-grow line-clamp-4">
                  {item.desc}
                </p>
                
                <div className="flex items-center text-[#171A54]/40 text-xs group-hover:text-primary transition-colors mt-auto">
                  Pročitaj više <ArrowUpRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
