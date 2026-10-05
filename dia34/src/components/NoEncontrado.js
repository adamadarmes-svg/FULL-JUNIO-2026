import Link from 'next/link'

export default function NoEncontrado({ titulo, mensaje, href = '/', texto = 'Volver a Home' }) {
  return (
    <section>
      <div className="pb-14">
        <p className="eyebrow mb-4">No encontrado</p>
        <h1 className="text-5xl font-light tracking-tight mb-4">{titulo}</h1>
        <p className="text-stone-500">{mensaje}</p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-8">
        <Link href={href} className="btn-outline">
          <span aria-hidden>←</span> {texto}
        </Link>
      </div>
    </section>
  )
}
