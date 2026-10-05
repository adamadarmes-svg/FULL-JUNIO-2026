import Link from 'next/link'
import BotonRouter from '@/components/BotonRouter'
import Seccion from '@/components/Seccion'
import { listarPosts } from '@/controllers/postController'
import { listarDestacados } from '@/controllers/blogController'

export default async function Home() {
  const resultadoPosts = await listarPosts()
  const resultadoBlog = await listarDestacados()

  const posts = resultadoPosts.ok ? resultadoPosts.data : []
  const destacados = resultadoBlog.ok ? resultadoBlog.data : []

  return (
    <section>
      <div className="pb-14">
        <p className="eyebrow mb-4">Inicio</p>
        <h1 className="text-5xl font-light tracking-tight mb-4">Página principal</h1>
        <p className="text-stone-500">Nikola Tesla</p>
      </div>

      <Seccion numero="01" titulo="Navegación">
        <Link href="/about" className="btn-outline">
          Ir a Acerca de <span aria-hidden>→</span>
        </Link>
      </Seccion>

      <Seccion numero="02" titulo="Últimos posts">
        <ul className="panel divide-y divide-stone-200">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="group flex items-center justify-between px-5 py-3.5 text-sm hover:bg-stone-50 transition-colors"
              >
                <span>{post.titulo}</span>
                <span className="font-mono text-xs text-stone-400 group-hover:text-stone-900">
                  {post.lectura} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion numero="03" titulo="Del blog">
        <ul className="panel divide-y divide-stone-200">
          {destacados.map((articulo) => (
            <li key={`${articulo.categoria}/${articulo.slug}`}>
              <Link
                href={`/blog/${articulo.categoria}/${articulo.slug}`}
                className="group flex items-center justify-between px-5 py-3.5 font-mono text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                {articulo.categoriaTitulo} · {articulo.titulo}
                <span className="text-stone-300 group-hover:text-stone-900">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion numero="04" titulo="Accesos rápidos">
        <BotonRouter />
      </Seccion>
    </section>
  )
}
