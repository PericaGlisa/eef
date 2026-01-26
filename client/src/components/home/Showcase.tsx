import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Rashladne Komore",
    desc: "Industrijski standard hlađenja.",
    image: "/assets/project-drone.png" // Placeholder, normally specific product image
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
  }
];

export function Showcase() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Naša <span className="text-primary">Ekspertiza</span>
          </h2>
          <button className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
            Pogledajte sve proizvode <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[300px] overflow-hidden border border-white/10 cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${product.image}')` }}
              />
              <div className="absolute inset-0 bg-[#171A54]/80 group-hover:bg-[#171A54]/60 transition-colors duration-500" />
              
              {/* Wireframe Overlay Effect on Hover - simulated with border/pseudo */}
              <div className="absolute inset-4 border border-white/10 group-hover:border-primary/50 transition-colors duration-500" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

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
