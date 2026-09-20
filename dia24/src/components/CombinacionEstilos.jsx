const baseStyle = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '0px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
  marginRight: '10px',
}

const primaryStyle = {
  backgroundColor: '#1e3a8a',
  color: '#f0f0f0',
}

const secondaryStyle = {
  backgroundColor: '#4b5563',
  color: '#f0f0f0',
}

const dangerStyle = {
  backgroundColor: '#991b1b',
  color: '#f0f0f0',
}

const CombinacionEstilos = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ marginBottom: '10px', color: '#555' }}>
        hola
      </p>
      <button style={{ ...baseStyle, ...primaryStyle }}>
        Primario
      </button>
      <button style={{ ...baseStyle, ...secondaryStyle }}>
        Secundario
      </button>
      <button style={{ ...baseStyle, ...dangerStyle }}>
        Peligro
      </button>
    </div>
  )
}

export default CombinacionEstilos