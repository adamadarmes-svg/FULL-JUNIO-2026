import { useChat } from '../../context/ChatContext'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { TIPOS } from '../../lib/constantes'
import { esMismoMinuto } from '../../lib/formato'
import MessageItem from './MessageItem'

export default function MessageList() {
  const { mensajes, nombre } = useChat()
  const { contenedorRef, finalRef, hayNuevos, irAlFinal } = useAutoScroll(mensajes)

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={contenedorRef}
        role="log"
        aria-label="Mensajes"
        className="flex flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-8"
      >
        {mensajes.length === 0 ? (
          <p className="m-auto font-serif text-3xl font-light text-stone-300">Sin mensajes</p>
        ) : (
          mensajes.map((mensaje, indice) => {
            const anterior = mensajes[indice - 1]
            const esMensaje = mensaje.tipo === TIPOS.MENSAJE
            const esPropio = esMensaje && mensaje.usuario?.nombre === nombre
            const agrupado =
              esMensaje &&
              anterior?.tipo === TIPOS.MENSAJE &&
              anterior.usuario?.nombre === mensaje.usuario?.nombre &&
              esMismoMinuto(anterior.timestamp, mensaje.timestamp)

            return (
              <MessageItem
                key={mensaje.id ?? `${mensaje.timestamp}-${indice}`}
                mensaje={mensaje}
                esPropio={esPropio}
                agrupado={agrupado}
              />
            )
          })
        )}
        <div ref={finalRef} />
      </div>

      {hayNuevos && (
        <button
          type="button"
          onClick={irAlFinal}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer bg-stone-900 px-5 py-2 text-[11px] uppercase tracking-[0.2em] text-stone-50 transition-colors hover:bg-stone-700"
        >
          Nuevos ↓
        </button>
      )}
    </div>
  )
}
