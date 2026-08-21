import { useState } from 'react'
import Card from './Card'

function AgregarFrutas({ frutasIniciales }) {
  const [frutas, setFrutas] = useState(frutasIniciales)
  const [input, setInput] = useState('')

  const agregar = () => {
    const valor = input.trim()
    if (!valor) return
    setFrutas([...frutas, valor])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') agregar()
  }

  return (
    <Card titulo={`Frutas — ${frutas.length}`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nueva fruta..."
          className="flex-1 bg-linen/40 border border-hairline px-4 py-2.5 text-sm text-ink placeholder:text-taupe-light focus:outline-none focus:border-ink focus:bg-paper transition-colors duration-300"
        />
        <button
          onClick={agregar}
          className="px-5 py-2.5 bg-ink text-paper text-xs tracking-wide hover:bg-brass-dark transition-colors duration-300"
        >
          Añadir
        </button>
      </div>
      <ul className="space-y-1">
        {frutas.map((f, i) => (
          <li key={i} className="text-sm text-ink py-1.5 border-b border-hairline-soft last:border-0">{f}</li>
        ))}
      </ul>
    </Card>
  )
}

export default AgregarFrutas
