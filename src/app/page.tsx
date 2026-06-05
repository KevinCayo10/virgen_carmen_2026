import { Hero } from "@/components/landing/hero";
import { Prizes } from "@/components/landing/prizes";
import { Criteria } from "@/components/landing/criteria";
import { RegistrationForm } from "@/components/landing/registration-form";
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
        <Prizes />
        <Criteria />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
