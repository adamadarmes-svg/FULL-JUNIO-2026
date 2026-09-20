import { useState, useEffect, useRef } from 'react'

const ContadorPausa = () => {
  const [numero, setNumero] = useState(0)
  const [corriendo, setCorriendo] = useState(true)
  const intervaloRef = useRef(null)

  useEffect(() => {
    if (corriendo) {
      intervaloRef.current = setInterval(() => {
        const aleatorio = Math.floor(Math.random() * 10) + 1
        setNumero(n => n + aleatorio)
      }, 1000)
    }

    return () => clearInterval(intervaloRef.current)
  }, [corriendo])

  return (
    <div className="card w-fit">
      <p className="text-sm mb-2">Contador con pausa:</p>
      <p className="text-5xl font-bold txt-oro mb-4">{numero}</p>
      <button onClick={() => setCorriendo(!corriendo)} className={`btn ${corriendo ? 'btn-rojo' : 'btn-oro'}`}>
        {corriendo ? 'Pausar' : 'Reanudar'}
      </button>
    </div>
  )
}

export default ContadorPausa
