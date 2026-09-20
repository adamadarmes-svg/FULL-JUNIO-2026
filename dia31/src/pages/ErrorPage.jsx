import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  const esRespuesta = isRouteErrorResponse(error)
  const codigo  = esRespuesta ? error.status : '500'
  const mensaje = esRespuesta
    ? error.statusText || error.data
    : error?.message || 'Ha ocurrido un error inesperado'

  return (
    <div className="bg-white border border-zinc-200 p-8 text-center">
      <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
        Error
      </p>

      <p className="text-6xl font-bold text-zinc-900 mb-2 tracking-tight">
        {codigo}
      </p>

      <h1 className="text-xl font-semibold text-zinc-900 mb-2">
        Algo salió mal
      </h1>

      <p className="text-zinc-500 mb-8">
        {mensaje}
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold px-5 py-2 cursor-pointer transition-colors"
        >
          ← Volver atrás
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 cursor-pointer transition-colors"
        >
          Ir al inicio
        </button>
      </div>

      <p className="text-zinc-400 text-xs mt-8 font-mono">
        errorElement + useRouteError()
      </p>
    </div>
  )
}

export default ErrorPage