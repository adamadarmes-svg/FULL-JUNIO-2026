import { useState, useEffect, useRef } from 'react'

const ValorPrevio = () => {
  const [contador, setContador] = useState(0)
  const prevContador = useRef(0)

  useEffect(() => {
    prevContador.current = contador
  }, [contador])

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Harald Sigurdsson
      </p>
      <div className="flex justify-center gap-16 mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Valor anterior</p>
          <p className="text-4xl font-bold text-gray-400">
            {prevContador.current}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Valor actual</p>
          <p className="text-4xl font-bold text-green-600">{contador}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setContador(c => c + 1)}
          className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-8 py-2 cursor-pointer transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default ValorPrevio
