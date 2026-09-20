import { useState } from 'react'

const ListaCreciente = () => {
  const [elementos, setElementos] = useState(['Elemento 1'])
  const [contador, setContador] = useState(2)

  const agregar = () => {
    setElementos([...elementos, `Elemento ${contador}`])
    setContador(contador + 1)
  }

  return (
    <div className="bg-white border border-neutral-200 p-6 mb-4 w-[42rem] min-h-72">
      <button
        onClick={agregar}
        className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-4 py-2 cursor-pointer transition-colors mb-4"
      >
        + Agregar elemento
      </button>
      <ul className="space-y-2">
        {elementos.map((el, index) => (
          <li
            key={index}
            className="bg-slate-100 text-slate-800 px-4 py-2 font-medium"
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaCreciente