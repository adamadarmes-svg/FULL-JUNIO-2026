const BotonAlerta = () => {
  const manejarClic = () => {
    alert('¡Botón presionado!')
  }

  return (
    <div className="card w-fit">
      <button onClick={manejarClic} className="btn btn-rojo">
        Hazme clic
      </button>
    </div>
  )
}

export default BotonAlerta
