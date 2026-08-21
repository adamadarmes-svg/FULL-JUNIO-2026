import { useState } from 'react'
import Card from './Card'

const getCategorias = (productos) => ['Todas', ...new Set(productos.map((p) => p.categoria))]

function FiltroCategoria({ productos }) {
  const [categoria, setCategoria] = useState('Todas')
  const categorias = getCategorias(productos)

  const filtrados = categoria === 'Todas'
    ? productos
    : productos.filter((p) => p.categoria === categoria)

  return (
    <Card titulo="Filtrar por categoría">
      <div className="flex gap-2 flex-wrap">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`text-xs tracking-wide px-3.5 py-1.5 border transition-colors duration-300 ${
              categoria === cat
                ? 'bg-ink text-paper border-ink'
                : 'text-taupe border-hairline hover:border-taupe-light hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <ul className="space-y-0">
        {filtrados.map((p) => (
          <li key={p.id} className="flex justify-between items-center py-3 border-b border-hairline-soft last:border-0 text-sm">
            <span className="text-ink">{p.nombre}</span>
            <span className="font-mono text-taupe">${p.precio}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default FiltroCategoria
