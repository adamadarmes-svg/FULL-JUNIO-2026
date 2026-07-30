function Header({ siteName, links }) {
  return (
    <header className="bg-ink text-paper px-8 py-5 flex justify-between items-center border-b-2 border-gold">
      <h1 className="text-xl font-semibold uppercase tracking-0-2em">{siteName}</h1>
      <nav>
        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm uppercase tracking-widest text-paper-80 hover-text-gold transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header