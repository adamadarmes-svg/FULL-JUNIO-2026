import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const vacio = { nombre: '', email: '', password: '', confirmar: '' }
const input = 'h-9 w-full border border-line bg-sunken px-3 text-sm text-ink'
const label = 'mb-1 block text-[10px] font-semibold uppercase tracking-widest text-mute'

const AuthForm = () => {
  const { login, registrar } = useAuth()
  const { t } = useLanguage()
  const [registro, setRegistro] = useState(false)
  const [datos, setDatos] = useState(vacio)
  const [error, setError] = useState('')

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const alternar = () => {
    setRegistro(!registro)
    setDatos(vacio)
    setError('')
  }

  const enviar = (e) => {
    e.preventDefault()
    const { nombre, email, password, confirmar } = datos

    if (registro) {
      if (!/^\S+@\S+\.\S+$/.test(email)) return setError('El email no tiene un formato válido')
      if (password !== confirmar) return setError('Las contraseñas no coinciden')
      setError(registrar(nombre, email, password) ?? '')
    } else {
      setError(login(email, password) ?? '')
    }
  }

  return (
    <form onSubmit={enviar} className="card">
      <p className="card-tag">
        <span>{t(registro ? 'Crear cuenta' : 'Inicia sesión')}</span>
      </p>

      <div className="mb-5 space-y-4">
        {registro && (
          <div>
            <label className={label} htmlFor="nombre">{t('Nombre')}</label>
            <input id="nombre" name="nombre" required value={datos.nombre} onChange={cambiar} className={input} />
          </div>
        )}
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={datos.email} onChange={cambiar} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="password">{t('Contraseña')}</label>
          <input id="password" name="password" type="password" required value={datos.password} onChange={cambiar} className={input} />
        </div>
        {registro && (
          <div>
            <label className={label} htmlFor="confirmar">{t('Confirmar contraseña')}</label>
            <input id="confirmar" name="confirmar" type="password" required value={datos.confirmar} onChange={cambiar} className={input} />
          </div>
        )}
      </div>

      {error && <p className="mb-4 text-xs text-danger">{t(error)}</p>}

      <button type="submit" className="btn-solid w-full">
        {t(registro ? 'Registrarme' : 'Entrar')}
      </button>

      <p className="mt-4 text-center text-xs text-mute">
        {t(registro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?')}{' '}
        <button type="button" onClick={alternar} className="cursor-pointer font-semibold text-ink underline">
          {t(registro ? 'Inicia sesión' : 'Regístrate')}
        </button>
      </p>
    </form>
  )
}

export default AuthForm
