import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useComments from '../../hooks/useComments'
import Alerta from '../ui/Alerta'
import Spinner from '../ui/Spinner'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

export default function CommentList({ postId }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const { comentarios, cargando, error, procesandoId, agregar, editar, eliminar, limpiarError } = useComments(postId)

  const enlace = 'text-stone-900 underline underline-offset-4'

  return (
    <section className="border-t border-stone-900 pt-10">
      <h2 className="flex items-baseline gap-3 font-serif text-3xl">
        Comentarios
        {!cargando && <span className="font-mono text-sm text-stone-500">{String(comentarios.length).padStart(2, '0')}</span>}
      </h2>

      <div className="mt-6">
        {isAuthenticated ? (
          <CommentForm onEnviar={agregar} />
        ) : (
          <p className="border border-stone-200 bg-white px-4 py-4 text-sm text-stone-600">
            <Link to="/login" state={{ from: location }} className={enlace}>
              Inicia sesión
            </Link>{' '}
            o{' '}
            <Link to="/registro" state={{ from: location }} className={enlace}>
              crea una cuenta
            </Link>{' '}
            para participar en la conversación.
          </p>
        )}
      </div>

      {error && (
        <div className="mt-6">
          <Alerta mensaje={error} onCerrar={limpiarError} />
        </div>
      )}

      {cargando ? (
        <Spinner texto="Cargando comentarios…" />
      ) : comentarios.length === 0 ? (
        !error && <p className="py-10 text-stone-500">Todavía no hay comentarios. Sé el primero en opinar.</p>
      ) : (
        <ul className="mt-4 divide-y divide-stone-200">
          {comentarios.map((c) => (
            <CommentItem key={c.id} comentario={c} onEditar={editar} onEliminar={eliminar} procesando={procesandoId === c.id} />
          ))}
        </ul>
      )}
    </section>
  )
}
