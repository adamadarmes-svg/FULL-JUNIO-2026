import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskForm({
  valoresIniciales = { titulo: '', descripcion: '' },
  onSubmit,
  textoBoton,
  titulo,
}) {
  const navigate = useNavigate();

  const tituloRef = useRef(null);
  const descripcionRef = useRef(null);

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tituloValor = tituloRef.current.value.trim();
    const descripcionValor = descripcionRef.current.value.trim();

    if (!tituloValor) {
      setError('El título es obligatorio');
      tituloRef.current.focus();
      return;
    }

    setError('');
    setCargando(true);

    try {
      await onSubmit({ titulo: tituloValor, descripcion: descripcionValor });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
      <h1 className="text-2xl font-semibold text-zinc-100">{titulo}</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {error && (
          <div className="border border-zinc-800 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-zinc-400 mb-1"
          >
            Título
          </label>
          <input
            id="titulo"
            type="text"
            ref={tituloRef}
            maxLength={100}
            defaultValue={valoresIniciales.titulo}
            placeholder="¿Qué tienes que hacer?"
            className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
          />
        </div>

        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-zinc-400 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            ref={descripcionRef}
            rows={5}
            maxLength={500}
            defaultValue={valoresIniciales.descripcion}
            placeholder="Añade más detalles (opcional)"
            className="w-full resize-none border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={cargando}
            className="border border-zinc-800 px-4 py-2.5 font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-zinc-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={cargando}
            className="bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando ? 'Guardando...' : textoBoton}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
