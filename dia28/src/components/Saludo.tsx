interface SaludoProps {
  nombre: string 
}

const Saludo = ({ nombre }: SaludoProps) => {
  return (
    <div className="bg-white border border-gray-200 p-6 w-80">
      <h2 className="text-2xl font-bold text-gray-900">
        Hola, {nombre}
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Iván IV Vasílievich
      </p>
    </div>
  )
}

export default Saludo