export default function Seccion({ numero, titulo, children }) {
  return (
    <div className="grid gap-4 border-t border-stone-200 py-8 sm:grid-cols-[180px_1fr] sm:gap-10">
      <div>
        <p className="eyebrow mb-1">{numero}</p>
        <h2 className="text-sm font-medium text-stone-900">{titulo}</h2>
      </div>
      <div>{children}</div>
    </div>
  )
}
