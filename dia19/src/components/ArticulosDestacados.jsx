import ArticuloCard from './ArticuloCard'

function ArticulosDestacados({ articulos }) {
  const destacados = articulos.filter((a) => a.destacado)

  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase">Destacados</h2>
        <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 font-mono">
          {destacados.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {destacados.map((articulo) => (
          <ArticuloCard
            key={articulo.id}
            titulo={articulo.titulo}
            contenido={articulo.contenido}
          />
        ))}
      </div>
    </div>
  )
}

export default ArticulosDestacados
