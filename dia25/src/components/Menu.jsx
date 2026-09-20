import { useState } from 'react'

const Menu = ({ items }) => {
  const [submenuAbierto, setSubmenuAbierto] = useState(null)

  const toggleSubmenu = (index) => {
    setSubmenuAbierto(submenuAbierto === index ? null : index)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-3">
        Menú con submenús
      </h3>
      <nav className="bg-gray-950 border border-gray-800 px-4 py-2 flex flex-wrap gap-2 relative">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => item.submenu && toggleSubmenu(index)}
              className={`text-gray-100 px-4 py-2 hover:bg-gray-700 transition-all cursor-pointer flex items-center gap-1 ${
                submenuAbierto === index ? 'bg-gray-700' : ''
              }`}
            >
              {item.name}
              {item.submenu && (
                <span className={`text-xs transition-transform duration-200 ${
                  submenuAbierto === index ? 'rotate-180' : ''
                }`}>
                  ▾
                </span>
              )}
            </button>

            {item.submenu && submenuAbierto === index && (
              <div className="absolute top-full left-0 mt-1 bg-gray-900 border border-gray-800 shadow-lg py-2 z-10 min-w-40 animate-fadeDown">
                {item.submenu.map((sub, subIndex) => (
                  <a
                    key={subIndex}
                    href={sub.path}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-800 transition-colors text-sm"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Menu