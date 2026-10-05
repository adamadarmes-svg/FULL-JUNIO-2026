'use client'

import useNombres from '@/hooks/useNombres'
import NombreForm from './NombreForm'
import NombreItem from './NombreItem'

export default function ListaNombres() {
  const { nombres, cargando, error, procesandoId, agregar, editar, eliminar, recargar } = useNombres()

  return (
    <div className="space-y-6">
      <NombreForm onAgregar={agregar} />

      {error && (
        <p className="px-4 py-3 border-l-2 border-red-600 bg-red-50 text-red-700 text-sm">
          {error}
        </p>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400">
            {cargando ? 'Cargando...' : `${nombres.length} nombres`}
          </p>
          <button
            onClick={recargar}
            className="text-[11px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 underline-offset-4 hover:underline cursor-pointer"
          >
            Recargar
          </button>
        </div>

        {!cargando && nombres.length === 0 && (
          <p className="p-8 bg-white border border-neutral-200 text-center text-sm text-neutral-400">
            No hay nombres todavía
          </p>
        )}

        <ul className="bg-white border border-neutral-200 divide-y divide-neutral-200 empty:hidden">
          {nombres.map((item) => (
            <NombreItem
              key={item.id}
              item={item}
              onEditar={editar}
              onEliminar={eliminar}
              procesando={procesandoId === item.id}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}