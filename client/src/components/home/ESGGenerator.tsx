import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, CheckCircle, Loader2 } from "lucide-react";
import { audio } from "@/lib/audio";

export function ESGGenerator() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = () => {
    audio.playClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      audio.playSuccess();
    }, 2000);
  };

  const handleDownload = () => {
    audio.playClick();
    // Simulate download
    alert("Preuzimanje ESG Izveštaja (Mock PDF)...");
  };

  return (
    <section className="py-24 bg-[#0e1035] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-12 overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-64 h-64 text-primary" />
            </div>

            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">
                    ESG Generator Izveštaja
                </h2>
                <p className="text-white/60 mb-8 max-w-xl">
                    Generišite preliminarni ESG izveštaj za vašu kompaniju na osnovu unetih parametara potrošnje. 
                    Usklađeno sa EU direktivama.
                </p>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6 max-w-md"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-white">Naziv Kompanije</Label>
                                <Input id="company" placeholder="npr. Moja Fabrika d.o.o." className="bg-white/10 border-white/20 text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="consumption" className="text-white">Godišnja Potrošnja (MWh)</Label>
                                <Input id="consumption" type="number" placeholder="1200" className="bg-white/10 border-white/20 text-white" />
                            </div>
                            <Button 
                                onClick={handleGenerate} 
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {loading ? "Generisanje..." : "Generiši Izveštaj"}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-8 text-center"
                        >
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Izveštaj Spreman!</h3>
                            <p className="text-white/60 mb-8">
                                Vaš preliminarni ESG izveštaj je spreman za preuzimanje.
                            </p>
                            <div className="flex gap-4">
                                <Button onClick={handleDownload} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                                    Preuzmi PDF
                                </Button>
                                <Button onClick={() => setStep(1)} variant="ghost" className="text-white/60">
                                    Novi Proračun
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </section>
  );
}
