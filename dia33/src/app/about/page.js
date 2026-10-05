export const metadata = {
  title: 'About/Día 33',
}

export default function About() {
  return (
    <section className="grid gap-10 sm:grid-cols-[1fr_2fr]">
      <div className="border-t border-ink pt-4">
        <p className="text-xs uppercase tracking-[0.3em] text-muted mb-3">01</p>
        <h1 className="font-serif text-5xl font-normal leading-none">Sobre mí</h1>
      </div>
      <p className="border-t border-line pt-4 text-muted leading-loose">
        Nací en Berlín y viví los años más turbulentos de Alemania. Tras la guerra, trabajé para estabilizar mi país cuando todo parecía perdido. Como canciller y luego ministro de Exteriores, frené la hiperinflación, defendí la democracia y logré que Alemania volviera a ser aceptada en Europa. Firmé acuerdos que trajeron paz y cooperación, y por ello recibí el Premio Nobel. Mi vida fue breve, pero dediqué cada día a reconstruir Alemania con diálogo, realismo y esperanza.
      </p>
    </section>
  )
}
