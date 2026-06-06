'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-amber-900 p-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-amber-200/80 mb-2">
          Página no encontrada
        </p>
        <p className="text-sm text-white/50 mb-8">
          Será redirigido al inicio en 5 segundos...
        </p>
        <Button
          onClick={() => router.push('/')}
          className="bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
