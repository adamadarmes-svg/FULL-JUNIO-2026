import { Link } from 'react-router-dom'
import { noticias } from '../data/noticias'

const News = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-2 tracking-tight">
        Noticias
      </h1>

      <div className="bg-white border border-zinc-200 divide-y divide-zinc-200">
        {noticias.map(noticia => (
          <Link
            key={noticia.id}
            to={`/news/${noticia.id}`}
            className="group flex items-start gap-4 p-6 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-indigo-700 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5">
                  {noticia.categoria}
                </span>
                <span className="text-zinc-400 text-xs font-mono">
                  {noticia.fecha}
                </span>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {noticia.titulo}
              </h2>
              <p className="text-zinc-500 text-sm">
                {noticia.resumen}
              </p>
            </div>
            <span className="text-zinc-300 group-hover:text-indigo-500 text-lg shrink-0 mt-1 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default News