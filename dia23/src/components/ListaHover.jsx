import { useState } from 'react'

const items = ['Manzana', 'Banana', 'Naranja', 'Uva']

const ListaHover = () => {
  const [hoverIndex, setHoverIndex] = useState(null)

  return (
    <div className="bg-white border border-neutral-200 p-6 mb-4 w-[42rem] min-h-72">
      <p className="text-neutral-500 text-sm mb-3">que pasa bro</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`px-4 py-2 cursor-pointer transition-all duration-300 font-medium ${
              hoverIndex === index
                ? 'bg-amber-800 text-white scale-110 translate-x-2'
                : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaHover