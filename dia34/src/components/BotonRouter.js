'use client'

import { useRouter } from 'next/navigation'

export default function BotonRouter() {
  const router = useRouter()

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => router.push('/posts/1')} className="btn-primary">
        Leer el primer post
      </button>

      <button onClick={() => router.push('/dashboard/stats')} className="btn-outline">
        Ir a las estadísticas
      </button>
    </div>
  )
}
