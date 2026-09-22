import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getTask, toggleTask } from '../services/api';
import { useUser } from '../context/UserContext';

function TaskDetail() {
  const { id: taskId } = useParams();
  const { id: userId } = useUser();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [errorAccion, setErrorAccion] = useState('');
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCargando(true);
    setError('');
    setErrorAccion('');

    getTask(taskId, controller.signal)
      .then((data) => {
        setTarea(data);
        setCargando(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setCargando(false);
      });

    return () => controller.abort();
  }, [taskId]);

  const handleToggle = async () => {
    setProcesando(true);
    setErrorAccion('');

    try {
      const actualizada = await toggleTask(tarea.id);
      setTarea(actualizada);
    } catch (err) {
      setErrorAccion(err.message);
    } finally {
      setProcesando(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea?')) return;

    setProcesando(true);
    setErrorAccion('');

    try {
      await deleteTask(tarea.id);
      navigate('/');
    } catch (err) {
      setErrorAccion(err.message);
      setProcesando(false);
    }
  };

  const volverEnlace = (
    <Link
      to="/"
      className="mt-4 inline-block bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer"
    >
      Volver al listado
    </Link>
  );

  if (cargando) {
    return (
      <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8 text-center text-zinc-500">
        Cargando tarea...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8 text-center">
        <div className="border border-zinc-800 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
        {volverEnlace}
      </div>
    );
  }

  if (!tarea) return null;

  if (String(tarea.userId) !== String(userId)) {
    return (
      <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8 text-center">
        <div className="border border-zinc-800 px-4 py-3 text-sm text-red-400">
          No tienes permiso para ver esta tarea
        </div>
        {volverEnlace}
      </div>
    );
  }

  const completada = tarea.completada;

  return (
    <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1
          className={`break-words text-3xl font-semibold ${
            completada ? 'text-zinc-500 line-through' : 'text-zinc-100'
          }`}
        >
          {tarea.titulo}
        </h1>
        <span
          className={`text-sm font-medium uppercase tracking-wide ${
            completada ? 'text-emerald-600' : 'text-zinc-500'
          }`}
        >
          {completada ? 'Completada' : 'Pendiente'}
        </span>
      </div>

      {tarea.descripcion ? (
        <p className="mt-6 whitespace-pre-wrap break-words text-zinc-300">
          {tarea.descripcion}
        </p>
      ) : (
        <p className="mt-6 italic text-zinc-600">Sin descripción</p>
      )}

      <dl className="mt-6 space-y-1 text-sm text-zinc-500">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium">Creada:</dt>
          <dd>{new Date(tarea.createdAt).toLocaleString('es-ES')}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium">Última actualización:</dt>
          <dd>{new Date(tarea.updatedAt).toLocaleString('es-ES')}</dd>
        </div>
      </dl>

      {errorAccion && (
        <div className="mt-6 border border-zinc-800 px-4 py-3 text-sm text-red-400">
          {errorAccion}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={handleToggle}
          disabled={procesando}
          className="bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </button>
        <Link
          to={`/edit/${tarea.id}`}
          onClick={(e) => procesando && e.preventDefault()}
          aria-disabled={procesando}
          tabIndex={procesando ? -1 : undefined}
          className={`border border-zinc-800 px-4 py-2.5 text-center font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 ${
            procesando ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Editar
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={procesando}
          className="border border-zinc-800 px-4 py-2.5 font-medium text-red-500 transition hover:border-red-900 hover:text-red-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Eliminar
        </button>
        <Link
          to="/"
          className="border border-zinc-800 px-4 py-2.5 text-center font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 sm:ml-auto"
        >
          Volver al listado
        </Link>
      </div>
    </div>
  );
}

export default TaskDetail;
