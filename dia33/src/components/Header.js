'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enlaces = [
  { href: '/',      texto: 'Home'  },
  { href: '/about', texto: 'About' },
  { href: '/blog',  texto: 'Blog'  },
]

export default function Header() {
  const pathname = usePathname()

  const esActivo = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-10 bg-paper/90 backdrop-blur border-b border-line">
      <nav className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide">
          Día 33
        </Link>

        <ul className="flex h-full">
          {enlaces.map((enlace) => (
            <li key={enlace.href} className="h-full">
              <Link
                href={enlace.href}
                className={`h-full flex items-center px-4 sm:px-5 text-xs uppercase tracking-[0.2em] border-b transition-colors ${
                  esActivo(enlace.href)
                    ? 'border-ink text-ink'
                    : 'border-transparent text-muted hover:text-ink'
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
