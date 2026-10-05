const COLORES = {
  error: 'border-red-600 text-red-700',
  exito: 'border-emerald-600 text-emerald-700',
  info: 'border-stone-900 text-stone-700',
}

export default function Alerta({ tipo = 'error', mensaje, onCerrar }) {
  if (!mensaje) return null

  return (
    <div
      role={tipo === 'error' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-4 border-l-2 bg-white px-4 py-3 text-sm ${COLORES[tipo] || COLORES.error}`}
    >
      <p>{mensaje}</p>
      {onCerrar && (
        <button type="button" onClick={onCerrar} className="etiqueta cursor-pointer opacity-60 transition-opacity hover:opacity-100">
          Cerrar
        </button>
      )}
    </div>
  )
}
