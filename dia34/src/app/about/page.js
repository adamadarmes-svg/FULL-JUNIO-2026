import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata = { title: 'About/Día 34' }

export default function About() {
  async function manejarNavegacion() {
    'use server'
    redirect('/dashboard')
  }

  return (
    <section>
      <div className="pb-14">
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-5xl font-light tracking-tight">Acerca de mí</h1>
      </div>

      <div className="border-t border-stone-200 py-10">
        <p className="max-w-2xl text-lg leading-relaxed text-stone-600">
          Nací en una noche de tormenta, y quizá por eso la electricidad marcó mi destino. Dediqué mi vida a entenderla, dominarla y expandir sus límites. Creé el motor de corriente alterna, imaginé redes eléctricas que iluminarían ciudades enteras y soñé con transmitir energía sin cables. Fui inventor, visionario y a veces incomprendido, pero todo lo que hice fue para llevar al mundo un paso más cerca del futuro.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-stone-200 pt-8">
        <Link href="/" className="btn-outline">
          <span aria-hidden>←</span> Volver a Home
        </Link>

        <form action={manejarNavegacion}>
          <button type="submit" className="btn-primary">
            Ir al dashboard
          </button>
        </form>
      </div>
    </section>
  )
}
