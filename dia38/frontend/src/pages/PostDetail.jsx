import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CommentList from '../components/comments/CommentList'
import Alerta from '../components/ui/Alerta'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import usePost from '../hooks/usePost'
import { formatearFecha, inicial } from '../lib/formato'
import { eliminarPost } from '../services/postService'

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { esAutor } = useAuth()
  const { post, cargando, error } = usePost(id)
  const [eliminando, setEliminando] = useState(false)
  const [errorEliminar, setErrorEliminar] = useState(null)

  const volver = (
    <Link to="/" className="etiqueta text-stone-500 transition-colors hover:text-stone-900">
      ← Volver al feed
    </Link>
  )

  if (cargando) return <Spinner texto="Cargando post…" />

  if (error || !post) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
        <Alerta mensaje={error || 'Este post no existe'} />
        {volver}
      </div>
    )
  }

  const minutos = Math.max(1, Math.round(post.contenido.split(/\s+/).length / 200))
  const editado = post.updatedAt && post.updatedAt !== post.createdAt

  const eliminar = async () => {
    if (!window.confirm(`¿Eliminar "${post.titulo}"? Esta acción no se puede deshacer.`)) return
    setEliminando(true)
    setErrorEliminar(null)
    try {
      await eliminarPost(post.id)
      navigate('/', { replace: true })
    } catch (err) {
      setErrorEliminar(err.message)
      setEliminando(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-16">
      <article>
        {volver}

        <header className="mt-10">
          <p className="etiqueta text-stone-500">
            {formatearFecha(post.createdAt)} · {minutos} min de lectura{editado && ' · editado'}
          </p>
          <h1 className="mt-4 break-words font-serif text-5xl leading-[1.05] sm:text-6xl">{post.titulo}</h1>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-stone-200 py-4">
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-stone-300 font-mono text-sm">
                {inicial(post.autor?.nombre)}
              </span>
              <span className="text-sm">
                <span className="text-stone-500">Escrito por </span>
                {post.autor?.nombre || 'Anónimo'}
              </span>
            </span>

            {esAutor(post.autor?.id) && (
              <span className="etiqueta flex gap-5 text-stone-500">
                <Link to={`/editar/${post.id}`} className="transition-colors hover:text-stone-900">
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={eliminar}
                  disabled={eliminando}
                  className="cursor-pointer transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {eliminando ? 'Eliminando…' : 'Eliminar'}
                </button>
              </span>
            )}
          </div>
        </header>

        {errorEliminar && (
          <div className="mt-6">
            <Alerta mensaje={errorEliminar} onCerrar={() => setErrorEliminar(null)} />
          </div>
        )}

        {post.imagen && <img src={post.imagen} alt="" className="mt-10 aspect-video w-full object-cover" />}

        <div className="mt-10 whitespace-pre-wrap break-words text-lg leading-8 text-stone-800">{post.contenido}</div>
      </article>

      <CommentList postId={post.id} />
    </div>
  )
}
