'use client';

import { useActionState, startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { registrationSchema, type RegistrationFormData } from '@/lib/schemas';
import { submitRegistration, type RegistrationResult } from '@/lib/actions/registration';
import { MIN_PARTICIPANTS, MAX_PARTICIPANTS } from '@/lib/constants';

const initialState: RegistrationResult = {
  success: false,
  errors: {},
};

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: RegistrationResult, formData: FormData) => {
      return await submitRegistration(formData);
    },
    initialState,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      group_name: '',
      representative_name: '',
      phone: '',
      email: '',
      category: undefined,
      participants_count: undefined,
      music_name: '',
      has_float: undefined,
      observations: '',
      consent: false as unknown as true,
    },
  });

  const serverErrors = state.success ? {} : (state.errors ?? {});

  if (state.success) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-200 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Inscripción Exitosa!</h2>
        <p className="text-gray-600 mb-4">
          Su inscripción ha sido registrada correctamente.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700 mb-1">Número de inscripción:</p>
          <p className="text-2xl font-bold text-green-800 font-mono">
            {state.registration_number}
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Guarde su número de inscripción para futuras referencias.
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Registrar nuevo grupo
        </Button>
      </div>
    );
  }

  return (
    <>
      {serverErrors._form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <div>
            {serverErrors._form.map((err, i) => (
              <p key={i} className="text-sm text-red-700">{err}</p>
            ))}
          </div>
        </div>
      )}

      <Card id="formulario" className="border-amber-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-950 to-blue-900 text-white rounded-t-xl">
          <CardTitle>Información del Grupo</CardTitle>
          <CardDescription className="text-blue-200">
            Datos del representante y grupo participante
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit((data) => {
                  const formData = new FormData();
                  Object.entries(data).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                      formData.append(key, String(value));
                    }
                  });
                  startTransition(() => formAction(formData));
                })(e);
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="group_name">Nombre del grupo *</Label>
                  <Input
                    id="group_name"
                    {...register('group_name')}
                    placeholder="Nombre del grupo"
                    className={errors.group_name || serverErrors.group_name ? 'border-red-500' : ''}
                  />
                  {errors.group_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.group_name.message}</p>
                  )}
                  {serverErrors.group_name?.map((err, i) => (
                    <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                  ))}
                </div>

                <div>
                  <Label htmlFor="representative_name">Nombre del representante *</Label>
                  <Input
                    id="representative_name"
                    {...register('representative_name')}
                    placeholder="Nombre completo del representante"
                    className={errors.representative_name || serverErrors.representative_name ? 'border-red-500' : ''}
                  />
                  {errors.representative_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.representative_name.message}</p>
                  )}
                  {serverErrors.representative_name?.map((err, i) => (
                    <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Número de contacto *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+593 99 999 9999"
                      maxLength={20}
                      className={errors.phone || serverErrors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                    {serverErrors.phone?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Participación</h3>

                <div className="space-y-4">
                  <div>
                    <Label>Categoría *</Label>
                    <Select
                      onValueChange={(val) => setValue('category', val as 'danza_ninos' | 'danza_general')}
                    >
                      <SelectTrigger className={errors.category || serverErrors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="danza_ninos">Danza Niños (3 a 12 años)</SelectItem>
                        <SelectItem value="danza_general">Danza General </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
                    )}
                    {serverErrors.category?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="participants_count">
                      Número de participantes ({MIN_PARTICIPANTS}-{MAX_PARTICIPANTS}) *
                    </Label>
                    <Input
                      id="participants_count"
                      type="number"
                      min={MIN_PARTICIPANTS}
                      max={MAX_PARTICIPANTS}
                      {...register('participants_count', { valueAsNumber: true })}
                      placeholder={`Entre ${MIN_PARTICIPANTS} y ${MAX_PARTICIPANTS} participantes`}
                      className={errors.participants_count || serverErrors.participants_count ? 'border-red-500' : ''}
                    />
                    {errors.participants_count && (
                      <p className="text-sm text-red-500 mt-1">{errors.participants_count.message}</p>
                    )}
                    {serverErrors.participants_count?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="music_name">Nombre de la música folclórica *</Label>
                    <Input
                      id="music_name"
                      {...register('music_name')}
                      placeholder="Nombre de la canción o pieza musical folclórica"
                      className={errors.music_name || serverErrors.music_name ? 'border-red-500' : ''}
                    />
                    {errors.music_name && (
                      <p className="text-sm text-red-500 mt-1">{errors.music_name.message}</p>
                    )}
                    {serverErrors.music_name?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>

                  <div>
                    <Label>¿Participa con carro alegórico? *</Label>
                    <Select
                      onValueChange={(val) => setValue('has_float', val as 'si' | 'no')}
                    >
                      <SelectTrigger className={errors.has_float || serverErrors.has_float ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Seleccione una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="si">Sí</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.has_float && (
                      <p className="text-sm text-red-500 mt-1">{errors.has_float.message}</p>
                    )}
                    {serverErrors.has_float?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>

                  <div>
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea
                      id="observations"
                      {...register('observations')}
                      placeholder="Información adicional (opcional)"
                      rows={3}
                      maxLength={255}
                    />
                    {errors.observations && (
                      <p className="text-sm text-red-500 mt-1">{errors.observations.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    onCheckedChange={(checked) => {
                      if (checked === true) setValue('consent', true as unknown as true);
                    }}
                    className={errors.consent || serverErrors.consent ? 'border-red-500' : ''}
                  />
                  <div>
                    <Label htmlFor="consent" className="text-sm font-normal leading-relaxed">
                      Acepto que la información proporcionada sea utilizada para la organización del evento. *
                    </Label>
                    {errors.consent && (
                      <p className="text-sm text-red-500 mt-1">{errors.consent.message}</p>
                    )}
                    {serverErrors.consent?.map((err, i) => (
                      <p key={i} className="text-sm text-red-500 mt-1">{err}</p>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-semibold py-6 h-auto rounded-xl text-lg"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando inscripción...
                  </>
                ) : (
                  'Enviar inscripción'
                )}
              </Button>
            </form>
          </CardContent>
      </Card>
    </>
  );
}
