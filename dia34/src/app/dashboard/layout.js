'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const secciones = [
  { href: '/dashboard',          texto: 'Resumen'      },
  { href: '/dashboard/stats',    texto: 'Estadísticas' },
  { href: '/dashboard/settings', texto: 'Ajustes'      },
]

export default function DashboardLayout({ children }) {
  const pathname = usePathname()

  return (
    <div>
      <div className="pb-10">
        <p className="eyebrow mb-4">Dashboard</p>
        <h1 className="text-5xl font-light tracking-tight mb-3">Panel de control</h1>
        <p className="text-xs text-stone-400">
          Tu actividad de un vistazo
        </p>
      </div>

      <div className="flex flex-col sm:flex-row border-t border-stone-200">
        <aside className="sm:w-48 shrink-0 sm:border-r border-b sm:border-b-0 border-stone-200 py-4 sm:py-8">
          <nav className="flex sm:flex-col gap-4 sm:gap-0">
            {secciones.map((seccion) => (
              <Link
                key={seccion.href}
                href={seccion.href}
                className={`sm:pl-4 sm:py-2 text-sm sm:border-l-2 sm:-ml-px transition-colors ${
                  pathname === seccion.href
                    ? 'sm:border-stone-900 text-stone-900 font-medium'
                    : 'sm:border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {seccion.texto}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-1 py-8 sm:pl-10">{children}</div>
      </div>
    </div>
  )
}
