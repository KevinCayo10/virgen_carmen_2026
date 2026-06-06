import { CalendarDays, MapPin, Clock, Phone, Building2, Trophy, Users, Sparkles, CheckCircle2, Palette, Lightbulb, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RegistrationForm } from '@/components/landing/registration-form';
import {
  EVENT_DATE, EVENT_TIME, EVENT_START_LOCATION, EVENT_END_LOCATION,
  ORGANIZER, CONTACT_PHONE, CONTACT_WHATSAPP,
  CATEGORIES, DANCE_CRITERIA, FLOAT_CRITERIA,
} from '@/lib/constants';

export function RegistrationSection() {
  return (
    <section id="inscripciones" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-4">
            Inscripciones
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Complete el formulario para participar en el Pregón Cultural por las Fiestas Patronales Virgen del Carmen 2026
          </p>
          <Card className="border-amber-200 shadow-sm mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Col 1: Organiza + Fecha */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 shrink-0">
                      <Building2 className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-gray-400">Organiza</p>
                      <p className="text-sm font-semibold text-gray-800">{ORGANIZER}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 shrink-0">
                      <CalendarDays className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-gray-400">Fecha</p>
                      <p className="text-sm font-semibold text-gray-800">{EVENT_DATE}</p>
                    </div>
                  </div>
                </div>

                {/* Col 2: Hora + Contacto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 shrink-0">
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-gray-400">Hora</p>
                      <p className="text-sm font-semibold text-gray-800">{EVENT_TIME}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 shrink-0">
                      <Phone className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-xs text-gray-400">Contacto</p>
                      <a href={`https://wa.me/${CONTACT_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 hover:text-blue-800">{CONTACT_PHONE}</a>
                    </div>
                  </div>
                </div>

                {/* Col 3: Route */}
                <div className="flex items-center justify-center md:justify-start border-t md:border-t-0 md:border-l border-amber-200 pt-4 md:pt-0 md:pl-6">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="p-1.5 rounded-full bg-green-100">
                        <Flag className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="w-0.5 h-12 bg-gradient-to-b from-amber-400 to-amber-300" />
                      <div className="p-1.5 rounded-full bg-blue-100">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="h-[24px] flex items-center">
                        <div>
                          <p className="text-xs text-gray-400">Salida</p>
                          <p className="text-sm font-semibold text-gray-800">{EVENT_START_LOCATION}</p>
                        </div>
                      </div>
                      <div className="h-[48px]" />
                      <div className="h-[24px] flex items-center">
                        <div>
                          <p className="text-xs text-gray-400">Llegada</p>
                          <p className="text-sm font-semibold text-gray-800">{EVENT_END_LOCATION}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left column: Event info */}
          <div className="space-y-6">
            {/* Prizes card */}
            <Card className="border-amber-200 shadow-lg">
              <CardHeader className="border-b border-amber-100 bg-amber-50/50 rounded-t-xl">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Premios
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {(Object.entries(CATEGORIES) as [string, typeof CATEGORIES.danza_ninos][]).map(([key, category]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-800">{category.label}</span>
                      <Badge variant="warning" className="text-xs">{key === 'danza_ninos' ? 'Infantil' : 'General'}</Badge>
                    </div>
                    <div className="space-y-1">
                      {category.prizes.map((prize, i) => (
                        <div key={prize.place} className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-amber-50">
                          <span className="text-xs text-gray-600">{prize.place}</span>
                          <span className="text-sm font-bold text-blue-900">{prize.amount}</span>
                        </div>
                      ))}
                    </div>
                    {key !== Object.keys(CATEGORIES).reverse()[0] && (
                      <div className="border-t border-dashed border-amber-200 my-3" />
                    )}
                  </div>
                ))}
                <div className="border-t border-amber-200 pt-3">
                  <div className="flex items-center justify-between py-1.5 px-2 rounded bg-amber-50">
                    <span className="text-sm font-semibold text-gray-800">Carro Alegórico</span>
                    <span className="text-sm font-bold text-blue-900">USD 100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Criteria card */}
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="border-b border-blue-100 bg-blue-50/50 rounded-t-xl">
                <CardTitle className="text-lg text-blue-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Criterios de Evaluación
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Danza
                  </h4>
                  <div className="space-y-1.5">
                    {DANCE_CRITERIA.map((criterion, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Palette className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                        {criterion}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-blue-100 pt-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Carro Alegórico
                  </h4>
                  <div className="space-y-1.5">
                    {FLOAT_CRITERIA.map((criterion, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                        {criterion}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Registration form */}
          <div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
