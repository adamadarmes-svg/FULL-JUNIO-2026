import { useState, useEffect } from 'react'

const DetectorTecla = () => {
  const [tecla, setTecla] = useState('')
  const [alerta, setAlerta] = useState(false)

  useEffect(() => {
    const manejarTecla = (e) => {
      setTecla(e.key)
      if (e.key === 'Enter') setAlerta(true)
      else setAlerta(false)
    }

    window.addEventListener('keydown', manejarTecla)

    return () => window.removeEventListener('keydown', manejarTecla)
  }, [])

  return (
    <div className="card w-fit">
      <p className="text-sm mb-2">Presiona cualquier tecla:</p>
      <p className="text-2xl font-bold mb-2">
        {tecla ? `"${tecla}"` : 'Esperando tecla...'}
      </p>
      {alerta && <p className="txt-oro font-semibold">Presionaste Enter</p>}
    </div>
  )
}

export default DetectorTecla
