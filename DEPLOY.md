# Guía de despliegue en Vercel

## Prerrequisitos

- Repositorio del proyecto subido a **GitHub**, **GitLab** o **Bitbucket**
- Cuenta gratuita en [Vercel](https://vercel.com)
- Proyecto activo en [Supabase](https://supabase.com) con la migración SQL ejecutada

## Paso 1: Importar el repositorio en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new).
2. Iniciar sesión con GitHub, GitLab o Bitbucket.
3. Seleccionar el repositorio del proyecto.
4. Vercel detectará automáticamente **Next.js** como framework.

## Paso 2: Configurar el proyecto

En la pantalla de configuración del despliegue:

| Campo | Valor |
|---|---|
| **Framework Preset** | Next.js (seleccionado automáticamente) |
| **Root Directory** | `./` (por defecto) |
| **Build Command** | `next build` (por defecto) |
| **Output Directory** | `.next` (por defecto) |
| **Install Command** | `npm install` (por defecto) |

## Paso 3: Configurar variables de entorno

Agregar las siguientes variables en la sección **Environment Variables**:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto en Supabase (Project Settings → API → Project URL) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública (Project Settings → API → anon key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (Project Settings → API → service_role key) |
| `NEXT_PUBLIC_APP_URL` | URL de la aplicación en Vercel (ej. `https://pregon-cultural.vercel.app`) |

> **Importante:** `SUPABASE_SERVICE_ROLE_KEY` tiene permisos elevados. Nunca la expongas en el cliente ni la incluyas en repositorios públicos.

## Paso 4: Desplegar

1. Hacer clic en **Deploy**.
2. Vercel ejecutará la compilación y publicará la aplicación.
3. Una vez finalizado, se mostrará la URL de producción (ej. `https://pregon-cultural.vercel.app`).

## Paso 5: Conectar Supabase con el entorno de producción

1. En el panel de **Supabase** ir a **Authentication → Settings**.
2. En **Site URL** ingresar la URL de la aplicación en Vercel.
3. En **Redirect URLs** agregar:
   - `https://<tu-app>.vercel.app/**`
   - `http://localhost:3000/**` (para desarrollo local)

## Paso 6: Verificar el despliegue

- [x] La página pública carga correctamente con el formulario de inscripción
- [x] El formulario envía datos y estos se guardan en Supabase
- [x] El acceso a `/admin` redirige al login
- [x] Iniciar sesión con credenciales de administrador permite ver el panel
- [x] La tabla de participantes muestra los registros correctamente
- [x] Los filtros y exportación a Excel funcionan

## Despliegues automáticos

Por defecto, Vercel despliega automáticamente cada vez que se hace push a la rama principal del repositorio.

- **Rama `main`**: despliegue automático a producción.
- **Pull requests**: Vercel crea una **Preview URL** automática para cada PR.

## Solución de problemas

| Problema | Posible causa | Solución |
|---|---|---|
| Error de conexión a Supabase | Variables de entorno mal configuradas | Verificar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Error 401 en el panel de admin | Usuario no autenticado o sin permisos | Crear el usuario en Authentication → Users de Supabase |
| RLS bloquea inserciones | Políticas de Row Level Security mal configuradas | Verificar que existe la política "Anyone can insert participants" |
| Error de build | Versión de Node.js incorrecta | En Vercel, ir a Project Settings → General → Node.js Version y seleccionar 20.x |
| Las variables de entorno no se reflejan | Build con caché antiguo | Ir a Vercel Dashboard → Deployments → últimos tres puntos → Redeploy |
