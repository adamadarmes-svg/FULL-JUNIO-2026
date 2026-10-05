import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { formatearFechaRelativa, recortar } from '../../lib/formato'

export default function PostCard({ post, onEliminar, procesando = false }) {
  const { esAutor } = useAuth()
  const n = post.numeroComentarios ?? 0
  const enlace = `/post/${post.id}`

  const eliminar = () => {
    if (window.confirm(`¿Eliminar "${post.titulo}"? Esta acción no se puede deshacer.`)) onEliminar?.(post.id)
  }

  return (
    <article className="group grid gap-6 py-10 sm:grid-cols-[240px_1fr]">
      <Link to={enlace} className="block aspect-[4/3] overflow-hidden bg-stone-200">
        {post.imagen && (
          <img
            src={post.imagen}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </Link>

      <div className="flex flex-col">
        <p className="etiqueta text-stone-500">
          {formatearFechaRelativa(post.createdAt)} · {n} {n === 1 ? 'comentario' : 'comentarios'}
        </p>
        <Link to={enlace}>
          <h2 className="mt-3 font-serif text-3xl leading-tight decoration-1 underline-offset-4 group-hover:underline">
            {post.titulo}
          </h2>
        </Link>
        <p className="mt-3 leading-relaxed text-stone-600">{recortar(post.contenido, 180)}</p>

        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="text-stone-500">
            por <span className="text-stone-900">{post.autor?.nombre || 'Anónimo'}</span>
          </span>
          {esAutor(post.autor?.id) && (
            <div className="etiqueta flex gap-5 text-stone-500">
              <Link to={`/editar/${post.id}`} className="transition-colors hover:text-stone-900">
                Editar
              </Link>
              {onEliminar && (
                <button
                  type="button"
                  onClick={eliminar}
                  disabled={procesando}
                  className="cursor-pointer transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {procesando ? 'Eliminando…' : 'Eliminar'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
