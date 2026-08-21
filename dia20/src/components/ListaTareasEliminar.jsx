import { useState } from 'react'
import Card from './Card'

function ListaTareasEliminar({ tareasIniciales }) {
  const [tareas, setTareas] = useState(tareasIniciales)

  const eliminar = (id) => {
    setTareas(tareas.filter((t) => t.id !== id))
  }

  return (
    <Card titulo={`Tareas — ${tareas.length} restantes`}>
      {tareas.length === 0 ? (
        <p className="text-xs text-taupe-light italic">No quedan tareas.</p>
      ) : (
        <ul className="space-y-0">
          {tareas.map((t) => (
            <li key={t.id} className="flex justify-between items-center py-3 border-b border-hairline-soft last:border-0">
              <span className="text-sm text-ink">{t.texto}</span>
              <button
                onClick={() => eliminar(t.id)}
                className="text-[10px] tracking-wide uppercase text-rust hover:text-paper hover:bg-rust transition-colors duration-300 px-3 py-1 border border-rust/30"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default ListaTareasEliminar
