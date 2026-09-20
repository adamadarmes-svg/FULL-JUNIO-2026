import { useState } from 'react'

const CampoTexto = () => {
  const [texto, setTexto] = useState('')

  const manejarCambio = (e) => {
    setTexto(e.target.value)
  }

  return (
    <div className="card w-fit">
      <input
        type="text"
        value={texto}
        onChange={manejarCambio}
        placeholder="Escribe algo..."
        className="input w-64 mb-4"
      />
      <p>
        Lo que escribes: <span className="font-semibold txt-oro">{texto}</span>
      </p>
    </div>
  )
}

export default CampoTexto
