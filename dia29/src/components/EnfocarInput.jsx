import { useRef } from 'react'

const EnfocarInput = () => {
  const inputRef = useRef(null)

  const enfocar = () => {
    inputRef.current.focus()
  }

  return (
    <div className="bg-white border border-gray-200 p-6 w-full">
      <p className="text-gray-500 text-xs uppercase tracking-widest text-center mb-4">
        Rodrigo Díaz de Vivar
      </p>
      <div className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Haz clic en el botón..."
          className="flex-1 border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-900"
        />
        <button
          onClick={enfocar}
          className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-2 cursor-pointer transition-colors"
        >
          Enfocar
        </button>
      </div>
    </div>
  )
}

export default EnfocarInput
