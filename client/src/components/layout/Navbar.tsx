import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { 
  Phone, Mail, Linkedin, Search, Clock, X,
  Snowflake, Wind, Box, Server, Droplets, Zap, Thermometer,
  DraftingCompass, Factory, Wrench, BarChart3, Lightbulb, ShieldCheck,
  BookOpen, ChevronRight, Home, Star
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { useLang } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getCounterpartPath } from "@/lib/route-map";

export function Navbar() {
  const { t } = useTranslation();
  const { lang, isEnglish } = useLang();
  const [location, setLocation] = useLocation();
  const l = (srHref: string) => isEnglish ? getCounterpartPath(srHref, "en") : srHref;

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const quickAccessLinks = [
    { name: t("common.home"), href: l("/"), icon: Home },
    { name: t("nav.contact"), href: l("/kontakt"), icon: Phone },
    { name: t("nav.references"), href: l("/reference"), icon: Star },
    { name: "Blog", href: l("/vesti"), icon: BookOpen },
  ];

  const getCurrentPageName = () => {
    const page = navLinks.find(link => link.href === location);
    return page?.name || "Stranica";
  };

  const navLinks = [
    {
      name: t("nav.ecoCooling"),
      href: l("/eko-rashlada"),
      description: t("nav.ecoCoolingDesc"),
      items: [
        { name: t("nav.coldRooms"), href: l("/eko-rashlada/rashladne-komore"), icon: Snowflake, desc: t("nav.coldRoomsDesc") },
        { name: t("nav.freezingTunnels"), href: l("/eko-rashlada/tuneli-za-smrzavanje"), icon: Wind, desc: t("nav.freezingTunnelsDesc") },
        { name: t("nav.uloRooms"), href: l("/eko-rashlada/ulo-komore"), icon: Box, desc: t("nav.uloRoomsDesc") },
        { name: t("nav.coolingUnits"), href: l("/eko-rashlada/rashladni-agregati"), icon: Server, desc: t("nav.coolingUnitsDesc") },
        { name: t("nav.chillers"), href: l("/eko-rashlada/cileri"), icon: Droplets, desc: t("nav.chillersDesc") },
        { name: t("nav.electricalCabinets"), href: l("/eko-rashlada/elektro-ormani"), icon: Zap, desc: t("nav.electricalCabinetsDesc") },
        { name: t("nav.thermalInsulation"), href: l("/eko-rashlada/termoizolacija"), icon: Thermometer, desc: t("nav.thermalInsulationDesc") }
      ]
    },
    {
      name: t("nav.services"),
      href: l("/usluge"),
      description: t("nav.servicesDesc"),
      items: [
        { name: t("nav.engineering"), href: l("/usluge/inzenjering"), icon: DraftingCompass, desc: t("nav.engineeringDesc") },
        { name: t("nav.execution"), href: l("/usluge/izvodjenje"), icon: Factory, desc: t("nav.executionDesc") },
        { name: t("nav.service"), href: l("/usluge/servis"), icon: Wrench, desc: t("nav.serviceDesc") },
        { name: t("nav.energyAudit"), href: l("/usluge/energetska-revizija"), icon: BarChart3, desc: t("nav.energyAuditDesc") },
        { name: t("nav.consulting"), href: l("/usluge/konsalting"), icon: Lightbulb, desc: t("nav.consultingDesc") },
        { name: t("nav.safety"), href: l("/usluge/sigurnost"), icon: ShieldCheck, desc: t("nav.safetyDesc") }
      ]
    },
    { name: t("nav.company"), href: l("/o-nama") },
    { name: t("nav.partners"), href: l("/partneri") },
    { name: t("nav.references"), href: l("/reference") },
    {
      name: t("nav.documentation"),
      href: l("/dokumentacija"),
      description: t("nav.documentationDesc"),
      items: [
        { name: t("nav.certificates"), href: l("/dokumentacija/sertifikati"), icon: ShieldCheck, desc: t("nav.certificatesDesc") },
        { name: t("nav.diplomas"), href: l("/dokumentacija/diplome"), icon: BookOpen, desc: t("nav.diplomasDesc") }
      ]
    },
    { name: t("nav.contact"), href: l("/kontakt") },
  ];

  return (
    <>
      {/* Top Strip */}
      <div className="bg-gradient-to-r from-primary to-[#4a9c3f] text-white text-[11px] font-medium py-2 px-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center z-50 relative shadow-md overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="flex gap-6 flex-wrap justify-center sm:justify-start relative z-10">
          <a href="tel:+381113757287" className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300 whitespace-nowrap">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Phone className="w-3 h-3" />
            </div>
            <span className="tracking-wide">+381 11 375 72 87</span>
          </a>
          <a href="mailto:office@eef.rs" className="group flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300 whitespace-nowrap">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Mail className="w-3 h-3" />
            </div>
            <span className="tracking-wide">office@eef.rs</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-3 relative z-10">
          <LanguageSwitcher className="text-white/80" />
          <a 
            href="https://www.linkedin.com/feed/update/urn:li:activity:6899988285712596994" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 border-b border-white/5 ${
          scrolled ? "top-0 bg-[#0a0c29]/90 backdrop-blur-md py-2 shadow-lg" : "top-[72px] sm:top-8 bg-transparent py-6"
        } ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href={l("/")} className="flex items-center gap-3 group shrink-0">
            <img 
              src="/assets/logo.png" 
              alt={isEnglish ? "Eko Elektrofrigo Logo - Industrial Refrigeration" : "Eko Elektrofrigo Logo - Industrijska rashlada"} 
              className="h-12 sm:h-14 md:h-14 xl:h-16 w-auto object-contain brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" 
            />
          </Link>

          {/* Desktop Navigation (Mega Menu) */}
          <div className="hidden xl:flex items-center gap-1">
            <NavigationMenu className="max-w-none">
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    {link.items ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-white hover:text-primary hover:bg-white/5 data-[state=open]:bg-white/5 uppercase tracking-wider font-medium text-[11px] h-9 px-3">
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className={cn(
                            "p-6 bg-[#0e1035] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl",
                            (link.name === "Eko Rashlada" || link.name === "Usluge") ? "w-[750px]" : "w-[600px]"
                          )}>
                            <div className="grid grid-cols-[200px_1fr] gap-6">
                                <div className="space-y-4 border-r border-white/5 pr-4 flex flex-col justify-between">
                                    <div>
                                      <h4 className="text-lg font-medium text-white mb-2">{link.name}</h4>
                                      <p className="text-sm text-white/50 leading-relaxed">
                                          {/* @ts-ignore */}
                                          {link.description}
                                      </p>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full justify-between text-xs border-white/10 hover:border-primary/50 hover:bg-white/5 text-white" asChild>
                                        <Link href={link.href}>
                                            {t("common.viewAll")} <ChevronRight className="w-3 h-3 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                                <ul className={cn(
                                  "grid gap-3",
                                  (link.name === "Eko Rashlada" || link.name === "Usluge") ? "grid-cols-2" : "grid-cols-1"
                                )}>
                                  {link.items.map((item) => (
                                    <li key={item.name} className={link.name === "Eko Rashlada" && item.name === "Termoizolacija" ? "col-span-2" : ""}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={item.href}
                                          className="flex items-start gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-white/5 group border border-transparent hover:border-white/5 h-full"
                                        >
                                          <div className="flex-shrink-0 mt-0.5 p-2 rounded-md bg-white/5 group-hover:bg-primary/20 transition-colors">
                                            <item.icon className="w-5 h-5 text-primary" />
                                          </div>
                                          <div className="flex flex-col gap-1.5">
                                            <div className="text-sm font-medium leading-none text-white group-hover:text-primary transition-colors">
                                              {item.name}
                                            </div>
                                            <p className="line-clamp-2 text-xs leading-snug text-white/50 group-hover:text-white/70">
                                              {item.desc}
                                            </p>
                                          </div>
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link 
                          href={link.href} 
                          className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:text-primary hover:bg-white/5 uppercase tracking-wider font-medium text-[11px] h-9 px-3 cursor-pointer w-full")}
                        >
                          {link.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Button & Mobile Menu */}
          <div className="flex items-center gap-4">
             <Button 
                variant="default"
                size="sm"
                className="hidden xl:flex bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-[0_0_15px_rgba(86,170,74,0.4)] hover:shadow-[0_0_25px_rgba(86,170,74,0.6)] hover:-translate-y-0.5 text-xs font-bold tracking-wide h-9 px-6 rounded-full border border-white/10"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                asChild
             >
               <a href="https://ekoelektrofrigo.rs" target="_blank" rel="noopener noreferrer">
                 <span className="flex items-center gap-2">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                   </span>
                   {t("common.visitWebShop")}
                   <ChevronRight className="w-3 h-3" />
                 </span>
               </a>
             </Button>

            {/* Hamburger Menu (Mobile) - Animated */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="xl:hidden text-white hover:bg-white/10 hover:text-primary transition-all duration-300 rounded-full w-12 h-12 relative"
                  onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                >
                  <div className="relative w-6 h-5 flex flex-col justify-between">
                    <motion.span 
                      animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-0.5 bg-current rounded-full origin-center"
                    />
                    <motion.span 
                      animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-0.5 bg-current rounded-full"
                    />
                    <motion.span 
                      animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-0.5 bg-current rounded-full origin-center"
                    />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0c29] border-l border-white/10 w-full md:w-[450px] p-0 h-full max-h-screen flex flex-col z-[100] overflow-hidden">
                {/* Enhanced gradient background with animated elements */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
                
                <div 
                  className="flex-1 overflow-y-auto custom-scrollbar px-8 py-12 relative z-10 min-h-0" 
                  style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  {/* Header with Logo, Language Switcher and Close Button */}
                  <div className="flex items-center justify-between mb-8">
                    {/* Logo */}
                    <Link href={l("/")} onClick={() => setIsOpen(false)}>
                      <img 
                        src="/assets/logo.png" 
                        alt="Eko Elektrofrigo Logo"
                        className="h-10 w-auto object-contain brightness-0 invert"
                      />
                    </Link>

                    <div className="flex items-center gap-3">
                      <LanguageSwitcher variant="full" />
                      {/* Close Button */}
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all"
                        aria-label={t("common.close")}
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  {/* Breadcrumb Trail */}
                  {location !== "/" && location !== "/en" && location !== "/en/" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-xs text-white/40 mb-6"
                    >
                      <Link href={l("/")} className="hover:text-primary transition-colors">{t("common.home")}</Link>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-white/70">{getCurrentPageName()}</span>
                    </motion.div>
                  )}

                  {/* Search Bar - Filters menu items */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input 
                        type="text" 
                        placeholder={t("common.searchPlaceholder")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </motion.div>

                  {/* Quick Access Links */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar"
                  >
                    {quickAccessLinks.map((item) => (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                        <Button variant="outline" size="sm" className="shrink-0 border-white/10 text-white hover:bg-primary/20 hover:border-primary/50 whitespace-nowrap transition-all">
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </motion.div>
                  <div className="flex flex-col gap-6 mt-8">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {navLinks
                        .filter(link => {
                          if (!searchQuery) return true;
                          const query = searchQuery.toLowerCase();
                          return (
                            link.name.toLowerCase().includes(query) ||
                            link.items?.some(item => 
                              item.name.toLowerCase().includes(query) ||
                              item.desc?.toLowerCase().includes(query)
                            )
                          );
                        })
                        .map((link, i) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                          className="border-b border-white/5"
                        >
                          {link.items ? (
                            <AccordionItem value={link.name} className="border-none">
                              <div className="flex items-center">
                                <Link 
                                  href={link.href}
                                  className={cn(
                                    "flex-1 text-2xl font-light transition-colors py-4 group flex items-center gap-4",
                                    location === link.href 
                                      ? "text-primary font-normal" 
                                      : "text-white hover:text-primary"
                                  )}
                                  onClick={() => setIsOpen(false)}
                                >
                                  {location === link.href && (
                                    <motion.div 
                                      layoutId="activeIndicator"
                                      className="w-1 h-8 bg-primary rounded-full shrink-0"
                                    />
                                  )}
                                  <span className="text-xs font-mono text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                                  {link.name}
                                </Link>
                                <AccordionTrigger className="w-14 py-4 justify-end hover:no-underline flex-none text-transparent">
                                  <span className="sr-only">Toggle</span>
                                </AccordionTrigger>
                              </div>
                              <AccordionContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col gap-3 pl-10 pb-4"
                                >
                                  {link.items.map((item, j) => (
                                    <Link 
                                      key={item.name} 
                                      href={item.href}
                                      className={cn(
                                        "hover:pl-2 transition-all duration-300 py-2 text-base flex items-center gap-3 group/item",
                                        location === item.href
                                          ? "text-primary"
                                          : "text-white/60 hover:text-white"
                                      )}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div className={cn(
                                        "w-1.5 h-1.5 rounded-full transition-colors",
                                        location === item.href ? "bg-primary" : "bg-white/10 group-hover/item:bg-primary"
                                      )} />
                                      {item.name}
                                    </Link>
                                  ))}
                                </motion.div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <Link 
                              href={link.href} 
                              className={cn(
                                "text-2xl font-light transition-colors block group py-4 flex items-center gap-4 w-full",
                                location === link.href 
                                  ? "text-primary font-normal" 
                                  : "text-white hover:text-primary"
                              )}
                              onClick={() => {
                                import("@/lib/audio").then(m => m.audio.playHover());
                                setIsOpen(false);
                              }}
                            >
                              {location === link.href && (
                                <motion.div 
                                  layoutId="activeIndicator"
                                  className="w-1 h-8 bg-primary rounded-full shrink-0"
                                />
                              )}
                              <span className="text-xs font-mono text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                              {link.name}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </Accordion>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-auto pt-12 border-t border-white/5 grid grid-cols-1 gap-8"
                  >
                     {/* Working Hours Widget */}
                     <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-white/50 mb-1">{t("common.workingHours")}</p>
                            <p className="text-sm text-white">{t("common.monFri")}: 07:30 - 15:30</p>
                          </div>
                        </div>
                      </div>

                     <Button 
                        variant="default"
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-[0_0_15px_rgba(86,170,74,0.4)] hover:shadow-[0_0_25px_rgba(86,170,74,0.6)] text-sm font-bold tracking-wide h-12 rounded-xl"
                        onClick={() => {
                          import("@/lib/audio").then(m => m.audio.playClick());
                          setIsOpen(false);
                        }}
                        asChild
                     >
                       <a href="https://ekoelektrofrigo.rs" target="_blank" rel="noopener noreferrer">
                         <span className="flex items-center justify-center gap-2">
                           <span className="relative flex h-2 w-2">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                             <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                           </span>
                           {t("common.visitWebShop")}
                           <ChevronRight className="w-4 h-4" />
                         </span>
                       </a>
                     </Button>

                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-6 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-primary/50"></span>
                          {t("nav.contact")}
                        </h4>
                        <div className="space-y-4">
                          <a href="mailto:office@eef.rs" className="text-xl text-white hover:text-primary transition-colors block font-light">office@eef.rs</a>
                          <a href="tel:+381113757287" className="text-xl text-white hover:text-primary transition-colors block font-light">+381 11 375 72 87</a>
                        </div>
                     </div>

                     {/* LinkedIn Social Link */}
                     <div className="flex gap-4 pt-4 border-t border-white/5">
                        <a href="https://www.linkedin.com/feed/update/urn:li:activity:6899988285712596994" target="_blank" rel="noopener noreferrer" 
                           className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-primary/20 hover:text-primary transition-all">
                          <Linkedin className="w-5 h-5" />
                        </a>
                     </div>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
