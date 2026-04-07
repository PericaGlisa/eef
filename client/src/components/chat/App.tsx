import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import './index.css'; - uklonjeno da ne bi pregazilo glavne stilove sajta
import { 
  Send, 
  Bot, 
  User, 
  ChevronRight, 
  Wrench, 
  ShoppingCart, 
  Info,
  Maximize2,
  Minimize2,
  X,
  MessageSquare,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
  Trash2,
  Mail,
  Check,
  Loader2
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from './lib/utils';
import { getChatResponse } from './services/chatService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('eef_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          role: m.role === 'model' ? 'assistant' : m.role,
          timestamp: new Date(m.timestamp)
        }));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
    return [
      {
        role: 'assistant',
        text: 'Dobar dan! Ja sam AI asistent kompanije Eko Elektrofrigo. Specijalizovan sam za B2B HVAC rešenja i industrijsko hlađenje. Kako Vam mogu pomoći danas?',
        timestamp: new Date()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [lastSentCount, setLastSentCount] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const notificationAudio = useRef<HTMLAudioElement | null>(null);
  const idleMessageTimer = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    notificationAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    notificationAudio.current.volume = 0.4;
  }, []);

  useEffect(() => {
    localStorage.setItem('eef_chat_history', JSON.stringify(messages));
    
    // Clear existing timers
    if (idleMessageTimer.current) clearTimeout(idleMessageTimer.current);
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    
    // Only start timers if there's actual conversation (more than initial greeting)
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      const idleMsgText = "Tu sam ako vam zatreba još neka informacija o našim sistemima!";
      const isLastMessageAuto = lastMessage.text === idleMsgText;

      // 5 minute timer for "Still here" message
      if (!isLastMessageAuto) {
        idleMessageTimer.current = setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            text: idleMsgText,
            timestamp: new Date()
          }]);
          playNotification();
        }, 5 * 60 * 1000); // 5 minutes
      }

      // 30 minute inactivity timer - sends transcript if user forgets to close chat
      inactivityTimer.current = setTimeout(() => {
        if (messages.length >= 3 && messages.length > lastSentCount) {
          sendTranscript(messages);
        }
      }, 30 * 60 * 1000); // 30 minutes
    }

    return () => {
      if (idleMessageTimer.current) clearTimeout(idleMessageTimer.current);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [messages]);

  // Trigger send ONLY when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length >= 3) {
      sendTranscript(messages);
    }
    
    // Blokiraj scroll glavnog sajta kada je chat otvoren na manjim ekranima (gde zauzima ceo ekran)
    // ili dodaj stilove da se spreči prolaženje skrola (overscroll)
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Na desktopu dozvoli scroll pozadine, ali blokiraj ako je miš na chatu
      if (window.innerWidth >= 768) {
        document.body.style.overflow = 'auto';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const playNotification = () => {
    if (notificationAudio.current) {
      notificationAudio.current.play().catch(e => console.log("Audio play blocked", e));
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideText?: string | React.MouseEvent) => {
    const textToSend = typeof overrideText === 'string' ? overrideText : input;
    if (!textToSend.trim() || isLoading) return;

    const modelTimestamp = new Date();
    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, {
      role: 'assistant',
      text: '',
      timestamp: modelTimestamp
    }]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.text
      }));
      
      history.push({
        role: 'user',
        content: textToSend
      });

      const response = await getChatResponse(history, (partialText) => {
        if (partialText.trim().length > 0) {
          setIsLoading(false);
        }
        setMessages(prev => {
          const next = [...prev];
          for (let i = next.length - 1; i >= 0; i--) {
            const message = next[i];
            if (message.role === 'assistant' && message.timestamp.getTime() === modelTimestamp.getTime()) {
              next[i] = {
                ...message,
                text: partialText
              };
              break;
            }
          }
          return next;
        });
      });

      setMessages(prev => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          const message = next[i];
          if (message.role === 'assistant' && message.timestamp.getTime() === modelTimestamp.getTime()) {
            next[i] = {
              ...message,
              text: response || 'Izvinite, došlo je do greške u komunikaciji.'
            };
            break;
          }
        }
        return next;
      });
      playNotification();
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const next = [...prev];
        for (let i = next.length - 1; i >= 0; i--) {
          const message = next[i];
          if (message.role === 'assistant' && message.timestamp.getTime() === modelTimestamp.getTime()) {
            next[i] = {
              ...message,
              text: 'Trenutno nisam u mogućnosti da odgovorim. Molimo pokušajte kasnije ili nas kontaktirajte direktno.'
            };
            break;
          }
        }
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const departments = [
    { name: 'Prodaja', icon: ShoppingCart, color: 'bg-green-600' },
    { name: 'Tehnička Podrška', icon: Cpu, color: 'bg-[#171A54]' },
    { name: 'Servis', icon: Wrench, color: 'bg-primary' },
    { name: 'Opšte Informacije', icon: Info, color: 'bg-indigo-500' },
  ];

  const quickActions = [
    { label: "ULO Komore", icon: Globe, desc: "Ultra-low oxygen" },
    { label: "CO2 Sistemi", icon: ShieldCheck, desc: "Green tech" },
    { label: "Servis i Održavanje", icon: Wrench, desc: "Stručna podrška" },
    { label: "Efikasnost", icon: Zap, desc: "Ušteda energije" },
  ];

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const handleDepartmentClick = (deptName: string) => {
    let prompt = `Reci mi više o sektoru: ${deptName}. Koje su njihove nadležnosti i kako ih mogu kontaktirati?`;
    
    if (deptName === 'Opšte Informacije') {
      prompt = `Reci mi više o sektoru: Opšte Informacije (Administracija i ostalo). Znam da je kontakt email office@eef.rs. Koje su još nadležnosti ovog sektora?`;
    }
    
    handleSend(prompt);
  };

  const clearHistory = () => {
    if (!showClearConfirm) {
      setShowClearConfirm(true);
      return;
    }
    
    const initialMessage: Message = {
      role: 'assistant',
      text: 'Dobar dan! Ja sam AI asistent kompanije Eko Elektrofrigo. Specijalizovan sam za B2B HVAC rešenja i industrijsko hlađenje. Kako Vam mogu pomoći danas?',
      timestamp: new Date()
    };
    setMessages([initialMessage]);
    localStorage.removeItem('eef_chat_history');
    setShowClearConfirm(false);
    setLastSentCount(0);
  };

  const sendTranscript = async (currentMessages: Message[]) => {
    // Only send if there are new messages since the last send
    if (currentMessages.length <= 1 || currentMessages.length <= lastSentCount || isSendingEmail) return;
    
    // Only send if conversation is meaningful (at least 3 messages)
    if (currentMessages.length < 3) return;
    
    setIsSendingEmail(true);
    try {
      await fetch('/api/send-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages })
      });
      setLastSentCount(currentMessages.length);
    } catch (error) {
      console.error("Error sending transcript to admin:", error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[60] pointer-events-none flex items-end justify-end">
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] bg-primary text-white rounded-full shadow-[0_0_50px_rgba(27,43,107,0.4)] flex items-center justify-center z-50 pointer-events-auto mb-4 mr-4 md:mb-0 md:mr-0 border-2 border-primary/35"
        >
          <MessageSquare size={32} />
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[60] pointer-events-none flex items-end justify-end",
      isOpen ? "w-full md:w-auto h-[100dvh] md:h-auto" : "w-auto h-auto"
    )}>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={cn(
          "glass-panel flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-20 pointer-events-auto origin-bottom-right bg-white/95 backdrop-blur-xl",
          isExpanded 
            ? "w-screen h-[100dvh] md:w-[80vw] md:h-[90vh] md:rounded-[30px]" 
            : "w-screen h-[100dvh] sm:w-[450px] sm:h-[650px] sm:max-h-[90vh] sm:rounded-[30px] sm:mb-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-none sm:border border-slate-200/50"
        )}
      >
          <>
            {/* Header - Premium Glassmorphism */}
            <div className="relative bg-gradient-to-br from-[#171A54] via-[#171A54] to-primary p-5 md:p-8 text-white flex items-center justify-between shrink-0 overflow-visible border-b border-white/10 bg-flow z-30">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-green-600/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
            <div className="absolute -bottom-32 -right-32 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-[#171A54]/30 rounded-full blur-[80px] md:blur-[100px] animate-pulse [animation-delay:3s]" />
          </div>
          
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl overflow-hidden border border-white/30 p-1.5 md:p-2 animate-float"
            >
              <img 
                src="/assets/logo.png" 
                alt="Eko Elektrofrigo Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div>
              <h1 className="font-display font-bold text-lg md:text-2xl tracking-tighter leading-none mb-1">EEF Asistent</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                  </span>
                  <span className="text-[9px] text-green-400 font-bold uppercase tracking-[0.1em]">Aktivan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5 relative z-50">
            <AnimatePresence>
              {messages.length > 1 && (
                <div className="flex items-center gap-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    className="relative flex items-center"
                  >
                    <AnimatePresence>
                      {showClearConfirm && (
                        <motion.div
                          initial={{ opacity: 0, x: 10, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 10, scale: 0.9 }}
                          className="absolute right-0 top-[120%] bg-white text-slate-900 px-4 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-slate-200 flex flex-col items-center z-[999] min-w-[200px]"
                        >
                          <span className="text-xs font-bold text-center">Obrisati istoriju ćaskanja?</span>
                          <div className="flex gap-2 w-full justify-center mt-2">
                            <button 
                              onClick={clearHistory}
                              className="text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Da
                            </button>
                            <button 
                              onClick={() => setShowClearConfirm(false)}
                              className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-6 py-2 rounded-lg hover:bg-slate-200 transition-colors"
                            >
                              Ne
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={clearHistory}
                      title="Obriši istoriju ćaskanja"
                      className={cn(
                        "w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border rounded-xl md:rounded-2xl transition-all duration-500 backdrop-blur-2xl group",
                        showClearConfirm 
                          ? "bg-red-500 border-red-400 shadow-lg shadow-red-500/20" 
                          : "bg-white/5 hover:bg-red-500/10 border-white/10"
                      )}
                    >
                      <Trash2 size={18} className={cn(
                        "md:size-[22px] transition-transform opacity-70 group-hover:opacity-100",
                        showClearConfirm ? "text-white scale-110" : "text-red-400/70 group-hover:text-red-400 group-hover:scale-110"
                      )} />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl transition-all duration-500 backdrop-blur-2xl group"
            >
              {isExpanded ? <Minimize2 size={18} className="md:size-[22px] group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" /> : <Maximize2 size={18} className="md:size-[22px] group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 rounded-xl md:rounded-2xl transition-all duration-500 backdrop-blur-2xl group"
            >
              <X size={18} className="md:size-[22px] group-hover:rotate-90 transition-transform opacity-70 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        {/* Departments & Quick Actions */}
        <div className="px-5 md:px-8 py-2 md:py-3 bg-white/40 border-b border-slate-200/30 backdrop-blur-xl shrink-0 overflow-hidden w-full z-20">
          <div className="flex flex-col gap-2 md:gap-3 w-full">
            <div className="flex gap-3 overflow-x-auto pb-2.5 w-full snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-slate-300/70 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400" style={{ scrollBehavior: 'smooth' }}>
              {departments.map((dept) => (
                <motion.div 
                  whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,1)', borderColor: 'rgba(27,43,107,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  key={dept.name}
                  onClick={() => handleDepartmentClick(dept.name)}
                  className="flex items-center gap-2.5 px-4 py-2 bg-white/70 border border-slate-200/50 rounded-xl shadow-sm transition-all cursor-pointer shrink-0 snap-start hover:shadow-md group"
                >
                  <div className={cn("w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125 shrink-0", dept.color)} />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-primary transition-colors whitespace-nowrap">
                    {dept.name}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2.5 w-full snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-slate-300/70 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400" style={{ scrollBehavior: 'smooth' }}>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col gap-0.5 px-3 py-2 bg-slate-100/60 hover:bg-primary hover:text-white border border-slate-200/40 rounded-xl transition-all shrink-0 text-left group min-w-[130px] snap-start"
                >
                  <div className="flex items-center justify-between w-full mb-0.5">
                    <action.icon size={14} className="text-primary group-hover:text-white transition-colors" />
                    <ChevronRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-tight text-slate-700 group-hover:text-white">{action.label}</span>
                  <span className="text-[7px] font-medium text-slate-400 group-hover:text-white/60 uppercase tracking-widest leading-tight">{action.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area - Premium Spacing & Typography */}
        <div 
          ref={scrollRef}
          onWheel={(e) => {
            // Spreči scroll događaj da "prođe" do body elementa
            e.stopPropagation();
          }}
          className="flex-1 overflow-y-auto overscroll-contain p-5 md:p-8 space-y-6 md:space-y-8 bg-white scroll-smooth relative [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              msg.role === 'assistant' && !msg.text.trim()
                ? null
                : (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className={cn(
                  "flex gap-3 md:gap-4 w-full",
                  msg.role === 'user' ? "flex-row-reverse text-right" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-all",
                  msg.role === 'user' 
                    ? "bg-primary text-white" 
                    : "bg-white border border-slate-100 text-primary"
                )}>
                  {msg.role === 'user' ? <User size={16} className="md:size-[20px]" /> : <Bot size={16} className="md:size-[20px]" />}
                </div>
                
                <div className={cn(
                  "flex flex-col gap-1.5 max-w-[85%] md:max-w-[80%]",
                  msg.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "p-4 md:p-6 rounded-2xl md:rounded-[28px] text-[13px] md:text-[15px] shadow-sm relative group transition-all",
                    msg.role === 'user' 
                      ? "bg-gradient-to-br from-primary to-[#171A54] text-white rounded-tr-none shadow-md shadow-primary/10" 
                      : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                  )}>
                    <div className={cn(
                      "markdown-body leading-relaxed",
                      msg.role === 'user' ? "user" : ""
                    )}>
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                    
                    <div className={cn(
                      "text-[8px] md:text-[9px] mt-3 opacity-30 font-bold uppercase tracking-widest",
                      msg.role === 'user' ? "text-right" : "text-left"
                    )}>
                      {msg.timestamp.toLocaleTimeString('sr-RS', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false,
                        timeZone: 'Europe/Belgrade'
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
                )
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 md:gap-4"
            >
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={16} className="md:size-[20px] text-primary animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 p-4 md:p-5 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
                <span className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area - Sleek & Functional */}
        <div className="p-5 md:p-8 bg-white border-t border-slate-100 shrink-0 relative flex flex-col gap-2">
          <div className="relative flex items-center group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Postavite pitanje..."
              className="w-full bg-slate-50 border border-slate-200/40 rounded-xl md:rounded-2xl py-3 md:py-5 pl-5 md:pl-8 pr-14 md:pr-20 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600/30 focus:bg-white transition-all text-slate-800 dark:text-slate-800 text-[13px] md:text-[15px] placeholder:text-slate-400 font-medium shadow-inner"
              disabled={isLoading}
            />
            <motion.button
              id="send-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-1.5 md:right-2.5 p-2.5 md:p-4 bg-primary text-white rounded-lg md:rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-20 transition-all"
            >
              <Send size={16} className="md:size-[20px]" />
            </motion.button>
          </div>
          
          <div className="flex flex-col items-center justify-center mt-3 px-2 gap-1.5">
              <div className="text-center px-4">
                <span className="text-[9px] text-slate-400 font-medium leading-tight block">
                  Započinjanjem razgovora prihvatate da se sadržaj komunikacije može sačuvati u svrhu stručnog savetovanja i unapređenja usluge, u skladu sa našom <a href="/privacy" className="underline hover:text-primary transition-colors">Politikom privatnosti</a>.
                </span>
              </div>
              <div className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-1">
                Eko Elektrofrigo AI Asistent
              </div>
            </div>
        </div>
        </>
      </motion.div>
    </div>
  );
}
