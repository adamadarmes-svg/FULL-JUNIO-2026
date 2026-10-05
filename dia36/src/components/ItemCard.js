'use client'

import { useRef, useState } from 'react'
import { formatearFecha, COLORES_CATEGORIA } from '@/lib/formato'

const boton = 'px-3 py-1.5 border text-xs uppercase tracking-[0.15em] disabled:opacity-40 cursor-pointer transition-colors'

export default function ItemCard({ item, onActualizar, onEliminar, procesando }) {
  const [editando, setEditando] = useState(false)
  const tituloRef = useRef(null)
  const descripcionRef = useRef(null)

  const guardar = async () => {
    const titulo = tituloRef.current.value.trim()
    if (!titulo) return
    await onActualizar(item.id, {
      titulo,
      descripcion: descripcionRef.current.value.trim(),
      categoria: item.categoria,
      completado: item.completado,
    })
    setEditando(false)
  }

  const alternar = () => onActualizar(item.id, { completado: !item.completado })

  const confirmarEliminar = () => {
    if (window.confirm(`¿Eliminar "${item.titulo}"?`)) onEliminar(item.id)
  }

  return (
    <li className={`p-5 transition-colors ${item.completado ? 'bg-neutral-50' : 'hover:bg-neutral-50'}`}>
      {editando ? (
        <div className="space-y-3">
          <input
            ref={tituloRef}
            defaultValue={item.titulo}
            autoFocus
            maxLength={80}
            className="w-full px-3 py-2 bg-white border border-neutral-900 focus:outline-none"
          />
          <textarea
            ref={descripcionRef}
            defaultValue={item.descripcion}
            rows={2}
            maxLength={300}
            className="w-full px-3 py-2 bg-white border border-neutral-200 focus:outline-none focus:border-neutral-900 resize-none transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={guardar}
              disabled={procesando}
              className={`${boton} border-neutral-900 bg-neutral-900 text-neutral-50 hover:bg-transparent hover:text-neutral-900`}
            >
              Guardar
            </button>
            <button
              onClick={() => setEditando(false)}
              className={`${boton} border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900`}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4">
          <button
            onClick={alternar}
            disabled={procesando}
            aria-label={item.completado ? 'Marcar como pendiente' : 'Marcar como completado'}
            className={`mt-0.5 w-5 h-5 border shrink-0 flex items-center justify-center cursor-pointer transition-colors ${
              item.completado
                ? 'bg-neutral-900 border-neutral-900'
                : 'border-neutral-300 hover:border-neutral-900'
            }`}
          >
            {item.completado && <span className="text-[10px] leading-none text-neutral-50">✓</span>}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className={`font-medium ${item.completado ? 'line-through text-neutral-400' : ''}`}>
                {item.titulo}
              </h3>
              <span className={`px-2 py-0.5 border text-[10px] uppercase tracking-[0.15em] ${COLORES_CATEGORIA[item.categoria]}`}>
                {item.categoria}
              </span>
            </div>

            {item.descripcion && (
              <p className="text-sm text-neutral-500 mt-1.5">{item.descripcion}</p>
            )}

            <p className="font-mono text-[11px] text-neutral-400 mt-3">{formatearFecha(item.createdAt)}</p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setEditando(true)}
              disabled={procesando}
              className={`${boton} border-neutral-200 text-neutral-600 hover:border-neutral-900 hover:text-neutral-900`}
            >
              Editar
            </button>
            <button
              onClick={confirmarEliminar}
              disabled={procesando}
              className={`${boton} border-neutral-200 text-neutral-400 hover:border-red-500 hover:text-red-600`}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
