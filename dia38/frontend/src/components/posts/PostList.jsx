import { useState } from 'react'
import usePosts from '../../hooks/usePosts'
import Alerta from '../ui/Alerta'
import Boton from '../ui/Boton'
import Spinner from '../ui/Spinner'
import Paginacion from './Paginacion'
import PostCard from './PostCard'

export default function PostList({
  autor,
  titulo,
  vacioTexto = 'Todavía no hay publicaciones en el feed.',
}) {
  const { posts, paginacion, cargando, error, eliminar, cambiarPagina, recargar } = usePosts({ autor })
  const [eliminandoId, setEliminandoId] = useState(null)
  const [errorEliminar, setErrorEliminar] = useState(null)

  const handleEliminar = async (id) => {
    setEliminandoId(id)
    setErrorEliminar(null)
    try {
      await eliminar(id)
    } catch (err) {
      setErrorEliminar(err.message)
    } finally {
      setEliminandoId(null)
    }
  }

  let contenido
  if (cargando) {
    contenido = <Spinner texto="Cargando publicaciones…" />
  } else if (error) {
    contenido = (
      <div className="flex flex-col items-start gap-4 py-10">
        <Alerta mensaje={error} />
        <Boton variante="secundario" onClick={recargar}>
          Reintentar
        </Boton>
      </div>
    )
  } else if (posts.length === 0) {
    contenido = <p className="py-16 text-center text-stone-500">{vacioTexto}</p>
  } else {
    contenido = (
      <div className="divide-y divide-stone-200">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onEliminar={handleEliminar} procesando={eliminandoId === post.id} />
        ))}
      </div>
    )
  }

  return (
    <section>
      {titulo && <h2 className="etiqueta border-b border-stone-900 pb-3">{titulo}</h2>}
      {errorEliminar && (
        <div className="mt-6">
          <Alerta mensaje={errorEliminar} onCerrar={() => setErrorEliminar(null)} />
        </div>
      )}
      {contenido}
      {!cargando && !error && <Paginacion paginacion={paginacion} onCambiar={cambiarPagina} />}
    </section>
  )
}
