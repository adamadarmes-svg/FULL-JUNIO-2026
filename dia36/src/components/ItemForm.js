'use client'

import { useRef, useState } from 'react'
import { CATEGORIAS } from '@/lib/constantes'
import Alerta from './Alerta'

const campo = 'px-4 py-3 bg-white border border-neutral-200 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors'

export default function ItemForm({ onAgregar }) {
  const tituloRef = useRef(null)
  const descripcionRef = useRef(null)
  const categoriaRef = useRef(null)

  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError(null)

    const titulo = tituloRef.current.value.trim()

    if (!titulo) {
      setError('El título es obligatorio')
      tituloRef.current.focus()
      return
    }

    try {
      setEnviando(true)
      await onAgregar({
        titulo,
        descripcion: descripcionRef.current.value.trim(),
        categoria: categoriaRef.current.value,
      })
      tituloRef.current.value = ''
      descripcionRef.current.value = ''
      tituloRef.current.focus()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={manejarEnvio} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          ref={tituloRef}
          type="text"
          placeholder="Título del item..."
          maxLength={80}
          className={`flex-1 ${campo}`}
        />
        <select
          ref={categoriaRef}
          defaultValue="general"
          className={`${campo} capitalize cursor-pointer`}
        >
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <textarea
        ref={descripcionRef}
        rows={2}
        placeholder="Descripción (opcional)"
        maxLength={300}
        className={`w-full resize-none ${campo}`}
      />

      <Alerta tipo="error" mensaje={error} onCerrar={() => setError(null)} />

      <button
        type="submit"
        disabled={enviando}
        className="w-full py-3 border border-neutral-900 bg-neutral-900 text-neutral-50 text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-neutral-900 disabled:opacity-40 cursor-pointer transition-colors"
      >
        {enviando ? 'Guardando...' : '+ Añadir item'}
      </button>
    </form>
  )
}
