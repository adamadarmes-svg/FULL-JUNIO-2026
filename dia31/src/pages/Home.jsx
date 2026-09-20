import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white border border-zinc-200 p-8">
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        Bienvenido
      </h1>
      <p className="text-zinc-500 mb-8">
        Bienvenido a nuestro espacio de noticias. Navega con el menú superior o utiliza los botones de abajo.
      </p>

      <div className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
        <button
          onClick={() => navigate('/about')}
          className="bg-white hover:bg-zinc-50 text-left p-5 cursor-pointer transition-colors"
        >
          <span className="block text-zinc-900 font-semibold mb-1">About →</span>
        </button>
        <button
          onClick={() => navigate('/news')}
          className="bg-white hover:bg-zinc-50 text-left p-5 cursor-pointer transition-colors"
        >
          <span className="block text-zinc-900 font-semibold mb-1">Noticias →</span>
        </button>
      </div>

    </div>
  )
}

export default Home