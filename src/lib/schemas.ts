import { z } from 'zod';

export const registrationSchema = z.object({
  group_name: z
    .string()
    .min(1, 'El nombre del grupo es obligatorio')
    .max(200, 'El nombre del grupo no puede exceder 200 caracteres'),
  representative_name: z
    .string()
    .min(1, 'El nombre del representante es obligatorio')
    .max(200, 'El nombre del representante no puede exceder 200 caracteres'),
  phone: z
    .string()
    .min(1, 'El número de contacto es obligatorio')
    .max(20, 'El número de contacto no puede exceder 20 caracteres')
    .regex(/^[+\d\s()-]+$/, 'Ingrese un número de teléfono válido'),
  email: z
    .string()
    .email('Ingrese un correo electrónico válido')
    .optional()
    .or(z.literal('')),
  category: z.enum(['danza_ninos', 'danza_general'], {
    error: 'Seleccione una categoría',
  }),
  participants_count: z
    .number()
    .int('Debe ser un número entero')
    .min(12, 'El mínimo de participantes es 12')
    .max(20, 'El máximo de participantes es 20'),
  music_name: z
    .string()
    .min(1, 'El nombre de la música es obligatorio')
    .max(200, 'El nombre de la música no puede exceder 200 caracteres'),
  has_float: z.enum(['si', 'no'], {
    error: 'Seleccione si participará con carro alegórico',
  }),
  observations: z
    .string()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
    .optional()
    .or(z.literal('')),
  consent: z.literal(true, { error: 'Debe aceptar el consentimiento' }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email('Ingrese un correo válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
