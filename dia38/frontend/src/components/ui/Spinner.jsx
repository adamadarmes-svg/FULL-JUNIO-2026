export default function Spinner({ texto = 'Cargando…', pequeno = false }) {
  const cuadro = <span className="inline-block h-3 w-3 animate-spin border border-current" />

  if (pequeno) return <span role="status" aria-label="Cargando">{cuadro}</span>

  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-stone-500">
      {cuadro}
      <span className="etiqueta">{texto}</span>
    </div>
  )
}
