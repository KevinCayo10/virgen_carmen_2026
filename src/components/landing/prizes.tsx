import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES, FLOAT_PRIZES } from '@/lib/constants';

const placeIcons = [Trophy, Medal, Award] as const;
const placeColors = [
  'text-yellow-400',
  'text-gray-300',
  'text-amber-600',
] as const;

export function Prizes() {
  return (
    <section id="premios" className="py-20 px-4 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-950 mb-4">
          Premios
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Reconocimiento al esfuerzo y la tradición cultural
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {(Object.entries(CATEGORIES) as [string, typeof CATEGORIES[keyof typeof CATEGORIES]][]).map(([key, category]) => (
            <Card key={key} className="border-amber-200 shadow-lg">
              <CardHeader className="text-center border-b border-amber-100 bg-amber-50/50 rounded-t-xl">
                <CardTitle className="text-xl text-blue-900">
                  {category.label}
                </CardTitle>
                <Badge variant="warning" className="mt-2">
                  {key === 'danza_ninos' ? 'Categoría Infantil' : 'Categoría General'}
                </Badge>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {category.prizes.map((prize, i) => {
                  const Icon = placeIcons[i];
                  const color = placeColors[i];
                  return (
                    <div
                      key={prize.place}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${color}`} />
                        <span className="font-medium text-gray-700">{prize.place}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-900">{prize.amount}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-amber-200 shadow-lg bg-amber-50/30">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-blue-900">Carro Alegórico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 max-w-md mx-auto rounded-lg hover:bg-amber-50 transition-colors">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="font-medium text-gray-700">{FLOAT_PRIZES[0].place}</span>
              </div>
              <span className="text-lg font-bold text-blue-900">{FLOAT_PRIZES[0].amount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
