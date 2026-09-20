import { useState } from 'react'

const FormularioNombre = () => {
  const [nombre, setNombre] = useState<string>('')
  const [enviado, setEnviado] = useState<string>('')

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNombre(e.target.value)
  }

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!nombre.trim()) return
    setEnviado(nombre)
    setNombre('')
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <p className="text-gray-500 text-sm mb-3">
         Gran príncipe de Moscú y toda Rusia
      </p>
      <form onSubmit={manejarEnvio} className="flex gap-2 mb-3">
        <input
          type="text"
          value={nombre}
          onChange={manejarCambio}
          placeholder="Escribe tu nombre..."
          className="border border-gray-300 px-3 py-2 w-full min-w-0 focus:outline-none focus:border-gray-900"
        />
        <button
          type="submit"
          className="border border-gray-300 text-gray-800 font-semibold px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Enviar
        </button>
      </form>
      {enviado && (
        <p className="text-gray-800 font-semibold">
          Hola, {enviado}
        </p>
      )}
    </div>
  )
}

export default FormularioNombre