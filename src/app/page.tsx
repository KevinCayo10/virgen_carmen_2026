import { Hero } from "@/components/landing/hero";
import { RegistrationSection } from "@/components/landing/registration-section";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { HashScroll } from "@/components/shared/hash-scroll";
import { WhatsAppFloat } from "@/components/shared/whatsapp-float";

export default function HomePage() {
  return (
    <>
      <HashScroll />
      <Header />
      <main>
        <section id="inicio">
          <Hero />
        </section>
        <RegistrationSection />
        <div className="relative w-full h-48 md:h-72 bg-blue-950">
          <img
            src="/banner.png"
            alt="Pregón Cultural Virgen del Carmen 2026"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
