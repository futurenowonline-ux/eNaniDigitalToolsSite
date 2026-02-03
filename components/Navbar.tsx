"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm">
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/assets/logo.png" alt="eNani Logo" width={120} height={50} priority />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="font-semibold text-primary/70 hover:text-primary transition-colors">Home</Link>
                    <Link href="/services" className="font-semibold text-primary/70 hover:text-primary transition-colors">Services</Link>
                    <Link href="/sectors" className="font-semibold text-primary/70 hover:text-primary transition-colors">Sectors</Link>
                    <Link href="/about" className="font-semibold text-primary/70 hover:text-primary transition-colors">About</Link>
                    <Link href="/contact" className="font-semibold text-primary/70 hover:text-primary transition-colors">Contact</Link>
                    <Link href="/contact#discovery-call" className="px-6 py-2 glass-button-dark text-white rounded-full font-semibold transition-all shadow-md">
                        Discovery Call
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 shadow-lg p-6 flex flex-col space-y-4 fade-in">
                    <Link href="/" onClick={() => setIsOpen(false)} className="font-semibold">Home</Link>
                    <Link href="/services" onClick={() => setIsOpen(false)} className="font-semibold">Services</Link>
                    <Link href="/sectors" onClick={() => setIsOpen(false)} className="font-semibold">Sectors</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} className="font-semibold">About</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} className="font-semibold">Contact</Link>
                    <Link href="/contact#discovery-call" onClick={() => setIsOpen(false)} className="px-6 py-2 glass-button-dark text-white rounded-full font-semibold text-center">
                        Discovery Call
                    </Link>
                </div>
            )}
        </nav>
    );
}
