import { useRef, useState } from 'react'
import { useChat } from '../../context/ChatContext'
import { ESTADOS, LIMITES } from '../../lib/constantes'
import Boton from '../ui/Boton'

const ALTURA_MAX = 160
const AVISO_CONTADOR = 400

export default function MessageForm() {
  const { estado, enviarMensaje } = useChat()
  const textoRef = useRef(null)
  const [contador, setContador] = useState(0)
  const [error, setError] = useState(null)

  const conectado = estado === ESTADOS.CONECTADO

  const ajustarAltura = () => {
    const campo = textoRef.current
    if (!campo) return
    campo.style.height = 'auto'
    const altura = Math.min(campo.scrollHeight, ALTURA_MAX)
    campo.style.height = `${altura}px`
    campo.style.overflowY = campo.scrollHeight > ALTURA_MAX ? 'auto' : 'hidden'
  }

  const alEscribir = () => {
    ajustarAltura()
    setContador(textoRef.current?.value.length ?? 0)
    if (error) setError(null)
  }

  const enviar = () => {
    const campo = textoRef.current
    if (!campo) return

    const texto = campo.value.trim()
    if (!texto || !conectado) return

    if (texto.length > LIMITES.MENSAJE_MAX) {
      setError(`Máximo ${LIMITES.MENSAJE_MAX} caracteres`)
      return
    }

    if (!enviarMensaje(texto)) {
      setError('No enviado')
      return
    }

    campo.value = ''
    campo.style.height = ''
    campo.style.overflowY = 'hidden'
    setContador(0)
    setError(null)
    campo.focus()
  }

  const alEnviar = (evento) => {
    evento.preventDefault()
    enviar()
  }

  const alPulsarTecla = (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey && !evento.nativeEvent.isComposing) {
      evento.preventDefault()
      enviar()
    }
  }

  return (
    <form onSubmit={alEnviar} className="border-t border-stone-200 px-4 py-4 sm:px-8">
      {!conectado && <p className="mb-2 text-xs text-amber-700">Sin conexión</p>}
      {error && (
        <p role="alert" className="mb-2 text-xs text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-end gap-4">
        <label htmlFor="mensaje" className="sr-only">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          ref={textoRef}
          rows={1}
          maxLength={LIMITES.MENSAJE_MAX}
          onInput={alEscribir}
          onKeyDown={alPulsarTecla}
          placeholder="Escribe"
          className="min-h-11 flex-1 resize-none overflow-hidden border-0 border-b border-stone-300 bg-transparent px-0 py-2.5 text-sm leading-6 transition-colors placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
        />
        <Boton tipo="submit" deshabilitado={!conectado} className="h-11">
          Enviar
        </Boton>
      </div>

      {contador > AVISO_CONTADOR && (
        <p
          aria-live="polite"
          className={`mt-1.5 text-right text-[11px] tabular-nums ${contador >= LIMITES.MENSAJE_MAX ? 'text-red-700' : 'text-amber-700'}`}
        >
          {contador}/{LIMITES.MENSAJE_MAX}
        </p>
      )}
    </form>
  )
}
