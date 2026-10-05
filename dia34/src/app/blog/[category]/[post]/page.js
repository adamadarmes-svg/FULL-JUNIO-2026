import Link from 'next/link'
import NoEncontrado from '@/components/NoEncontrado'
import { buscarPostDelBlog } from '@/controllers/blogController'

export default async function BlogPost({ params }) {
  const { category, post } = await params

  const resultado = await buscarPostDelBlog(category, post)

  if (!resultado.ok) {
    return <NoEncontrado titulo="Artículo no encontrado" mensaje={resultado.error} />
  }

  const articulo = resultado.data

  return (
    <section>
      <nav className="mb-10 font-mono text-xs text-stone-400">
        <Link href="/" className="hover:text-stone-900">home</Link>
        <span className="mx-2">/</span>
        <span>blog</span>
        <span className="mx-2">/</span>
        <span className="text-stone-600">{articulo.categoria}</span>
        <span className="mx-2">/</span>
        <span className="text-stone-900">{articulo.slug}</span>
      </nav>

      <div className="pb-14">
        <p className="eyebrow mb-4">Blog · {articulo.categoriaTitulo}</p>
        <h1 className="text-5xl font-light tracking-tight capitalize">{articulo.titulo}</h1>
      </div>

      <div className="grid gap-px border border-stone-200 bg-stone-200 sm:grid-cols-2">
        <div className="bg-white p-6">
          <p className="eyebrow mb-2">Escrito por</p>
          <p className="text-2xl font-light">@{articulo.autor}</p>
        </div>
        <div className="bg-white p-6">
          <p className="eyebrow mb-2">Tiempo de lectura</p>
          <p className="text-2xl font-light">{articulo.lectura}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-stone-400">
        {articulo.resumen}
      </p>
    </section>
  )
}
