import { useState, useEffect } from 'react'

const LlamadaAPI = () => {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(res => res.json())
      .then(data => setUsuario(data.results[0]))
  }, [])

  return (
    <div className="card w-fit">
      {usuario ? (
        <div className="flex items-center gap-4">
          <img
            src={usuario.picture.large}
            alt="Usuario"
            className="w-16 h-16 border border-black"
          />
          <div>
            <p className="font-bold">
              {usuario.name.first} {usuario.name.last}
            </p>
            <p className="text-sm">{usuario.email}</p>
          </div>
        </div>
      ) : (
        <p className="txt-rojo">Cargando usuario...</p>
      )}
    </div>
  )
}

export default LlamadaAPI
