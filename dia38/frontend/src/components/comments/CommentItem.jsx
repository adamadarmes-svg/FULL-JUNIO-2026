import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { formatearFechaRelativa, inicial } from '../../lib/formato'
import CommentForm from './CommentForm'

export default function CommentItem({ comentario, onEditar, onEliminar, procesando = false }) {
  const { esAutor } = useAuth()
  const [editando, setEditando] = useState(false)
  const editado = comentario.updatedAt && comentario.updatedAt !== comentario.createdAt

  const guardar = async (contenido) => {
    await onEditar(comentario.id, contenido)
    setEditando(false)
  }

  const eliminar = () => {
    if (window.confirm('¿Eliminar este comentario? Esta acción no se puede deshacer.')) onEliminar(comentario.id)
  }

  return (
    <li className={`flex gap-4 py-6 ${procesando && !editando ? 'opacity-50' : ''}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-stone-300 font-mono text-xs">
        {inicial(comentario.autor?.nombre)}
      </span>

      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-sm font-medium">{comentario.autor?.nombre || 'Anónimo'}</span>
          <span className="etiqueta text-stone-500">
            {formatearFechaRelativa(comentario.createdAt)}
            {editado && ' · editado'}
          </span>
        </p>

        {editando ? (
          <div className="mt-3">
            <CommentForm onEnviar={guardar} textoBoton="Guardar" valorInicial={comentario.contenido} onCancelar={() => setEditando(false)} compacto />
          </div>
        ) : (
          <>
            <p className="mt-2 whitespace-pre-wrap break-words leading-relaxed text-stone-700">{comentario.contenido}</p>
            {esAutor(comentario.autor?.id) && (
              <div className="etiqueta mt-3 flex gap-5 text-stone-500">
                <button type="button" onClick={() => setEditando(true)} disabled={procesando} className="cursor-pointer hover:text-stone-900 disabled:cursor-not-allowed">
                  Editar
                </button>
                <button type="button" onClick={eliminar} disabled={procesando} className="cursor-pointer hover:text-red-600 disabled:cursor-not-allowed">
                  {procesando ? 'Eliminando…' : 'Eliminar'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </li>
  )
}
