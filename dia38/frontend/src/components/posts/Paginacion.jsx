const clase =
  'etiqueta cursor-pointer text-stone-500 transition-colors hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-30'

export default function Paginacion({ paginacion, onCambiar }) {
  if (!paginacion || paginacion.totalPaginas <= 1) return null

  const { pagina, totalPaginas } = paginacion
  const dosCifras = (n) => String(n).padStart(2, '0')

  return (
    <nav aria-label="Paginación" className="mt-10 flex items-center justify-between">
      <button type="button" onClick={() => onCambiar(pagina - 1)} disabled={pagina <= 1} className={clase}>
        ← Anteriores
      </button>
      <span className="font-mono text-sm">
        {dosCifras(pagina)} <span className="text-stone-400">/ {dosCifras(totalPaginas)}</span>
      </span>
      <button type="button" onClick={() => onCambiar(pagina + 1)} disabled={pagina >= totalPaginas} className={clase}>
        Siguientes →
      </button>
    </nav>
  )
}
