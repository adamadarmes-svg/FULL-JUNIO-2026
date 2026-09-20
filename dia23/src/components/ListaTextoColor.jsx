import { useState } from 'react'

const elementos = [
  { id: 1, textoNormal: 'Elemento 1', textoActivo: 'Clicado' },
  { id: 2, textoNormal: 'Elemento 2', textoActivo: 'Seleccionado' },
  { id: 3, textoNormal: 'Elemento 3', textoActivo: 'Activado' },
]

const ListaTextoColor = () => {
  const [activos, setActivos] = useState([])

  const alternar = (id) => {
    if (activos.includes(id)) {
      setActivos(activos.filter(a => a !== id))
    } else {
      setActivos([...activos, id])
    }
  }

  return (
    <div className="bg-white border border-neutral-200 p-6 mb-4 w-[42rem] min-h-72">
      <p className="text-neutral-500 text-sm mb-3">Haz clic en cada elemento:</p>
      <ul className="space-y-2">
        {elementos.map(el => (
          <li
            key={el.id}
            onClick={() => alternar(el.id)}
            className={`px-4 py-2 cursor-pointer transition-all duration-300 font-medium ${
              activos.includes(el.id)
                ? 'bg-emerald-800 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {activos.includes(el.id) ? el.textoActivo : el.textoNormal}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaTextoColor