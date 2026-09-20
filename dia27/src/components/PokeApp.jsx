import { useState, useEffect } from 'react'

const coloresTipo = {
  fire: 'bg-red-900/50', water: 'bg-blue-950/60', grass: 'bg-green-950/60', electric: 'bg-yellow-800/40',
  psychic: 'bg-pink-950/60', ice: 'bg-cyan-950/60', dragon: 'bg-indigo-950/60', dark: 'bg-neutral-900/60',
  fairy: 'bg-rose-950/60', normal: 'bg-stone-700/50', fighting: 'bg-red-950/60', flying: 'bg-slate-800/50',
  poison: 'bg-purple-950/60', ground: 'bg-amber-950/50', rock: 'bg-yellow-950/50', bug: 'bg-lime-950/50',
  ghost: 'bg-violet-950/60', steel: 'bg-zinc-700/50',
}

const PokeApp = () => {
  const [input, setInput] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!busqueda) return
    setCargando(true)
    setError(null)
    setPokemon(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda.toLowerCase().trim()}`)
      .then(res => {
        if (!res.ok) throw new Error(res.status === 404 ? `No existe el Pokémon "${busqueda}"` : 'Error al conectar con la PokéAPI')
        return res.json()
      })
      .then(setPokemon)
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [busqueda])

  const manejarBusqueda = (e) => {
    e.preventDefault()
    if (!input.trim()) return setError('Escribe el nombre o número de un Pokémon')
    setBusqueda(input.trim())
  }

  const aleatorio = () => {
    const id = Math.floor(Math.random() * 898) + 1
    setInput(String(id))
    setBusqueda(String(id))
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={manejarBusqueda} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setError(null) }}
          placeholder="Nombre o número del Pokémon..."
          className="flex-1 px-4 py-3 bg-black/40 text-stone-100 placeholder-stone-500 border-2 border-red-900/40 focus:outline-none focus:border-red-800"
        />
        <button type="submit" disabled={cargando} className="bg-red-950 text-stone-200 font-bold px-5 py-3 border-2 border-red-900/60 hover:bg-red-900 disabled:opacity-50">👁️</button>
        <button type="button" onClick={aleatorio} disabled={cargando} title="Pokémon aleatorio" className="bg-black/40 text-stone-300 font-bold px-4 py-3 border-2 border-stone-700 hover:border-stone-500 disabled:opacity-50">💀</button>
      </form>

      {cargando && <div className="bg-black/30 border border-stone-800 p-10 text-center text-stone-200">Buscando Pokémon...</div>}

      {error && !cargando && <div className="bg-black/40 border-l-4 border-red-900/70 p-6 text-stone-200 text-center">{error}</div>}

      {pokemon && !cargando && (
        <div className="bg-zinc-950/80 border border-stone-800 text-stone-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
            <span className="text-stone-500 text-xl font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
          </div>

          <div className="flex justify-center mb-4 bg-black/30 border border-stone-800 p-4">
            <img src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} alt={pokemon.name} className="w-48 h-48 object-contain" />
          </div>

          <div className="flex gap-2 justify-center mb-6">
            {pokemon.types.map(t => (
              <span key={t.type.name} className={`${coloresTipo[t.type.name] || 'bg-stone-700/50'} text-stone-200 px-4 py-1 border border-white/10 text-sm font-semibold uppercase`}>
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-black/30 border border-stone-800 p-4">
              <p className="text-stone-500 text-sm">Peso</p>
              <p className="text-2xl font-semibold mt-1">{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
            <div className="bg-black/30 border border-stone-800 p-4">
              <p className="text-stone-500 text-sm">Altura</p>
              <p className="text-2xl font-semibold mt-1">{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div className="bg-black/30 border border-stone-800 p-4">
              <p className="text-stone-500 text-sm">Experiencia</p>
              <p className="text-2xl font-semibold mt-1">{pokemon.base_experience} xp</p>
            </div>
            <div className="bg-black/30 border border-stone-800 p-4">
              <p className="text-stone-500 text-sm">Habilidades</p>
              <p className="text-lg font-semibold mt-1 capitalize">{pokemon.abilities.slice(0, 2).map(a => a.ability.name).join(', ')}</p>
            </div>
          </div>

          <div className="bg-black/30 border border-stone-800 p-4">
            <p className="text-stone-500 text-sm mb-3">Estadísticas base</p>
            {pokemon.stats.map(stat => (
              <div key={stat.stat.name} className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-stone-400">{stat.stat.name}</span>
                  <span className="font-semibold text-stone-200">{stat.base_stat}</span>
                </div>
                <div className="bg-black/50 border border-stone-800 h-2">
                  <div className="bg-gradient-to-r from-red-950 to-red-800 h-full" style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-black/30 border border-stone-800 p-4">
            <p className="text-stone-500 text-sm mb-3">Sprites</p>
            <div className="flex justify-center gap-4">
              {[
                { src: pokemon.sprites.front_default, title: 'Normal' },
                { src: pokemon.sprites.back_default, title: 'Espalda' },
                { src: pokemon.sprites.front_shiny, title: 'Shiny' },
                { src: pokemon.sprites.back_shiny, title: 'Shiny espalda' },
              ].map(({ src, title }) => src && <img key={title} src={src} alt={title} title={title} className="w-16 h-16 object-contain" />)}
            </div>
          </div>
        </div>
      )}

      {!pokemon && !cargando && !error && (
        <div className="bg-black/30 border border-stone-800 p-10 text-center text-stone-300">
          <p className="text-6xl mb-4">🔴</p>
          <p className="text-xl font-semibold">Busca tu Pokémon favorito</p>
        </div>
      )}
    </div>
  )
}

export default PokeApp
