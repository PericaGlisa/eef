import { motion } from "framer-motion";
import { ArrowUpRight, Activity } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Rashladne Komore",
    desc: "Industrijski standard hlađenja.",
    image: "/assets/project-drone.png" 
  },
  {
    id: 2,
    title: "Tuneli za brzo smrzavanje",
    desc: "-40°C IQF tehnologija.",
    image: "/assets/hero-bg.png"
  },
  {
    id: 3,
    title: "ULO Komore",
    desc: "Ultra Low Oxygen za voće.",
    image: "/assets/project-drone.png"
  },
  {
    id: 4,
    title: "Čileri & Toplotne Pumpe",
    desc: "Maksimalna energetska efikasnost.",
    image: "/assets/hero-bg.png"
  },
  {
    id: 5,
    title: "Rashladni Agregati",
    desc: "Visokoefikasni sistemi sa ekološkim freonima.",
    image: "/assets/project-drone.png"
  },
  {
    id: 6,
    title: "Elektro Ormani & CNSU",
    desc: "Centralni sistem nadzora i upravljanja.",
    image: "/assets/hero-bg.png"
  },
  {
    id: 7,
    title: "Termoizolacija",
    desc: "Vrhunska izolacija i hladionička vrata.",
    image: "/assets/project-drone.png"
  }
];

export function Showcase() {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background relative transition-colors duration-700">
       {/* Background Wireframe Effect based on active product */}
       <div 
         className={`absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-700 pointer-events-none ${activeProduct ? 'opacity-20' : ''}`}
         style={{ 
            backgroundImage: activeProduct ? `url('${products.find(p => p.id === activeProduct)?.image}')` : 'none',
            filter: 'invert(1) grayscale(1) brightness(0.5)'
         }}
       />
       <div className={`absolute inset-0 bg-primary/10 transition-opacity duration-700 pointer-events-none ${activeProduct ? 'opacity-100' : 'opacity-0'}`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Naša <span className="text-primary">Ekspertiza</span>
          </h2>
          <button className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
            Pogledajte sve proizvode <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[300px] w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] overflow-hidden border border-white/10 cursor-pointer"
              onMouseEnter={() => {
                  setActiveProduct(product.id);
                  import("@/lib/audio").then(m => m.audio.playHover());
              }}
              onMouseLeave={() => setActiveProduct(null)}
            >
              {/* Background Image/Video Simulation */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-[#171A54]/80 group-hover:bg-[#171A54]/40 transition-colors duration-500" />
              
              {/* Play Button Simulation for "Video" Feel */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                  </div>
              </div>

              {/* Wireframe Overlay Effect on Hover */}
              <div className="absolute inset-4 border border-white/10 group-hover:border-primary/50 transition-colors duration-500" />
              <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 mix-blend-overlay" />

              {/* Pulsing Icon */}
              <div className="absolute top-8 right-8 bg-primary/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Activity className="w-6 h-6 text-primary animate-pulse" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-white/60 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {product.desc}
                    </p>
                  </div>
                  <div className="bg-primary p-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
