import Image from "next/image";
import Link from "next/link";
import BentoGrid from "@/components/BentoGrid";
import AuditSection from "@/components/AuditSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileCTA from "@/components/MobileCTA";
import SharoBakerySection from "@/components/SharoBakerySection";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero_v2_6.png"
            alt="Pongola Landscape"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>

        <div className="container relative z-10 text-center fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading max-w-4xl mx-auto leading-tight">
            Bridging the Digital Divide in Zululand.
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Putting Zululand entrepreneurs on the map with a professional online presence and digital growth strategies.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/services" className="px-8 py-3 glass-button-dark text-white rounded-full font-bold shadow-lg transition-all">
              Get the R5k Startup Package
            </Link>
            <Link href="#audit" className="px-8 py-3 glass-button text-white rounded-full font-bold transition-all">
              Free Website Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="container mx-auto px-6 py-20 -mt-20 relative z-20">
        <BentoGrid />

        <div className="text-center mt-12 max-w-3xl mx-auto fade-in delay-300">
          <p className="text-lg italic opacity-70">
            &ldquo;From our base in Pongola, we catalyze rural development by helping traditional businesses build a powerful online presence.&rdquo;
          </p>
        </div>
      </section>

      {/* Full Width Sharo Bakery Section */}
      <SharoBakerySection />

      {/* Audit Section */}
      <section id="audit" className="bg-secondary/50 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Free Website Health Audit</h2>
            <p className="opacity-70 max-w-xl mx-auto">Is your current website losing you money? Get an instant report on speed, mobile-readiness, and SEO.</p>
          </div>
          <AuditSection />
        </div>
      </section>

      <WhatsAppButton />
      <MobileCTA />
    </main >
  );
}
