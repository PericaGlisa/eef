import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight, Snowflake, MapPin, Calendar, Building2, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ProjectAgrounija() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % 28);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + 28) % 28);
    }
  };

  const stats = [
    { icon: <Snowflake className="w-6 h-6" />, label: "Kapacitet Faza 1", value: "3.500t" },
    { icon: <Snowflake className="w-6 h-6" />, label: "Kapacitet Faza 2", value: "4.000t" },
    { icon: <Zap className="w-6 h-6" />, label: "Ušteda Energije", value: "30%" },
    { icon: <Building2 className="w-6 h-6" />, label: "Investitor", value: "MK Farming" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/projects/agrounija/gallery-1.webp" 
            alt="Agrounija Hladnjača" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24 lg:pb-32">
          <Link href="/references">
            <a className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors absolute top-32 left-4 md:left-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nazad na reference
            </a>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-8">
              <div className="bg-white/90 p-4 rounded-xl shadow-lg shadow-black/20 backdrop-blur-sm">
                <img 
                  src="/assets/projects/agrounija/logo.png" 
                  alt="Agrounija Logo" 
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              <div className="h-16 w-px bg-white/20 hidden md:block" />
              <div className="hidden md:block">
                <div className="flex items-center text-white/80 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  Krčedin, Srbija
                </div>
                <div className="flex items-center text-white/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  2017 - 2018
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              AGROUNIJA
              <span className="block text-2xl md:text-3xl font-normal text-primary mt-2">
                Hladnjača za skladištenje jabuka
              </span>
            </h1>
          </motion.div>
        </div>
      </div>

      <main className="flex-grow -mt-12 relative z-10 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 lg:mb-32">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl text-center group hover:bg-card/80 transition-colors"
              >
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Main Content */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="prose prose-lg prose-invert max-w-none text-muted-foreground"
              >
                <div className="bg-card/30 rounded-2xl p-8 border border-white/5 space-y-6">
                  <p>
                    <span className="text-white font-medium">Tokom 2017. godine</span> započeta je izgradnja prve faze hladnjače za potrebe skladištenja jabuke u ULO/DCA atmosferi. Hladnjača Agrounija se nalazi u Krčedinu i posluje kao deo MK Farming porodice. Kapacitet rashladnih komora u prvoj fazi je 3500 tona.
                  </p>
                  
                  <p>
                    2018. godine je realizovano proširenje kapaciteta hladnjače u vidu druge faze, čiji kapacitet je 4000 tona.
                  </p>
                  
                  <p>
                    Kvalitet rashladnih mašina je visok i na savremenom nivou, sa kompjuterskim vođenjem i regulacijom koja omogućava niska vršna opterećenja. Osnova za hlađenje u celom sistemu primarnog kruga je rashladno sredstvo <span className="text-primary">amonijak (NH3)</span> sa indirektnom ekspanzijom, koji preko izmenjivača ima u sekundarnom krugu rashladno sredstvo Glycol, koji se distribuira potrošačima u svim komorama na svim režimima.
                  </p>
                  
                  <p className="border-l-4 border-primary pl-6 italic text-white/90">
                    Sistem hlađenja, zajedno sa izolacijom, LED rasvetom i rekuperacijom otpadne toplote za podno grejanje čini ovu hladnjaču posebnom i obezbeđuje uštedu energije do 30% u poređenju sa dotadašnjim hladnjačama istog kapaciteta i namene.
                  </p>
                </div>
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-8 h-1 bg-primary mr-4 rounded-full"></span>
                  Video Prezentacija
                </h2>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    poster="/assets/projects/agrounija/gallery-1.webp"
                  >
                    <source src="/assets/projects/agrounija/video.mp4" type="video/mp4" />
                    Vaš pretraživač ne podržava video tag.
                  </video>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <span className="w-8 h-1 bg-primary mr-4 rounded-full"></span>
                  Galerija Projekta
                </h2>
                <div className="flex flex-wrap gap-2 md:gap-3 text-sm text-muted-foreground bg-card/30 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center bg-white/5 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    ULO/DCA Atmosfera
                  </div>
                  <div className="flex items-center bg-white/5 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    Amonijak (NH3)
                  </div>
                  <div className="flex items-center bg-white/5 rounded-lg px-3 py-1.5 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                    Podno grejanje
                  </div>
                </div>
              </div>
              
              <div className="bg-card/30 rounded-2xl p-6 border border-white/5">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 mb-4">
                        <div 
                          className="aspect-[4/3] relative overflow-hidden rounded-lg bg-white/5 border border-white/10 group cursor-pointer shadow-lg"
                          onClick={() => openLightbox(i)}
                        >
                          <img
                            src={`/assets/projects/agrounija/gallery-${i + 1}.webp`}
                            alt={`Agrounija projekat slika ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white/20 text-sm">Slika ${i + 1}</div>`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                              Uvećaj
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-between items-center mt-2 px-2">
                    <span className="text-sm text-muted-foreground">28 fotografija</span>
                    <div className="flex gap-2">
                      <CarouselPrevious className="relative static translate-y-0 h-8 w-8" />
                      <CarouselNext className="relative static translate-y-0 h-8 w-8" />
                    </div>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full bg-black/90 border-none p-0 flex items-center justify-center" hideCloseButton>
          <VisuallyHidden>
            <DialogTitle>Pregled slike {lightboxIndex !== null ? lightboxIndex + 1 : ''}</DialogTitle>
          </VisuallyHidden>
          
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {lightboxIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
               <img
                src={`/assets/projects/agrounija/gallery-${lightboxIndex + 1}.webp`}
                alt={`Agrounija projekat slika ${lightboxIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
