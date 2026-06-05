import { CheckCircle2, Palette, Users, Shirt, Clock, Lightbulb, Sparkles, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DANCE_CRITERIA, FLOAT_CRITERIA } from '@/lib/constants';

const danceIcons = [Palette, Users, Shirt, Clock];
const floatIcons = [Lightbulb, Sparkles, Palette, FileText];

export function Criteria() {
  return (
    <section id="criterios" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-4">
          Criterios de Evaluación
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Bases para la selección de los ganadores
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50/50 border-b border-blue-100 rounded-t-xl">
              <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Danza
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {DANCE_CRITERIA.map((criterion, i) => {
                const Icon = danceIcons[i] || CheckCircle2;
                return (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <Icon className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{criterion}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="bg-amber-50/50 border-b border-amber-100 rounded-t-xl">
              <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Carro Alegórico
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {FLOAT_CRITERIA.map((criterion, i) => {
                const Icon = floatIcons[i] || CheckCircle2;
                return (
                  <div key={i} className="flex items-start gap-3 p-2">
                    <Icon className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{criterion}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
