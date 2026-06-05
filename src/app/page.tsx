import { Hero } from "@/components/landing/hero";
import { RegistrationSection } from "@/components/landing/registration-section";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { HashScroll } from "@/components/shared/hash-scroll";

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
      </main>
      <Footer />
    </>
  );
}
