import { useState } from 'react'
import Card from './Card'

const FILTROS = ['Todas', 'Completadas', 'Pendientes']

function TareasConFiltro({ tareas }) {
  const [filtro, setFiltro] = useState('Todas')

  const lista = tareas.filter((t) => {
    if (filtro === 'Completadas') return t.completado
    if (filtro === 'Pendientes') return !t.completado
    return true
  })

  return (
    <Card titulo="Tareas con filtro">
      <div className="flex gap-2">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`text-xs tracking-wide px-3.5 py-1.5 border transition-colors duration-300 ${
              filtro === f
                ? 'bg-ink text-paper border-ink'
                : 'text-taupe border-hairline hover:border-taupe-light hover:text-ink'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="space-y-0">
        {lista.map((t) => (
          <li key={t.id} className="flex justify-between items-center py-3 border-b border-hairline-soft last:border-0">
            <span className={`text-sm ${t.completado ? 'line-through text-taupe-light' : 'text-ink'}`}>
              {t.texto}
            </span>
            <span className={`text-[10px] px-2 py-0.5 border tracking-wide uppercase ${
              t.completado ? 'bg-sage-light text-sage border-sage/20' : 'bg-terracotta-light text-terracotta border-terracotta/20'
            }`}>
              {t.completado ? 'Hecha' : 'Pendiente'}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default TareasConFiltro
