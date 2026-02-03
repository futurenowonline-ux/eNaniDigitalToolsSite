export default function About() {
    return (
        <main>
            <header className="bg-secondary/50 py-24 text-center">
                <div className="container mx-auto px-6 fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">Partnering in Zululand’s economic future.</h1>
                    <p className="opacity-70 max-w-2xl mx-auto text-lg">Building a professional online presence for local enterprises to grow, compete, and thrive.</p>
                </div>
            </header>

            <section className="container mx-auto px-6 py-20 max-w-4xl">
                <div className="space-y-6 text-lg opacity-80 leading-relaxed">
                    <p>
                        eNani Digital Tools is based in Ncotshane Township, Pongola, and serves clients across Zululand and KwaZulu-Natal.
                        We support local economic development by providing the online infrastructure that enterprises, cooperatives,
                        and development programmes need to grow, compete, and thrive.
                    </p>

                    <p>
                        Our work complements the <strong>Zululand District Growth and Development Plan</strong>, the
                        <strong>KwaZulu-Natal Department of Agriculture and Rural Development</strong> priorities, and national
                        efforts to strengthen township and rural economies. We focus on making professional online growth accessible,
                        practical, and affordable—not expensive or complex.
                    </p>
                </div>

                <div className="mt-16 glass-card p-10 rounded-2xl border-t-4 border-accent bg-white shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 font-heading">How We Work</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">✅</span>
                            <div>
                                <strong className="block">Listen First</strong>
                                <span className="text-sm opacity-60">Understand your local context and goals.</span>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">✅</span>
                            <div>
                                <strong className="block">Co-Design</strong>
                                <span className="text-sm opacity-60">Build solutions tailored to your industry and market.</span>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">✅</span>
                            <div>
                                <strong className="block">Build Capacity</strong>
                                <span className="text-sm opacity-60">Train your team to own and optimise.</span>
                            </div>
                        </li>
                        <li className="flex gap-4 items-start">
                            <span className="text-accent text-xl">✅</span>
                            <div>
                                <strong className="block">Support Long-Term</strong>
                                <span className="text-sm opacity-60">Monthly optimisation and ongoing partnership.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
