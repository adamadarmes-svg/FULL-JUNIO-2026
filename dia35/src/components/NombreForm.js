'use client'

import { useRef, useState } from 'react'

export default function NombreForm({ onAgregar }) {
  const inputRef = useRef(null)
  const [mensaje, setMensaje] = useState(null)
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    const valor = inputRef.current.value.trim()

    setMensaje(null)
    setError(null)

    if (!valor) {
      setError('Escribe un nombre antes de enviar')
      inputRef.current.focus()
      return
    }

    try {
      setEnviando(true)
      await onAgregar(valor)
      setMensaje(`"${valor}" añadido correctamente`)
      inputRef.current.value = ''
      inputRef.current.focus()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={manejarEnvio} className="flex">
        <input
          ref={inputRef}
          type="text"
          placeholder="Escribe un nombre..."
          maxLength={40}
          className="flex-1 min-w-0 px-4 py-3 bg-white border border-r-0 border-neutral-300 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
        />
        <button
          type="submit"
          disabled={enviando}
          className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-700 disabled:opacity-50 text-xs uppercase tracking-widest cursor-pointer transition-colors"
        >
          {enviando ? 'Enviando...' : 'Añadir'}
        </button>
      </form>

      {mensaje && (
        <p className="px-4 py-2 border-l-2 border-emerald-600 bg-emerald-50 text-emerald-700 text-sm">
          {mensaje}
        </p>
      )}
      {error && (
        <p className="px-4 py-2 border-l-2 border-red-600 bg-red-50 text-red-700 text-sm">
          {error}
        </p>
      )}
    </div>
  )
}