const BotonPersonalizado = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#b8942f] hover:bg-[#a07d24] text-white font-semibold px-4 py-2 rounded-none border-2 border-[#7a1f2b] cursor-pointer transition-colors mr-2 mb-4 uppercase tracking-wide"
    >
      {children}
    </button>
  )
}

export default BotonPersonalizado