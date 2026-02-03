import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] text-white py-16">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-xl font-bold mb-4 font-heading">eNani Digital Tools</h3>
                    <p className="opacity-60 text-sm">
                        Bridging the digital divide in Zululand. Empowering rural, small town and township businesses with modern tools.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4 opacity-80">Services</h4>
                    <ul className="space-y-2 opacity-60 text-sm">
                        <li><Link href="/services#web-dev" className="hover:text-white transition-colors">Website Development</Link></li>
                        <li><Link href="/services#audit" className="hover:text-white transition-colors">Website Audit</Link></li>
                        <li><Link href="/services#social-media" className="hover:text-white transition-colors">Social Media Management</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 opacity-80">Links</h4>
                    <ul className="space-y-2 opacity-60 text-sm">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/sectors" className="hover:text-white transition-colors">Sectors</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 opacity-80">Contact</h4>
                    <ul className="space-y-2 opacity-60 text-sm">
                        <li>
                            <a href="https://wa.me/27788385838" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                WhatsApp: +27 78 838 5838
                            </a>
                        </li>
                        <li>Ncotshane Township, Pongola</li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-xs text-white">
                <p>&copy; {new Date().getFullYear()} eNani Digital Tools. All rights reserved.</p>
                <p className="mt-2 text-[10px] font-bold tracking-widest uppercase">Website designed by eNani Digital Tools</p>
            </div>
        </footer>
    );
}
