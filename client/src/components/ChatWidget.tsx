import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageSquare, Phone, Mail, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
        >
            <Button 
                className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(86,170,74,0.4)] flex items-center justify-center relative group"
                onClick={() => setIsOpen(true)}
            >
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div className="absolute right-full mr-4 bg-white text-[#171A54] px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                Podrška
            </div>
            </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-[425px] rounded-xl bg-white border-[#171A54]/10 p-0 overflow-hidden">
        <DialogHeader className="bg-[#171A54] p-6 text-white relative">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageSquare className="w-6 h-6 text-primary" />
            Kako možemo pomoći?
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Izaberite način komunikacije koji Vam najviše odgovara.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 grid gap-4">
            {/* Phone Option */}
            <a href="tel:+381113757287" className="group flex items-start gap-4 p-4 rounded-xl border border-[#171A54]/10 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-[#171A54] mb-1">Pozovite nas</h4>
                    <p className="text-sm text-[#171A54]/60 mb-2">Direktan razgovor sa operaterom.</p>
                    <div className="flex items-center gap-2 text-xs text-[#171A54]/40 font-medium bg-[#171A54]/5 px-2 py-1 rounded w-fit">
                        <Clock className="w-3 h-3" />
                        07:30 - 15:30h
                    </div>
                </div>
            </a>

            {/* Email Option */}
            <a href="mailto:office@eef.rs" className="group flex items-start gap-4 p-4 rounded-xl border border-[#171A54]/10 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-[#171A54] mb-1">Pošaljite Email</h4>
                    <p className="text-sm text-[#171A54]/60">Odgovaramo u najkraćem roku.</p>
                </div>
            </a>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-[#171A54]/10 text-center">
            <p className="text-xs text-[#171A54]/40">
                Eko Elektrofrigo d.o.o.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
