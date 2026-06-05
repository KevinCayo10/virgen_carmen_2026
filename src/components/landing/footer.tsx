import { Phone, MapPin, Building2 } from 'lucide-react';
import { ORGANIZER, CONTACT_PHONE, CONTACT_WHATSAPP, EVENT_LOCATION } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-amber-400">Organiza</span>
            </div>
            <p className="text-blue-200 text-sm">{ORGANIZER}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-amber-400">Ubicación</span>
            </div>
            <p className="text-blue-200 text-sm">{EVENT_LOCATION}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <Phone className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-amber-400">Contacto</span>
            </div>
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              className="text-blue-200 text-sm hover:text-amber-300 transition-colors"
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
        <div className="border-t border-blue-800 pt-6 text-center">
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} {ORGANIZER}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
