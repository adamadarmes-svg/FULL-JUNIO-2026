import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">Bienvenido</p>
      <h1 className="font-serif text-6xl sm:text-7xl font-normal leading-none mb-10">
        Hola, soy <em className="text-accent">Gustavo</em>
      </h1>
      <div className="w-16 h-px bg-ink mb-10" />

      <div className="flex flex-col sm:flex-row border border-ink w-fit">
        <Link
          href="/about"
          className="px-8 py-4 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors"
        >
          Sobre mí
        </Link>
        <Link
          href="/blog"
          className="px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-paper transition-colors"
        >
          Ver el blog
        </Link>
      </div>
    </section>
  )
}
