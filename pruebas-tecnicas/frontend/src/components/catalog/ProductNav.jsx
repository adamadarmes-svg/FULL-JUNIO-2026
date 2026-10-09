import { useCatalog } from '../../context/CatalogContext'

const dosDigitos = (numero) => String(numero).padStart(2, '0')

function ProductNav() {
  const { productos, indice, irA, bloqueado } = useCatalog()

  return (
    <nav
      aria-label="Productos"
      className="absolute inset-x-0 bottom-0 flex items-stretch justify-between gap-6 border-t border-neutral-200 bg-neutral-50 px-6 md:px-[10%]"
    >
      <ul className="flex min-w-0 flex-row gap-8 overflow-x-auto whitespace-nowrap md:gap-16">
        {productos.map((producto, i) => {
          const activo = i === indice
          return (
            <li key={producto.id} className="shrink-0">
              <button
                type="button"
                onClick={() => irA(i)}
                disabled={bloqueado}
                aria-current={activo ? 'true' : undefined}
                className="group relative flex flex-col items-start gap-0.5 pb-3 pt-4 text-left disabled:cursor-default"
              >
                <span
                  className={`absolute -top-px left-0 h-0.5 w-full origin-left bg-black transition-transform duration-500 ease-mater ${
                    activo ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                <span className="text-[10px] tabular-nums text-neutral-400">{dosDigitos(i + 1)}</span>
                <span
                  className={`text-[11px] transition-colors duration-300 ${
                    activo ? 'text-black' : 'text-neutral-400 group-hover:text-neutral-600'
                  }`}
                >
                  {producto.productName}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex shrink-0 items-center gap-3 text-[10px] tabular-nums text-neutral-400">
        <span>
          <span className="text-black">{dosDigitos(indice + 1)}</span> / {dosDigitos(productos.length)}
        </span>
        <span aria-hidden="true" className="hidden md:inline">
          Scroll ↓
        </span>
      </div>
    </nav>
  )
}

export default ProductNav
