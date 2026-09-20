import { useState, useRef } from 'react'

const ContadorRenders = () => {
  const [contador, setContador] = useState(0)

  const renders = useRef(0)

  renders.current += 1

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Flavius Aetius
      </p>
      <div className="flex justify-center gap-16 mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Contador</p>
          <p className="text-4xl font-bold text-blue-600">{contador}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs mb-1">Renders</p>
          <p className="text-4xl font-bold text-purple-600">{renders.current}</p>
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
      <p className="text-gray-400 text-xs text-center mt-4">
        Flavius Valerius Constantinus
      </p>
    </div>
  )
}

export default ContadorRenders
