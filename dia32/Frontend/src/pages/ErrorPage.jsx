import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let codigo = '';
  let titulo = 'Algo salió mal';

  if (!error) {
    codigo = '404';
    titulo = 'Página no encontrada';
    detalle = 'La página que buscas no existe o ha sido movida.';
  } else if (isRouteErrorResponse(error)) {
    codigo = String(error.status);
    titulo = error.statusText || 'Error';
    detalle = typeof error.data === 'string' ? error.data : '';
  } else {
    detalle = error.message || 'Ocurrió un error inesperado';
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-900 p-6 text-center sm:p-8">
        {codigo && (
          <p className="text-6xl font-semibold text-zinc-100">{codigo}</p>
        )}
        <h1 className="mt-2 text-2xl font-semibold text-zinc-100">{titulo}</h1>
        {detalle && (
          <p className="mt-2 break-words text-zinc-500">{detalle}</p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-zinc-800 px-4 py-2.5 font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 cursor-pointer"
          >
            Volver atrás
          </button>
          <Link
            to="/"
            className="bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
