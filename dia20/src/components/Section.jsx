function Section({ title, children }) {
  return (
    <section className="mb-20 last:mb-0">
      <h2 className="font-serif text-xl text-ink mb-8">{title}</h2>
      {children}
    </section>
  )
}

export default Section
