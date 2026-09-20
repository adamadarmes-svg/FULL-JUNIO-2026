import './index.css'
import Perfil from './components/Perfil'
import Producto from './components/Producto'
import Saludo from './components/Saludo'
import Boton from './components/Boton'
import Tarea from './components/Tarea'
import Avatar from './components/Avatar'
import Tarjeta from './components/Tarjeta'
import Contenedor from './components/Contenedor'
import Alerta from './components/Alerta'
import Caja from './components/Caja'
import Lista from './components/Lista'
import BotonPersonalizado from './components/BotonPersonalizado'

function App() {
  const manejarClic = () => {
    alert('¡Botón pulsado!')
  }

  const manejarLike = () => {
    alert('Has dado like')
  }

  const manejarSend = () => {
    alert('Enviado')
  }

  return (
    <div className="min-h-screen bg-white p-8 font-serif flex justify-center">
      <div className="w-full max-w-2xl bg-white border-4 border-double border-[#b8942f] p-8 shadow-[10px_10px_0_0_rgba(122,31,43,0.12)]">
        <h1 className="text-4xl font-bold text-[#7a1f2b] mb-8 border-b-4 border-double border-[#b8942f] pb-4 text-center uppercase tracking-widest">
          Día 21
        </h1>

        <section className="mb-8 flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold text-[#7a1f2b] mb-2 uppercase tracking-widest border-b border-[#b8942f]/50 pb-1 text-center w-full">
            Nivel 1
          </h2>
          <Perfil nombre="Carlos" edad={25} />
          <Producto nombre="Zapatillas" precio={49.99} />
          <Saludo nombre="Ana" />
        </section>

        <section className="mb-8 flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold text-[#7a1f2b] mb-2 uppercase tracking-widest border-b border-[#b8942f]/50 pb-1 text-center w-full">
            Nivel 2
          </h2>
          <Boton texto="Púlsame" onClick={manejarClic} />
          <Tarea texto="Comprar leche" completada={true} />
          <Tarea texto="Hacer ejercicio" completada={false} />
          <Avatar url="../images/spqr.png" />
        </section>

        <section className="mb-8 flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold text-[#7a1f2b] mb-2 uppercase tracking-widest border-b border-[#b8942f]/50 pb-1 text-center w-full">
            Nivel 3
          </h2>
          <Tarjeta>
            <h3 className="text-lg font-bold mb-2 text-center text-[#7a1f2b]">ego sum tarjet</h3>
            <p className="text-[#2a1013] text-center">eto non est ratione</p>
          </Tarjeta>
          <Contenedor>
            <h3 className="text-lg font-bold mb-2 text-center text-[#7a1f2b]">ego sum container</h3>
            <p className="text-[#2a1013] text-center">eto non est molestiae</p>
          </Contenedor>
          <Alerta>hic est une message alert</Alerta>
        </section>

        <section className="mb-2 flex flex-col items-center gap-3">
          <h2 className="text-xl font-semibold text-[#7a1f2b] mb-2 uppercase tracking-widest border-b border-[#b8942f]/50 pb-1 text-center w-full">
            Extra
          </h2>
          <Caja>
            <p className="text-[#2a1013] text-center">Vivat Christus Rex</p>
          </Caja>
          <Lista>
            <li className="text-[#2a1013]">per Sacrum Imperium Romanum</li>
            <li className="text-[#2a1013]">pro magno imperio Hispanico</li>
            <li className="text-[#2a1013]">per Americam</li>
            <li className="text-[#2a1013]">per omnia existentia</li>
          </Lista>
          <div className="flex gap-2">
            <BotonPersonalizado onClick={manejarLike}> LIKE</BotonPersonalizado>
            <BotonPersonalizado onClick={manejarSend}> SEND</BotonPersonalizado>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App