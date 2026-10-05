import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import Boton from '../components/ui/Boton'

const NO_ENCONTRADO = {
  codigo: 404,
  titulo: 'Te has salido del mapa',
  detalle: 'La página que buscas no existe o ha sido eliminada.',
}

function describirError(error) {
  if (!error) return NO_ENCONTRADO

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return NO_ENCONTRADO
    const detalle = typeof error.data === 'string' ? error.data : error.data?.error
    return { codigo: error.status, titulo: 'Algo ha fallado', detalle: detalle || error.statusText }
  }

  return {
    codigo: 500,
    titulo: 'Algo ha fallado',
    detalle: error instanceof Error ? error.message : 'Se ha producido un error inesperado.',
  }
}

export default function ErrorPage() {
  const navigate = useNavigate()
  const { codigo, titulo, detalle } = describirError(useRouteError())

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-16">
      <p className="etiqueta text-stone-500">Error {codigo}</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight sm:text-6xl">{titulo}</h1>
      <p className="mt-4 break-words text-stone-600">{detalle}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Boton variante="secundario" onClick={() => navigate(-1)}>
          ← Volver atrás
        </Boton>
        <Boton to="/">Ir al feed</Boton>
      </div>
    </div>
  )
}
