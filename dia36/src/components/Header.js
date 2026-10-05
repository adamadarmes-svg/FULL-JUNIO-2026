'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enlaces = [
  { href: '/',      texto: 'Inicio' },
  { href: '/items', texto: 'Items'  },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 bg-neutral-50/90 backdrop-blur border-b border-neutral-200">
      <nav className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-sm uppercase tracking-[0.25em]">
          <span className="w-3 h-3 bg-neutral-900" />
          Día 36
        </Link>
        <ul className="flex h-full">
          {enlaces.map((enlace) => (
            <li key={enlace.href} className="h-full">
              <Link
                href={enlace.href}
                className={`h-full flex items-center px-4 text-xs uppercase tracking-[0.2em] border-b -mb-px transition-colors ${
                  pathname === enlace.href
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
