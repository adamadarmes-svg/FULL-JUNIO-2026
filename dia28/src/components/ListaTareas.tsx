interface Tarea {
    id: number
    texto: string
    completada: boolean
}
interface ListaTareasProps {
    tareas: Tarea[]
}

const ListaTareas = ({ tareas }: ListaTareasProps) => {
    return (
        <div className="bg-white border border-gray-200 p-6 w-80">
            <p className="text-gray-500 text-sm mb-3">
                Juana de Arco
            </p>
            <ul className="space-y-2">
                {tareas.map((tarea) => (
                    <li
                        key={tarea.id}
                        className={`flex items-start gap-3 px-4 py-2 border border-gray-100 break-words ${tarea.completada
                                ? 'text-gray-400 line-through'
                                : 'text-gray-700'
                            }`}
                    >
                        <span className="text-xs text-gray-400 shrink-0">{tarea.completada ? 'resuelta' : 'cargando...'}</span>
                        {tarea.texto}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaTareas