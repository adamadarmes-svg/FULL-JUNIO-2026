import Contador from './components/Contador'
import Interruptor from './components/Interruptor'
import ListaDinamica from './components/ListaDinamica'
import CampoTexto from './components/CampoTexto'
import LlamadaAPI from './components/LlamadaAPI'
import Temporizador from './components/Temporizador'
import ContadorAuto from './components/ContadorAuto'
import ColorFondo from './components/ColorFondo'
import Formulario from './components/Formulario'
import DetectorTecla from './components/DetectorTecla'
import BotonAlerta from './components/BotonAlerta'
import DivColor from './components/DivColor'
import ContadorPausa from './components/ContadorPausa'
import ListaEliminable from './components/ListaEliminable'

function App() {
  return (
    <div className="min-h-screen p-8 font-sans max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold border-b-4 border-black pb-4 mb-10 tracking-tight">
        DÍA <span className="txt-oro">22</span>
      </h1>

      <section className="nivel-oro mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge">01</span>
          <h2 className="text-xl font-semibold txt-oro">Nivel</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Contador />
          <Interruptor />
          <ListaDinamica />
          <CampoTexto />
        </div>
      </section>

      <section className="nivel-rojo mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge">02</span>
          <h2 className="text-xl font-semibold txt-rojo">Nivel</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <LlamadaAPI />
          <Temporizador />
          <ContadorAuto />
          <ColorFondo />
        </div>
      </section>

      <section className="nivel-negro mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge">03</span>
          <h2 className="text-xl font-semibold">Nivel</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Formulario />
          <DetectorTecla />
          <BotonAlerta />
          <DivColor />
        </div>
      </section>

      <section className="nivel-mix">
        <div className="flex items-center gap-3 mb-4">
          <span className="badge badge-mix"></span>
          <h2 className="text-xl font-semibold">Extra</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <ContadorPausa />
          <ListaEliminable />
        </div>
      </section>
    </div>
  )
}

export default App
