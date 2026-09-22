import { Link } from 'react-router-dom';

function TaskCard({ tarea, onToggle, onDelete, procesando }) {
  const completada = tarea.completada;

  const bloquearEnlace = (e) => {
    if (procesando) e.preventDefault();
  };

  const estiloEnlace = `px-3 py-1.5 text-sm font-medium transition ${
    procesando ? 'pointer-events-none opacity-50' : ''
  }`;

  return (
    <article className="flex gap-4 border border-zinc-800 bg-zinc-900 p-4 sm:p-5">
      <button
        type="button"
        onClick={() => onToggle(tarea.id)}
        disabled={procesando}
        aria-label={
          completada ? 'Marcar como pendiente' : 'Marcar como completada'
        }
        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center border text-xs transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          completada
            ? 'border-zinc-100 bg-zinc-100 text-zinc-950'
            : 'border-zinc-700 hover:border-zinc-400'
        }`}
      >
        {completada && '✓'}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2
            className={`break-words text-lg font-semibold ${
              completada ? 'text-zinc-500 line-through' : 'text-zinc-100'
            }`}
          >
            {tarea.titulo}
          </h2>
          <span
            className={`text-xs font-medium uppercase tracking-wide ${
              completada ? 'text-emerald-600' : 'text-zinc-500'
            }`}
          >
            {completada ? 'Completada' : 'Pendiente'}
          </span>
        </div>

        {tarea.descripcion ? (
          <p className="mt-1 line-clamp-2 break-words text-sm text-zinc-400">
            {tarea.descripcion}
          </p>
        ) : (
          <p className="mt-1 text-sm italic text-zinc-600">Sin descripción</p>
        )}

        <p className="mt-2 text-xs text-zinc-600">
          Creada el {new Date(tarea.createdAt).toLocaleDateString('es-ES')}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            to={`/task/${tarea.id}`}
            onClick={bloquearEnlace}
            aria-disabled={procesando}
            tabIndex={procesando ? -1 : undefined}
            className={`${estiloEnlace} border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100`}
          >
            Ver
          </Link>
          <Link
            to={`/edit/${tarea.id}`}
            onClick={bloquearEnlace}
            aria-disabled={procesando}
            tabIndex={procesando ? -1 : undefined}
            className={`${estiloEnlace} border border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-zinc-100`}
          >
            Editar
          </Link>
          <button
            type="button"
            onClick={() => onDelete(tarea.id)}
            disabled={procesando}
            className="border border-zinc-800 px-3 py-1.5 text-sm font-medium text-red-500 transition hover:border-red-900 hover:text-red-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
