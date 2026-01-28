import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string>("project");

  return (
    <div className="bg-background min-h-screen relative">
      <Navbar />

      {/* Floating Live Chat */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(86,170,74,0.4)] flex items-center justify-center relative group">
           <MessageSquare className="w-8 h-8 text-white" />
           <span className="absolute -top-1 -right-1 flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
           </span>
           <div className="absolute right-full mr-4 bg-white text-[#171A54] px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Pokreni Chat
           </div>
        </Button>
      </motion.div>

      <section className="pt-40 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Dynamic Form */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight"
              >
                Kontakt <span className="text-primary">Centar</span>
              </motion.h1>

              <div className="space-y-8 mb-12">
                <p className="text-white/60">Izaberite tip upita za brže rutiranje ka pravom timu.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "project", label: "Novi Projekat" },
                    { id: "service", label: "Servis & Održavanje" },
                    { id: "career", label: "Karijera" },
                    { id: "info", label: "Opšte informacije" }
                  ].map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => setSelectedTopic(option.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-center gap-3 ${
                        selectedTopic === option.id 
                          ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(86,170,74,0.2)]" 
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
                <AnimatePresence mode="wait">
                   <motion.div
                     key={selectedTopic}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="space-y-6"
                   >
                     {/* Common Fields */}
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm text-white/50">Ime i Prezime</label>
                          <Input className="bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm text-white/50">Kompanija</label>
                          <Input className="bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm text-white/50">Email Adresa</label>
                        <Input className="bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" />
                     </div>

                     {/* Dynamic Fields */}
                     {selectedTopic === 'project' && (
                        <div className="space-y-2">
                           <label className="text-sm text-white/50">Tip Projekta</label>
                           <Select>
                              <SelectTrigger className="bg-white/5 border-white/10 h-12 text-white">
                                 <SelectValue placeholder="Izaberite tip..." />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="industrial">Industrijska Hladnjača</SelectItem>
                                 <SelectItem value="commercial">Komercijalni Objekat</SelectItem>
                                 <SelectItem value="hvac">HVAC Sistem</SelectItem>
                                 <SelectItem value="solar">Solarna Elektrana</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     )}

                     {selectedTopic === 'service' && (
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-sm text-white/50">ID Opreme (Opciono)</label>
                              <Input className="bg-white/5 border-white/10 h-12 text-white" placeholder="npr. CH-2023-01" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-sm text-white/50">Hitnost</label>
                              <Select>
                                 <SelectTrigger className="bg-white/5 border-white/10 h-12 text-white">
                                    <SelectValue placeholder="Nivo hitnosti..." />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="low">Redovno Održavanje</SelectItem>
                                    <SelectItem value="medium">Manji Kvar (48h)</SelectItem>
                                    <SelectItem value="high">Urgentno (4h odziv)</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                     )}
                   </motion.div>
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-sm text-white/50">Poruka</label>
                  <Textarea className="bg-white/5 border-white/10 min-h-[150px] text-white focus:border-primary/50" />
                </div>
                
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(86,170,74,0.4)]">
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

               <div className="space-y-4">
                 {/* Phones - Full Width */}
                 <div className="bg-white/5 border border-white/10 p-8">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-white">Telefonska Centrala</h3>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Dostupno 08-16h</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group cursor-pointer">
                         <div className="text-white/40 text-xs uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">Linija 1</div>
                         <a href="tel:+381113757287" className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors block">+381 11 375 72 87</a>
                      </div>
                      <div className="group cursor-pointer">
                         <div className="text-white/40 text-xs uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">Linija 2</div>
                         <a href="tel:+381113757288" className="text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors block">+381 11 375 72 88</a>
                      </div>
                   </div>
                 </div>

                 {/* Emails - Full Width Grid */}
                 <div className="bg-white/5 border border-white/10 p-8">
                   <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-white">Email Kontakti</h3>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Direktni kanali komunikacije</p>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                     <div className="group">
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-2 border-b border-white/5 pb-2">Opšti Upiti</div>
                        <div className="text-sm text-white/60 mb-1">Za opšte informacije i administraciju</div>
                        <a href="mailto:office@eef.rs" className="text-lg font-bold text-white group-hover:text-primary transition-colors">office@eef.rs</a>
                     </div>
                     
                     <div className="group">
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-2 border-b border-white/5 pb-2">Prodaja</div>
                        <div className="text-sm text-white/60 mb-1">Ponude, cene i komercijala</div>
                        <a href="mailto:prodaja@eef.rs" className="text-lg font-bold text-white group-hover:text-primary transition-colors">prodaja@eef.rs</a>
                     </div>

                     <div className="group">
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-2 border-b border-white/5 pb-2">Tehnička Podrška</div>
                        <div className="text-sm text-white/60 mb-1">Inženjering i projektovanje</div>
                        <a href="mailto:tehnika@eef.rs" className="text-lg font-bold text-white group-hover:text-primary transition-colors">tehnika@eef.rs</a>
                     </div>

                     <div className="group">
                        <div className="text-white/40 text-xs uppercase tracking-wider mb-2 border-b border-white/5 pb-2">Servis</div>
                        <div className="text-sm text-white/60 mb-1">Prijava kvara i održavanje</div>
                        <a href="mailto:servis@eef.rs" className="text-lg font-bold text-white group-hover:text-primary transition-colors">servis@eef.rs</a>
                     </div>
                   </div>
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
