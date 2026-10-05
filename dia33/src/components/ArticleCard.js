export default function ArticleCard({ numero, titulo, descripcion, categoria }) {
  return (
    <article className="group p-8 bg-surface sm:last:odd:col-span-2 hover:bg-paper transition-colors">
      <div className="flex justify-between mb-6 text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>{categoria}</span>
        <span>{String(numero).padStart(2, '0')}</span>
      </div>
      <h2 className="font-serif text-3xl font-normal mb-3 group-hover:text-accent transition-colors">
        {titulo}
      </h2>
      <p className="text-muted text-sm leading-relaxed">{descripcion}</p>
    </article>
  )
}
