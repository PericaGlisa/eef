import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Proizvodi", href: "/#products" },
    { name: "Usluge", href: "/#services" },
    { name: "Kompanija", href: "/about" },
    { name: "Web Shop", href: "/shop" },
  ];

  return (
    <>
      {/* Top Strip */}
      <div className="bg-[#0e1035] text-white/70 text-xs py-2 px-6 font-mono border-b border-white/5 flex justify-between items-center z-50 relative">
        <div className="flex gap-4">
          <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-primary" /> +381 11 123 4567</span>
          <span className="flex items-center gap-2"><Mail className="w-3 h-3 text-primary" /> office@eef.rs</span>
        </div>
        <div className="hidden md:flex gap-4">
          <span className="flex items-center gap-2 text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
            Servisni timovi: Aktivni (24/7)
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 border-b border-white/5 ${
          scrolled ? "bg-background/80 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/Logo-20260122_112545_1769410803059.png" 
              alt="EEF Logo" 
              className="h-10 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link href={link.href} className="text-sm font-medium text-white hover:text-primary transition-colors flex items-center gap-1">
                  {link.name}
                  {link.name === "Proizvodi" && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.name === hoveredLink && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-bold"
            >
              Zatražite Ponudu
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-white/10 w-full sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-12">
                {navLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="text-3xl font-heading font-light text-white hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                ))}
                <Button className="w-full bg-primary text-white mt-8">
                  Zatražite Ponudu
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
