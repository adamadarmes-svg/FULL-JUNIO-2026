const Producto = ({ nombre, precio }) => {
  return (
    <ul className="bg-white rounded-none border-2 border-[#b8942f] p-4 mb-4 w-fit list-disc list-inside">
      <li className="text-[#2a1013]"><span className="font-semibold text-[#7a1f2b]">Producto:</span> {nombre}</li>
      <li className="text-[#2a1013]"><span className="font-semibold text-[#7a1f2b]">Precio:</span> {precio}€</li>
    </ul>
  )
}

export default Producto