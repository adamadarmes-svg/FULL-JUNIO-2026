import { useLoaderData, useNavigate, Link } from 'react-router-dom'
import { buscarNoticia, noticias } from '../data/noticias'

export const newsLoader = ({ params }) => {
  const noticia = buscarNoticia(params.id)

  if (!noticia) {
    throw new Response(`No existe la noticia con id ${params.id}`, {
      status: 404
    })
  }

  return noticia
}

const NewsDetail = () => {
  const noticia = useLoaderData()
  const navigate = useNavigate()

  const indice    = noticias.findIndex(n => n.id === noticia.id)
  const anterior  = noticias[indice - 1]
  const siguiente = noticias[indice + 1]

  return (
    <div>
      <Link
        to="/news"
        className="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-semibold mb-4 transition-colors"
      >
        ← Volver a noticias
      </Link>

      <article className="bg-white border border-zinc-200">
        <div className="flex items-center gap-4 p-8 pb-6 border-b border-zinc-200">
          <div>
            <span className="text-indigo-700 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5">
              {noticia.categoria}
            </span>
            <p className="text-zinc-400 text-xs font-mono mt-2">{noticia.fecha}</p>
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">
            {noticia.titulo}
          </h1>

          <p className="text-lg text-zinc-600 font-medium mb-4 border-l-2 border-indigo-200 pl-4">
            {noticia.resumen}
          </p>

          <p className="text-zinc-600 leading-relaxed">
            {noticia.contenido}
          </p>
        </div>
      </article>

      <div className="flex gap-px mt-4 bg-zinc-200 border border-zinc-200">
        <button
          onClick={() => navigate(`/news/${anterior.id}`)}
          disabled={!anterior}
          className="bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 font-semibold px-5 py-3 cursor-pointer transition-colors flex-1 text-left"
        >
          <span className="text-zinc-400 text-xs block font-normal">← Anterior</span>
          {anterior ? anterior.titulo.slice(0, 30) + '...' : 'No hay más'}
        </button>

        <button
          onClick={() => navigate(`/news/${siguiente.id}`)}
          disabled={!siguiente}
          className="bg-white hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed text-zinc-700 font-semibold px-5 py-3 cursor-pointer transition-colors flex-1 text-right"
        >
          <span className="text-zinc-400 text-xs block font-normal">Siguiente →</span>
          {siguiente ? siguiente.titulo.slice(0, 30) + '...' : 'No hay más'}
        </button>
      </div>

      <p className="text-zinc-400 text-xs mt-6 text-center">
        Otras noticias:{' '}
        <button
          onClick={() => navigate('/news/999')}
          className="text-red-600 hover:underline cursor-pointer font-semibold"
        >
          /news/999
        </button>
      </p>
    </div>
  )
}

export default NewsDetail