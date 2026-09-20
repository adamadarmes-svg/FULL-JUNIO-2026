import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const CarruselMulti = ({ imagenes }) => {
  return (
    <div className="bg-white border border-gray-200 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Carrusel múltiple con Swiper
      </h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={3}
        navigation
        autoplay={{ delay: 2500 }}
        loop={true}
        breakpoints={{
          0:    { slidesPerView: 1 },
          464:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-2xl mx-auto overflow-hidden"
      >
        {imagenes.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-48 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CarruselMulti