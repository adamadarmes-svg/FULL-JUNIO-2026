'use client'

import { usePathname, useRouter } from 'next/navigation'

const nombres = {
  '/': 'Home',
  '/about': 'About',
  '/blog': 'Blog',
}

export default function RutaActual() {
  const pathname = usePathname()
  const router = useRouter()

  const nombre = nombres[pathname] ?? pathname

  return (
    <div className="flex items-center justify-between mb-16 py-3 border-y border-line text-[11px] uppercase tracking-[0.2em]">
      <p className="text-muted">
        Ruta <span className="mx-2">/</span>
        <span className="text-ink">{nombre}</span>
        <code className="ml-3 font-mono normal-case tracking-normal text-accent">{pathname}</code>
      </p>

      {pathname !== '/' && (
        <button
          onClick={() => router.back()}
          className="text-muted hover:text-ink cursor-pointer transition-colors"
        >
          ← Volver
        </button>
      )}
    </div>
  )
}
