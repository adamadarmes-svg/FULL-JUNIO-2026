import { useNavigate } from 'react-router-dom'
import PostForm from '../components/posts/PostForm'
import { crearPost } from '../services/postService'

export default function NewPost() {
  const navigate = useNavigate()

  const handleEnviar = async (datos) => {
    const { post } = await crearPost(datos)
    navigate(`/post/${post.id}`, { replace: true })
  }

  return <PostForm titulo="Nuevo post" textoBoton="Publicar" onEnviar={handleEnviar} />
}
