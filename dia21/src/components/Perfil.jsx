const Perfil = ({ nombre, edad }) => {
  return (
    <div className="bg-white rounded-none border-2 border-[#b8942f] p-4 mb-4 w-fit">
      <p className="text-[#2a1013]"><span className="font-semibold text-[#7a1f2b]">Nombre:</span> {nombre}</p>
      <p className="text-[#2a1013]"><span className="font-semibold text-[#7a1f2b]">Edad:</span> {edad}</p>
    </div>
  )
}

export default Perfil