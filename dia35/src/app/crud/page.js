import ListaNombres from '@/components/ListaNombres'

export const metadata = { title: 'Día 35' }

export default function Crud() {
  return (
    <section className="space-y-6">
      <div className="pb-6 border-b border-neutral-200">
        <h1 className="text-4xl font-light tracking-tight mb-2">CRUD</h1>
        <p className="text-neutral-500 text-sm">
           i need to win this year
        </p>
      </div>

      <ListaNombres />

      <p className="text-[11px] uppercase tracking-widest text-neutral-400">
        I need to improve myself 
      </p>
    </section>
  )
}