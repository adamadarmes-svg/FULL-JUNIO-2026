import { useEffect, useState } from 'react'
import { obtenerMenu, obtenerProductos } from '../services/catalogService'

export function useCatalogData() {
  const [productos, setProductos] = useState([])
  const [menu, setMenu] = useState({ principal: [], secundario: [] })
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const cargar = async () => {
      try {
        const [datosProductos, datosMenu] = await Promise.all([
          obtenerProductos(controller.signal),
          obtenerMenu(controller.signal),
        ])

        setProductos(datosProductos?.productos ?? [])
        setMenu({
          principal: datosMenu?.principal ?? [],
          secundario: datosMenu?.secundario ?? [],
        })
        setError(null)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(err.message || 'No se pudieron cargar los datos')
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargar()

    return () => controller.abort()
  }, [])

  return { productos, menu, cargando, error }
}
