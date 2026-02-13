import { Link } from "wouter";
import { newsItems } from "@/data/news";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Tag, Search, Filter, ChevronRight, Newspaper } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(newsItems.map(item => item.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return newsItems.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = newsItems[0];
  const otherPosts = activeCategory === "all" && !searchQuery 
    ? newsItems.slice(1) 
    : filteredItems;

  return (
    <div className="bg-background min-h-screen selection:bg-primary selection:text-white" ref={containerRef}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#0e1035]">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
             <div className="absolute inset-0 bg-[#0e1035]/80 z-10 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
             <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />
             <img 
               src="/assets/hero-slide-4.jpg" 
               alt="News Archive"  
               className="w-full h-full object-cover"
             />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-mono mb-6 backdrop-blur-sm">
              <Newspaper className="w-4 h-4" />
              <span className="tracking-wider uppercase">Info Centar</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
              Arhiva <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary bg-300% animate-gradient">Vesti</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed border-l-4 border-primary/50 pl-6">
              Najnovije informacije, realizovani projekti i stručni članci iz sveta industrijskog hlađenja.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-20 bg-[#0b0d2e] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-16 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg shadow-primary/25" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat === "all" ? "Sve Vesti" : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                type="text" 
                placeholder="Pretraži vesti..." 
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Featured Post (Only visible when no search/filter active) */}
          {activeCategory === "all" && !searchQuery && (
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full" />
                Izdvajamo
              </h2>
              <Link href={`/news/${featuredPost.id}`}>
                <div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 cursor-pointer">
                  <div className="relative h-[400px] lg:h-full overflow-hidden">
                    <div className="absolute inset-0 bg-[#0a0c29]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">
                        {featuredPost.category}
                      </span>

                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-slate-400 text-lg mb-8 line-clamp-3 leading-relaxed">
                      {featuredPost.desc}
                    </p>
                    
                    <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Pročitaj ceo članak <ArrowUpRight className="w-5 h-5 ml-2 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Posts Grid */}
          <div>
            {(activeCategory === "all" && !searchQuery) && (
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-slate-700 rounded-full" />
                Ostale Vesti
              </h2>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.length > 0 ? (
                otherPosts.map((item, i) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col h-full rounded-2xl backdrop-blur-sm overflow-hidden"
                    >
                      {item.image && (
                        <div className="h-56 w-full overflow-hidden relative">
                          <div className="absolute inset-0 bg-[#0a0c29]/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                          <div className="absolute top-4 left-4 z-20">
                            <span className="px-2 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-md border border-white/10">
                              {item.category}
                            </span>
                          </div>
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">

                        
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        
                        <p className="text-white/60 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                          {item.desc}
                        </p>
                        
                        <div className="flex items-center text-white/40 text-xs group-hover:text-primary transition-colors mt-auto uppercase tracking-widest font-mono pt-4 border-t border-white/5">
                          Pročitaj više <ChevronRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <Search className="w-8 h-8 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nema pronađenih vesti</h3>
                  <p className="text-slate-400">Pokušajte sa drugim terminom pretrage ili promenite kategoriju.</p>
                  <Button 
                    variant="link" 
                    className="text-primary mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Prikaži sve vesti
                  </Button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}