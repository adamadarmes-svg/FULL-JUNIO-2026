import Link from 'next/link'

export default function SinDatos({ titulo, mensaje }) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-light tracking-tight mb-2">{titulo}</h2>
        <p className="text-sm text-stone-500">{mensaje}</p>
      </div>

      <Link href="/dashboard" className="btn-outline">
        <span aria-hidden>←</span> Volver al resumen
      </Link>
    </section>
  )
}
