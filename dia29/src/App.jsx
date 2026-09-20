import EnfocarInput from './components/EnfocarInput'
import ContadorRenders from './components/ContadorRenders'
import ValorPrevio from './components/ValorPrevio'
import Temporizador from './components/Temporizador'
import ScrollContenido from './components/ScrollContenido'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Día 29
        </h1>

        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 text-center mb-4">
            Nivel 1
          </h2>
          <div className="flex flex-col gap-4">
            <EnfocarInput />
            <ContadorRenders />
            <ValorPrevio />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 text-center mb-4">
            Nivel 2
          </h2>
          <div className="flex flex-col gap-4">
            <Temporizador />
            <ScrollContenido />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 text-center mb-4">
            Nivel 3
          </h2>
          <div className="flex flex-col gap-4">
            <Chat />
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
