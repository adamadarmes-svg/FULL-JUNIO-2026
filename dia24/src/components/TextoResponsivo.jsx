const TextoResponsivo = () => {
  const ancho = window.innerWidth

  const estiloTexto = {
    fontSize: ancho < 600 ? '14px' : '22px',
    color: ancho < 600 ? '#991b1b' : '#166534',
    fontWeight: 'bold',
    padding: '10px',
    backgroundColor: ancho < 600 ? '#ffe5e5' : '#e5ffe5',
    borderRadius: '0px',
    marginBottom: '20px',
    transition: '0.3s',
  }

  return (
    <div style={estiloTexto}>
      {ancho < 600
        ? `hola bro (${ancho}px) texto rojo pequeño`
        : `hola bro (${ancho}px) texto verde grande`
      }
    </div>
  )
}

export default TextoResponsivo