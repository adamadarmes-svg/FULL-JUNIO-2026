import { useState } from 'react'

const DivColor = () => {
  const [hover, setHover] = useState(false)

  return (
    <div className="card w-fit">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ backgroundColor: hover ? '#111111' : '#ffffff' }}
        className="w-48 h-24 border border-black flex items-center justify-center transition-colors duration-300 cursor-pointer"
      >
        <p className={`font-semibold ${hover ? 'text-white' : ''}`}>
          {hover ? 'hola' : 'Pasa el mouse'}
        </p>
      </div>
    </div>
  )
}

export default DivColor
