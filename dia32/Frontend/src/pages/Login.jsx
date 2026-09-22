import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Login() {
  const { isAuthenticated, login, registro } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [modo, setModo] = useState('login');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const esRegistro = modo === 'registro';

  const cambiarModo = () => {
    setError('');
    if (emailRef.current) emailRef.current.value = '';
    if (passwordRef.current) passwordRef.current.value = '';
    if (confirmRef.current) confirmRef.current.value = '';
    setModo(esRegistro ? 'login' : 'registro');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current?.value ?? '';

    if (!email || !password) {
      setError('El email y la contraseña son obligatorios');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (esRegistro && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    setCargando(true);

    try {
      if (esRegistro) {
        await registro(email, password, confirmPassword);
      } else {
        await login(email, password);
      }
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold text-zinc-100 text-center">
          Gestor de Tareas
        </h1>
        <p className="mt-1 text-sm text-zinc-500 text-center">
          {esRegistro
            ? 'Crea una cuenta para empezar'
            : 'Inicia sesión para ver tus tareas'}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {error && (
            <div className="border border-zinc-800 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              autoComplete="email"
              placeholder="tu@email.com"
              className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-400 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              autoComplete={esRegistro ? 'new-password' : 'current-password'}
              placeholder="Mínimo 6 caracteres"
              className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
            />
          </div>

          {esRegistro && (
            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-zinc-400 mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirm"
                type="password"
                ref={confirmRef}
                autoComplete="new-password"
                placeholder="Repite tu contraseña"
                className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-zinc-100 px-4 py-2.5 font-medium text-zinc-950 transition hover:bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cargando
              ? esRegistro
                ? 'Creando cuenta...'
                : 'Entrando...'
              : esRegistro
                ? 'Crear cuenta'
                : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          <button
            type="button"
            onClick={cambiarModo}
            disabled={cargando}
            className="text-zinc-300 font-medium transition hover:text-zinc-100 hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {esRegistro
              ? '¿Ya tienes cuenta? Inicia sesión'
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
