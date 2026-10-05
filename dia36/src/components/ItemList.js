'use client'

import useItems from '@/hooks/useItems'
import ItemForm from './ItemForm'
import ItemCard from './ItemCard'
import Alerta from './Alerta'
import Spinner from './Spinner'

export default function ItemList() {
  const {
    items, cargando, error, exito, procesandoId,
    agregar, actualizar, eliminar, recargar, limpiarError,
  } = useItems()

  const completados = items.filter((item) => item.completado).length

  return (
    <div className="space-y-6">
      <ItemForm onAgregar={agregar} />

      <Alerta tipo="exito" mensaje={exito} />
      <Alerta tipo="error" mensaje={error} onCerrar={limpiarError} />

      <div className="flex items-center justify-between pt-4 pb-2 border-b border-neutral-200">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {cargando ? 'Cargando...' : `${items.length} items · ${completados} completados`}
        </p>
        <button
          onClick={recargar}
          disabled={cargando}
          className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-900 disabled:opacity-40 cursor-pointer transition-colors"
        >
          Recargar
        </button>
      </div>

      {cargando && <Spinner texto="Cargando items desde MongoDB..." />}

      {!cargando && items.length === 0 && !error && (
        <p className="p-10 border border-dashed border-neutral-300 text-center text-sm text-neutral-400">
          No hay items todavía. Crea el primero con el formulario.
        </p>
      )}

      {items.length > 0 && (
        <ul className="border border-neutral-200 bg-white divide-y divide-neutral-200">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onActualizar={actualizar}
              onEliminar={eliminar}
              procesando={procesandoId === item.id}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
