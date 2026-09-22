import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { deleteTask, getTasks, toggleTask } from '../services/api';
import { useUser } from '../context/UserContext';

const FILTROS = [
  { clave: 'todas', etiqueta: 'Todas' },
  { clave: 'pendientes', etiqueta: 'Pendientes' },
  { clave: 'completadas', etiqueta: 'Completadas' },
];

const MENSAJES_VACIO = {
  pendientes: '¡Genial! No tienes tareas pendientes.',
  completadas: 'Todavía no has completado ninguna tarea.',
};

function Home() {
  const { id } = useUser();

  const [tareas, setTareas] = useState([]);
  const [filtro, setFiltro] = useState('todas');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [procesandoId, setProcesandoId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setCargando(true);
    setError('');

    getTasks(id, controller.signal)
      .then((data) => {
        setTareas(data);
        setCargando(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setCargando(false);
      });

    return () => controller.abort();
  }, [id]);

  const { contadores, tareasFiltradas } = useMemo(() => {
    const completadas = tareas.filter((t) => t.completada);
    const pendientes = tareas.filter((t) => !t.completada);

    const listas = {
      todas: tareas,
      pendientes,
      completadas,
    };

    return {
      contadores: {
        todas: tareas.length,
        pendientes: pendientes.length,
        completadas: completadas.length,
      },
      tareasFiltradas: listas[filtro],
    };
  }, [tareas, filtro]);

  const handleToggle = async (tareaId) => {
    setProcesandoId(tareaId);
    setError('');

    try {
      const actualizada = await toggleTask(tareaId);
      setTareas((prev) =>
        prev.map((t) => (t.id === tareaId ? actualizada : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesandoId(null);
    }
  };

  const handleDelete = async (tareaId) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarea?')) return;

    setProcesandoId(tareaId);
    setError('');

    try {
      await deleteTask(tareaId);
      setTareas((prev) => prev.filter((t) => t.id !== tareaId));
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesandoId(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Mis tareas</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {contadores.completadas} de {contadores.todas} completadas
          </p>
        </div>
        <Link
          to="/new-task"
          className="bg-zinc-100 px-5 py-2.5 text-center font-medium text-zinc-950 transition hover:bg-white cursor-pointer"
        >
          + Nueva tarea
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTROS.map(({ clave, etiqueta }) => (
          <button
            key={clave}
            type="button"
            onClick={() => setFiltro(clave)}
            className={`border px-4 py-2 text-sm font-medium transition cursor-pointer ${
              filtro === clave
                ? 'border-zinc-100 text-zinc-100'
                : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200'
            }`}
          >
            {etiqueta} ({contadores[clave]})
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 border border-zinc-800 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="mt-6">
        {cargando ? (
          <div className="border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
            Cargando tareas...
          </div>
        ) : tareasFiltradas.length > 0 ? (
          <div className="space-y-4">
            {tareasFiltradas.map((tarea) => (
              <TaskCard
                key={tarea.id}
                tarea={tarea}
                onToggle={handleToggle}
                onDelete={handleDelete}
                procesando={procesandoId === tarea.id}
              />
            ))}
          </div>
        ) : (
          !error && (
            <div className="border border-zinc-800 bg-zinc-900 p-8 text-center">
              {tareas.length === 0 ? (
                <>
                  <p className="text-zinc-400">
                    Todavía no tienes ninguna tarea.
                  </p>
                  <Link
                    to="/new-task"
                    className="mt-4 inline-block bg-zinc-100 px-5 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer"
                  >
                    Crear mi primera tarea
                  </Link>
                </>
              ) : (
                <p className="text-zinc-400">{MENSAJES_VACIO[filtro]}</p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
