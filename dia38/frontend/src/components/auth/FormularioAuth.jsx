import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LIMITES } from '../../lib/constantes'
import Alerta from '../ui/Alerta'
import Boton from '../ui/Boton'
import Campo from '../ui/Campo'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TEXTOS = {
  login: {
    etiqueta: 'Iniciar sesión',
    titulo: 'Continuar partida',
    subtitulo: 'Accede a tu cuenta y sigue donde lo dejaste.',
    boton: 'Entrar',
    pregunta: '¿Primera vez por aquí?',
    enlace: 'Crea una cuenta',
    destino: '/registro',
  },
  registro: {
    etiqueta: 'Crear cuenta',
    titulo: 'Nueva partida',
    subtitulo: 'Crea tu perfil para publicar, comentar y debatir con la comunidad.',
    boton: 'Crear cuenta',
    pregunta: '¿Ya tienes cuenta?',
    enlace: 'Inicia sesión',
    destino: '/login',
  },
}

export default function FormularioAuth({ modo = 'login' }) {
  const esRegistro = modo === 'registro'
  const t = TEXTOS[modo] || TEXTOS.login
  const { login, registro } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const nombreRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmRef = useRef(null)

  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const fallar = (campo, mensaje, ref) => {
    setError({ campo, mensaje })
    ref.current?.focus()
    return false
  }

  const validar = ({ nombre, email, password, confirm }) => {
    if (esRegistro) {
      if (!nombre) return fallar('nombre', 'El nombre es obligatorio', nombreRef)
      if (nombre.length < 2) return fallar('nombre', 'El nombre debe tener al menos 2 caracteres', nombreRef)
    }
    if (!email) return fallar('email', 'El email es obligatorio', emailRef)
    if (!EMAIL_REGEX.test(email)) return fallar('email', 'El formato del email no es válido', emailRef)
    if (!password) return fallar('password', 'La contraseña es obligatoria', passwordRef)
    if (password.length < LIMITES.PASSWORD_MIN) {
      return fallar('password', `La contraseña necesita al menos ${LIMITES.PASSWORD_MIN} caracteres`, passwordRef)
    }
    if (esRegistro) {
      if (!confirm) return fallar('confirm', 'Repite la contraseña', confirmRef)
      if (confirm !== password) return fallar('confirm', 'Las contraseñas no coinciden', confirmRef)
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const datos = {
      nombre: nombreRef.current?.value.trim() ?? '',
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
      confirm: confirmRef.current?.value ?? '',
    }

    if (!validar(datos)) return

    setError(null)
    setEnviando(true)
    try {
      if (esRegistro) {
        await registro(datos.nombre, datos.email, datos.password)
      } else {
        await login(datos.email, datos.password)
      }
      navigate(location.state?.from?.pathname || '/', { replace: true })
    } catch (err) {
      setError({ campo: null, mensaje: err.message })
      setEnviando(false)
    }
  }

  const errorDe = (campo) => (error?.campo === campo ? error.mensaje : undefined)

  return (
    <div className="mx-auto max-w-sm py-4">
      <p className="etiqueta text-stone-500">{t.etiqueta}</p>
      <h1 className="mt-3 font-serif text-5xl">{t.titulo}</h1>
      <p className="mt-3 text-stone-600">{t.subtitulo}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-6">
        {error && !error.campo && <Alerta mensaje={error.mensaje} onCerrar={() => setError(null)} />}

        {esRegistro && (
          <Campo etiqueta="Nombre" nombre="nombre" placeholder="Cómo quieres que te llamen" inputRef={nombreRef} error={errorDe('nombre')} />
        )}
        <Campo etiqueta="Email" nombre="email" tipo="email" placeholder="tu@correo.com" inputRef={emailRef} error={errorDe('email')} />
        <Campo
          etiqueta="Contraseña"
          nombre="password"
          tipo="password"
          inputRef={passwordRef}
          ayuda={esRegistro ? `Mínimo ${LIMITES.PASSWORD_MIN} caracteres` : undefined}
          error={errorDe('password')}
        />
        {esRegistro && (
          <Campo etiqueta="Repite la contraseña" nombre="confirm" tipo="password" inputRef={confirmRef} error={errorDe('confirm')} />
        )}

        <Boton tipo="submit" cargando={enviando} ancho className="mt-2">
          {t.boton}
        </Boton>
      </form>

      <p className="mt-8 border-t border-stone-200 pt-6 text-sm text-stone-500">
        {t.pregunta}{' '}
        <Link to={t.destino} state={location.state} className="text-stone-900 underline underline-offset-4">
          {t.enlace}
        </Link>
      </p>
    </div>
  )
}
