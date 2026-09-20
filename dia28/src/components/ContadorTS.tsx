import { useState } from 'react'

const ContadorTS = () => {
  const [contador, setContador] = useState<number>(0)

  const incrementar = (): void => {
    setContador(contador + 1)
  }

  const decrementar = (): void => {
    setContador(contador - 1)
  }

  const resetear = (): void => {
    setContador(0)
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <p className="text-gray-500 text-sm mb-2">Iván el Terrible</p>
      <p className="text-5xl font-bold text-center text-gray-900 mb-4">
        {contador}
      </p>
      <div className="flex gap-2">
        <button
          onClick={decrementar}
          className="flex-1 border border-gray-300 text-gray-800 font-bold px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <button
          onClick={resetear}
          className="flex-1 border border-gray-300 text-gray-800 font-bold px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={incrementar}
          className="flex-1 border border-gray-300 text-gray-800 font-bold px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default ContadorTS