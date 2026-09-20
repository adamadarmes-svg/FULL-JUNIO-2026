import { useState, useEffect } from 'react'

const AppModoOscuro = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize')) || 16
  })

  const [autoMode, setAutoMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  useEffect(() => {
    if (!autoMode) return

    const intervalo = setInterval(() => {
      setDarkMode(prev => !prev)
    }, 5000)

    return () => clearInterval(intervalo)
  }, [autoMode])

  const buttonStyle = {
    padding: '12px 22px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '12px',
    marginTop: '12px',
  }

  const contenedorStyle = {
    color: darkMode ? '#eaeaea' : '#1a1a2e',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const tarjetaStyle = {
    backgroundColor: darkMode ? '#1a1a2e' : '#ffffff',
    borderRadius: '0px',
    padding: '30px',
    width: '100%',
    maxWidth: '820px',
    boxShadow: darkMode
      ? '0 10px 30px rgba(0,0,0,0.5)'
      : '0 10px 30px rgba(0,0,0,0.15)',
  }

  const tarjetaNivelStyle = {
    backgroundColor: darkMode ? '#1a1a2e' : '#ffffff',
    borderRadius: '0px',
    padding: '24px 30px',
    width: '100%',
    maxWidth: '820px',
    boxShadow: darkMode
      ? '0 10px 30px rgba(0,0,0,0.5)'
      : '0 10px 30px rgba(0,0,0,0.15)',
    marginTop: '24px',
    boxSizing: 'border-box',
  }

  const tituloStyle = {
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    marginBottom: '8px',
  }

  const subtituloStyle = {
    fontSize: `${fontSize - 4}px`,
    color: darkMode ? '#a0a0b0' : '#666',
    marginBottom: '24px',
  }

  return (
    <div style={contenedorStyle}>
      <div style={tarjetaStyle}>

        <h2 style={tituloStyle}>
          {darkMode ? 'Modo Oscuro' : 'Modo Claro'}
        </h2>
        <p style={subtituloStyle}>
          Tamaño de fuente {fontSize}px
          {autoMode && ' — Auto cada 5s'}
        </p>

        <button
          style={{
            ...buttonStyle,
            backgroundColor: darkMode ? '#a16207' : '#1e3a8a',
            color: '#f0f0f0',
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? 'Cambiar a Claro' : 'Cambiar a Oscuro'}
        </button>

      </div>

      <div style={tarjetaNivelStyle}>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: darkMode ? '#a0a0b0' : '#666' }}>
          tamaño de texto
        </p>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: '#166534',
            color: '#f0f0f0',
          }}
          onClick={() => setFontSize(prev => prev + 2)}
        >
          Aumentar
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: fontSize <= 12 ? '#9ca3af' : '#991b1b',
            color: '#f0f0f0',
            cursor: fontSize <= 12 ? 'not-allowed' : 'pointer',
          }}
          onClick={() => setFontSize(prev => prev > 12 ? prev - 2 : prev)}
        >
          Reducir
        </button>
      </div>

      <div style={tarjetaNivelStyle}>
        <p style={{ marginBottom: '8px', fontSize: '14px', color: darkMode ? '#a0a0b0' : '#666' }}>
          Modo automático
        </p>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: autoMode ? '#991b1b' : '#5b21b6',
            color: '#f0f0f0',
          }}
          onClick={() => setAutoMode(!autoMode)}
        >
          {autoMode ? 'Parar auto' : 'Activar auto'}
        </button>
      </div>

    </div>
  )
}

export default AppModoOscuro
