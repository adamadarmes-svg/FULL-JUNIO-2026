import { useState, useEffect } from 'react'

const ContadorAuto = () => {
  const [numero, setNumero] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      const aleatorio = Math.floor(Math.random() * 10) + 1
      setNumero(n => n + aleatorio)
    }, 1000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <div className="card w-fit">
      <p className="text-sm mb-2">Aumenta solo cada segundo:</p>
      <p className="text-5xl font-bold">{numero}</p>
    </div>
  )
}

export default ContadorAuto
