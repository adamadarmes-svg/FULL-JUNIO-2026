import ItemList from '@/components/ItemList'

export const metadata = { title: 'Items — Día 36' }

export default function ItemsPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">Items</p>
        <h1 className="text-4xl font-light tracking-tight">Veni, vidi, vici</h1>
        <p className="text-sm text-neutral-500">
          Real win is when you win without destroying yourself.
        </p>
      </div>

      <ItemList />
    </section>
  )
}
