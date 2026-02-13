import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  AlignRight, Phone, Mail, 
  Snowflake, Wind, Box, Server, Droplets, Zap, Thermometer,
  DraftingCompass, Factory, Wrench, BarChart3, Lightbulb, ShieldCheck,
  BookOpen, ChevronRight
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    {
      name: "Eko Rashlada",
      href: "/eco-cooling",
      description: "Istražite naša eko rashladna rešenja dizajnirana za maksimalnu efikasnost, održivost i pouzdanost.",
      items: [
        { name: "Rashladne komore", href: "/eco-cooling/rashladne-komore", icon: Snowflake, desc: "Plusne i minusne komore" },
        { name: "Tuneli za smrzavanje", href: "/eco-cooling/tuneli-za-smrzavanje", icon: Wind, desc: "Brzo smrzavanje" },
        { name: "ULO Komore", href: "/eco-cooling/ulo-komore", icon: Box, desc: "Kontrolisana atmosfera" },
        { name: "Rashladni agregati", href: "/eco-cooling/rashladni-agregati", icon: Server, desc: "Ekološki freoni i CO2" },
        { name: "Čileri", href: "/eco-cooling/cileri", icon: Droplets, desc: "Indirektno hlađenje" },
        { name: "Elektro ormani & CNSU", href: "/eco-cooling/elektro-ormani", icon: Zap, desc: "Nadzor i upravljanje" },
        { name: "Termoizolacija", href: "/eco-cooling/termoizolacija", icon: Thermometer, desc: "Paneli i vrata" }
      ]
    },
    {
      name: "Usluge",
      href: "/services",
      description: "Sveobuhvatna inženjerska podrška: od idejnog rešenja i projektovanja, preko stručne montaže, do pouzdanog servisa i održavanja 24/7.",
      items: [
        { name: "Inženjering", href: "/services/engineering", icon: DraftingCompass, desc: "Projektovanje i 3D modeli" },
        { name: "Izvođenje", href: "/services/execution", icon: Factory, desc: "Montaža ključ u ruke" },
        { name: "Servis", href: "/services/maintenance", icon: Wrench, desc: "Održavanje 24/7" },
        { name: "Energetska Revizija", href: "/services/energy-audit", icon: BarChart3, desc: "ROI i uštede" },
        { name: "Konsalting", href: "/services/consulting", icon: Lightbulb, desc: "Stručno savetovanje" },
        { name: "Sigurnost", href: "/services/safety", icon: ShieldCheck, desc: "Kvalitet i standardi" }
      ]
    },
    { name: "Kompanija", href: "/about" },
    { name: "Partneri", href: "/partners" },
    { name: "Reference", href: "/references" },
    {
      name: "Dokumentacija",
      href: "/documentation",
      description: "Pristupite našim zvaničnim sertifikatima i potvrdama kvaliteta.",
      items: [
        { name: "Sertifikati", href: "/documentation/certificates", icon: ShieldCheck, desc: "ISO 9001, 14001, 45001" },
        { name: "Diplome", href: "/documentation/diplomas", icon: BookOpen, desc: "Partnerska priznanja" }
      ]
    },
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

        <div className="hidden md:flex items-center gap-2 relative z-10">
          <div className="bg-black/10 px-3 py-1 rounded-full flex items-center gap-2 border border-white/5 backdrop-blur-sm group hover:bg-black/20 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            </span>
            <span className="text-white font-bold tracking-wider text-[10px] uppercase group-hover:tracking-widest transition-all duration-300">Servisni timovi: Aktivni (24/7)</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 border-b border-white/5 ${
          scrolled ? "top-0 bg-[#0a0c29]/90 backdrop-blur-md py-2 shadow-lg" : "top-[72px] sm:top-8 bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo.png" 
              alt="EEF Logo" 
              className="h-12 md:h-14 lg:h-16 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" 
            />
          </Link>

          {/* Desktop Navigation (Mega Menu) */}
          <div className="hidden lg:flex items-center gap-1">
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
                                            Pogledaj sve <ChevronRight className="w-3 h-3 ml-2" />
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
                className="hidden lg:flex bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-[0_0_15px_rgba(86,170,74,0.4)] hover:shadow-[0_0_25px_rgba(86,170,74,0.6)] hover:-translate-y-0.5 text-xs font-bold uppercase tracking-wide h-9 px-6 rounded-full border border-white/10"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                asChild
             >
               <Link href="/contact">
                 <span className="flex items-center gap-2">
                   Zatražite ponudu
                   <ChevronRight className="w-3 h-3" />
                 </span>
               </Link>
             </Button>

            {/* Hamburger Menu (Mobile) */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden text-white hover:bg-white/10 hover:text-primary transition-all duration-300 rounded-full w-12 h-12"
                  onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                >
                  <AlignRight className="w-7 h-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0c29] border-l border-white/10 w-full md:w-[450px] p-0 h-full max-h-screen flex flex-col z-[100] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
                
                <div 
                  className="flex-1 overflow-y-auto custom-scrollbar px-8 py-12 relative z-10 min-h-0" 
                  style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
                  onWheel={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col gap-6 mt-8">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {navLinks.map((link, i) => (
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
                                  className="flex-1 text-2xl font-light text-white hover:text-primary transition-colors py-4 group flex items-center gap-4"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span className="text-xs font-mono text-primary/40 group-hover:text-primary transition-colors">0{i + 1}</span>
                                  {link.name}
                                </Link>
                                <AccordionTrigger className="w-14 py-4 justify-end hover:no-underline flex-none text-transparent">
                                  <span className="sr-only">Toggle</span>
                                </AccordionTrigger>
                              </div>
                              <AccordionContent>
                                <div className="flex flex-col gap-3 pl-10 pb-4">
                                  {link.items.map((item, j) => (
                                    <Link 
                                      key={item.name} 
                                      href={item.href}
                                      className="text-white/60 hover:text-white hover:pl-2 transition-all duration-300 py-2 text-base flex items-center gap-3 group/item"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-primary transition-colors" />
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <Link 
                              href={link.href} 
                              className="text-2xl font-light text-white hover:text-primary transition-colors block group py-4 flex items-center gap-4 w-full"
                              onClick={() => {
                                import("@/lib/audio").then(m => m.audio.playHover());
                                setIsOpen(false);
                              }}
                            >
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
                    className="mt-auto pt-12 border-t border-white/10 grid grid-cols-1 gap-8"
                  >
                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-6 flex items-center gap-2">
                          <span className="w-8 h-[1px] bg-primary/50"></span>
                          Kontakt
                        </h4>
                        <div className="space-y-4">
                          <a href="mailto:office@eef.rs" className="text-xl text-white hover:text-primary transition-colors block font-light">office@eef.rs</a>
                          <a href="tel:+381113757287" className="text-xl text-white hover:text-primary transition-colors block font-light">+381 11 375 72 87</a>
                        </div>
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
