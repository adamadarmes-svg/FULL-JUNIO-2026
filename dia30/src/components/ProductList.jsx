import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

const productos = [
  { id: 1, nombre: 'Camiseta de algodón', precio: 14.99, emoji: '👕' },
  { id: 2, nombre: 'Zapatillas deportivas', precio: 59.99, emoji: '👟' },
  { id: 3, nombre: 'Chaqueta de invierno', precio: 79.99, emoji: '🧥' },
  { id: 4, nombre: 'Oso de peluche',       precio: 17.99, emoji: '🧸' },
  { id: 5, nombre: 'Pistola de agua',      precio:  9.99, emoji: '🔫' },
  { id: 6, nombre: 'Arco de tiro',         precio: 44.99, emoji: '🏹' },
]

const ProductList = () => {
  const { agregar, items } = useCart()
  const { t } = useLanguage()

  const enCarrito = (id) => items.some(i => i.id === id)

  return (
    <div className="card">
      <p className="card-tag">
        <span>{t('lista de productos')}</span>
      </p>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
        {productos.map(producto => (
          <div
            key={producto.id}
            className={`flex flex-col border p-4 transition-colors ${
              enCarrito(producto.id)
                ? 'border-ink bg-sunken'
                : 'border-line bg-surface hover:border-mute'
            }`}
          >
            <span className="tile mb-3 size-12 text-2xl">{producto.emoji}</span>
            <p className="text-sm font-semibold">{t(producto.nombre)}</p>
            <p className="mb-4 text-sm text-mute">
              {producto.precio.toFixed(2)}€
            </p>
            <button
              onClick={() => agregar(producto)}
              className={`mt-auto w-full ${enCarrito(producto.id) ? 'btn-line' : 'btn-solid'}`}
            >
              {t(enCarrito(producto.id) ? 'Añadir más' : 'Agregar')}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
