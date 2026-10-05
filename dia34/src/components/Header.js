'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const enlaces = [
  { href: '/',          texto: 'Home'      },
  { href: '/about',     texto: 'About'     },
  { href: '/posts/1',   texto: 'Posts'     },
  { href: '/blog/cocina/tortilla-de-patatas', texto: 'Blog' },
  { href: '/user/gustavo',     texto: 'Perfil' },
  { href: '/dashboard', texto: 'Dashboard' },
]

export default function Header() {
  const pathname = usePathname()

  const enPerfil = pathname.startsWith('/user/')
  const username = enPerfil ? pathname.split('/')[2] : null

  const esActivo = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('/').slice(0, 2).join('/'))

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-stone-200">
      <nav className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-between gap-x-6">
        <Link href="/" className="py-5 text-sm font-semibold uppercase tracking-[0.2em]">
          Día 34
        </Link>

        <ul className="flex flex-wrap gap-6">
          {enlaces.map((enlace) => (
            <li key={enlace.href}>
              <Link
                href={enlace.href}
                className={`block py-5 text-sm border-b transition-colors ${
                  esActivo(enlace.href)
                    ? 'border-stone-900 text-stone-900'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {enlace.texto}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {enPerfil && (
        <div className="border-t border-stone-200 bg-stone-50 text-sm text-stone-500">
          <div className="max-w-4xl mx-auto px-6 py-2 flex items-center gap-3">
            <span className="w-5 h-5 bg-stone-900 text-white flex items-center justify-center text-[10px] font-semibold">
              {username?.charAt(0).toUpperCase()}
            </span>
            Viendo el perfil de <span className="text-stone-900 font-medium">@{username}</span>
          </div>
        </div>
      )}
    </header>
  )
}
