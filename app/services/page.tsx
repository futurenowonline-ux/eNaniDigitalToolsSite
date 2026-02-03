import Link from "next/link";
import { Check } from "lucide-react";

export default function Services() {
    const tiers = [
        {
            name: "Basic Package",
            price: "R1,000",
            description: "Online presence.",
            features: ["1-page storefront", "Mobile-ready design", "WhatsApp button", "Basic SEO setup"],
            cta: "Select Basic Package",
            highlight: false
        },
        {
            name: "Startup Package",
            price: "R5,000",
            description: "Lead-generation focused.",
            features: ["5 pages", "Blog/News section", "Analytics dashboard", "Lead capture forms", "Custom WhatsApp link"],
            cta: "Select Startup Package",
            highlight: true
        },
        {
            name: "Professional Package",
            price: "R10,000",
            description: "Advanced functionality.",
            features: ["10 pages", "E-commerce readiness", "Advanced AI & SEO", "Staff Training", "Priority Support"],
            cta: "Select Professional Package",
            highlight: false
        }
    ];

    return (
        <main>
            <header className="bg-secondary/50 py-24 text-center">
                <div className="container mx-auto px-6 fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Dominate your market with a powerful online presence.</h1>
                    <p className="opacity-70 max-w-2xl mx-auto text-lg">From professional storefronts to online presence audits. Solutions tailored for You.</p>
                </div>
            </header>

            <section id="web-dev" className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <div
                            key={i}
                            className={`glass-card p-10 rounded-2xl flex flex-col transition-all hover:-translate-y-2 ${tier.highlight ? 'border-4 border-primary shadow-2xl relative' : 'border border-black/5 shadow-lg'}`}
                        >
                            {tier.highlight && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-sm border border-black/5">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="text-xl font-bold font-heading mb-1">{tier.name}</h3>
                            <div className="text-3xl font-bold text-primary mb-4">{tier.price}</div>
                            <p className="opacity-60 text-sm mb-8">{tier.description}</p>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feat, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm">
                                        <Check size={18} className="text-primary shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/contact"
                                className={`w-full py-3 rounded-xl font-bold text-center transition-all ${tier.highlight ? 'glass-button-dark text-white' : 'glass-button'}`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Website Audit Promo Block */}
            <section id="audit" className="bg-secondary/50 text-primary py-24 border-t border-black/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading text-primary">Is Your Website Losing You Clients?</h2>
                    <p className="opacity-70 max-w-2xl mx-auto mb-10">
                        Our free Website Health Audit analyzes your speed, SEO, and mobile performance to identify exactly where you&apos;re losing potential revenue.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <div className="bg-primary/5 p-6 rounded-2xl border border-black/5 w-full md:w-64">
                            <h4 className="font-bold text-primary mb-2">Performance</h4>
                            <p className="text-xs opacity-60">Checking load times and core web vitals.</p>
                        </div>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-black/5 w-full md:w-64">
                            <h4 className="font-bold text-primary mb-2">SEO Health</h4>
                            <p className="text-xs opacity-60">Analyzing search engine visibility.</p>
                        </div>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-black/5 w-full md:w-64">
                            <h4 className="font-bold text-primary mb-2">Conversion</h4>
                            <p className="text-xs opacity-60">Finding UX friction points.</p>
                        </div>
                    </div>
                    <Link href="/#audit" className="inline-block mt-12 px-10 py-4 glass-button-dark text-white rounded-full font-bold hover:scale-105 transition-transform">
                        Start Your Free Audit
                    </Link>
                </div>
            </section>

            {/* Social Media Management Section */}
            <section id="social-media" className="bg-white text-primary py-24 border-t border-black/5 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-6 italic">
                                Native Growth Content
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading leading-tight italic uppercase italic">
                                Social Media <br /> Management
                            </h2>
                            <p className="text-lg opacity-70 mb-10 leading-relaxed italic">
                                Building a powerful presence beyond your website. We manage your content, engagement, and growth across platforms to tell your brand story to the world.
                            </p>

                            <ul className="space-y-6 mb-12">
                                {[
                                    "Content Strategy & Planning",
                                    "Visual Design & Post Creation",
                                    "Community Engagement & Management",
                                    "Performance Analytics & Reporting"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 group">
                                        <div className="w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-all duration-300" />
                                        <span className="font-bold tracking-wide italic opacity-80 group-hover:opacity-100">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className="inline-flex glass-button-dark text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl italic tracking-wider">
                                Discuss Social Strategy
                            </Link>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                            <div className="p-8 rounded-3xl bg-secondary/30 border border-black/5 hover:-translate-y-1 transition-all duration-500">
                                <h4 className="text-3xl font-bold font-heading mb-2 italic tracking-tighter">01.</h4>
                                <p className="text-sm opacity-60 italic">Consistent brand voice across all digital channels.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-secondary/30 border border-black/5 hover:-translate-y-1 transition-all duration-500">
                                <h4 className="text-3xl font-bold font-heading mb-2 italic tracking-tighter">02.</h4>
                                <p className="text-sm opacity-60 italic">High-impact visuals tailored for each platform.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-secondary/80 border border-black/5 hover:-translate-y-1 transition-all duration-500 backdrop-blur-sm">
                                <h4 className="text-3xl font-bold font-heading mb-2 italic tracking-tighter">03.</h4>
                                <p className="text-sm opacity-60 italic">Data-driven insights to maximize organic reach.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-secondary/30 border border-black/5 hover:-translate-y-1 transition-all duration-500">
                                <h4 className="text-3xl font-bold font-heading mb-2 italic tracking-tighter">04.</h4>
                                <p className="text-sm opacity-60 italic">Direct engagement to build loyal local communities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
