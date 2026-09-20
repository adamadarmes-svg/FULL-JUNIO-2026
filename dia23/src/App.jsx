import BotonColor from './components/BotonColor'
import CuadradoInteractivo from './components/CuadradoInteractivo'
import ListaTextoColor from './components/ListaTextoColor'
import ListaHover from './components/ListaHover'
import ListaCreciente from './components/ListaCreciente'
import AppTema from './components/AppTema'

function App() {
  return (
    <div className="min-h-screen bg-neutral-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-8 pb-4 text-center shadow-[0_4px_6px_-4px_rgba(0,0,0,0.3)] w-full">
          Día 23
        </h1>

        <section className="mb-8 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-neutral-500 mb-2 text-center">
            Nivel 1
          </h2>
          <BotonColor />
          <CuadradoInteractivo />
        </section>

        <section className="mb-8 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-neutral-500 mb-2 text-center">
            Nivel 2
          </h2>
          <ListaTextoColor />
          <ListaHover />
          <ListaCreciente />
        </section>

        <section className="mb-8 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold text-neutral-500 mb-2 text-center">
            Nivel 3
          </h2>
          <AppTema />
        </section>
      </div>
    </div>
  )
}

export default App
