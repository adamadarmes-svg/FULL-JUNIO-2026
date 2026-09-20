import { useState } from 'react'

const CuadradoInteractivo = () => {
  const [hover, setHover] = useState(false)
  const [clic, setClic] = useState(false)

  return (
    <div className="bg-white border border-neutral-200 p-6 mb-4 w-[42rem] min-h-72 flex items-center justify-center">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setClic(!clic)}
        className={`w-32 h-32 cursor-pointer transition-all duration-300 flex items-center justify-center font-semibold text-white ${
          hover ? 'bg-indigo-800' : 'bg-slate-600'
        } ${
          clic ? 'border-4 border-amber-600' : 'border-4 border-transparent'
        }`}
      >
        {clic ? '🖱 Clic' : hover ? 'Hover' : 'Normal'}
      </div>
    </div>
  )
}

export default CuadradoInteractivo