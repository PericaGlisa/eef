import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, Users, ArrowRight } from 'lucide-react';
import { SerbiaMap } from './SerbiaMap';
import { locations, Location } from './locations';

export function InteractiveMapDashboard() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = useMemo(() => {
    return locations.filter(loc => 
      loc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.projects.some(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.client && p.client.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm]);

  const stats = useMemo(() => {
    const totalProjects = locations.reduce((acc, loc) => acc + loc.projects.length, 0);
    const totalCities = locations.length;
    // Count unique clients
    const clients = new Set<string>();
    locations.forEach(loc => {
      loc.projects.forEach(p => {
        if (p.client) clients.add(p.client);
      });
    });
    return { totalProjects, totalCities, totalClients: clients.size };
  }, []);

  return (
    <div className="bg-[#0e1035] rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[800px] lg:max-h-[85vh] overflow-hidden relative isolate">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-background/50 backdrop-blur-xl border-r border-white/10 flex flex-col h-[500px] lg:h-full min-h-0 shrink-0 z-20 relative overflow-hidden">
        {/* Header & Stats */}
        <div className="p-6 border-b border-white/10 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Istražite Projekte</h3>
            <p className="text-white/50 text-sm">
              Pretražite našu bazu referenci po gradovima, klijentima ili vrsti projekta.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-primary font-bold text-xl">{stats.totalProjects}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Projekata</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-primary font-bold text-xl">{stats.totalCities}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Gradova</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-primary font-bold text-xl">{stats.totalClients}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">Klijenata</div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Pretraži..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {/* Scrollable List */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2 min-h-0 overscroll-contain"
          style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
          onWheel={(e) => e.stopPropagation()}
        >
          {filteredLocations.length === 0 ? (
            <div className="text-center text-white/30 py-8">
              Nema rezultata pretrage
            </div>
          ) : (
            filteredLocations.map(loc => (
              <motion.button
                key={loc.id}
                layoutId={`loc-${loc.id}`}
                onClick={() => setActiveLocation(loc)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                  activeLocation?.id === loc.id 
                    ? 'bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(86,170,74,0.1)]' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${activeLocation?.id === loc.id ? 'text-primary' : 'text-white/40'}`} />
                    <span className={`font-bold ${activeLocation?.id === loc.id ? 'text-white' : 'text-white/80'}`}>
                      {loc.city}
                    </span>
                  </div>
                  {activeLocation?.id === loc.id && (
                    <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </div>
                
                <div className="space-y-1 pl-6">
                  {loc.projects.slice(0, 2).map((proj, i) => (
                    <div key={i} className="text-xs text-white/50 truncate">
                      • {proj.title}
                    </div>
                  ))}
                  {loc.projects.length > 2 && (
                    <div className="text-xs text-primary/70">
                      + još {loc.projects.length - 2} projekta
                    </div>
                  )}
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full h-[500px] lg:h-auto lg:flex-1 relative bg-[#050614]">
        <div className="absolute inset-0">
          <SerbiaMap 
            activeLocation={activeLocation} 
            onSelect={setActiveLocation} 
          />
        </div>
        
        {/* Overlay Instruction */}
        {!activeLocation && (
          <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-md text-white/70 text-sm p-4 rounded-lg border border-white/10 inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <p>Kliknite na grad na mapi ili izaberite iz liste za detalje.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
