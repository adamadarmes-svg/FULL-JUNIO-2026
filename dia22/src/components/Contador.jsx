import { useState } from 'react'

const Contador = () => {
  const [numero, setNumero] = useState(0)

  const aumentar = () => {
    const aleatorio = Math.floor(Math.random() * 10) + 1
    setNumero(numero + aleatorio)
  }

  return (
    <div className="card w-fit">
      <p className="text-4xl font-bold txt-oro mb-4">{numero}</p>
      <button onClick={aumentar} className="btn btn-oro">
        Aumentar número aleatorio
      </button>
    </div>
  )
}

export default Contador
