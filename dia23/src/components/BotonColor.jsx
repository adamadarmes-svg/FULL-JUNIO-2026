import { useState } from 'react'

const BotonColor = () => {
  const [activo, setActivo] = useState(false)

  return (
    <div className="bg-white border border-neutral-200 p-6 mb-4 w-[42rem] min-h-72 flex items-center justify-center">
      <button
        onClick={() => setActivo(!activo)}
        className={`font-semibold px-6 py-3 cursor-pointer transition-all duration-300 ${
          activo
            ? 'bg-emerald-800 text-white scale-105'
            : 'bg-neutral-200 text-neutral-800'
        }`}
      >
        {activo ? 'Activado' : 'Inactivo'}
      </button>
    </div>
  )
}

export default BotonColor