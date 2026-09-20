const styles = {
  contenedor: {
    marginBottom: '20px',
  },
  titulo: {
    color: '#5b21b6',
    fontSize: '28px',
    marginBottom: '10px',
  },
  boton: {
    backgroundColor: '#b45309',
    color: '#f0f0f0',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
  },
}

const ObjetoEstilos = () => {
  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>La Teoría de Cuerdas</h1>
      <button style={styles.boton}>Propone que las partículas fundamentales no son puntos, sino cuerdas diminutas cuyas vibraciones generan todas las fuerzas y partículas del universo.</button>
    </div>
  )
}

export default ObjetoEstilos