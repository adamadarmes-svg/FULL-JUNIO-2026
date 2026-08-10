function ListaTareas({ tareas }) {
  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase mb-5">Tareas</h2>

      {tareas.length === 0 ? (
        <p className="text-black/30 text-sm italic">No hay tareas pendientes.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex items-center justify-between text-sm py-2.5 border-b border-black/10 last:border-0"
            >
              <span className={tarea.completada ? 'line-through text-black/30' : 'text-black/80'}>
                {tarea.nombre}
              </span>
              <span className={`text-[10px] tracking-wider uppercase px-2 py-0.5 border ${
                tarea.completada
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'border-black/20 text-black/40'
              }`}>
                {tarea.completada ? 'Hecho' : 'Pendiente'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaTareas
