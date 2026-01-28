import { useState, useEffect } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Zap, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

const data = [
  { time: "00:00", value: 450 },
  { time: "04:00", value: 380 },
  { time: "08:00", value: 890 },
  { time: "12:00", value: 1200 },
  { time: "16:00", value: 1100 },
  { time: "20:00", value: 650 },
  { time: "24:00", value: 480 },
];

function StatCard({ label, value, icon: Icon, subtext, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white/5 border border-white/10 p-6 backdrop-blur-md relative group overflow-hidden hover:bg-white/10 transition-colors duration-500 rounded-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all duration-500 group-hover:scale-110">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2 relative z-10">{label}</div>
      <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors relative z-10">
        {value}
      </div>
      <div className="text-white/30 text-xs relative z-10">{subtext}</div>
    </motion.div>
  );
}

export function ImpactDashboard() {
  const [co2Saved, setCo2Saved] = useState(15420);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Saved(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Monitoring Uticaja <span className="text-primary">Uživo</span>
            </h2>
            <p className="text-white/60 max-w-xl">
              Pratimo performanse naših sistema u realnom vremenu. Vaša efikasnost je naša misija.
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-mono text-sm animate-pulse">
            <span className="w-2 h-2 bg-primary rounded-full" />
            VEZA SA PODACIMA UŽIVO
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Ukupno Finansiranih Projekata"
            value="342"
            subtext="U poslednjih 5 godina"
            icon={TrendingUp}
            delay={0.1}
          />
          <StatCard 
            label="Redukcija CO2 Emisije"
            value={`${co2Saved.toLocaleString()} t`}
            subtext="Ekvivalent 500,000 stabala"
            icon={Globe}
            delay={0.2}
          />
          <StatCard 
            label="Aktivnih Sistema"
            value="128"
            subtext="Hlađenje u realnom vremenu"
            icon={Zap}
            delay={0.3}
          />
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#0e1035] border border-white/10 p-6 md:p-8 relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-heading text-white">Energetska Efikasnost (Prosek Mreže)</h3>
              <div className="flex gap-4 text-xs font-mono text-white/40">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary rounded-full"></span> Ušteda</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white/20 rounded-full"></span> Potrošnja</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#56AA4A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#56AA4A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#ffffff30" tick={{fill: '#ffffff60', fontSize: 12}} />
                  <YAxis stroke="#ffffff30" tick={{fill: '#ffffff60', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171A54', border: '1px solid #ffffff20' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" name="Potrošnja" stroke="#56AA4A" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <div className="bg-[#0e1035] border border-white/10 p-6 relative overflow-hidden flex flex-col items-center justify-center">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #56AA4A 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Abstract stylized map representation */}
                <div className="relative w-48 h-48 border-2 border-primary/30 rounded-full animate-[spin_10s_linear_infinite]">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#56AA4A]"></div>
                </div>
                <div className="absolute text-center">
                  <div className="text-4xl font-bold text-white mb-2">12</div>
                  <div className="text-xs text-white/50 uppercase tracking-widest">Gradova</div>
                </div>
             </div>
             <div className="absolute bottom-6 left-6 right-6 text-center">
               <p className="text-sm text-white/70">Aktivni projekti širom Balkana</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
