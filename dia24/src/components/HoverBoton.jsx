import { useState } from 'react'

const HoverBoton = () => {
  const [hover, setHover] = useState(false)

  const estiloBoton = {
    backgroundColor: hover ? '#12235a' : '#1e3a8a',
    color: '#f0f0f0',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    transition: '0.3s',
    transform: hover ? 'scale(1.05)' : 'scale(1)',
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        style={estiloBoton}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? 'Hover activo' : 'Pasa el mouse'}
      </button>
    </div>
  )
}

export default HoverBoton