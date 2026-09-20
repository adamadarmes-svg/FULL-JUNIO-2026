import useToggle from '../hooks/useToggle'

const BotonToggle = () => {
  const [activo, alternar] = useToggle(false)

  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <p className="text-gray-500 text-sm mb-3">
        La Doncella de Orleans
      </p>
      <button
        onClick={alternar}
        className={`w-full font-bold px-6 py-3 cursor-pointer transition-all duration-300 border ${
          activo
            ? 'bg-gray-900 text-white border-gray-900'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        {activo ? 'Activado' : 'Desactivado'}
      </button>
    </div>
  )
}

export default BotonToggle