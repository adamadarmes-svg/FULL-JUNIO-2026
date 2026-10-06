import { useChat } from '../../context/ChatContext'
import { ESTADOS } from '../../lib/constantes'

const CONFIG = {
  [ESTADOS.CONECTANDO]: { color: 'bg-amber-500 animate-pulse', texto: 'Conectando' },
  [ESTADOS.CONECTADO]: { color: 'bg-emerald-600', texto: 'En línea' },
  [ESTADOS.DESCONECTADO]: { color: 'bg-red-700', texto: 'Sin conexión' },
  [ESTADOS.ERROR]: { color: 'bg-red-700', texto: 'Error' },
}

export default function ConnectionStatus() {
  const { estado, error, reconectar } = useChat()
  const config = CONFIG[estado] ?? CONFIG[ESTADOS.DESCONECTADO]
  const caido = estado === ESTADOS.DESCONECTADO || estado === ESTADOS.ERROR

  return (
    <div
      className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500"
      title={error ?? undefined}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 ${config.color}`} />
      <span aria-live="polite">{config.texto}</span>
      {caido && (
        <button
          type="button"
          onClick={reconectar}
          className="ml-2 cursor-pointer text-stone-900 underline underline-offset-4 transition-colors hover:text-oro"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
