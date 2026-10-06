const ESTILOS = {
  error: 'border-red-700 text-red-800',
  exito: 'border-emerald-700 text-emerald-800',
  info: 'border-oro text-stone-700',
}

export default function Alerta({ tipo = 'info', mensaje, onCerrar }) {
  if (!mensaje) return null

  return (
    <div
      role={tipo === 'error' ? 'alert' : 'status'}
      className={`flex items-center gap-3 border-l-2 bg-white px-4 py-2.5 text-sm ${ESTILOS[tipo] ?? ESTILOS.info}`}
    >
      <p className="min-w-0 flex-1 break-words">{mensaje}</p>
      {onCerrar && (
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="cursor-pointer px-1 text-xs opacity-60 transition-opacity hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  )
}
