import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface GalleryProps {
  images: string[];
  title?: string;
  embedded?: boolean;
  transparent?: boolean;
}

export function Gallery({ images, title = "Galerija", embedded = false, transparent = false }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  };

  const Wrapper = embedded ? 'div' : 'section';
  
  const embeddedBg = transparent 
     ? "bg-white/5 backdrop-blur-sm border border-white/10" 
     : "bg-[#0e1035]";

  const wrapperClass = embedded 
     ? `${embeddedBg} rounded-3xl p-6 md:p-8 relative overflow-hidden my-12 shadow-2xl shadow-slate-200/50`
     : "py-20 bg-[#0e1035] relative overflow-hidden";

  return (
    <Wrapper className={wrapperClass}>
      {/* Decorative background elements */}
      {!embedded && (
         <>
           <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/grid-pattern.svg')] opacity-[0.05] pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
         </>
      )}
      {embedded && (
         <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/grid-pattern.svg')] opacity-[0.05] pointer-events-none" />
      )}

      <div className={embedded ? "w-full" : "container mx-auto px-6 relative z-10"}>
        {embedded ? (
             <h3 className="text-2xl font-bold text-white mb-8 pl-4 border-l-4 border-primary">
               {title}
             </h3>
        ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {title}
              </h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
            </motion.div>
        )}

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className={embedded ? "w-full" : "w-full max-w-6xl mx-auto"}
        >
          <CarouselContent className="-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className={embedded ? "pl-4 basis-full md:basis-1/2" : "pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-white/10"
                  onClick={() => openLightbox(index)}
                >
                  <div className="absolute inset-0 bg-[#0e1035]/10 group-hover:bg-[#0e1035]/40 transition-colors duration-300 z-10" />
                  
                  <img
                    src={image}
                    alt={`${title} - Slika ${index + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 text-white border-white/10" />
            <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 text-white border-white/10" />
          </div>
        </Carousel>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent 
          className="max-w-[95vw] max-h-[95vh] w-full h-full bg-black/95 border-none p-0 flex items-center justify-center focus:outline-none" 
          onKeyDown={handleKeyDown}
          hideCloseButton
        >
          <VisuallyHidden>
            <DialogTitle>Pregled slike {lightboxIndex !== null ? lightboxIndex + 1 : ''}</DialogTitle>
          </VisuallyHidden>
          
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <AnimatePresence mode="wait">
            {lightboxIndex !== null && (
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                 <img
                  src={images[lightboxIndex]}
                  alt={`${title} - Fullscreen ${lightboxIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                  {lightboxIndex + 1} / {images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
}