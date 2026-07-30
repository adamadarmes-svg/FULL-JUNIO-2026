function Card({ title, content, className = '', style }) {
  return (
    <div
      style={style}
      className={`bg-paper border border-ink p-6 transition-all duration-300 ease-out hover:border-gold hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <h3 className="text-sm font-semibold uppercase tracking-widest mb-2 text-gold">
        {title}
      </h3>
      <p className="text-ink-80">{content}</p>
    </div>
  )
}

export default Card