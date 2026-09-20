import { useState, useEffect } from 'react'

const colores = [
  { fondo: '#c9a227', texto: '#111111' },
  { fondo: '#b3121c', texto: '#ffffff' },
  { fondo: '#111111', texto: '#ffffff' },
  { fondo: '#ffffff', texto: '#111111' },
]

const ColorFondo = () => {
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setColorIndex(i => (i + 1) % colores.length)
    }, 3000)

    return () => clearInterval(intervalo)
  }, [])

  const actual = colores[colorIndex]

  return (
    <div
      className="card w-fit transition-all duration-700"
      style={{ backgroundColor: actual.fondo, color: actual.texto }}
    >
      <p className="font-semibold">El fondo cambia cada 3 segundos</p>
      <p className="text-sm opacity-70">Color actual: {actual.fondo}</p>
    </div>
  )
}

export default ColorFondo
