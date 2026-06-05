import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('es-EC', { month: 'long' });
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${day} de ${month} de ${year}, ${hours}:${minutes}`;
}

export function formatRegistrationNumber(num: number): string {
  return `PG-2026-${String(num).padStart(4, '0')}`;
}
