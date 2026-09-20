import { useState, useRef } from 'react'

const Temporizador = () => {
  const [segundos, setSegundos] = useState(0)
  const [corriendo, setCorriendo] = useState(false)

  const intervaloRef = useRef(null)

  const iniciar = () => {
    if (intervaloRef.current) return

    setCorriendo(true)
    intervaloRef.current = setInterval(() => {
      setSegundos(s => s + 1)
    }, 1000)
  }

  const detener = () => {
    clearInterval(intervaloRef.current)
    intervaloRef.current = null
    setCorriendo(false)
  }

  const resetear = () => {
    detener()
    setSegundos(0)
  }

  const formatear = (s) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Balduino IV de Jerusalén
      </p>
      <p className="text-6xl font-mono font-bold text-center text-gray-900 mb-6">
        {formatear(segundos)}
      </p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={iniciar}
          disabled={corriendo}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Iniciar
        </button>
        <button
          onClick={detener}
          disabled={!corriendo}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Detener
        </button>
        <button
          onClick={resetear}
          className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Temporizador
