const Tarea = ({ texto, completada }) => {
  const estilo = {
    textDecoration: completada ? 'line-through' : 'none',
  }

  return (
    <p
      style={estilo}
      className={`mb-2 text-lg ${completada ? 'text-[#b8942f]' : 'text-[#2a1013]'}`}
    >
      {completada ? '✅' : '⏳'} {texto}
    </p>
  )
}

export default Tarea