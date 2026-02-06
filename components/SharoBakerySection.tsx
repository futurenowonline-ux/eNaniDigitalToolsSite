import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SharoBakerySection() {
    return (
        <section className="w-full py-24 bg-white border-y border-black/5 relative overflow-hidden group">
            {/* Background elements if needed */}
            <div className="absolute inset-0 bg-secondary/10 -z-10" />

            <div className="container mx-auto px-6">
                {/* Text Content (Top) */}
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-6">
                        Case Study
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-primary">
                        Sharo Bakery
                    </h2>
                    <p className="text-lg opacity-70 mb-10 max-w-2xl">
                        A masterclass in digital transformation for a local Pongola startup.
                        <strong> &ldquo;Powered by eNani Digital Tools&rdquo;</strong>
                    </p>
                    <Link href="https://www.sharobakery.co.za" target="_blank" className="px-10 py-4 glass-button-dark text-white rounded-full font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2">
                        Visit Live Site <ArrowRight size={20} />
                    </Link>
                </div>

                {/* Images (Bottom) */}
                <div className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[600px]">
                    {/* Desktop Screenshot */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[90%] h-full rounded-t-2xl overflow-hidden border-t border-x border-black/10 shadow-2xl transition-transform hover:-translate-y-2 duration-500">
                        <Link href="https://www.sharobakery.co.za" target="_blank" className="block w-full h-full">
                            <Image
                                src="/assets/sharo-desktop.png"
                                alt="Sharo Bakery Desktop View"
                                fill
                                className="object-cover object-top"
                            />
                        </Link>
                    </div>

                    {/* Mobile Screenshot */}
                    <div className="absolute -bottom-10 right-4 md:right-20 w-[120px] md:w-[240px] aspect-[9/19.5] rounded-2xl overflow-hidden border-[6px] border-white shadow-2xl transition-transform hover:-translate-y-4 duration-500 z-10">
                        <Link href="https://www.sharobakery.co.za" target="_blank" className="block w-full h-full">
                            <Image
                                src="/assets/sharo-mobile.png"
                                alt="Sharo Bakery Mobile View"
                                fill
                                className="object-cover"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
