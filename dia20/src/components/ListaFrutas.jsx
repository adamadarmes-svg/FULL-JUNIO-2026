import Card from './Card'

function ListaFrutas({ frutas }) {
  return (
    <Card titulo="Lista de frutas">
      <ul className="space-y-2">
        {frutas.map((fruta, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-sm text-ink py-1.5 border-b border-hairline-soft last:border-0"
          >
            <span className="w-5 h-5 border border-hairline-strong flex items-center justify-center text-taupe-light text-[10px] font-mono">
              {index + 1}
            </span>
            {fruta}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default ListaFrutas
