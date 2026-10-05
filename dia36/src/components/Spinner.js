export default function Spinner({ texto = 'Cargando...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-neutral-400">
      <span className="w-4 h-4 border border-neutral-300 border-t-neutral-900 animate-spin" />
      <span className="text-xs uppercase tracking-[0.2em]">{texto}</span>
    </div>
  )
}
