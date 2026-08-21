import Card from './Card'
import Producto from './Producto'

function ListaProductos({ productos }) {
  return (
    <Card titulo="Productos">
      {productos.map((p) => (
        <Producto key={p.id} nombre={p.nombre} precio={p.precio} />
      ))}
    </Card>
  )
}

export default ListaProductos
