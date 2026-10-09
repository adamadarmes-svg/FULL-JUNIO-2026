import { useState } from 'react'

function MenuPreview({ imagen }) {
  const [ultimaImagen, setUltimaImagen] = useState(imagen)

  if (imagen && imagen !== ultimaImagen) {
    setUltimaImagen(imagen)
  }

  const visible = Boolean(imagen)

  return (
    <div
      aria-hidden="true"
      className={`hidden h-full items-center justify-center md:flex ${visible ? '' : 'pointer-events-none'}`}
    >
      {ultimaImagen && (
        <img
          src={ultimaImagen}
          alt=""
          className={`max-h-[60vh] w-auto max-w-full object-contain transition-all duration-500 ease-mater ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        />
      )}
    </div>
  )
}

export default MenuPreview
