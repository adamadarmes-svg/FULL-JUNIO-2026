import { DURACION } from '../../lib/constantes'

const RETARDO_ESCALONADO = 60

function ProductInfo({ producto, animando, direccion }) {
  if (!producto) return null

  const desplazamiento = direccion === 'abajo' ? '-translate-y-[30px]' : 'translate-y-[30px]'
  const estado = animando ? `opacity-0 ${desplazamiento}` : 'opacity-100 translate-y-0'
  const clasesBase = `transition-all ease-mater ${estado}`

  const estilo = (posicion) => ({
    transitionDuration: `${DURACION.TRANSICION / 2}ms`,
    transitionDelay: `${posicion * RETARDO_ESCALONADO}ms`,
  })

  return (
    <div className="flex flex-col items-start">
      <p className={`text-sm text-neutral-600 ${clasesBase}`} style={estilo(0)}>
        {producto.designerName}
      </p>

      <h2
        className={`mt-3 text-xl font-bold leading-tight text-black md:text-2xl ${clasesBase}`}
        style={estilo(1)}
      >
        {producto.productName}
      </h2>

      <p
        className={`mt-6 max-w-[300px] text-sm leading-snug text-neutral-500 md:mt-8 ${clasesBase}`}
        style={estilo(2)}
      >
        {producto.description}
      </p>

      <a
        href={producto.link}
        className={`mt-6 inline-block bg-black px-3 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 ${clasesBase}`}
        style={estilo(3)}
      >
        Product Details
      </a>
    </div>
  )
}

export default ProductInfo
