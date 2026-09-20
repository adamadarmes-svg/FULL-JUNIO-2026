import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SliderSwiper = ({ imagenes }) => {
  return (
    <div className="bg-white border border-gray-200 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        Slider con Swiper
      </h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-full max-w-2xl mx-auto overflow-hidden"
      >
        {imagenes.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SliderSwiper