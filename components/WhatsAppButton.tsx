"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export default function WhatsAppButton() {
    return (
        <a
            href={whatsappUrl("Hello eNani Digital Tools! I'm interested in digitising my business.")}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 md:bottom-8 right-6 z-[2000] bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full flex items-center gap-3 font-bold hover:scale-105 transition-all group overflow-hidden"
            style={{ backgroundColor: 'rgba(37, 211, 102, 0.8)' }}
        >
            <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">Chat on WhatsApp</span>
        </a>
    );
}
