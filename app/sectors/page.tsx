import { ShoppingBag, Truck, Utensils, Construction } from "lucide-react";

export default function Sectors() {
    const sectors = [
        {
            title: "Local Economic Dev (LED)",
            icon: <ShoppingBag size={40} className="text-primary" />,
            description: "Direct support for Zululand District Growth and Development Plans via practical online growth strategies."
        },
        {
            title: "Agribusiness & Rural Tech",
            icon: <Truck size={40} className="text-primary" />,
            description: "Digital supply chains and agromapping tools for KwaZulu-Natal rural producers."
        },
        {
            title: "Township Business Growth",
            icon: <Utensils size={40} className="text-primary" />,
            description: "Professional digital storefronts and social growth for Ncotshane and beyond startups."
        },
        {
            title: "Educational Web Systems",
            icon: <Construction size={40} className="text-primary" />,
            description: "eNani Digital Tools creates educational tools that support parents, teachers and students."
        }
    ];

    return (
        <main>
            <header className="bg-secondary/50 py-24 text-center">
                <div className="container mx-auto px-6 fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading">An online presence tailored to your industry.</h1>
                    <p className="opacity-70 max-w-2xl mx-auto">Building a successful online presence is not one-size-fits-all. We build for the specific needs of Zululand enterprises.</p>
                </div>
            </header>

            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sectors.map((sector, i) => (
                        <div key={i} className="glass-card p-10 rounded-2xl text-center hover-glow transition-all hover:-translate-y-2 flex flex-col items-center">
                            <div className="mb-6 p-4 bg-primary/5 rounded-full">{sector.icon}</div>
                            <h3 className="text-xl font-bold mb-4 font-heading">{sector.title}</h3>
                            <p className="opacity-60 text-sm leading-relaxed">{sector.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
