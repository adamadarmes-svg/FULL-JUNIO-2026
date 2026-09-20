import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'

const Cart = () => {
  const { items, eliminar, reducir, agregar, totalItems, totalPrecio } = useCart()
  const { t } = useLanguage()

  return (
    <div className="card">
      <p className="card-tag">
        <span>CartContext</span>
        <span>{t('Nivel')} 2</span>
      </p>

      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-bold">{t('Mi carrito')}</h3>
        <span className="badge border-ink bg-ink text-surface">{totalItems}</span>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-line py-10 text-center">
          <p className="mb-1 text-sm text-mute">{t('El carrito está vacío')}</p>
          <p className="text-xs text-mute">{t('Añade productos desde la lista')}</p>
        </div>
      ) : (
        <>
          <div className="mb-5 max-h-[50vh] space-y-2 overflow-y-auto">
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-3 border border-line p-3"
              >
                <span className="tile size-10 text-xl">{item.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t(item.nombre)}</p>
                  <p className="text-xs text-mute">
                    {item.precio.toFixed(2)}€ × {item.cantidad}
                    {' = '}
                    <span className="font-bold text-ink">
                      {(item.precio * item.cantidad).toFixed(2)}€
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => reducir(item.id)} className="btn-icon">−</button>
                  <span className="w-5 text-center text-sm font-bold tabular-nums">
                    {item.cantidad}
                  </span>
                  <button onClick={() => agregar(item)} className="btn-icon">+</button>
                  <button
                    onClick={() => eliminar(item.id)}
                    className="btn-icon-danger ml-1"
                    title={t('Eliminar')}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-mute">
                Total
              </span>
              <span className="text-2xl font-bold tabular-nums">
                {totalPrecio.toFixed(2)}€
              </span>
            </div>
            <button className="btn-solid w-full">{t('Confirmar pedido')}</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
