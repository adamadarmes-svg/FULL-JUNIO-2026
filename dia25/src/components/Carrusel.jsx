import { useState, useEffect, useRef } from 'react'

const Carrusel = ({ imagenes, visibles = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const startX = useRef(0)
  const arrastrando = useRef(false)
  const intervaloRef = useRef(null)
  const maxIndex = imagenes.length - visibles

  useEffect(() => {
    if (!autoplay) return
    intervaloRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
    }, 2500)
    return () => clearInterval(intervaloRef.current)
  }, [autoplay, maxIndex])

  const detenerAutoplay = () => {
    setAutoplay(false)
    clearInterval(intervaloRef.current)
  }

  const nextSlide = () => {
    detenerAutoplay()
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)
  }

  const prevSlide = () => {
    detenerAutoplay()
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1)
  }

  const handleDragStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
    arrastrando.current = true
  }

  const handleDragEnd = (e) => {
    if (!arrastrando.current) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = startX.current - endX
    if (diff > 50) nextSlide()
    else if (diff < -50) prevSlide()
    arrastrando.current = false
  }

  return (
    <div className="bg-white border border-gray-200 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Carrusel ({visibles} visibles)
      </h3>
      <div
        className="relative w-full max-w-2xl mx-auto overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex gap-3 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibles)}%)`,
          }}
        >
          {imagenes.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              draggable={false}
              className="flex-shrink-0 h-48 object-cover"
              style={{ width: `calc(${100 / visibles}% - 12px)` }}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 cursor-pointer transition-all"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 cursor-pointer transition-all"
        >
          ›
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        {autoplay ? 'Autoplay activo' : 'Autoplay detenido'}
      </p>
    </div>
  )
}

export default Carrusel