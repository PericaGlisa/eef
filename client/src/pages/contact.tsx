import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useTranslation();
  const { isEnglish } = useLang();
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

  const contactCards = useMemo(() => [
    {
      title: t("contact.cardSales"),
      desc: t("contact.cardSalesDesc"),
      email: "prodaja@eef.rs",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "hover:border-yellow-500/50"
    },
    {
      title: t("contact.cardTech"),
      desc: t("contact.cardTechDesc"),
      email: "tehnika@eef.rs",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      title: t("contact.cardService"),
      desc: t("contact.cardServiceDesc"),
      email: "servis@eef.rs",
      icon: Clock,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "hover:border-red-500/50"
    },
    {
      title: t("contact.cardGeneral"),
      desc: t("contact.cardGeneralDesc"),
      email: "office@eef.rs",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "hover:border-green-500/50"
    }
  ], [t]);

  const topicOptions = useMemo(() => [
    { id: "project", label: t("contact.topicProject"), icon: Zap },
    { id: "service", label: t("contact.topicService"), icon: ShieldCheck },
    { id: "career", label: t("contact.topicCareer"), icon: Users },
    { id: "info", label: t("contact.topicInfo"), icon: MessageSquare }
  ], [t]);

  const submitContactRequest = async (payload: unknown) => {
    const isProd = import.meta.env.PROD;
    const apiUrl = isProd ? "/.netlify/functions/contact" : "/api/contact";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status}: ${text || response.statusText}`);
    }
  };

  return (
    <div className="bg-background min-h-screen relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-0 bg-[#0e1035]/70 z-10 mix-blend-multiply" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1035] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 z-10" />

          <motion.img 
            src="/assets/hero-bg.jpg" 
            alt={isEnglish ? "Contact Hero" : "Kontakt Hero"}
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
              {t("contact.heroBadge")}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg"
            >
              {t("contact.heroTitle1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-300">{t("contact.heroTitle2")}</span>
            </motion.h1>

            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              {t("contact.heroSubtitle")}
            </p>

            {/* Topic Selector Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topicOptions.map((option) => (
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
          
          {/* Direct Contact Grid */}
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
                  {t("contact.formTitle")}
                </h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t("contact.formResponseTime")}
                </div>
              </div>
              <div className="text-xs text-slate-400 font-mono mb-6">
                {t("contact.formRequiredHint")}
              </div>

              <form
                className="space-y-6"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (isSubmitting) {
                    return;
                  }
                  const missing: string[] = [];
                  if (!formData.name.trim()) missing.push(t("contact.labelName"));
                  if (!formData.email.trim()) missing.push(t("contact.labelEmail"));
                  if (!formData.message.trim()) missing.push(t("contact.labelMessage"));
                  if (selectedTopic === "project" && !formData.projectType.trim()) {
                    missing.push(t("contact.labelProjectType"));
                  }
                  if (selectedTopic === "project" && formData.projectType === "other" && !formData.projectTypeOther.trim()) {
                    missing.push(t("contact.projectTypeOther"));
                  }
                  if (selectedTopic === "service" && !formData.equipmentId.trim()) {
                    missing.push(t("contact.labelEquipmentId"));
                  }
                  if (selectedTopic === "service" && !formData.urgency.trim()) {
                    missing.push(t("contact.labelUrgency"));
                  }
                  if (selectedTopic === "career" && !formData.position.trim()) {
                    missing.push(t("contact.labelPosition"));
                  }
                  if (missing.length > 0) {
                    toast({
                      title: t("contact.toastMissingTitle"),
                      description: missing.join(", "),
                      variant: "destructive",
                    });
                    return;
                  }
                  setIsSubmitting(true);
                  try {
                    await submitContactRequest({
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
                      title: t("contact.toastSuccessTitle"),
                      description: t("contact.toastSuccessDesc"),
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
                  } catch (error: any) {
                    let description = t("contact.toastErrorDefault");
                    const raw = String(error?.message || "");
                    const payload = raw.includes(":") ? raw.slice(raw.indexOf(":") + 1).trim() : raw;
                    try {
                      const parsed = JSON.parse(payload);
                      if (parsed?.details) {
                        description = String(parsed.details);
                      } else if (parsed?.message) {
                        description = String(parsed.message);
                      }
                    } catch {
                      if (payload) {
                        const looksLikeHtml = /^\s*<!doctype html/i.test(payload) || /^\s*<html/i.test(payload);
                        if (looksLikeHtml) {
                          description = t("contact.toastErrorApi");
                        } else {
                          description = payload;
                        }
                      }
                    }
                    toast({
                      title: t("contact.toastErrorTitle"),
                      description,
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
                            {t("contact.labelName")} <span className="text-red-500">*</span>
                          </label>
                          <Input
                            className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder={t("contact.placeholderName")}
                            value={formData.name}
                            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("contact.labelCompany")}</label>
                          <Input
                            className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            placeholder={t("contact.placeholderCompany")}
                            value={formData.company}
                            onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                          />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {t("contact.labelEmail")} <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder={t("contact.placeholderEmail")}
                          value={formData.email}
                          onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {selectedTopic === 'project' && (
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            {t("contact.labelProjectType")} <span className="text-red-500">*</span>
                          </label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value, projectTypeOther: "" }))}
                          >
                              <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-[#171A54] data-[placeholder]:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                <SelectValue placeholder={t("contact.selectProjectType")} />
                              </SelectTrigger>
                              <SelectContent className="bg-white text-[#171A54] border-slate-200">
                                <SelectItem value="industrial">{t("contact.projectTypeIndustrial")}</SelectItem>
                                <SelectItem value="commercial">{t("contact.projectTypeCommercial")}</SelectItem>
                                <SelectItem value="hvac">{t("contact.projectTypeHvac")}</SelectItem>
                                <SelectItem value="solar">{t("contact.projectTypeSolar")}</SelectItem>
                                <SelectItem value="other">{t("contact.projectTypeOther")}</SelectItem>
                              </SelectContent>
                          </Select>
                          {formData.projectType === "other" && (
                            <Input
                              className="mt-3 bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              placeholder={t("contact.placeholderProjectTypeOther")}
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
                                {t("contact.labelEquipmentId")} <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder={t("contact.placeholderEquipmentId")}
                                value={formData.equipmentId}
                                onChange={(event) => setFormData((prev) => ({ ...prev, equipmentId: event.target.value }))}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {t("contact.labelUrgency")} <span className="text-red-500">*</span>
                              </label>
                              <Select
                                value={formData.urgency}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                              >
                                <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-[#171A54] data-[placeholder]:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                                    <SelectValue placeholder={t("contact.selectUrgency")} />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-[#171A54] border-slate-200">
                                    <SelectItem value="low">{t("contact.urgencyLow")}</SelectItem>
                                    <SelectItem value="medium">{t("contact.urgencyMedium")}</SelectItem>
                                    <SelectItem value="high" className="text-red-600 font-bold">{t("contact.urgencyHigh")}</SelectItem>
                                </SelectContent>
                              </Select>
                          </div>
                        </div>
                    )}

                    {selectedTopic === 'career' && (
                        <div className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {t("contact.labelPosition")} <span className="text-red-500">*</span>
                              </label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder={t("contact.placeholderPosition")}
                                value={formData.position}
                                onChange={(event) => setFormData((prev) => ({ ...prev, position: event.target.value }))}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t("contact.labelPortfolio")}</label>
                              <Input
                                className="bg-slate-50 border-slate-200 h-12 text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder={t("contact.placeholderPortfolio")}
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
                    {t("contact.labelMessage")} <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    className="bg-slate-50 border-slate-200 min-h-[150px] text-[#171A54] placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder={t("contact.placeholderMessage")}
                    value={formData.message}
                    onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  />
                </div>
                
                <Button
                  size="lg"
                  className="w-full bg-[#171A54] hover:bg-primary text-white font-bold h-14 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.submitting") : t("contact.submit")} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Right: Map & Info Center */}
            <div className="space-y-8">
               <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <div className="absolute inset-0 bg-[#171A54]/20 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                  
                  <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-[#171A54] uppercase tracking-wider">{t("contact.mapHqStatus")}</span>
                  </div>

                  <iframe 
                    width="100%" 
                    height="450" 
                    src="https://maps.google.com/maps?q=Svetolika+Nika%C4%8Devi%C4%87a+11,+Beograd&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    title={isEnglish ? "Eko Elektrofrigo Location" : "Eko Elektrofrigo Lokacija"}
                    className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                    loading="lazy"
                  ></iframe>

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
                             {t("contact.openInMaps")}
                           </a>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Phone Cards */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <Phone className="w-6 h-6 text-slate-300 mb-4 group-hover:text-primary transition-colors" />
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.phoneCentral1")}</div>
                    <a href="tel:+381113757287" className="text-xl font-heading font-bold text-[#171A54] block">+381 11 375 72 87</a>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <Phone className="w-6 h-6 text-slate-300 mb-4 group-hover:text-primary transition-colors" />
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.phoneCentral2")}</div>
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
