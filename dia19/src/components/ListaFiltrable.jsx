import { useState } from 'react'

function ListaFiltrable({ elementos }) {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = elementos.filter((el) =>
    el.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase">Buscar</h2>
        {busqueda && (
          <span className="text-[10px] text-black/30 font-mono">{filtrados.length} resultados</span>
        )}
      </div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Escribe para filtrar..."
        className="w-full bg-white border border-black/15 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-amber-600/60 transition-colors duration-200"
      />
      {busqueda && (
        filtrados.length === 0 ? (
          <p className="text-xs text-black/30 italic mt-4">Sin resultados.</p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {filtrados.map((el, i) => (
              <li key={i} className="text-xs text-amber-700 border border-amber-600/25 px-3 py-1.5">
                {el}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  )
}

export default ListaFiltrable
