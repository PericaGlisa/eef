import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "wouter";
import { newsItems } from "@/data/news";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function NewsTicker() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase">Newsroom</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#171A54] tracking-tight">
              Aktuelnosti iz <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">Industrije</span>
            </h2>
          </div>
          
          <div className="hidden md:block">
            <Link href="/blog">
              <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[#171A54]/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                <span className="text-sm font-medium text-[#171A54] group-hover:text-primary">Pogledaj arhivu</span>
                <div className="w-8 h-8 rounded-full bg-[#171A54]/5 flex items-center justify-center text-[#171A54] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </Link>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {newsItems.map((item, i) => (
              <CarouselItem key={item.id} className="pl-8 md:basis-1/2 lg:basis-1/3 h-auto">
                <Link href={`/news/${item.id}`} className="h-full block">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group cursor-pointer h-full flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden rounded-2xl mb-6 shadow-md group-hover:shadow-xl transition-shadow duration-500">
                      <div className="absolute inset-0 bg-[#171A54]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Category Tag */}
                       <div className="absolute bottom-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-md bg-[#171A54] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow space-y-3 px-2">
                      <h3 className="text-xl font-bold text-[#171A54] group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed flex-grow">
                        {item.desc}
                      </p>
                      
                      <div className="pt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                        Pročitaj više <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-end gap-4 mt-12 md:hidden">
             <CarouselPrevious className="static translate-y-0 bg-white border-slate-200 hover:bg-slate-50 text-slate-700" />
             <CarouselNext className="static translate-y-0 bg-white border-slate-200 hover:bg-slate-50 text-slate-700" />
          </div>
        </Carousel>

        <div className="mt-12 md:hidden flex justify-center">
            <Link href="/blog">
              <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[#171A54]/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
                <span className="text-sm font-medium text-[#171A54] group-hover:text-primary">Pogledaj arhivu</span>
                <div className="w-8 h-8 rounded-full bg-[#171A54]/5 flex items-center justify-center text-[#171A54] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </Link>
        </div>
      </div>
    </section>
  );
}
