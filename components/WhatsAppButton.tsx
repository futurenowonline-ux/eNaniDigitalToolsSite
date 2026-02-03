"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/27788385838?text=Hello%20eNani%20Digital%20Tools!%20I'm%20interested%20in%20digitising%20my%20business."
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
