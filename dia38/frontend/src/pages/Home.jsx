import PostList from '../components/posts/PostList'
import Boton from '../components/ui/Boton'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuthenticated, usuario } = useAuth()

  return (
    <div className="flex flex-col gap-16">
      <header className="max-w-3xl">
        <p className="etiqueta text-stone-500">
          {isAuthenticated ? `Hola de nuevo, ${usuario?.nombre}` : 'Blog colectivo · Cultura friki · Desde 2026'}
        </p>
        <h1 className="mt-5 font-serif text-6xl leading-[0.95] sm:text-7xl">
          Historias, análisis y <em>nostalgia</em> en alta resolución.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          Videojuegos, anime, series y tecnología contados por quienes crecieron entre el módem de 56k y el algoritmo. Sin clickbait, con criterio propio.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {isAuthenticated ? (
            <Boton to="/nuevo">Escribir un post</Boton>
          ) : (
            <>
              <Boton to="/registro">Crear cuenta</Boton>
              <Boton to="/login" variante="secundario">
                Ya tengo cuenta
              </Boton>
            </>
          )}
        </div>
      </header>

      <PostList titulo="Lo último" />
    </div>
  )
}
