export default function Spinner({ texto, pequeno = false }) {
  const cuadro = (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 animate-spin border ${
        pequeno ? 'h-3 w-3 border-current' : 'h-5 w-5 border-stone-900'
      }`}
    />
  )

  if (pequeno) {
    return (
      <span role="status" aria-label={texto || 'Cargando'} className="inline-flex">
        {cuadro}
      </span>
    )
  }

  return (
    <div role="status" className="flex items-center gap-4 text-stone-500">
      {cuadro}
      <span className={texto ? 'text-[11px] uppercase tracking-[0.3em]' : 'sr-only'}>{texto || 'Cargando'}</span>
    </div>
  )
}
