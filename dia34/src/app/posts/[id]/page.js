import Link from 'next/link'
import NoEncontrado from '@/components/NoEncontrado'
import { buscarPost, listarPosts } from '@/controllers/postController'

export default async function Post({ params }) {
  const { id } = await params

  const resultado = await buscarPost(id)

  if (!resultado.ok) {
    return <NoEncontrado titulo="Post no encontrado" mensaje={resultado.error} />
  }

  const post = resultado.data
  const lista = await listarPosts()
  const posts = lista.ok ? lista.data : []

  const datos = [
    { label: 'Autor',   valor: `@${post.autor}` },
    { label: 'Fecha',   valor: post.fecha },
    { label: 'Lectura', valor: post.lectura },
  ]

  return (
    <section>
      <div className="pb-14">
        <p className="eyebrow mb-4">Post {post.id}</p>
        <h1 className="text-5xl font-light tracking-tight mb-4">{post.titulo}</h1>
        <p className="text-stone-500">{post.resumen}</p>
      </div>

      <dl className="border-t border-stone-200">
        {datos.map((dato) => (
          <div key={dato.label} className="grid grid-cols-[140px_1fr] border-b border-stone-200 py-4 text-sm">
            <dt className="text-stone-400">{dato.label}</dt>
            <dd className="font-mono text-stone-900">{dato.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex border border-stone-300 divide-x divide-stone-300">
          {posts.map((entrada) => (
            <Link
              key={entrada.id}
              href={`/posts/${entrada.id}`}
              className={`px-5 py-2.5 text-sm transition-colors ${
                entrada.id === post.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              Post {entrada.id}
            </Link>
          ))}
        </div>

        <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
          ← Home
        </Link>
      </div>
    </section>
  )
}
