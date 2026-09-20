import { useRef } from 'react'

const contenido = Array.from({ length: 20 }, (_, i) => `Número: ${i + 1}`)

const ScrollContenido = () => {
  const divRef = useRef(null)

  const irAlFinal = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight
  }

  const irAlInicio = () => {
    divRef.current.scrollTop = 0
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Balduino IV de Jerusalén
      </p>

      <div
        ref={divRef}
        className="h-48 overflow-y-auto border border-gray-200 p-4 mb-4 w-full"
      >
        {contenido.map((linea, index) => (
          <p
            key={index}
            className={`py-1 text-sm text-center border-b border-gray-100 ${
              index === contenido.length - 1 ? 'text-blue-600 font-bold' : 'text-gray-600'
            }`}
          >
            {linea}
          </p>
        ))}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={irAlInicio}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Ir al inicio
        </button>
        <button
          onClick={irAlFinal}
          className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Ir al final
        </button>
      </div>
    </div>
  )
}

export default ScrollContenido
