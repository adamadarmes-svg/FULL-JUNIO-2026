import TituloBoton from './components/TituloBoton'
import ObjetoEstilos from './components/ObjetoEstilos'
import BotonDinamico from './components/BotonDinamico'
import HoverBoton from './components/HoverBoton'
import CombinacionEstilos from './components/CombinacionEstilos'
import TextoResponsivo from './components/TextoResponsivo'
import AppModoOscuro from './components/AppModoOscuro'

const tarjetaNivelStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '0px',
  padding: '30px',
  width: '100%',
  maxWidth: '820px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  marginBottom: '30px',
  boxSizing: 'border-box',
}

const tituloNivelStyle = {
  fontSize: '20px',
  color: '#444',
  marginBottom: '20px',
}

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', backgroundColor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#1a1a2e' }}>
        Día 24
      </h1>

      <section style={tarjetaNivelStyle}>
        <h2 style={tituloNivelStyle}>
          Nivel 1
        </h2>
        <TituloBoton />
        <ObjetoEstilos />
        <BotonDinamico />
      </section>

      <section style={tarjetaNivelStyle}>
        <h2 style={tituloNivelStyle}>
          Nivel 2
        </h2>
        <HoverBoton />
        <CombinacionEstilos />
        <TextoResponsivo />
      </section>

      <section style={{ ...tarjetaNivelStyle, backgroundColor: 'transparent', boxShadow: 'none', padding: '0px' }}>
        <h2 style={tituloNivelStyle}>
          Nivel 3 y Extra
        </h2>
        <AppModoOscuro />
      </section>
    </div>
  )
}

export default App
