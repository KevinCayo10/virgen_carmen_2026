import { Users, Baby, User, Truck, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats as DashboardStatsType } from '@/lib/types';

const statCards = [
  {
    label: 'Total inscritos',
    key: 'total' as const,
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    label: 'Danza Niños',
    key: 'danza_ninos' as const,
    icon: Baby,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    label: 'Danza General',
    key: 'danza_general' as const,
    icon: User,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
  {
    label: 'Carros Alegóricos',
    key: 'with_float' as const,
    icon: Truck,
    color: 'text-amber-600',
    bg: 'bg-amber-100',
  },
  {
    label: 'Pendientes',
    key: 'pending' as const,
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  {
    label: 'Aprobados',
    key: 'approved' as const,
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    label: 'Rechazados',
    key: 'rejected' as const,
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
];

export function DashboardStats({ stats }: { stats: DashboardStatsType }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.key];
        return (
          <Card key={card.key} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-gray-500">
                {card.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
