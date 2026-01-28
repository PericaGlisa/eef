import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, Factory, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const personas = [
  {
    id: "investor",
    icon: User,
    label: "Investitor",
    targetAudience: "Investitore",
    desc: "Želim maksimalan povrat investicije i minimalan rizik.",
    content: {
      highlight: "ROI Fokus",
      stats: ["3-5 godina povrat", "Sigurnost kapitala", "Subvencije EU"],
      cta: "Preuzmite investicionu studiju"
    }
  },
  {
    id: "factory",
    icon: Factory,
    label: "Vlasnik Fabrike",
    targetAudience: "Vlasnike Fabrika",
    desc: "Treba mi pouzdan sistem koji smanjuje troškove proizvodnje.",
    content: {
      highlight: "Operativna Efikasnost",
      stats: ["Smanjenje računa do 60%", "24/7 Monitoring", "Bez zastoja u radu"],
      cta: "Zakažite izlazak inženjera"
    }
  },
  {
    id: "public",
    icon: Building2,
    label: "Javni Sektor",
    targetAudience: "Javni Sektor",
    desc: "Tražim rešenja za javne objekte i usklađenost sa regulativama.",
    content: {
      highlight: "Regulativa & Standardi",
      stats: ["ESCo Modeli", "Javno-privatno partnerstvo", "ISO Sertifikati"],
      cta: "Pogledajte reference javnog sektora"
    }
  }
];

export function Concierge() {
  const [activePersona, setActivePersona] = useState(personas[0]);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Personalizovani Pristup
          </h2>
          <p className="text-white/60 text-lg">
            Sajt se prilagođava vama. Odaberite vašu ulogu:
          </p>
        </div>

        {/* Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
          {personas.map((persona) => {
            const Icon = persona.icon;
            const isActive = activePersona.id === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersona(persona)}
                className={`p-6 text-left border transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? "bg-primary/10 border-primary" 
                    : "bg-white/5 border-white/10 hover:border-white/30"
                }`}
              >
                <div className={`mb-4 transition-colors ${isActive ? "text-primary" : "text-white/50 group-hover:text-white"}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isActive ? "text-white" : "text-white/80"}`}>
                  {persona.label}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {persona.desc}
                </p>
                {isActive && (
                  <motion.div 
                    layoutId="active-border" 
                    className="absolute inset-0 border-2 border-primary pointer-events-none" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content Area */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#171A54] border border-white/10 p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
            >
              {/* Decorative BG */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex-1 space-y-6">
                <div className="text-primary font-mono uppercase tracking-widest text-sm">
                  {activePersona.content.highlight}
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                  Rešenja skrojena za <br />
                  <span className="text-white/50">{activePersona.targetAudience}</span>
                </h3>
                <ul className="space-y-4 pt-4">
                  {activePersona.content.stats.map((stat, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-shrink-0">
                <Button size="lg" className="bg-white text-[#171A54] hover:bg-white/90 font-bold h-14 px-8 text-lg">
                  {activePersona.content.cta} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
