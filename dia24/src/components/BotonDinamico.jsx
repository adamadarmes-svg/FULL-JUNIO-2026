import { useState } from 'react'

const BotonDinamico = () => {
  const [esRojo, setEsRojo] = useState(false)

  const estiloBoton = {
    backgroundColor: esRojo ? '#991b1b' : '#1e3a8a',
    color: '#f0f0f0',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    transition: '0.3s',
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        style={estiloBoton}
        onClick={() => setEsRojo(!esRojo)}
      >
        {esRojo ? 'Rojo' : 'Azul'} clic para cambiar
      </button>
    </div>
  )
}

export default BotonDinamico