'use client';

import { CalendarDays, MapPin, Clock, ArrowDown, Phone, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EVENT_DATE, EVENT_TIME, EVENT_START_LOCATION, EVENT_END_LOCATION, EVENT_LOCATION, ORGANIZER, CONTACT_PHONE, CONTACT_WHATSAPP } from '@/lib/constants';

export function Hero() {
  const scrollToForm = () => {
    document.getElementById('inscripciones')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-amber-900 overflow-hidden">
      {/* Mobile background image */}
      <img
        src="/background-mobile.jpeg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover md:hidden"
      />
      {/* Overlay for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-900/70 to-amber-900/80 md:hidden" />
      {/* Desktop background image */}
      <img
        src="/hero-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />
      {/* Overlay for desktop */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/60 to-amber-900/70 hidden md:block" />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm text-amber-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Organiza: {ORGANIZER}
          </div>
        </div>

        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-sm font-medium">
            <CalendarDays className="w-4 h-4" />
            {EVENT_DATE}
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
          Pregón Cultural
        </h1>
        <p className="text-xl md:text-2xl text-amber-200/90 font-light mb-8 max-w-3xl mx-auto">
          Fiestas Patronales <span className="text-amber-300 font-semibold">Virgen del Carmen 2026</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
          <div className="flex items-center gap-2 justify-center text-white/80">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm">{EVENT_START_LOCATION}</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-white/80">
            <ArrowDown className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm">{EVENT_END_LOCATION}</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-white/80">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm">{EVENT_TIME}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            {EVENT_LOCATION}
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Phone className="w-4 h-4 text-amber-400 shrink-0" />
            <a href={`https://wa.me/${CONTACT_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition-colors">
              {CONTACT_PHONE}
            </a>
          </div>
        </div>

        <Button
          size="lg"
          onClick={scrollToForm}
          className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-lg px-10 py-6 h-auto rounded-full shadow-2xl shadow-amber-500/25 transition-all hover:scale-105"
        >
          Inscribirse
        </Button>
      </div>
    </section>
  );
}
