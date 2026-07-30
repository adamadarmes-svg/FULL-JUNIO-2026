import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const links = ['Inicio', 'Calculadora', 'Sección']

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName="dia18" links={links} />
      <Main />
      <Footer message="© 2026 - Todos los derechos reservados" />
    </div>
  )
}

export default App
