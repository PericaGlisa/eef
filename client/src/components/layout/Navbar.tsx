import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, Phone, Mail, 
  Snowflake, Wind, Box, Server, Droplets, Zap, Thermometer,
  PenTool, Wrench, Briefcase,
  BookOpen, ShieldCheck, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      name: "Eko Rashlada",
      href: "/eco-cooling",
      items: [
        { name: "Rashladne komore", href: "/eco-cooling", icon: Snowflake, desc: "Plusne i minusne komore" },
        { name: "Tuneli za smrzavanje", href: "/eco-cooling", icon: Wind, desc: "Brzo smrzavanje" },
        { name: "ULO Komore", href: "/eco-cooling", icon: Box, desc: "Kontrolisana atmosfera" },
        { name: "Rashladni agregati", href: "/eco-cooling", icon: Server, desc: "Ekološki freoni i CO2" },
        { name: "Čileri", href: "/eco-cooling", icon: Droplets, desc: "Indirektno hlađenje" },
        { name: "Elektro ormani & CNSU", href: "/eco-cooling", icon: Zap, desc: "Nadzor i upravljanje" },
        { name: "Termoizolacija", href: "/eco-cooling", icon: Thermometer, desc: "Paneli i vrata" }
      ]
    },
    {
      name: "Usluge",
      href: "/services",
      items: [
        { name: "Projektovanje", href: "/services", icon: PenTool, desc: "Idejna rešenja" },
        { name: "Izvođenje", href: "/services", icon: Wrench, desc: "Montaža opreme" },
        { name: "Servis", href: "/services", icon: Briefcase, desc: "Održavanje 24/7" }
      ]
    },
    { name: "Kompanija", href: "/about" },
    { name: "Reference", href: "/references" },
    {
      name: "Dokumentacija",
      href: "/documentation",
      items: [
        { name: "Uputstva", href: "/documentation", icon: BookOpen, desc: "Korisnička uputstva" },
        { name: "Atesti i sertifikati", href: "/documentation", icon: ShieldCheck, desc: "Dokumentacija kvaliteta" }
      ]
    },
  ];

  return (
    <>
      {/* Top Strip */}
      <div className="bg-[#0e1035] text-white/70 text-xs py-2 px-6 font-mono border-b border-white/5 flex flex-col sm:flex-row justify-between items-center z-50 relative gap-2 sm:gap-0">
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
          <a href="tel:+381113757287" className="flex items-center gap-2 hover:text-primary transition-colors whitespace-nowrap"><Phone className="w-3 h-3 text-primary" /> +381 11 375 72 87</a>
          <a href="mailto:office@eef.rs" className="flex items-center gap-2 hover:text-primary transition-colors whitespace-nowrap"><Mail className="w-3 h-3 text-primary" /> office@eef.rs</a>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#56AA4A]" />
          <span className="text-primary tracking-wider">Servisni timovi: Aktivni (24/7)</span>
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
              className="h-10 md:h-12 lg:h-14 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" 
            />
          </Link>

          {/* Desktop Navigation (Mega Menu) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              link.items ? (
                <NavigationMenu key={link.name} className="flex-none">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent text-white hover:text-primary hover:bg-white/5 data-[state=open]:bg-white/5 uppercase tracking-wider font-medium text-[11px] h-9 px-3">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className={cn(
                          "p-3 bg-[#0e1035] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl",
                          link.name === "Eko Rashlada" ? "w-[500px]" : "w-[320px]"
                        )}>
                           <ul className={cn(
                            "grid gap-2",
                            link.name === "Eko Rashlada" ? "grid-cols-2" : "grid-cols-1"
                          )}>
                            {link.items.map((item) => (
                              <li key={item.name} className={link.name === "Eko Rashlada" && item.name === "Termoizolacija" ? "col-span-2" : ""}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={item.href}
                                    className="flex items-start gap-3 select-none rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-white/5 group"
                                  >
                                    <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-md bg-white/5 group-hover:bg-primary/20 transition-colors">
                                      <item.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <div className="text-sm font-medium leading-none text-white group-hover:text-primary transition-colors">
                                        {item.name}
                                      </div>
                                      <p className="line-clamp-2 text-[10px] leading-snug text-white/50 group-hover:text-white/70">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:text-primary hover:bg-white/5 uppercase tracking-wider font-medium text-[11px] h-9 px-3")}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Action Button & Mobile Menu */}
          <div className="flex items-center gap-4">
             <Button 
                variant="outline"
                size="sm"
                className="hidden lg:flex border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(86,170,74,0.3)] hover:shadow-[0_0_25px_rgba(86,170,74,0.6)] text-xs h-9 px-4"
                onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
             >
               Zatražite ponudu
             </Button>

            {/* Hamburger Menu (Mobile) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden text-white hover:bg-white/10 hover:text-primary transition-colors"
                  onClick={() => import("@/lib/audio").then(m => m.audio.playClick())}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#171A54]/95 backdrop-blur-xl border-l border-white/10 w-full md:w-[600px] p-0 overflow-y-auto">
                <div className="h-full flex flex-col px-6 py-8">
                  <div className="flex flex-col gap-2">
                    <Accordion type="single" collapsible className="w-full">
                      {navLinks.map((link, i) => (
                        <div key={link.name} className="border-b border-white/5 pb-1">
                          {link.items ? (
                            <AccordionItem value={link.name} className="border-none">
                              <AccordionTrigger className="text-xl font-light text-white hover:text-primary transition-colors hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-mono text-primary/50">0{i + 1}</span>
                                  {link.name}
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col gap-2 pl-8 pb-2">
                                  {link.items.map((item) => (
                                    <Link 
                                      key={item.name} 
                                      href={item.href}
                                      className="text-white/60 hover:text-primary transition-colors py-2 text-sm flex items-center gap-3 group"
                                    >
                                      <item.icon className="w-4 h-4 text-primary/50 group-hover:text-primary" />
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <Link 
                              href={link.href} 
                              className="text-xl font-light text-white hover:text-primary transition-colors block group py-3 flex items-center gap-3 w-full"
                              onClick={() => import("@/lib/audio").then(m => m.audio.playHover())}
                            >
                              <span className="text-xs font-mono text-primary/50">0{i + 1}</span>
                              {link.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </Accordion>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 gap-6">
                     <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Kontakt</h4>
                        <a href="mailto:office@eef.rs" className="text-white/80 hover:text-primary transition-colors block mb-1 text-sm">office@eef.rs</a>
                        <a href="tel:+381113757287" className="text-white/80 hover:text-primary transition-colors block text-sm">+381 11 375 72 87</a>
                     </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
