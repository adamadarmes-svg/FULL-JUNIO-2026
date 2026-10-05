import { useNavigate, useParams } from 'react-router-dom'
import PostForm from '../components/posts/PostForm'
import Alerta from '../components/ui/Alerta'
import Boton from '../components/ui/Boton'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import usePost from '../hooks/usePost'
import { actualizarPost } from '../services/postService'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { esAutor } = useAuth()
  const { post, cargando, error } = usePost(id)

  if (cargando) return <Spinner texto="Cargando post…" />

  if (error || !post) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-start gap-6">
        <Alerta mensaje={error || 'Este post no existe'} />
        <Boton to="/" variante="secundario">
          ← Volver al feed
        </Boton>
      </div>
    )
  }

  if (!esAutor(post.autor?.id)) {
    return (
      <div className="mx-auto max-w-xl">
        <p className="etiqueta text-stone-500">Error 403</p>
        <h1 className="mt-3 font-serif text-5xl">Acceso restringido</h1>
        <p className="mt-3 text-stone-600">Puedes leer y comentar este post, pero solo su autor puede editarlo.</p>
        <Boton to="/" className="mt-8">
          Volver al feed
        </Boton>
      </div>
    )
  }

  const handleEnviar = async ({ titulo, contenido, imagen }) => {
    const datos = { titulo, contenido }
    if (imagen !== post.imagen) datos.imagen = imagen
    await actualizarPost(post.id, datos)
    navigate(`/post/${post.id}`, { replace: true })
  }

  return <PostForm key={post.id} postInicial={post} titulo="Editar post" textoBoton="Guardar cambios" onEnviar={handleEnviar} />
}
