import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useCatalogData } from '../hooks/useCatalogData'
import { useScrollSlider } from '../hooks/useScrollSlider'
import { DURACION } from '../lib/constantes'

const CatalogContext = createContext(null)

export function CatalogProvider({ children }) {
  const { productos, menu, cargando, error } = useCatalogData()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const abrirMenu = useCallback(() => setMenuAbierto(true), [])
  const cerrarMenu = useCallback(() => setMenuAbierto(false), [])
  const alternarMenu = useCallback(() => setMenuAbierto((abierto) => !abierto), [])

  const { indice, direccion, bloqueado, siguiente, anterior, irA } = useScrollSlider({
    total: productos.length,
    duracionBloqueo: DURACION.BLOQUEO,
    activo: !menuAbierto,
  })

  const productoActual = productos[indice] ?? null

  const value = useMemo(
    () => ({
      productos,
      menu,
      cargando,
      error,
      indice,
      direccion,
      bloqueado,
      productoActual,
      siguiente,
      anterior,
      irA,
      menuAbierto,
      abrirMenu,
      cerrarMenu,
      alternarMenu,
    }),
    [
      productos,
      menu,
      cargando,
      error,
      indice,
      direccion,
      bloqueado,
      productoActual,
      siguiente,
      anterior,
      irA,
      menuAbierto,
      abrirMenu,
      cerrarMenu,
      alternarMenu,
    ]
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const contexto = useContext(CatalogContext)
  if (!contexto) {
    throw new Error('useCatalog debe usarse dentro de CatalogProvider')
  }
  return contexto
}
