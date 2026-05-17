"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { motion } from "framer-motion";

export default function WhatsAppFloating() {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-10 right-10 z-[100]"
    >
      <Link
        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-20 h-20 bg-[#171717] rounded-[2rem] shadow-2xl border border-white/5 transition-all hover:border-primary/40 hover:scale-110 active:scale-95 zed-card"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative">
           <MessageCircle className="w-10 h-10 text-[#25D366] group-hover:text-white transition-colors" />
           <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-[#171717] animate-pulse" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-6 bg-[#171717] border border-white/5 text-white text-[10px] font-bold px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 shadow-2xl">
          CHATTING WITH IQ <span className="text-primary ml-1">● ONLINE</span>
        </div>
      </Link>
    </motion.div>
  );
}

