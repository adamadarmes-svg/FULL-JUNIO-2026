function SubMenu({ items, abierto, onHoverItem }) {
  return (
    <ul
      aria-hidden={!abierto}
      className={`flex flex-col gap-2 overflow-hidden pl-6 transition-all duration-500 ease-mater md:pl-10 ${
        abierto ? 'mt-3 max-h-60 opacity-100' : 'mt-0 max-h-0 opacity-0'
      }`}
    >
      {items.map((item) => (
        <li key={item.slug}>
          <a
            href={`#${item.slug}`}
            tabIndex={abierto ? 0 : -1}
            onMouseEnter={() => onHoverItem(item.previewImage ?? null)}
            onMouseLeave={() => onHoverItem(null)}
            onFocus={() => onHoverItem(item.previewImage ?? null)}
            onBlur={() => onHoverItem(null)}
            className="inline-block text-lg text-neutral-400 transition-colors duration-300 hover:text-white md:text-2xl"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SubMenu
