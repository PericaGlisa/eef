import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, TrendingUp } from "lucide-react";

export function ROICalculator() {
  const [bill, setBill] = useState([2000]); // Monthly bill in EUR
  
  // Simple calculation logic for mockup
  // Assuming 40% savings on average
  const monthlySavings = bill[0] * 0.4;
  const yearlySavings = monthlySavings * 12;
  const tenYearROI = yearlySavings * 10;
  
  // Investment cost estimation (dummy logic: 3 years payback)
  const investmentCost = yearlySavings * 3.5;
  const profit = tenYearROI - investmentCost;

  return (
    <section className="py-24 bg-[#0e1035] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Input */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 text-primary mb-4">
                <Calculator className="w-6 h-6" />
                <span className="font-mono text-sm uppercase tracking-widest">AI Energy Profit Calc</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                Pretvorite trošak u <br /><span className="text-primary">Kapital.</span>
              </h2>
              <p className="text-white/60 text-lg">
                Unesite vaš prosečan mesečni račun za struju i saznajte koliko novca gubite neefikasnim sistemima.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
              <label className="text-white/80 font-medium mb-4 block">Mesečni račun za struju (€)</label>
              <div className="flex items-end gap-4 mb-6">
                <div className="text-5xl font-heading font-bold text-white">€{bill[0].toLocaleString()}</div>
              </div>
              
              <Slider 
                value={bill} 
                onValueChange={setBill} 
                max={50000} 
                min={500} 
                step={100} 
                className="py-4 cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/30 font-mono mt-2">
                <span>€500</span>
                <span>€50,000+</span>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-white font-bold w-full md:w-auto h-14 text-lg">
              Detaljna Analiza <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right: Visualization */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-20" />
            
            <div className="bg-[#171A54] border border-white/10 p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <TrendingUp className="w-12 h-12 text-primary/20" />
              </div>

              <div className="space-y-12">
                {/* Metric 1 */}
                <motion.div 
                  key={bill[0] + "savings"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-2"
                >
                  <div className="text-white/50 text-sm uppercase tracking-widest">Godišnja Ušteda</div>
                  <div className="text-4xl font-heading font-bold text-white">
                    €{yearlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="h-1 w-full bg-white/10 mt-4 overflow-hidden rounded-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </motion.div>

                {/* Metric 2 */}
                <motion.div 
                  key={bill[0] + "profit"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-white/50 text-sm uppercase tracking-widest">Potencijalni Profit (10 god)</div>
                  <div className="text-5xl md:text-6xl font-heading font-bold text-primary text-glow">
                    €{profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-white/40 text-sm mt-2">
                    *Projekcija uključuje povrat investicije i operativne uštede.
                  </p>
                </motion.div>
              </div>

              {/* 3D Visual Decor */}
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/30 rounded-br-3xl opacity-50" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
