import { createClient } from '@/lib/supabase/server';
import { ParticipantsTableClient } from './participants-table-client';
import type { Participant } from '@/lib/types';

export async function ParticipantsTable() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  return <ParticipantsTableClient participants={(data as Participant[]) ?? []} />;
}
