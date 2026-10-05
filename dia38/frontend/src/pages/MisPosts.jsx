import PostList from '../components/posts/PostList'
import Boton from '../components/ui/Boton'
import { useAuth } from '../context/AuthContext'

export default function MisPosts() {
  const { usuario } = useAuth()

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="etiqueta text-stone-500">Tu archivo</p>
          <h1 className="mt-3 font-serif text-5xl">Mis posts</h1>
          <p className="mt-2 text-stone-600">Todo lo que has publicado, reunido en un solo lugar.</p>
        </div>
        <Boton to="/nuevo">Escribir un post</Boton>
      </header>

      <PostList
        autor={usuario?.id}
        titulo="Publicados"
        vacioTexto="Todavía no has publicado nada. Cuando lo hagas, aparecerá aquí."
      />
    </div>
  )
}
