import { useState, useEffect, useCallback } from 'react'

const API_KEY = import.meta.env.VITE_WEATHER_KEY

const getEmoji = (codigo) => {
  if (codigo.startsWith('01')) return '☀️'
  if (codigo.startsWith('02')) return '⛅'
  if (codigo.startsWith('03')) return '☁️'
  if (codigo.startsWith('04')) return '☁️'
  if (codigo.startsWith('09')) return '🌧️'
  if (codigo.startsWith('10')) return '🌦️'
  if (codigo.startsWith('11')) return '⛈️'
  if (codigo.startsWith('13')) return '❄️'
  if (codigo.startsWith('50')) return '🌫️'
  return '🌡️'
}

const ClimaApp = () => {
  const [ciudad, setCiudad] = useState('Madrid')
  const [inputCiudad, setInputCiudad] = useState('Madrid')
  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null)

  const fetchClima = useCallback(async () => {
    if (!ciudad.trim()) return

    setCargando(true)
    setError(null)

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
      const res = await fetch(url)

      if (!res.ok) {
        if (res.status === 404) throw new Error('Ciudad no encontrada')
        if (res.status === 401) throw new Error('API key inválida')
        throw new Error('Error al obtener el clima')
      }

      const data = await res.json()
      setClima(data)
      setUltimaActualizacion(new Date().toLocaleTimeString())
    } catch (err) {
      setError(err.message)
      setClima(null)
    } finally {
      setCargando(false)
    }
  }, [ciudad])

  useEffect(() => {
    fetchClima()

    const intervalo = setInterval(fetchClima, 300000)

    return () => clearInterval(intervalo)
  }, [fetchClima])

  const manejarBusqueda = (e) => {
    e.preventDefault()
    if (!inputCiudad.trim()) return
    setCiudad(inputCiudad.trim())
  }

  return (
    <div className="max-w-xl mx-auto">

      <form
        onSubmit={manejarBusqueda}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={inputCiudad}
          onChange={e => setInputCiudad(e.target.value)}
          placeholder="Escribe una ciudad..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white transition-all"
        />
        <button
          type="submit"
          disabled={cargando}
          className="bg-white text-blue-700 font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-all cursor-pointer disabled:opacity-50"
        >
          🔍 Buscar
        </button>
        <button
          type="button"
          onClick={fetchClima}
          disabled={cargando}
          className="bg-white/20 text-white font-bold px-4 py-3 rounded-xl hover:bg-white/30 border border-white/30 transition-all cursor-pointer disabled:opacity-50"
          title="Actualizar manualmente"
        >
          🔄
        </button>
      </form>

      {cargando && (
        <div className="bg-white/10 rounded-2xl p-8 text-center text-white">
          <div className="text-5xl mb-4 animate-pulse">⏳</div>
          <p className="text-lg">Obteniendo el clima...</p>
        </div>
      )}

      {error && !cargando && (
        <div className="bg-red-500/30 border border-red-400/50 rounded-2xl p-6 text-white">
          <p className="text-2xl mb-2">Error</p>
          <p className="text-lg">{error}</p>
          <p className="text-sm text-white/60 mt-2">
            Comprueba el nombre de la ciudad e inténtalo de nuevo.
          </p>
        </div>
      )}

      {clima && !cargando && !error && (
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-white">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold">
                {clima.name}, {clima.sys.country}
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Actualizado: {ultimaActualizacion}
              </p>
            </div>
            <span className="text-6xl">
              {getEmoji(clima.weather[0].icon)}
            </span>
          </div>

          <div className="text-center my-6">
            <p className="text-8xl font-thin">
              {Math.round(clima.main.temp)}°
            </p>
            <p className="text-xl capitalize text-white/80 mt-2">
              {clima.weather[0].description}
            </p>
            <p className="text-white/50 text-sm mt-1">
              Sensación térmica: {Math.round(clima.main.feels_like)}°C
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Humedad</p>
              <p className="text-2xl font-semibold mt-1">
                {clima.main.humidity}%
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Mín / Máx</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(clima.main.temp_min)}° / {Math.round(clima.main.temp_max)}°
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Viento</p>
              <p className="text-2xl font-semibold mt-1">
                {Math.round(clima.wind.speed * 3.6)} km/h
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Visibilidad</p>
              <p className="text-2xl font-semibold mt-1">
                {(clima.visibility / 1000).toFixed(1)} km
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Amanecer</p>
              <p className="text-2xl font-semibold mt-1">
                {new Date(clima.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <p className="text-white/50 text-sm">Atardecer</p>
              <p className="text-2xl font-semibold mt-1">
                {new Date(clima.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>

          </div>

        </div>
      )}

      {!clima && !cargando && !error && (
        <div className="bg-white/10 rounded-2xl p-8 text-center text-white">
          <p className="text-5xl mb-4">🌍</p>
          <p className="text-lg">Ingresa una ciudad para ver el clima</p>
        </div>
      )}

    </div>
  )
}

export default ClimaApp