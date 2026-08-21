function Card({ titulo, children, className = '' }) {
  return (
    <div className={`bg-paper border border-hairline p-7 flex flex-col gap-5 transition-colors duration-300 hover:border-hairline-strong ${className}`}>
      {titulo && (
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-px bg-brass" />
          <h2 className="text-[11px] font-medium tracking-[0.18em] text-taupe uppercase">{titulo}</h2>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
