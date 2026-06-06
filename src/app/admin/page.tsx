import { createClient } from '@/lib/supabase/server';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { ParticipantsTable } from '@/components/admin/participants-table';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: allParticipants } = await supabase
    .from('participants')
    .select('category, status, has_float')
    .eq('active', true);

  const stats = {
    total: allParticipants?.length ?? 0,
    danza_ninos: allParticipants?.filter(p => p.category === 'danza_ninos').length ?? 0,
    danza_general: allParticipants?.filter(p => p.category === 'danza_general').length ?? 0,
    with_float: allParticipants?.filter(p => p.has_float).length ?? 0,
    pending: allParticipants?.filter(p => p.status === 'pending').length ?? 0,
    approved: allParticipants?.filter(p => p.status === 'approved').length ?? 0,
    rejected: allParticipants?.filter(p => p.status === 'rejected').length ?? 0,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 mt-1">Resumen general de inscripciones</p>
      </div>
      <DashboardStats stats={stats} />
      <ParticipantsTable />
    </div>
  );
}
