function ArticuloCard({ titulo, contenido }) {
  return (
    <div className="bg-white border border-black/10 p-4 hover:border-amber-600/50 transition-colors duration-300">
      <h3 className="text-sm font-medium text-black mb-1">{titulo}</h3>
      <p className="text-xs text-black/40 leading-relaxed">{contenido}</p>
    </div>
  )
}

export default ArticuloCard
