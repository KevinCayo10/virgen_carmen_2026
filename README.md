# Pregón Cultural - Sistema de Inscripciones

Plataforma web para la gestión de inscripciones de grupos de danza en el evento **Pregón Cultural**. Permite a los grupos registrarse de forma pública y al equipo organizador administrar las inscripciones mediante un panel privado con tabla de datos, filtros y exportación a Excel.

## Tecnologías

| Tecnología | Versión |
|---|---|
| [Next.js](https://nextjs.org/) | 16.2.7 |
| [React](https://react.dev/) | 19.2.4 |
| [TypeScript](https://www.typescriptlang.org/) | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| [Shadcn/UI](https://ui.shadcn.com/) | — |
| [Supabase](https://supabase.com/) | — |
| [TanStack Table](https://tanstack.com/table) | 8.21.3 |
| [React Hook Form](https://react-hook-form.com/) | 7.77.0 |
| [Zod](https://zod.dev/) | 4.4.3 |

## Estructura del proyecto

| Directorio | Propósito |
|---|---|
| `src/app/` | Rutas y páginas de la aplicación (App Router) |
| `src/app/admin/` | Panel de administración protegido |
| `src/components/ui/` | Componentes base de Shadcn/UI |
| `src/components/landing/` | Componentes de la página pública |
| `src/components/admin/` | Componentes del panel de administración |
| `src/lib/supabase/` | Clientes de Supabase (browser, server, admin) |
| `src/lib/actions/` | Server Actions (registro y admin) |
| `src/lib/` | Esquemas Zod, tipos, utilidades y constantes |
| `supabase/migrations/` | Migraciones SQL de la base de datos |
| `public/` | Archivos estáticos |

## Prerrequisitos

- **Node.js** 20.x o superior
- **npm** 10.x o superior
- Una cuenta gratuita en [Supabase](https://supabase.com)
- Una cuenta gratuita en [Vercel](https://vercel.com) (para despliegue)

## Variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto en Supabase (Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública de Supabase (Project Settings → API) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio con permisos de administración (¡nunca exponer en el cliente!) |
| `NEXT_PUBLIC_APP_URL` | URL base de la aplicación (`http://localhost:3000` en desarrollo) |

## Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/pregon-cultural.git
cd pregon-cultural

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores de Supabase

# 4. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Configuración de Supabase

### 1. Crear un proyecto

1. Ingresar a [supabase.com](https://supabase.com) e iniciar sesión.
2. Crear un nuevo proyecto, asignar nombre y contraseña de base de datos.
3. Esperar a que se aprovisione (1-2 minutos).

### 2. Ejecutar la migración

1. En el panel de Supabase ir a **SQL Editor**.
2. Abrir `supabase/migrations/20240601_initial_schema.sql`.
3. Copiar y pegar el contenido en el editor SQL.
4. Ejecutar el script para crear la tabla `participants` y las políticas de RLS.

### 3. Habilitar autenticación

1. En el panel de Supabase ir a **Authentication → Providers**.
2. Habilitar el provider **Email/Password** (desactivar "Confirm email" si se desea).
3. En **Authentication → Settings** configurar la URL del sitio (para producción usar la URL de Vercel).

### 4. Crear usuario administrador

```sql
-- Ejecutar en el SQL Editor de Supabase
INSERT INTO auth.users (email, password, raw_user_meta_data)
VALUES ('admin@ejemplo.com', 'contraseña_segura', '{"role": "admin"}');
```

O crearlo desde **Authentication → Users → Invite user** en el panel de Supabase.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint en todo el proyecto |

## Árbol del proyecto

```
colonia/
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   ├── admin-header.tsx
│   │   │   ├── dashboard-stats.tsx
│   │   │   ├── participants-table-client.tsx
│   │   │   └── participants-table.tsx
│   │   ├── landing/
│   │   │   ├── criteria.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── prizes.tsx
│   │   │   └── registration-form.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   └── lib/
│       ├── actions/
│       │   ├── admin.ts
│       │   └── registration.ts
│       ├── supabase/
│       │   ├── admin.ts
│       │   ├── client.ts
│       │   └── server.ts
│       ├── constants.ts
│       ├── schemas.ts
│       ├── types.ts
│       └── utils.ts
├── supabase/
│   └── migrations/
│       └── 20240601_initial_schema.sql
├── .env.example
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```
