import { frutas, productos, usuarios, tareas, nombres, empleados } from './data'

import Section from './components/Section'
import ListaFrutas from './components/ListaFrutas'
import ListaProductos from './components/ListaProductos'
import TablaUsuarios from './components/TablaUsuarios'
import ProductosCaros from './components/ProductosCaros'
import BuscadorNombres from './components/BuscadorNombres'
import ListaTareasEliminar from './components/ListaTareasEliminar'
import MayoresDeEdad from './components/MayoresDeEdad'
import AgregarFrutas from './components/AgregarFrutas'
import FiltroCategoria from './components/FiltroCategoria'
import FiltroEdad from './components/FiltroEdad'
import FiltroEmpleados from './components/FiltroEmpleados'
import TareasConFiltro from './components/TareasConFiltro'

function App() {
  return (
    <div className="min-h-screen px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">

        <header className="mb-16 flex flex-col gap-3 border-b border-hairline pb-10">
          <p className="text-[11px] tracking-[0.3em] text-brass uppercase">dia20</p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-ink">Ejemplos</h1>
        </header>

        <Section title="Ej1-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ListaFrutas frutas={frutas} />
            <ListaProductos productos={productos.slice(0, 3)} />
            <TablaUsuarios usuarios={usuarios} />
          </div>
        </Section>

        <Section title="Ej1-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BuscadorNombres nombres={nombres} />
            <FiltroCategoria productos={productos} />
            <FiltroEdad personas={usuarios} />
            <TareasConFiltro tareas={tareas} />
            <div className="lg:col-span-2">
              <FiltroEmpleados empleados={empleados} />
            </div>
          </div>
        </Section>

        <Section title="Ej1-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductosCaros productos={productos} />
            <MayoresDeEdad personas={usuarios} />
          </div>
        </Section>

        <Section title="Extra">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgregarFrutas frutasIniciales={frutas} />
            <ListaTareasEliminar tareasIniciales={tareas} />
          </div>
        </Section>

      </div>
    </div>
  )
}

export default App
