import ArticleCard from '@/components/ArticleCard'
import { fetchRepo } from '@/lib/data'

export const metadata = {
  title: 'Blog — Día 33',
  description: 'Comida, ropa y cosas que usamos en el día a día.',
}

export default async function Blog() {
  const articulos = await fetchRepo()

  return (
    <section>
      <div className="flex items-end justify-between border-b border-ink pb-4">
        <h1 className="font-serif text-5xl font-normal leading-none">Blog</h1>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {articulos.length} artículos
        </p>
      </div>
      <p className="text-sm text-muted py-4 mb-10">
        Comida, ropa y cosas del día a día
      </p>

      <div className="grid sm:grid-cols-2 gap-px bg-line border border-line">
        {articulos.map((articulo, i) => (
          <ArticleCard
            key={articulo.id}
            numero={i + 1}
            titulo={articulo.titulo}
            descripcion={articulo.descripcion}
            categoria={articulo.categoria}
          />
        ))}
      </div>
    </section>
  )
}
