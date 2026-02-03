import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function BentoGrid() {
    return (
        <div className="bento-grid">
            {/* 1. Startup Tier (PRIMARY - LARGE) */}
            <div className="bento-item-large glass-card p-10 flex flex-col justify-end hover-glow transition-all group rounded-2xl border-t-4 border-accent relative bg-white">
                <div className="absolute top-6 right-6 text-primary animate-pulse">
                    <Sparkles size={32} />
                </div>
                <div className="mb-auto">
                    <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                        Most Recommended
                    </span>
                    <h3 className="text-3xl font-bold mb-4 font-heading text-primary">Startup Package</h3>
                    <div className="text-4xl font-bold text-primary mb-6">R5,000</div>
                    <p className="opacity-70 text-sm mb-6 max-w-sm">
                        Our most popular all-in-one solution for growing Zululand businesses. A professional 5-page website designed to convert visitors into customers.
                    </p>
                    <ul className="space-y-2 mb-8 text-xs opacity-70">
                        <li className="flex items-center gap-2">✓ 5 Professional Pages</li>
                        <li className="flex items-center gap-2">✓ High-Speed Performance</li>
                        <li className="flex items-center gap-2">✓ WhatsApp Integration</li>
                        <li className="flex items-center gap-2">✓ SEO Foundation</li>
                    </ul>
                </div>
                <Link href="/services" className="inline-flex items-center glass-button-dark text-white px-8 py-3 rounded-xl font-bold group-hover:gap-2 transition-all w-fit shadow-lg">
                    Get Started Now <ArrowRight size={18} className="ml-2" />
                </Link>
            </div>

            {/* 2. Basic Tier */}
            <div className="glass-card p-8 rounded-2xl hover-glow transition-all group flex flex-col justify-between border border-black/5 bg-white/50">
                <div>
                    <span className="text-primary font-bold text-xs opacity-40">R1,000</span>
                    <h3 className="text-xl font-bold mt-2 font-heading">Basic Storefront</h3>
                    <p className="opacity-70 text-xs mt-2">1-page online presence for kiosks and side-hustles.</p>
                </div>
                <Link href="/services" className="text-primary font-bold text-xs mt-6 flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={14} className="ml-1" />
                </Link>
            </div>

            {/* 3. Professional Tier */}
            <div className="glass-card p-8 rounded-2xl hover-glow transition-all group flex flex-col justify-between border border-black/5 bg-white/50">
                <div>
                    <span className="text-primary font-bold text-xs opacity-40">R10,000</span>
                    <h3 className="text-xl font-bold mt-2 font-heading">Professional Package</h3>
                    <p className="opacity-70 text-xs mt-2">10-page custom growth website with advanced AI & SEO.</p>
                </div>
                <Link href="/services" className="text-primary font-bold text-xs mt-6 flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={14} className="ml-1" />
                </Link>
            </div>

            {/* 4. Website Audit (Repurposed - Wide) */}
            <div className="bento-item-wide glass-card p-10 rounded-2xl hover-glow transition-all group border-l-4 border-primary/20 bg-secondary/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-md">
                        <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                            Free Tool
                        </span>
                        <h3 className="text-2xl font-bold mb-2 font-heading text-primary">Free Website Health Audit</h3>
                        <p className="opacity-70 text-sm">
                            Is your current website losing you money? Get an instant report on speed, mobile-readiness, and SEO. Perfect for upgrades.
                        </p>
                    </div>
                    <Link href="#audit" className="inline-flex items-center text-primary font-extrabold group-hover:gap-2 transition-all shrink-0">
                        Audit My Site <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>

            {/* 5. Sharo Bakery Feature (Below Tiers) */}
            <div className="bento-item-wide glass-card p-10 rounded-2xl hover-glow transition-all relative overflow-hidden group bg-white border border-black/5">
                <div className="absolute inset-0 opacity-5 group-hover:scale-105 transition-transform duration-700 bg-[url('/assets/sharo-desktop.png')] bg-cover bg-center" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="text-center md:text-left flex-1">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                            Case Study
                        </span>
                        <h3 className="text-3xl font-bold mb-4 font-heading text-primary">Sharo Bakery</h3>
                        <p className="opacity-70 text-sm max-w-md mb-8">
                            A masterclass in digital transformation for a local Pongola startup. <strong>&ldquo;Powered by eNani&rdquo;</strong>
                        </p>
                        <Link href="https://www.sharobakery.co.za" target="_blank" className="px-8 py-3 glass-button-dark text-white rounded-xl font-bold transition-all inline-block shadow-lg">
                            Visit Live Site
                        </Link>
                    </div>

                    <div className="flex-1 relative h-[250px] w-full max-w-[400px] hidden md:block">
                        {/* Desktop Shortcut */}
                        <div className="absolute top-0 right-0 w-[80%] aspect-video rounded-lg overflow-hidden border border-black/10 shadow-2xl transition-transform group-hover:-translate-y-2 duration-500">
                            <Image
                                src="/assets/sharo-desktop.png"
                                alt="Sharo Bakery Desktop View"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Mobile Shortcut */}
                        <div className="absolute -bottom-4 left-4 w-[25%] aspect-[9/19.5] rounded-xl overflow-hidden border-4 border-white shadow-2xl transition-transform group-hover:translate-x-2 duration-700">
                            <Image
                                src="/assets/sharo-mobile.png"
                                alt="Sharo Bakery Mobile View"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
