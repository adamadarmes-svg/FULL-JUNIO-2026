import { frutas, tareas, articulos, alumnos, usuarios, productos } from './data'
import ListaFrutas from './components/ListaFrutas'
import ListaTareas from './components/ListaTareas'
import ArticulosDestacados from './components/ArticulosDestacados'
import NumerosPares from './components/NumerosPares'
import AlumnosAprobados from './components/AlumnosAprobados'
import ListaUsuarios from './components/ListaUsuarios'
import TablaProductos from './components/TablaProductos'
import ListaFiltrable from './components/ListaFiltrable'

function App() {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.4em] text-amber-600/80 uppercase mb-4">Listas</p>
          <h1 className="font-luxury text-5xl md:text-6xl font-medium text-black tracking-tight">Día 19</h1>
          <div className="w-12 h-px bg-amber-600/60 mx-auto mt-6" />
        </div>

        <ListaFiltrable elementos={frutas} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ListaTareas tareas={tareas} />
          <ListaFrutas frutas={frutas} />
          <ArticulosDestacados articulos={articulos} />
          <AlumnosAprobados alumnos={alumnos} />
          <ListaUsuarios usuarios={usuarios} />
          <TablaProductos productos={productos} />
          <NumerosPares />
        </div>

      </div>
    </div>
  )
}

export default App
