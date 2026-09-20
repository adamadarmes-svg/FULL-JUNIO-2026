import { Menu } from '@headlessui/react'

const MenuHeadless = () => {
  const opciones = [
    { label: 'Mi perfil',      href: '#' },
    { label: 'Configuración',  href: '#' },
    { label: 'Dashboard',      href: '#' },
    { label: 'Cerrar sesión',  href: '#' },
  ]

  return (
    <div className="bg-gray-900 border border-gray-800 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">
        Menú con Headless UI
      </h3>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold px-5 py-2 cursor-pointer transition-colors">
          Opciones ▾
        </Menu.Button>

        <Menu.Items className="absolute left-0 mt-2 w-52 bg-gray-900 shadow-lg border border-gray-800 py-1 z-10 focus:outline-none">
          {opciones.map((op, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <a
                  href={op.href}
                  className={`block px-4 py-2 text-sm text-gray-200 transition-colors ${
                    active ? 'bg-gray-800 text-gray-100' : ''
                  }`}
                >
                  {op.label}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default MenuHeadless