import { useState, useEffect } from 'react'

const Temporizador = () => {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(s => s + 1)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="card w-fit">
      <p className="text-sm mb-2">Segundos transcurridos:</p>
      <p className="text-5xl font-bold txt-rojo">{segundos}s</p>
    </div>
  )
}

export default Temporizador
