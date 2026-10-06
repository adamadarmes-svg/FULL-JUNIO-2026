import { TIPOS } from '../../lib/constantes'
import { formatearFechaCompleta, formatearHora } from '../../lib/formato'

export default function MessageItem({ mensaje, esPropio = false, agrupado = false }) {
  const hora = formatearHora(mensaje.timestamp)
  const fechaCompleta = formatearFechaCompleta(mensaje.timestamp)

  if (mensaje.tipo === TIPOS.SISTEMA) {
    return (
      <p className="my-4 text-center text-[11px] uppercase tracking-[0.2em] text-stone-400">
        {mensaje.texto}
        {hora && (
          <time dateTime={new Date(mensaje.timestamp).toISOString()} title={fechaCompleta} className="ml-3 tabular-nums">
            {hora}
          </time>
        )}
      </p>
    )
  }

  const autor = mensaje.usuario?.nombre ?? 'Anónimo'

  return (
    <div className={`border-l pl-4 ${esPropio ? 'border-oro' : 'border-stone-200'} ${agrupado ? 'pt-1' : 'mt-5'}`}>
      {!agrupado && (
        <div className="mb-1 flex items-baseline gap-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em]">{esPropio ? 'Tú' : autor}</span>
          {hora && (
            <time title={fechaCompleta} className="text-[11px] tabular-nums text-stone-400">
              {hora}
            </time>
          )}
        </div>
      )}
      <p
        title={agrupado ? fechaCompleta : undefined}
        className="whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-700"
      >
        {mensaje.texto}
      </p>
    </div>
  )
}
