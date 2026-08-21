import { useState } from 'react'
import Card from './Card'

function BuscadorNombres({ nombres }) {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = nombres.filter((n) =>
    n.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <Card titulo="Buscar por nombre">
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-taupe-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Escribe para filtrar..."
          className="w-full bg-linen/40 border border-hairline pl-10 pr-4 py-2.5 text-sm text-ink placeholder:text-taupe-light focus:outline-none focus:border-ink focus:bg-paper transition-colors duration-300"
        />
      </div>
      {filtrados.length === 0 ? (
        <p className="text-xs text-taupe-light italic">Sin resultados.</p>
      ) : (
        <ul className="space-y-1">
          {filtrados.map((n) => (
            <li key={n.id} className="text-sm text-ink py-1.5 border-b border-hairline-soft last:border-0">
              {n.nombre}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default BuscadorNombres
