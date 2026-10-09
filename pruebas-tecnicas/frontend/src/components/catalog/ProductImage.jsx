import { DURACION } from '../../lib/constantes'

function ProductImage({ producto, animando, direccion }) {
  if (!producto) return null

  const duracion = DURACION.TRANSICION / 2
  const salida = direccion === 'abajo' ? '-translate-y-full' : 'translate-y-full'
  const estado = animando ? `opacity-0 ${salida}` : 'opacity-100 translate-y-0'
  const entrada = direccion === 'abajo' ? 'entrar-desde-abajo' : 'entrar-desde-arriba'

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden">
      <img
        key={producto.id}
        src={producto.imageUrl}
        alt={`${producto.productName}, diseño de ${producto.designerName}`}
        loading="eager"
        className={`max-h-full w-auto max-w-full object-contain transition-all ease-mater md:max-h-[50vh] ${estado}`}
        style={{
          transitionDuration: `${duracion}ms`,
          animation: animando ? 'none' : `${entrada} ${duracion}ms var(--ease-mater) backwards`,
        }}
      />
    </div>
  )
}

export default ProductImage
