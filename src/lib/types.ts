export type ParticipantCategory = 'danza_ninos' | 'danza_general';

export type ParticipantStatus = 'pending' | 'approved' | 'rejected';

export interface Participant {
  id: string;
  registration_number: string;
  group_name: string;
  representative_name: string;
  phone: string;
  email: string | null;
  category: ParticipantCategory;
  participants_count: number;
  music_name: string;
  has_float: boolean;
  observations: string | null;
  status: ParticipantStatus;
  created_at: string;
  updated_at: string;
}

export interface ParticipantInsert {
  group_name: string;
  representative_name: string;
  phone: string;
  email?: string | null;
  category: ParticipantCategory;
  participants_count: number;
  music_name: string;
  has_float: boolean;
  observations?: string | null;
}

export interface ParticipantUpdate {
  status?: ParticipantStatus;
}

export interface DashboardStats {
  total: number;
  danza_ninos: number;
  danza_general: number;
  with_float: number;
  pending: number;
  approved: number;
  rejected: number;
}

export type SortDirection = 'asc' | 'desc';

export interface PaginationState {
  page: number;
  pageSize: number;
}

export interface SortState {
  column: string;
  direction: SortDirection;
}

export interface FilterState {
  search?: string;
  category?: ParticipantCategory | '';
  status?: ParticipantStatus | '';
}
