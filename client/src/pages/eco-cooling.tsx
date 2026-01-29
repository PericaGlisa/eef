import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { solutionsData } from "@/data/solutions";

export default function EcoCooling() {
  const storageSolutions = solutionsData.slice(0, 3);
  const machinerySolutions = solutionsData.slice(3, 5);
  const infrastructureSolutions = solutionsData.slice(5, 7);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 relative overflow-hidden bg-[#0e1035]">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              Eko <span className="text-primary">Rashlada</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl font-light">
              Napredna tehnologija hlađenja koja štedi energiju i čuva planetu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Storage (Dark) */}
      <section className="py-16 md:py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Background Details */}
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Skladišna <span className="text-primary">Rešenja</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storageSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-[0_0_30px_rgba(86,170,74,0.15)] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:20px_20px]" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">{solution.title}</h3>
                      <p className="text-white/60 text-sm mb-8 leading-relaxed">
                        {solution.shortDesc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {solution.specs.map((spec, i) => (
                          <span key={i} className="text-xs font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-white/50 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Machinery (Light) */}
      <section className="py-16 md:py-24 bg-[#F5F7FA] relative overflow-hidden">
        {/* Soft Transition Gradient from Dark */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035] to-transparent pointer-events-none z-10 opacity-50" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 text-right">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#171A54] mb-4">
              Rashladna <span className="text-primary">Tehnika</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full ml-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {machinerySolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white border border-slate-200 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-xl cursor-pointer"
                  >
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                        <div className="w-10 h-10 rounded-full bg-[#171A54]/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-heading font-bold text-[#171A54] mb-4 group-hover:text-primary transition-colors duration-300">{solution.title}</h3>
                      <p className="text-[#171A54]/70 text-sm mb-8 leading-relaxed">
                        {solution.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {solution.specs.map((spec, i) => (
                          <span key={i} className="text-xs font-mono border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full text-slate-500 group-hover:border-primary/30 group-hover:text-primary transition-colors duration-300">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Infrastructure (Dark) */}
      <section className="py-16 md:py-24 bg-[#0e1035] relative overflow-hidden">
        {/* Soft Transition Gradient from Light */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F7FA] to-transparent pointer-events-none z-10 opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Infrastruktura & <span className="text-primary">Kontrola</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {infrastructureSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Link key={index} href={`/eco-cooling/${solution.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group border border-white/10 bg-white/5 relative overflow-hidden flex flex-col justify-between p-8 hover:border-primary/50 transition-all duration-500 rounded-2xl hover:shadow-[0_0_30px_rgba(86,170,74,0.15)] cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-[linear-gradient(45deg,transparent_25%,rgba(86,170,74,0.1)_25%,rgba(86,170,74,0.1)_50%,transparent_50%,transparent_75%,rgba(86,170,74,0.1)_75%,rgba(86,170,74,0.1)_100%)] bg-[length:20px_20px]" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-1 bg-primary transform origin-left group-hover:scale-x-150 transition-transform duration-500 rounded-full" />
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">{solution.title}</h3>
                      <p className="text-white/60 text-sm mb-8 leading-relaxed">
                        {solution.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {solution.specs.map((spec, i) => (
                          <span key={i} className="text-xs font-mono border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-white/50 group-hover:border-primary/30 group-hover:text-primary/80 transition-colors duration-300">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
