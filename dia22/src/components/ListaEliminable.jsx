import { useState } from 'react'

const ListaEliminable = () => {
  const [lista, setLista] = useState([
    'Elemento 1',
    'Elemento 2',
    'Elemento 3',
  ])

  const eliminar = (index) => {
    setLista(lista.filter((_, i) => i !== index))
  }

  return (
    <div className="card w-fit">
      <p className="text-sm mb-4">Haz clic en un elemento para eliminarlo:</p>
      <ul className="space-y-2">
        {lista.map((item, index) => (
          <li
            key={index}
            onClick={() => eliminar(index)}
            className="btn-rojo px-4 py-2 cursor-pointer text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
      {lista.length === 0 && <p className="text-sm italic opacity-60">Lista vacía</p>}
    </div>
  )
}

export default ListaEliminable
