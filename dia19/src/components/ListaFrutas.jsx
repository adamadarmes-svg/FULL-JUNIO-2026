function ListaFrutas({ frutas }) {
  return (
    <div className="bg-neutral-50 border border-amber-600/25 p-6 hover:border-amber-600/60 transition-colors duration-300">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-amber-600/90 uppercase">Frutas</h2>
        <span className="text-xs text-black/30 font-mono">{frutas.length}</span>
      </div>
      <ul>
        {frutas.map((fruta, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-black/80 text-sm py-2.5 border-b border-black/10 last:border-0"
          >
            <span className="w-5 h-5 border border-amber-600/30 flex items-center justify-center text-amber-700 text-[10px] font-mono">
              {index + 1}
            </span>
            {fruta}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaFrutas
