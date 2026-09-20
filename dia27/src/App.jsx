import PokeApp from './components/PokeApp'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950 p-8 font-sans">
      <div className="text-center mb-10">
        <h1 className="font-gothic text-4xl md:text-5xl font-bold text-stone-200 tracking-widest uppercase">
          Día 27 / Pokemon App
        </h1>
      </div>
      <PokeApp />
    </div>
  )
}

export default App
