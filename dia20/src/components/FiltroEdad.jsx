import { useState } from 'react'
import Card from './Card'

function FiltroEdad({ personas }) {
  const [edadMax, setEdadMax] = useState(50)

  const filtradas = personas.filter((p) => p.edad < edadMax)

  return (
    <Card titulo="Filtrar por edad">
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={10}
          max={60}
          value={edadMax}
          onChange={(e) => setEdadMax(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono text-ink border border-hairline px-2 py-1 whitespace-nowrap">{'< '}{edadMax}</span>
      </div>
      <p className="text-xs text-taupe">
        {filtradas.length} persona{filtradas.length !== 1 ? 's' : ''} menor{filtradas.length !== 1 ? 'es' : ''} de {edadMax} años
      </p>
      <ul className="space-y-0">
        {filtradas.map((p) => (
          <li key={p.id} className="flex justify-between items-center py-2.5 border-b border-hairline-soft last:border-0 text-sm">
            <span className="text-ink">{p.nombre}</span>
            <span className="font-mono text-xs text-taupe">{p.edad}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default FiltroEdad
