import Slider from './components/Slider'
import Carrusel from './components/Carrusel'
import Menu from './components/Menu'
import SliderSwiper from './components/SliderSwiper'
import CarruselMulti from './components/CarruselMulti'
import MenuHeadless from './components/MenuHeadless'
import Factorial from './components/Factorial'

const imagenes = [
  'https://picsum.photos/seed/img1/800/400',
  'https://picsum.photos/seed/img2/800/400',
  'https://picsum.photos/seed/img3/800/400',
  'https://picsum.photos/seed/img4/800/400',
  'https://picsum.photos/seed/img5/800/400',
]

const menuItems = [
  { name: 'Inicio',    path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
  {
    name: 'Servicios',
    path: '/servicios',
    submenu: [
      { name: 'Web',     path: '/web'     },
      { name: 'Diseño',  path: '/diseno'  },
      { name: 'SEO',     path: '/seo'     },
    ],
  },
  {
    name: 'Productos',
    path: '/productos',
    submenu: [
      { name: 'App móvil', path: '/movil'  },
      { name: 'Dashboard', path: '/dash'   },
    ],
  },
  { name: 'Contacto', path: '/contacto' },
]

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <header className="bg-white shadow-md px-6 py-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Día 25
        </h1>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Nivel 1 y 2
        </h2>
        <Slider imagenes={imagenes} />
        <Carrusel imagenes={imagenes} visibles={3} />
        <Menu items={menuItems} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Nivel 3
        </h2>
        <SliderSwiper imagenes={imagenes} />
        <CarruselMulti imagenes={imagenes} />
        <MenuHeadless />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Extra
        </h2>
        <Factorial />
      </section>
    </div>
  )
}

export default App