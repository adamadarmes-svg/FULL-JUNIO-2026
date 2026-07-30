function Section({ title, content }) {
  return (
    <section className="bg-ink text-paper p-8">
      <h2 className="text-sm font-semibold uppercase tracking-0-2em mb-3 text-gold">
        {title}
      </h2>
      <p className="text-paper-80">{content}</p>
    </section>
  )
}

export default Section