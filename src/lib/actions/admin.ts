'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type {
  Participant,
  DashboardStats,
  FilterState,
  SortState,
  PaginationState,
  ParticipantStatus,
} from '@/lib/types';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('No autorizado');
  }
  return { supabase, user };
}

export interface PaginatedParticipants {
  participants: Participant[];
  total: number;
  pages: number;
}

export async function listParticipants(
  pagination: PaginationState = { page: 1, pageSize: 10 },
  sort: SortState = { column: 'created_at', direction: 'desc' },
  filters: FilterState = {}
): Promise<PaginatedParticipants> {
  const { supabase } = await requireAuth();

  const { page, pageSize } = pagination;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('participants')
    .select('*', { count: 'exact' });

  // Apply filters
  if (filters.search) {
    const search = `%${filters.search}%`;
    query = query.or(
      `group_name.ilike.${search},representative_name.ilike.${search},registration_number.ilike.${search},phone.ilike.${search}`
    );
  }
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  // Apply sorting
  const allowedColumns = ['created_at', 'group_name', 'category', 'status', 'registration_number', 'participants_count'];
  const sortColumn = allowedColumns.includes(sort.column) ? sort.column : 'created_at';
  query = query.order(sortColumn, { ascending: sort.direction === 'asc' });

  // Apply pagination
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching participants:', error);
    throw new Error('Error al obtener participantes');
  }

  return {
    participants: (data as Participant[]) ?? [],
    total: count ?? 0,
    pages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function getParticipant(id: string): Promise<Participant | null> {
  const { supabase } = await requireAuth();

  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching participant:', error);
    return null;
  }

  return data as Participant;
}

export async function updateParticipantStatus(
  id: string,
  status: ParticipantStatus
): Promise<{ success: boolean; error?: string }> {
  const { supabase } = await requireAuth();

  const { error } = await supabase
    .from('participants')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating participant:', error);
    return { success: false, error: 'Error al actualizar el estado' };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function deleteParticipant(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const { supabase } = await requireAuth();

  const { error } = await supabase
    .from('participants')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting participant:', error);
    return { success: false, error: 'Error al eliminar el participante' };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const { supabase } = await requireAuth();

  const { data: allParticipants, error } = await supabase
    .from('participants')
    .select('category, status, has_float');

  if (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Error al obtener estadísticas');
  }

  const stats: DashboardStats = {
    total: allParticipants.length,
    danza_ninos: allParticipants.filter(p => p.category === 'danza_ninos').length,
    danza_general: allParticipants.filter(p => p.category === 'danza_general').length,
    with_float: allParticipants.filter(p => p.has_float).length,
    pending: allParticipants.filter(p => p.status === 'pending').length,
    approved: allParticipants.filter(p => p.status === 'approved').length,
    rejected: allParticipants.filter(p => p.status === 'rejected').length,
  };

  return stats;
}

export async function exportAllParticipants(): Promise<Participant[]> {
  const { supabase } = await requireAuth();

  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error exporting participants:', error);
    throw new Error('Error al exportar participantes');
  }

  return (data as Participant[]) ?? [];
}
