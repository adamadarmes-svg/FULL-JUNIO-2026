import ErrorBoundary from './components/ui/ErrorBoundary'
import Spinner from './components/ui/Spinner'
import Alerta from './components/ui/Alerta'
import Header from './components/layout/Header'
import Catalog from './components/catalog/Catalog'
import MenuOverlay from './components/menu/MenuOverlay'
import { CatalogProvider, useCatalog } from './context/CatalogContext'

function Contenido() {
  const { cargando, error } = useCatalog()

  if (cargando) return <Spinner texto="Cargando catálogo..." />
  if (error) return <Alerta mensaje={error} />

  return (
    <>
      <Header />
      <Catalog />
      <MenuOverlay />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <CatalogProvider>
        <Contenido />
      </CatalogProvider>
    </ErrorBoundary>
  )
}

export default App
