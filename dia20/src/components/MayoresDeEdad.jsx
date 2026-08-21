import Card from './Card'

function MayoresDeEdad({ personas }) {
  const mayores = personas.filter((p) => p.edad > 18)
  const menores = personas.length - mayores.length

  return (
    <Card titulo="Mayores de 18">
      <div className="flex gap-4">
        <div className="flex-1 bg-linen/60 border border-hairline p-4 text-center">
          <p className="font-serif text-3xl font-light text-ink">{mayores.length}</p>
          <p className="text-[10px] tracking-wide text-taupe uppercase mt-1">Mayores</p>
        </div>
        <div className="flex-1 bg-linen/60 border border-hairline p-4 text-center">
          <p className="font-serif text-3xl font-light text-ink">{menores}</p>
          <p className="text-[10px] tracking-wide text-taupe uppercase mt-1">Menores</p>
        </div>
      </div>
      <ul className="space-y-0">
        {personas.map((p) => (
          <li key={p.id} className="flex justify-between items-center py-2.5 border-b border-hairline-soft last:border-0 text-sm">
            <span className="text-ink">{p.nombre}</span>
            <span className={`text-[10px] px-2 py-0.5 border tracking-wide font-mono ${
              p.edad > 18 ? 'bg-sage-light text-sage border-sage/20' : 'bg-rust-light text-rust border-rust/20'
            }`}>
              {p.edad} años
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MayoresDeEdad
