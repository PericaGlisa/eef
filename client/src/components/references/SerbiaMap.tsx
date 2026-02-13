import { useState, useRef, useEffect } from 'react';
import { MapPaths } from './SerbiaMapPaths';
import { motion, AnimatePresence } from 'framer-motion';
import { locations, Location } from './locations';
import { ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';
import { LogoSnowflake } from '../ui/LogoSnowflake';
import { Link } from 'wouter';

export interface SerbiaMapProps {
  activeLocation?: Location | null;
  onSelect?: (location: Location | null) => void;
}

export function SerbiaMap({ activeLocation: externalActive, onSelect }: SerbiaMapProps = {}) {
  const [internalActive, setInternalActive] = useState<Location | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  
  const activeLocation = externalActive !== undefined ? externalActive : internalActive;

  // Sort locations so the hovered or active one is last (highest z-index in SVG)
  const sortedLocations = [...locations].sort((a, b) => {
    if (a.id === hoveredLocationId || a.id === activeLocation?.id) return 1;
    if (b.id === hoveredLocationId || b.id === activeLocation?.id) return -1;
    return 0;
  });

  const setActiveLocation = (loc: Location | null) => {
    setInternalActive(loc);
    onSelect?.(loc);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 4));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      const newScale = Math.min(Math.max(1, scale + delta), 4);
      setScale(newScale);
    }
  };

  useEffect(() => {
    if (!activeLocation || !mapRef.current || !containerRef.current) return;
    const mapRect = mapRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = mapRect.left - containerRect.left + (activeLocation.x / 100) * mapRect.width;
    const y = mapRect.top - containerRect.top + (activeLocation.y / 100) * mapRect.height;
    setPopupPos({ x, y });
  }, [activeLocation, scale, position]);

  const getPopupStyle = () => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) {
      return { left: popupPos.x, top: popupPos.y };
    }
    const popupWidth = 300;
    const popupHeight = 350;
    const padding = 16;
    const isRight = popupPos.x > containerRect.width / 2;
    const isBottom = popupPos.y > containerRect.height / 2;
    let left = popupPos.x + (isRight ? -popupWidth - 20 : 20);
    let top = popupPos.y + (isBottom ? -popupHeight - 20 : 20);
    const maxLeft = Math.max(padding, containerRect.width - popupWidth - padding);
    const maxTop = Math.max(padding, containerRect.height - popupHeight - padding);
    left = Math.min(Math.max(left, padding), maxLeft);
    top = Math.min(Math.max(top, padding), maxTop);
    return { left, top };
  };

  return (
    <div 
      className="relative w-full h-full bg-[#0e1035] flex items-center justify-center overflow-hidden touch-none"
      ref={containerRef}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-40">
        <button onClick={handleZoomIn} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors" title="Zoom In">
          <ZoomIn className="w-5 h-5" />
        </button>
        <button onClick={handleZoomOut} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors" title="Zoom Out">
          <ZoomOut className="w-5 h-5" />
        </button>
        <button onClick={handleReset} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors" title="Reset View">
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        animate={{ scale: scale, x: position.x, y: position.y }}
        onPan={(e, info) => {
          setPosition({ x: position.x + info.delta.x, y: position.y + info.delta.y });
        }}
        ref={mapRef}
        className="relative aspect-[727/1042] h-full max-w-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <svg
          viewBox="0 0 727 1042"
          className="w-full h-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(103.0 840.0) scale(0.08492 -0.08492)" className="pointer-events-auto">
            <MapPaths />
          </g>
          {sortedLocations.map((loc) => (
            <foreignObject
              key={loc.id}
              x={(loc.x / 100) * 727 - 32}
              y={(loc.y / 100) * 1042 - 32 - 40}
              width={64}
              height={64}
              className="overflow-visible pointer-events-auto"
            >
              <div
                className="cursor-pointer group flex items-center justify-center w-full h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isDragging) setActiveLocation(loc);
                }}
                onMouseEnter={() => setHoveredLocationId(loc.id)}
                onMouseLeave={() => setHoveredLocationId(null)}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className={`relative flex items-center justify-center transition-all duration-300 z-10 ${activeLocation?.id === loc.id ? 'scale-150' : 'group-hover:scale-125'}`}>
                  <div className={`absolute inset-0 bg-primary/60 blur-md rounded-full ${activeLocation?.id === loc.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`} />
                  <LogoSnowflake 
                    className={`
                      drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] 
                      ${loc.isPremium ? 'w-8 h-8 md:w-10 md:h-10 text-yellow-500' : 'w-6 h-6 md:w-7 md:h-7 text-primary'}
                      ${activeLocation?.id === loc.id ? 'text-white' : ''}
                    `}
                  />
                </div>
                <div className={`absolute top-full mt-3 px-3 py-1.5 bg-background/90 rounded-md text-xs font-mono uppercase tracking-wider text-white whitespace-nowrap border border-white/10 transition-all duration-300 z-20 pointer-events-none ${activeLocation?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  {loc.city}
                </div>
              </div>
            </foreignObject>
          ))}
        </svg>
      </motion.div>

      <AnimatePresence>
        {activeLocation && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="hidden md:block absolute z-50 w-80 max-w-[300px] flex flex-col"
              style={getPopupStyle()}
            >
              <PopupContent 
                location={activeLocation} 
                onClose={() => setActiveLocation(null)} 
                className="max-h-[350px]"
              />
            </motion.div>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden absolute bottom-0 left-0 right-0 z-50 p-4 max-h-[60vh] flex flex-col overflow-hidden"
            >
              <div className="flex flex-col h-full max-h-full min-h-0">
                <PopupContent 
                  location={activeLocation} 
                  onClose={() => setActiveLocation(null)} 
                  className="h-full"
                />
              </div>
            </motion.div>
            <div className="absolute inset-0 z-40" onClick={() => setActiveLocation(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PopupContent({ location, onClose, className = "" }: { location: Location; onClose: () => void; className?: string }) {
  return (
    <div className={`bg-[#0e1035]/95 backdrop-blur-xl border ${location.isPremium ? 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'border-white/10'} p-4 rounded-xl shadow-2xl flex flex-col min-h-0 overflow-hidden ${className}`}>
      <div className="flex justify-between items-start mb-3 shrink-0">
        <div className="flex items-center gap-2">
          {location.isPremium && (
            <LogoSnowflake className="w-5 h-5 text-yellow-500" />
          )}
          <h3 className={`font-bold text-lg ${location.isPremium ? 'text-yellow-50' : 'text-white'}`}>{location.city}</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white/50 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          ✕
        </button>
      </div>
      <div
        className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 min-h-0"
        style={{ touchAction: 'pan-y', overscrollBehavior: 'contain' }}
        onWheel={(e) => e.stopPropagation()} 
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()} 
      >
        {location.projects.map((project, idx) => {
          const Content = () => (
            <>
              <div className="flex justify-between items-start gap-2">
                <div className="font-medium text-primary mb-1">{project.title}</div>
                {project.link && <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />}
              </div>
              <p className="text-white/70 mb-2 leading-relaxed">{project.desc}</p>
              {project.client && (
                <div className="text-white/30 text-xs uppercase tracking-wider font-mono border-t border-white/5 pt-2 mt-2">{project.client}</div>
              )}
            </>
          );

          if (project.link) {
            return (
              <Link key={idx} href={project.link}>
                <a className="block bg-white/5 rounded-lg p-3 text-sm border border-white/5 hover:bg-white/10 transition-colors group">
                  <Content />
                </a>
              </Link>
            );
          }

          return (
            <div key={idx} className="bg-white/5 rounded-lg p-3 text-sm border border-white/5 hover:bg-white/10 transition-colors">
              <Content />
            </div>
          );
        })}
      </div>
    </div>
  );
}
