import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string>("sales");

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Form */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-heading font-bold text-white mb-8"
              >
                Kontaktirajte <span className="text-primary">Centar</span>
              </motion.h1>

              <div className="space-y-8 mb-12">
                <p className="text-white/60">Kako možemo da vam pomognemo?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "sales", label: "Treba mi ponuda" },
                    { id: "tech", label: "Tehničko pitanje" },
                    { id: "service", label: "Problem sa opremom" },
                    { id: "office", label: "Opšte informacije" }
                  ].map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => setSelectedTopic(option.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                        selectedTopic === option.id 
                          ? "bg-primary/10 border-primary text-white" 
                          : "bg-white/5 border-white/10 text-white/50 hover:border-white/30"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                         selectedTopic === option.id ? "border-primary" : "border-white/30"
                      }`}>
                        {selectedTopic === option.id && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/50">Ime i Prezime</label>
                    <Input className="bg-white/5 border-white/10 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/50">Kompanija</label>
                    <Input className="bg-white/5 border-white/10 h-12 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/50">Email Adresa</label>
                  <Input className="bg-white/5 border-white/10 h-12 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/50">Poruka</label>
                  <Textarea className="bg-white/5 border-white/10 min-h-[150px] text-white" />
                </div>
                
                <Button size="lg" className="w-full bg-primary text-white font-bold h-14 text-lg">
                  Pošalji Zahtev
                </Button>
              </form>
            </div>

            {/* Right: Map & Info */}
            <div className="space-y-8">
               {/* Map Placeholder */}
               <div className="w-full h-[400px] bg-[#0e1035] border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-30" style={{ 
                    backgroundImage: 'radial-gradient(circle at center, #56AA4A 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                  }}></div>
                  
                  {/* Radar Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_#56AA4A] z-10 relative animate-pulse" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/30 rounded-full animate-ping opacity-20" />
                  </div>

                  <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur border border-white/10 p-4">
                    <h4 className="text-white font-bold">Svetolika Nikačevića 11</h4>
                    <p className="text-xs text-white/50">Beograd, Srbija</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-white/5 border border-white/10 p-6">
                   <Phone className="w-6 h-6 text-primary mb-4" />
                   <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Centrala</div>
                   <div className="text-xl font-bold text-white">+381 11 123 4567</div>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6">
                   <Mail className="w-6 h-6 text-primary mb-4" />
                   <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</div>
                   <div className="text-xl font-bold text-white">office@eef.rs</div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
