import { Link, isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import Boton from '../components/ui/Boton'

const NO_ENCONTRADA = {
  codigo: '404',
  titulo: 'No encontrada',
  descripcion: 'Esta página no existe',
}

function describirError(error) {
  if (!error) return NO_ENCONTRADA

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return NO_ENCONTRADA
    return {
      codigo: String(error.status),
      titulo: error.statusText || 'Error',
      descripcion: typeof error.data === 'string' && error.data ? error.data : 'Petición fallida',
    }
  }

  return {
    codigo: 'Error',
    titulo: 'Algo falló',
    descripcion: error instanceof Error && error.message ? error.message : 'Error inesperado',
  }
}

export default function ErrorPage() {
  const error = useRouteError()
  const navigate = useNavigate()
  const { codigo, titulo, descripcion } = describirError(error)

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md border border-stone-200 bg-white p-10">
        <p className="font-serif text-7xl font-light text-oro">{codigo}</p>
        <h1 className="mt-6 border-t border-stone-200 pt-6 text-[11px] uppercase tracking-[0.3em]">{titulo}</h1>
        <p className="mt-2 break-words text-sm text-stone-500">{descripcion}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Boton variante="secundario" onClick={() => navigate(-1)}>
            Volver
          </Boton>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-stone-900 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-50 transition-colors hover:bg-stone-700 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-oro"
          >
            Inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
