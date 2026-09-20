import { useState, useEffect } from 'react'

const AppTema = () => {
  const [oscuro, setOscuro] = useState(() => {
    return localStorage.getItem('oscuro') === 'true'
  })

  const [animado, setAnimado] = useState(() => {
    return localStorage.getItem('animado') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('oscuro', oscuro)
  }, [oscuro])

  useEffect(() => {
    localStorage.setItem('animado', animado)
  }, [animado])

  return (
    <div
      className={`border p-8 mb-4 w-[42rem] min-h-72 transition-all duration-700 ${
        oscuro ? 'bg-neutral-950 text-white border-neutral-800' : 'bg-white text-neutral-800 border-neutral-200'
      } ${animado ? 'animacion-pulsar' : ''}`}
    >
      <h2 className="text-2xl font-bold mb-2">
        {oscuro ? 'Modo Oscuro' : 'Modo Claro'}
      </h2>
      <p className={`text-sm mb-6 ${oscuro ? 'text-neutral-400' : 'text-neutral-500'}`}>
        Animación: {animado ? 'Activa' : 'Desactivada'}
      </p>

      <div
        className={`p-4 mb-6 transition-all duration-500 ${
          oscuro ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-700'
        } ${animado ? 'animacion-mover' : ''}`}
      >
        <p className="font-medium">Publio Cornelio Escipión Africano</p>
        <p className="text-sm mt-1">
          fue un general y político romano, nombrado cónsul en los años 205 a. C. y 194 a. C. Comenzó su carrera militar a inicios de la segunda guerra púnica el 218 a. C.; según algunas fuentes, fue uno de los comandantes que lograron sobrevivir de la batalla de Cannas en el 216 a. C
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setOscuro(!oscuro)}
          className={`font-semibold px-5 py-2 cursor-pointer transition-all duration-300 ${
            oscuro
              ? 'bg-amber-600 text-neutral-900 hover:bg-amber-500'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          }`}
        >
          {oscuro ? 'Modo Claro' : 'Modo Oscuro'}
        </button>

        <button
          onClick={() => setAnimado(!animado)}
          className={`font-semibold px-5 py-2 cursor-pointer transition-all duration-300 ${
            animado
              ? 'bg-rose-800 text-white hover:bg-rose-900'
              : 'bg-emerald-800 text-white hover:bg-emerald-900'
          }`}
        >
          {animado ? 'Parar animación' : 'Activar animación'}
        </button>
      </div>
    </div>
  )
}

export default AppTema