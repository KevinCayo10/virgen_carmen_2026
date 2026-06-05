'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#premios', label: 'Premios' },
  { href: '#criterios', label: 'Criterios' },
  { href: '#registro', label: 'Inscripción' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); scrollTo('#inicio'); }}
          className={cn(
            'text-lg font-bold transition-colors',
            isScrolled ? 'text-blue-950' : 'text-white'
          )}
        >
          Pregón Cultural 2026
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className={cn(
                'text-sm font-medium transition-colors hover:text-amber-500',
                isScrolled ? 'text-gray-700' : 'text-white/90'
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#registro"
            onClick={(e) => { e.preventDefault(); scrollTo('#registro'); }}
            className="inline-flex items-center justify-center h-8 rounded-md px-3 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-blue-950 font-semibold transition-colors"
          >
            Inscribirse
          </a>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className={isScrolled ? 'text-blue-950' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-blue-950' : 'text-white'} />
          )}
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-amber-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#registro"
              onClick={(e) => { e.preventDefault(); scrollTo('#registro'); }}
              className="block w-full text-center px-3 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-blue-950 rounded-lg transition-colors mt-2"
            >
              Inscribirse
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
