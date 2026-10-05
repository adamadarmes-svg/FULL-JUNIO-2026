import { useRef, useState } from 'react'
import { LIMITES } from '../../lib/constantes'
import Boton from '../ui/Boton'

export default function CommentForm({ onEnviar, textoBoton = 'Comentar', valorInicial = '', onCancelar, compacto = false }) {
  const contenidoRef = useRef(null)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contenido = contenidoRef.current.value.trim()

    const fallo = !contenido
      ? 'El comentario no puede estar vacío'
      : contenido.length > LIMITES.COMENTARIO_MAX
        ? `El comentario no puede superar los ${LIMITES.COMENTARIO_MAX} caracteres`
        : null

    if (fallo) {
      setError(fallo)
      contenidoRef.current.focus()
      return
    }

    setError(null)
    setEnviando(true)
    try {
      await onEnviar(contenido)
      if (contenidoRef.current) {
        contenidoRef.current.value = ''
        contenidoRef.current.focus()
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <textarea
        ref={contenidoRef}
        defaultValue={valorInicial}
        rows={compacto ? 2 : 3}
        maxLength={LIMITES.COMENTARIO_MAX}
        placeholder="Escribe tu opinión…"
        aria-label="Comentario"
        aria-invalid={Boolean(error)}
        className={`w-full resize-none border bg-white px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-stone-900 ${
          error ? 'border-red-600' : 'border-stone-300'
        }`}
      />
      <div className="flex items-center justify-between gap-3">
        <p className={`text-xs ${error ? 'text-red-600' : 'text-stone-500'}`}>
          {error || `Hasta ${LIMITES.COMENTARIO_MAX} caracteres`}
        </p>
        <div className="flex shrink-0 gap-2">
          {onCancelar && (
            <Boton variante="fantasma" onClick={onCancelar} deshabilitado={enviando}>
              Cancelar
            </Boton>
          )}
          <Boton tipo="submit" cargando={enviando}>
            {textoBoton}
          </Boton>
        </div>
      </div>
    </form>
  )
}
