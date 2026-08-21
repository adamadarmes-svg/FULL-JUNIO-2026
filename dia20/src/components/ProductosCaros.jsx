import Card from './Card'

function ProductosCaros({ productos }) {
  const caros = productos.filter((p) => p.precio > 700)

  return (
    <Card titulo={`Productos > 700€ — ${caros.length} resultado${caros.length !== 1 ? 's' : ''}`}>
      {caros.length === 0 ? (
        <p className="text-xs text-taupe-light italic">Ningún producto supera 700€.</p>
      ) : (
        <ul className="space-y-0">
          {caros.map((p) => (
            <li key={p.id} className="flex justify-between items-center py-3 border-b border-hairline-soft last:border-0 text-sm">
              <span className="text-ink">{p.nombre}</span>
              <span className="font-mono text-taupe">${p.precio}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export default ProductosCaros
