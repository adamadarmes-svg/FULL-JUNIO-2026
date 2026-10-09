import { useEffect, useState } from 'react'
import { useCatalog } from '../../context/CatalogContext'
import { DURACION } from '../../lib/constantes'
import ProductInfo from './ProductInfo'
import ProductImage from './ProductImage'
import ProductNav from './ProductNav'

function Catalog() {
  const { productoActual, direccion } = useCatalog()
  const [productoMostrado, setProductoMostrado] = useState(productoActual)

  const animando = productoMostrado?.id !== productoActual?.id

  useEffect(() => {
    if (!animando) return

    const temporizador = setTimeout(() => {
      setProductoMostrado(productoActual)
    }, DURACION.TRANSICION / 2)

    return () => clearTimeout(temporizador)
  }, [animando, productoActual])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white">
      <div className="grid h-full grid-rows-[minmax(0,1fr)_auto] items-center gap-6 px-6 pb-24 pt-20 md:grid-cols-2 md:grid-rows-1 md:gap-16 md:px-[10%] md:pb-24 md:pt-20">
        <div className="order-2 md:order-1">
          <ProductInfo producto={productoMostrado} animando={animando} direccion={direccion} />
        </div>
        <div className="order-1 h-full min-h-0 md:order-2">
          <ProductImage producto={productoMostrado} animando={animando} direccion={direccion} />
        </div>
      </div>

      <ProductNav />
    </main>
  )
}

export default Catalog
