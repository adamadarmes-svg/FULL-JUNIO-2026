import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTask, updateTask } from '../services/api';
import { useUser } from '../context/UserContext';

function EditTask() {
  const { id: taskId } = useParams();
  const { id: userId } = useUser();
  const navigate = useNavigate();

  const [tarea, setTarea] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    setCargando(true);
    setError('');

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

  const handleSubmit = async ({ titulo, descripcion }) => {
    await updateTask(tarea.id, { titulo, descripcion });
    navigate(`/task/${tarea.id}`);
  };

  const volverBoton = (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="mt-4 bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer"
    >
      Volver al inicio
    </button>
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
        {volverBoton}
      </div>
    );
  }

  if (!tarea) return null;

  if (String(tarea.userId) !== String(userId)) {
    return (
      <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8 text-center">
        <div className="border border-zinc-800 px-4 py-3 text-sm text-red-400">
          No tienes permiso para editar esta tarea
        </div>
        {volverBoton}
      </div>
    );
  }

  return (
    <TaskForm
      key={tarea.id}
      titulo="Editar tarea"
      textoBoton="Guardar cambios"
      valoresIniciales={{
        titulo: tarea.titulo,
        descripcion: tarea.descripcion,
      }}
      onSubmit={handleSubmit}
    />
  );
}

export default EditTask;
