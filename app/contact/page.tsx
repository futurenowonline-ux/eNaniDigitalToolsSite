"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        package: "Startup (R5,000)",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            setError(null);
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setIsSent(true);
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err: unknown) {
            console.error("Contact form error:", err);
            setError("Failed to connect to the server. Please check your internet.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main>
            <header className="bg-secondary/50 py-24 text-center">
                <div className="container mx-auto px-6 fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading">Let&apos;s build Zululand together.</h1>
                    <p className="opacity-70 max-w-2xl mx-auto text-lg">
                        Ready to build your online presence? Book a free discovery call or visit our office in Ncotshane.
                    </p>
                </div>
            </header>

            <section className="container mx-auto px-6 py-20 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 font-heading">Get In Touch</h2>
                            <div className="space-y-8">
                                <div className="flex gap-6 items-start group">
                                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary">Visit Us</h4>
                                        <p className="opacity-60 text-sm">Ncotshane Township, Pongola, KZN</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary">Call or WhatsApp</h4>
                                        <a href="tel:+27661321810" className="opacity-60 text-sm block hover:text-accent transition-colors">066 132 1810</a>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary">Email Us</h4>
                                        <a href="mailto:info@enani.co.za" className="opacity-60 text-sm block hover:text-accent transition-colors">info@enani.co.za</a>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start group">
                                    <div className="bg-accent/10 p-4 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary">Opening Hours</h4>
                                        <p className="opacity-60 text-sm">Mon - Fri: 8am - 5pm</p>
                                        <p className="opacity-60 text-sm">Sat: 9am - 1pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="discovery-call" className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                            <h4 className="font-bold mb-2">Discovery Call 🚀</h4>
                            <p className="text-sm opacity-70 mb-6">
                                Not sure where to start? Book a 15-minute consultation to discuss your business needs.
                            </p>
                            <a
                                href="https://wa.me/27788385838?text=I'd%20like%20to%20book%20a%20discovery%20call"
                                className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold hover:scale-105 transition-all"
                                style={{ backgroundColor: 'rgba(37, 211, 102, 0.8)' }}
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Book via WhatsApp &rarr;
                            </a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="relative">
                        <div className={`glass-card p-10 rounded-3xl bg-white shadow-2xl border border-black/5 relative z-10 transition-all duration-500 ${isSent ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                            <h3 className="text-2xl font-bold mb-8 font-heading">Start Your Project</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold opacity-40 uppercase tracking-widest ml-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all bg-secondary/30 focus:bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold opacity-40 uppercase tracking-widest ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all bg-secondary/30 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold opacity-40 uppercase tracking-widest ml-1">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="071 000 0000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all bg-secondary/30 focus:bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold opacity-40 uppercase tracking-widest ml-1">Package</label>
                                        <select
                                            value={formData.package}
                                            onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all bg-secondary/30 focus:bg-white appearance-none cursor-pointer"
                                        >
                                            <option>Startup (R5,000)</option>
                                            <option>Professional (R10,000)</option>
                                            <option>Basic (R1,000)</option>
                                            <option>Website Upgrade</option>
                                            <option>Other / Custom</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold opacity-40 uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        placeholder="Tell us about your project or business..."
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl border-2 border-primary/5 focus:border-accent outline-none text-sm transition-all bg-secondary/30 focus:bg-white resize-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 animate-shake">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <button
                                    disabled={isSending}
                                    className="w-full glass-button-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                                >
                                    {isSending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                    Send Project Inquiry
                                </button>
                            </form>
                        </div>

                        {/* Success State Overlay */}
                        {isSent && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-3xl z-20 text-center p-10 shadow-2xl border border-black/5"
                            >
                                <div className="bg-accent/10 p-6 rounded-full text-accent mb-6 animate-bounce">
                                    <CheckCircle2 size={64} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 font-heading text-primary">Inquiry Sent!</h3>
                                <p className="opacity-60 max-w-xs mb-8">
                                    Thank you for reaching out. We&apos;ll get back to you within 24 hours to schedule your discovery call.
                                </p>
                                <button
                                    onClick={() => setIsSent(false)}
                                    className="text-accent font-bold hover:underline"
                                >
                                    Send another message
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
