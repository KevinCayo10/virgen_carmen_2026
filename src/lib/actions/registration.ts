'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { registrationSchema } from '@/lib/schemas';

function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

export type RegistrationResult =
  | { success: true; registration_number: string }
  | { success: false; errors: Record<string, string[]> };

export async function submitRegistration(
  formData: FormData
): Promise<RegistrationResult> {
  const raw: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    raw[key] = value;
  });

  // Convert has_float and participants_count to proper types
  if (raw.has_float) {
    raw.has_float = raw.has_float === 'si' ? 'si' : 'no';
  }
  if (raw.participants_count) {
    raw.participants_count = Number(raw.participants_count);
  }
  if (raw.consent) {
    raw.consent = raw.consent === 'true' || raw.consent === 'on';
  }

  const parsed = registrationSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join('.');
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { success: false, errors: fieldErrors };
  }

  const data = parsed.data;

  const supabase = await createClient();

  // Rate limit: check if same phone submitted in last 60 seconds
  const oneMinuteAgo = new Date(Date.now() - 60_000).toISOString();
  const { data: recent } = await supabase
    .from('participants')
    .select('id')
    .eq('phone', sanitize(data.phone))
    .gte('created_at', oneMinuteAgo)
    .maybeSingle();

  if (recent) {
    return {
      success: false,
      errors: {
        phone: ['Ya existe una inscripción con este número en el último minuto. Por favor espere.'],
      },
    };
  }

  // Generate registration number
  const { count } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true });

  const nextNumber = (count ?? 0) + 1;
  const registrationNumber = `PG-2026-${String(nextNumber).padStart(4, '0')}`;

  const { error } = await supabase.from('participants').insert({
    group_name: sanitize(data.group_name),
    representative_name: sanitize(data.representative_name),
    phone: sanitize(data.phone),
    email: data.email ? sanitize(data.email) : null,
    category: data.category,
    participants_count: data.participants_count,
    music_name: sanitize(data.music_name),
    has_float: data.has_float === 'si',
    observations: data.observations ? sanitize(data.observations) : null,
    registration_number: registrationNumber,
    status: 'pending',
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return {
      success: false,
      errors: {
        _form: ['Error al guardar la inscripción. Intente nuevamente.'],
      },
    };
  }

  return { success: true, registration_number: registrationNumber };
}
