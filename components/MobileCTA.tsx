"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileCTA() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-black/10 z-[1500]">
            <Link
                href="#audit"
                className="w-full bg-accent text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
                Start Your AI Audit <ArrowRight size={18} />
            </Link>
        </div>
    );
}
