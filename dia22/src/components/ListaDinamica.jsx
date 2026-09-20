import { useState } from 'react'

const ListaDinamica = () => {
  const [lista, setLista] = useState([])
  const [contador, setContador] = useState(1)

  const agregar = () => {
    setLista([...lista, `Elemento ${contador}`])
    setContador(contador + 1)
  }

  return (
    <div className="card w-fit">
      <button onClick={agregar} className="btn btn-oro mb-4">
        Agregar elemento
      </button>
      <ul>
        {lista.map((item, index) => (
          <li key={index} className="text-sm">▪ {item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ListaDinamica
