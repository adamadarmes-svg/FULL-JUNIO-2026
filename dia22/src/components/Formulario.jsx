import { useState } from 'react'

const Formulario = () => {
  const [input, setInput] = useState('')
  const [enviado, setEnviado] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()
    setEnviado(input)
    setInput('')
  }

  return (
    <div className="card w-fit">
      <form onSubmit={manejarEnvio} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe algo..."
          className="input"
        />
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
      {enviado && (
        <p>
          Enviaste: <span className="font-bold">{enviado}</span>
        </p>
      )}
    </div>
  )
}

export default Formulario
