const estilos = {
  error:  'border-red-200 border-l-red-500 bg-red-50 text-red-700',
  exito:  'border-emerald-200 border-l-emerald-500 bg-emerald-50 text-emerald-700',
}

const iconos = { error: ':(', exito: ':)' }

export default function Alerta({ tipo = 'error', mensaje, onCerrar }) {
  if (!mensaje) return null

  return (
    <div className={`flex items-center gap-3 px-4 py-3 border border-l-2 text-sm ${estilos[tipo]}`}>
      <span className="font-mono text-xs">{iconos[tipo]}</span>
      <p className="flex-1">{mensaje}</p>
      {onCerrar && (
        <button onClick={onCerrar} className="opacity-50 hover:opacity-100 cursor-pointer">
          ✕
        </button>
      )}
    </div>
  )
}
