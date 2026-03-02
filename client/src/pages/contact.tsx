import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState<string>("project");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    projectType: "",
    equipmentId: "",
    urgency: "",
    position: "",
    portfolio: "",
    website: "",
    projectTypeOther: "",
  });

  const contactCards = [
    {
      title: "Prodaja",
      desc: "Ponude, cene i komercijala",
      email: "prodaja@eef.rs",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "hover:border-yellow-500/50"
    },
    {
      title: "Tehnička Podrška",
      desc: "Inženjering i projektovanje",
      email: "tehnika@eef.rs",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      title: "Servis",
      desc: "Prijava kvara i održavanje",
      email: "servis@eef.rs",
      icon: Clock,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "hover:border-red-500/50"
    },
    {
      title: "Opšte Informacije",
      desc: "Administracija i ostalo",
      email: "office@eef.rs",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50"
    }
  ];

  return (
    <div className="bg-background min-h-screen relative">
      <Navbar />

      {/* Hero Section - Standardized with About Page */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-[#0e1035]/70 z-10 mix-blend-multiply" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />

          <motion.img 
            src="/assets/hero-bg.jpg" 
            alt="Contact Hero"  
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-30">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-mono mb-8 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              DOSTUPNI 24/7 ZA HITNE INTERVENCIJE
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
            >
              Povežite se sa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">Stručnjacima</span>
            </motion.h1>

            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Bilo da planirate novi projekat ili vam je potreban hitan servis, naš inženjerski tim je spreman da odgovori na specifične zahteve vaše industrije.
            </p>

            {/* Topic Selector Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                { id: "project", label: "Novi Projekat", icon: Zap },
                { id: "service", label: "Servis", icon: ShieldCheck },
                { id: "career", label: "Karijera", icon: Users },
                { id: "info", label: "Info", icon: MessageSquare }
              ].map((option) => (
                <div 
                  key={option.id}
                  onClick={() => {
                    setSelectedTopic(option.id);
                    setFormData((prev) => ({
                      ...prev,
                      projectType: "",
                      equipmentId: "",
                      urgency: "",
                      position: "",
                      portfolio: "",
                      projectTypeOther: "",
                    }));
                  }}
                  className={`p-4 border cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 rounded-xl backdrop-blur-md group ${
                    selectedTopic === option.id 
                      ? "bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(86,170,74,0.3)]" 
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <option.icon className={`w-6 h-6 transition-colors ${
                      selectedTopic === option.id ? "text-primary" : "text-white/70 group-hover:text-white"
                  }`} />
                  <span className="font-bold text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Direct Contact Grid - New Feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 -mt-32 relative z-20">
            {contactCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-[#F1F5F9] border border-slate-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group ${card.border}`}
              >
                <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-[#171A54] font-bold text-lg mb-1">{card.title}</h3>
                <p className="text-slate-600 text-xs mb-4">{card.desc}</p>
                <a href={`mailto:${card.email}`} className="text-[#171A54] text-sm font-mono flex items-center gap-2 hover:text-primary transition-colors font-bold">
                  {card.email} <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Enhanced Form */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-bold text-[#171A54]">
                  Pošaljite Zahtev
                </h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  Odgovor u roku od 24h
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono mb-6">
                Polja označena * su obavezna.
              </div>

              <form
                className="space-y-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (isSubmitting) {
                    return;
                  }
                  const missing: string[] = [];
                  if (!formData.name.trim()) missing.push("Ime i prezime");
                  if (!formData.email.trim()) missing.push("Email");
                  if (!formData.message.trim()) missing.push("Poruka");
                  if (selectedTopic === "project" && !formData.projectType.trim()) {
                    missing.push("Tip projekta");
                  }
                  if (selectedTopic === "project" && formData.projectType === "other" && !formData.projectTypeOther.trim()) {
                    missing.push("Drugi tip projekta");
                  }
                  if (selectedTopic === "service" && !formData.equipmentId.trim()) {
                    missing.push("ID opreme");
                  }
                  if (selectedTopic === "service" && !formData.urgency.trim()) {
                    missing.push("Hitnost");
                  }
                  if (selectedTopic === "career" && !formData.position.trim()) {
                    missing.push("Pozicija");
                  }
                  if (missing.length > 0) {
                    toast({
                      title: "Nedostaju obavezni podaci",
                      description: missing.join(", "),
                      variant: "destructive",
                    });
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    await apiRequest("POST", "/api/contact", {
                      topic: selectedTopic,
                      name: formData.name.trim(),
                      company: formData.company.trim(),
                      email: formData.email.trim(),
                      message: formData.message.trim(),
                      projectType: formData.projectType,
                      projectTypeOther: formData.projectTypeOther.trim(),
                      equipmentId: formData.equipmentId.trim(),
                      urgency: formData.urgency,
                      position: formData.position.trim(),
                      portfolio: formData.portfolio.trim(),
                      website: formData.website.trim(),
                    });
                    toast({
                      title: "Upit je uspešno poslat",
                      description: "Javićemo se u najkraćem roku.",
                    });
                    setFormData({
                      name: "",
                      company: "",
                      email: "",
                      message: "",
                      projectType: "",
                      equipmentId: "",
                      urgency: "",
                      position: "",
                      portfolio: "",
                      website: "",
                      projectTypeOther: "",
                    });
                    setSelectedTopic("project");
                  } catch (error) {
                    toast({
                      title: "Slanje nije uspelo",
                      description: "Pokušajte ponovo ili nas kontaktirajte direktno.",
                      variant: "destructive",
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTopic}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Common Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Ime i Prezime <span className="text-red-500">*</span>
                          </label>
                          <Input
                            className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Vaše ime"
                            value={formData.name}
                            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kompanija</label>
                          <Input
                            className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder="Naziv kompanije"
                            value={formData.company}
                            onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                          />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Email Adresa <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="vas@email.com"
                          value={formData.email}
                          onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {selectedTopic === 'project' && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Tip Projekta <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value, projectTypeOther: "" }))}
                          >
                              <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-[#171A54] data-[placeholder]:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder="Izaberite tip..." />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-[#171A54] border-slate-200">
                                <SelectItem value="industrial">Industrijska Hladnjača</SelectItem>
                                <SelectItem value="commercial">Komercijalni Objekat</SelectItem>
                                <SelectItem value="hvac">HVAC Sistem</SelectItem>
                                <SelectItem value="solar">Solarna Elektrana</SelectItem>
                                <SelectItem value="other">Ostalo (upišite)</SelectItem>
                              </SelectContent>
                          </Select>
                          {formData.projectType === "other" && (
                            <Input
                              className="mt-3 bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              placeholder="Unesite tip projekta"
                              value={formData.projectTypeOther}
                              onChange={(event) => setFormData((prev) => ({ ...prev, projectTypeOther: event.target.value }))}
                            />
                          )}
                        </div>
                    )}

                    {selectedTopic === 'service' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                ID Opreme <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="npr. CH-2023-01"
                                value={formData.equipmentId}
                                onChange={(event) => setFormData((prev) => ({ ...prev, equipmentId: event.target.value }))}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Hitnost <span className="text-red-500">*</span>
                              </label>
                              <Select
                                value={formData.urgency}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                              >
                                <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-[#171A54] data-[placeholder]:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder="Nivo hitnosti..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-[#171A54] border-slate-200">
                                    <SelectItem value="low">Redovno Održavanje</SelectItem>
                                    <SelectItem value="medium">Manji Kvar (48h)</SelectItem>
                                    <SelectItem value="high" className="text-red-600 font-bold">Urgentno (4h odziv)</SelectItem>
                                </SelectContent>
                              </Select>
                          </div>
                        </div>
                    )}

                    {selectedTopic === 'career' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Pozicija <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="npr. Servisni Tehničar"
                                value={formData.position}
                                onChange={(event) => setFormData((prev) => ({ ...prev, position: event.target.value }))}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">LinkedIn / Portfolio</label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="URL profila"
                                value={formData.portfolio}
                                onChange={(event) => setFormData((prev) => ({ ...prev, portfolio: event.target.value }))}
                              />
                          </div>
                        </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="hidden">
                  <label>Website</label>
                  <Input
                    autoComplete="off"
                    tabIndex={-1}
                    className="text-[#171A54] placeholder:text-slate-400"
                    value={formData.website}
                    onChange={(event) => setFormData((prev) => ({ ...prev, website: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Poruka <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    className="bg-slate-50 border-slate-200 min-h-[150px] text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="Detaljniji opis vašeg zahteva..."
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  />
                </div>
                
                <Button
                  size="lg"
                  className="w-full bg-[#171A54] hover:bg-primary text-white font-bold h-14 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Šaljem..." : "Pošalji Upit"} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Right: Map & Info Center */}
            <div className="space-y-8">
               {/* High-Tech Map Container */}
               <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 bg-[#171A54]/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-[#171A54] uppercase tracking-wider">HQ Operativan</span>
                  </div>

                  <iframe 
                    width="100%" 
                    height="450" 
                    src="https://maps.google.com/maps?q=Svetolika+Nika%C4%8Devi%C4%87a+11,+Beograd&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    title="Eko Elektrofrigo Lokacija"
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  ></iframe>

                  {/* Location Card Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white p-6 rounded-xl shadow-xl z-20">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="font-bold text-[#171A54] text-lg">Svetolika Nikačevića 11</h4>
                           <p className="text-slate-500 text-sm mb-3">11000 Beograd, Srbija</p>
                           <a 
                             href="https://maps.google.com/?q=Svetolika+Nika%C4%8Devi%C4%87a+11,+Beograd" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-primary text-xs font-bold uppercase tracking-wider hover:underline"
                           >
                             Otvori u Google Maps
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Phone Cards */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <Phone className="w-6 h-6 text-slate-300 mb-4 group-hover:text-primary transition-colors" />
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Centrala 1</div>
                    <a href="tel:+381113757287" className="text-xl font-heading font-bold text-[#171A54] block">+381 11 375 72 87</a>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <Phone className="w-6 h-6 text-slate-300 mb-4 group-hover:text-primary transition-colors" />
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Centrala 2</div>
                    <a href="tel:+381113757288" className="text-xl font-heading font-bold text-[#171A54] block">+381 11 375 72 88</a>
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
