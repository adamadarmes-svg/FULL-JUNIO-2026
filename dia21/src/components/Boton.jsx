const Boton = ({ texto, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#7a1f2b] hover:bg-[#621822] text-white font-semibold px-4 py-2 rounded-none border-2 border-[#b8942f] cursor-pointer transition-colors mb-4 uppercase tracking-wide"
    >
      {texto}
    </button>
  )
}

export default Boton