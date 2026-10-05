'use client'

import { useRef, useState } from 'react'

export default function NombreItem({ item, onEditar, onEliminar, procesando }) {
  const [editando, setEditando] = useState(false)
  const inputRef = useRef(null)

  const guardar = async () => {
    const valor = inputRef.current.value.trim()
    if (!valor) return
    await onEditar(item.id, valor)
    setEditando(false)
  }

  return (
    <li className="flex items-center gap-4 px-4 py-3">
      <span className="w-8 h-8 border border-neutral-200 text-neutral-400 flex items-center justify-center text-xs font-mono shrink-0">
        {item.id}
      </span>

      {editando ? (
        <input
          ref={inputRef}
          defaultValue={item.nombre}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') guardar()
            if (e.key === 'Escape') setEditando(false)
          }}
          className="flex-1 min-w-0 px-3 py-1 bg-white border border-neutral-900 focus:outline-none"
        />
      ) : (
        <span className="flex-1 text-sm">{item.nombre}</span>
      )}

      <div className="flex gap-1 shrink-0">
        {editando ? (
          <>
            <button
              onClick={guardar}
              disabled={procesando}
              className="px-3 py-1.5 bg-neutral-900 text-white hover:bg-neutral-700 disabled:opacity-50 text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className="px-3 py-1.5 border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditando(true)}
              disabled={procesando}
              className="px-3 py-1.5 border border-neutral-300 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 disabled:opacity-50 text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => onEliminar(item.id)}
              disabled={procesando}
              className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-50 text-[11px] uppercase tracking-wider cursor-pointer transition-colors"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  )
}