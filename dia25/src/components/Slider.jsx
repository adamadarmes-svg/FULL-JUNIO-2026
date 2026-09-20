import { useState, useEffect, useRef } from 'react'

const Slider = ({ imagenes }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [arrastrando, setArrastrando] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const startX = useRef(0)
  const intervaloRef = useRef(null)

  useEffect(() => {
    if (!autoplay) return
    intervaloRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % imagenes.length)
    }, 3000)
    return () => clearInterval(intervaloRef.current)
  }, [autoplay, imagenes.length])

  const detenerAutoplay = () => {
    setAutoplay(false)
    clearInterval(intervaloRef.current)
  }

  const nextSlide = () => {
    detenerAutoplay()
    setCurrentIndex(prev => (prev + 1) % imagenes.length)
  }

  const prevSlide = () => {
    detenerAutoplay()
    setCurrentIndex(prev =>
      prev === 0 ? imagenes.length - 1 : prev - 1
    )
  }

  const handleDragStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
    setArrastrando(true)
  }

  const handleDragEnd = (e) => {
    if (!arrastrando) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = startX.current - endX
    if (diff > 50) nextSlide()
    else if (diff < -50) prevSlide()
    setArrastrando(false)
  }

  return (
    <div className="bg-white border border-gray-200 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Slider desde cero
      </h3>
      <div
        className="relative w-full max-w-2xl mx-auto overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagenes.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full flex-shrink-0 h-64 object-cover"
              draggable={false}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 cursor-pointer transition-all"
        >
          ⇇
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 cursor-pointer transition-all"
        >
          ⇉
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {imagenes.map((_, index) => (
            <div
              key={index}
              onClick={() => { detenerAutoplay(); setCurrentIndex(index) }}
              className={`w-3 h-3 cursor-pointer transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-2">
        {autoplay ? 'Autoplay activo' : 'Autoplay detenido'}
      </p>
    </div>
  )
}

export default Slider