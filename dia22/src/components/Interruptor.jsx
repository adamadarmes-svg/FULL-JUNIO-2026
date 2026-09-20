import { useState } from 'react'

const Interruptor = () => {
  const [encendido, setEncendido] = useState(false)

  const alternar = () => {
    setEncendido(!encendido)
  }

  return (
    <div className="card w-fit">
      <p className={`text-lg font-bold mb-4 ${encendido ? 'txt-oro' : 'txt-rojo'}`}>
        ■ {encendido ? 'Encendido' : 'Apagado'}
      </p>
      <button onClick={alternar} className={`btn ${encendido ? 'btn-rojo' : 'btn-oro'}`}>
        {encendido ? 'Apagar' : 'Encender'}
      </button>
    </div>
  )
}

export default Interruptor
