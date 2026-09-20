import Saludo from './components/Saludo'
import ContadorTS from './components/ContadorTS'
import FormularioNombre from './components/FormularioNombre'
import Calculadora from './components/Calculadora'
import ListaTareas from './components/ListaTareas'
import UsuarioCard from './components/UsuarioCard'
import BotonToggle from './components/BotonToggle'
import ListaUsuarios from './components/ListaUsuarios'

const tareas = [
  { id: 1, texto: 'Gaius Marius', completada: true },
  { id: 2, texto: 'Publius Cornelius Scipio Aemilianus Africanus minor Numantinus', completada: true },
  { id: 3, texto: 'don Pelayo', completada: false },
]

const usuario = {
  nombre: 'Iván Ivánovichs',
  edad: 25,
  activo: true,
}

const usuarios = [
  { id: 1, nombre: 'Vladímir Ilich Uliánov',    email: 'Lenin@email.com',    rol: 'Admin'       },
  { id: 2, nombre: 'Iósif Vissariónovich Dzhugashvili',  email: 'IósifStalin@email.com', rol: 'Desarrollador'   },
  { id: 3, nombre: 'Vladímir Vladímirovich Nabókov', email: 'VladímirNabokov@email.com',  rol: ' Mantenimiento'    },
  { id: 4, nombre: 'Vladímir Vladímirovich Putin',   email: 'VladímirPutino@email.com',  rol: 'Publicidad'   },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        Día 28
      </h1>
      <p className="text-gray-400 text-sm mb-8 text-center">
        Gaius Iulius Caesar
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-8 items-start">
        <div className="flex justify-center">
          <ListaTareas tareas={tareas} />
        </div>

        <div className="flex flex-col items-center gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
              Nivel 1
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Saludo nombre="Gustavo" />
              <ContadorTS />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
              Nivel 2
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <FormularioNombre />
              <Calculadora />
              <UsuarioCard usuario={usuario} />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4 text-center">
              Nivel 3
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <BotonToggle />
            </div>
          </section>
        </div>

        <div className="flex justify-center">
          <ListaUsuarios usuarios={usuarios} />
        </div>
      </div>
    </div>
  )
}

export default App