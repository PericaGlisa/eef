import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string>("project");

  return (
    <div className="bg-background min-h-screen relative">
      <Navbar />

      {/* Hero Section - Dark */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight"
            >
              Kontakt <span className="text-primary">Centar</span>
            </motion.h1>

            <p className="text-xl text-white/60 mb-12">
              Izaberite tip upita za brže rutiranje ka pravom timu.
              Naš tim je spreman da odgovori na sve vaše zahteve.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "project", label: "Novi Projekat" },
                { id: "service", label: "Servis & Održavanje" },
                { id: "career", label: "Karijera" },
                { id: "info", label: "Opšte informacije" }
              ].map((option) => (
                <div 
                  key={option.id}
                  onClick={() => setSelectedTopic(option.id)}
                  className={`p-4 border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-xl ${
                    selectedTopic === option.id 
                      ? "bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(86,170,74,0.2)]" 
                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                      selectedTopic === option.id ? "border-primary bg-primary" : "border-white/30"
                  }`} />
                  <span className="font-bold text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Light */}
      <section className="py-24 bg-[#F5F7FA] relative">
        {/* Soft transition gradients */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0e1035]/20 to-transparent pointer-events-none z-10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Left: Dynamic Form */}
            <div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#171A54]/5">
                <h3 className="text-2xl font-heading font-bold text-[#171A54] mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Pošaljite Poruku
                </h3>

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
                            <label className="text-sm font-bold text-[#171A54]/70">Ime i Prezime</label>
                            <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white transition-colors" placeholder="Vaše ime" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-[#171A54]/70">Kompanija</label>
                            <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white transition-colors" placeholder="Naziv kompanije" />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-bold text-[#171A54]/70">Email Adresa</label>
                          <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white transition-colors" placeholder="vas@email.com" />
                      </div>

                      {/* Dynamic Fields */}
                      {selectedTopic === 'project' && (
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-[#171A54]/70">Tip Projekta</label>
                            <Select>
                                <SelectTrigger className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white">
                                  <SelectValue placeholder="Izaberite tip..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-[#171A54]/10 text-[#171A54]">
                                  <SelectItem value="industrial" className="focus:bg-primary/10 focus:text-[#171A54]">Industrijska Hladnjača</SelectItem>
                                  <SelectItem value="commercial" className="focus:bg-primary/10 focus:text-[#171A54]">Komercijalni Objekat</SelectItem>
                                  <SelectItem value="hvac" className="focus:bg-primary/10 focus:text-[#171A54]">HVAC Sistem</SelectItem>
                                  <SelectItem value="solar" className="focus:bg-primary/10 focus:text-[#171A54]">Solarna Elektrana</SelectItem>
                                </SelectContent>
                            </Select>
                          </div>
                      )}

                      {selectedTopic === 'service' && (
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#171A54]/70">ID Opreme (Opciono)</label>
                                <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white" placeholder="npr. CH-2023-01" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#171A54]/70">Hitnost</label>
                                <Select>
                                  <SelectTrigger className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white">
                                      <SelectValue placeholder="Nivo hitnosti..." />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-[#171A54]/10 text-[#171A54]">
                                      <SelectItem value="low" className="focus:bg-primary/10 focus:text-[#171A54]">Redovno Održavanje</SelectItem>
                                      <SelectItem value="medium" className="focus:bg-primary/10 focus:text-[#171A54]">Manji Kvar (48h)</SelectItem>
                                      <SelectItem value="high" className="focus:bg-primary/10 focus:text-[#171A54]">Urgentno (4h odziv)</SelectItem>
                                  </SelectContent>
                                </Select>
                            </div>
                          </div>
                      )}

                      {selectedTopic === 'career' && (
                          <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#171A54]/70">Pozicija za koju aplicirate</label>
                                <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white" placeholder="npr. Servisni Tehničar" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#171A54]/70">LinkedIn Profil / Portfolio URL</label>
                                <Input className="bg-gray-50 border-[#171A54]/10 h-12 text-[#171A54] focus:border-primary/50 focus:bg-white" placeholder="https://linkedin.com/in/..." />
                            </div>
                          </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#171A54]/70">Poruka</label>
                    <Textarea className="bg-gray-50 border-[#171A54]/10 min-h-[150px] text-[#171A54] focus:border-primary/50 focus:bg-white transition-colors" placeholder="Opišite vaš zahtev..." />
                  </div>
                  
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(86,170,74,0.4)] border-none">
                    Pošalji Zahtev
                  </Button>
                </form>
              </div>
            </div>

            {/* Right: Map & Info */}
            <div className="space-y-8">
               {/* Real Map */}
               <div className="w-full h-[400px] bg-[#171A54] border border-[#171A54]/10 rounded-2xl relative overflow-hidden group shadow-2xl">
                  {/* Tech Overlay Grid */}
                  <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(23,26,84,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(23,26,84,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Tint Overlay - Fades out on hover */}
                  <div className="absolute inset-0 bg-[#171A54]/30 mix-blend-multiply z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary z-20 opacity-60" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary z-20 opacity-60" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary z-20 opacity-60" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary z-20 opacity-60" />

                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://maps.google.com/maps?q=Svetolika+Nika%C4%8Devi%C4%87a+11,+Beograd&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    title="Eko Elektrofrigo Lokacija"
                    className="w-full h-full grayscale-[100%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 transition-all duration-700 ease-in-out"
                    loading="lazy"
                  ></iframe>

                  {/* Info Card */}
                  <div className="absolute bottom-8 left-8 z-30">
                     <div className="bg-white/95 backdrop-blur-md border-l-4 border-primary p-5 shadow-2xl transform transition-transform duration-300 group-hover:-translate-y-1">
                        <h4 className="text-[#171A54] font-bold flex items-center gap-3 text-lg mb-1">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                          </span>
                          Svetolika Nikačevića 11
                        </h4>
                        <p className="text-sm text-[#171A54]/60 pl-6 font-medium tracking-wide">Beograd, Srbija</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                 {/* Phones - Full Width */}
                 <div className="bg-white border border-[#171A54]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Phone className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-[#171A54]">Telefonska Centrala</h3>
                        <p className="text-[#171A54]/40 text-xs uppercase tracking-widest">Dostupno 07:30-15:30h</p>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                      <div className="group cursor-pointer">
                         <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">Linija 1</div>
                         <a href="tel:+381113757287" className="text-xl md:text-2xl font-heading font-bold text-[#171A54] group-hover:text-primary transition-colors block break-words">+381 11 375 72 87</a>
                      </div>
                      <div className="group cursor-pointer">
                         <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 group-hover:text-primary transition-colors">Linija 2</div>
                         <a href="tel:+381113757288" className="text-xl md:text-2xl font-heading font-bold text-[#171A54] group-hover:text-primary transition-colors block break-words">+381 11 375 72 88</a>
                      </div>
                   </div>
                 </div>

                 {/* Emails - Full Width Grid */}
                 <div className="bg-white border border-[#171A54]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-center gap-4 mb-8">
                     <div className="p-3 bg-primary/10 rounded-lg">
                        <Mail className="w-6 h-6 text-primary" />
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-[#171A54]">Email Kontakti</h3>
                        <p className="text-[#171A54]/40 text-xs uppercase tracking-widest">Direktni kanali komunikacije</p>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8">
                     <div className="group">
                        <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 border-b border-[#171A54]/5 pb-2">Opšti Upiti</div>
                        <div className="text-sm text-[#171A54]/60 mb-1">Za opšte informacije i administraciju</div>
                        <a href="mailto:office@eef.rs" className="text-lg font-bold text-[#171A54] group-hover:text-primary transition-colors break-all">office@eef.rs</a>
                     </div>
                     
                     <div className="group">
                        <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 border-b border-[#171A54]/5 pb-2">Prodaja</div>
                        <div className="text-sm text-[#171A54]/60 mb-1">Ponude, cene i komercijala</div>
                        <a href="mailto:prodaja@eef.rs" className="text-lg font-bold text-[#171A54] group-hover:text-primary transition-colors break-all">prodaja@eef.rs</a>
                     </div>

                     <div className="group">
                        <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 border-b border-[#171A54]/5 pb-2">Tehnička Podrška</div>
                        <div className="text-sm text-[#171A54]/60 mb-1">Inženjering i projektovanje</div>
                        <a href="mailto:tehnika@eef.rs" className="text-lg font-bold text-[#171A54] group-hover:text-primary transition-colors break-all">tehnika@eef.rs</a>
                     </div>

                     <div className="group">
                        <div className="text-[#171A54]/40 text-xs uppercase tracking-wider mb-2 border-b border-[#171A54]/5 pb-2">Servis</div>
                        <div className="text-sm text-[#171A54]/60 mb-1">Prijava kvara i održavanje</div>
                        <a href="mailto:servis@eef.rs" className="text-lg font-bold text-[#171A54] group-hover:text-primary transition-colors break-all">servis@eef.rs</a>
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
