'use client'

import { useEffect, useState } from 'react'
import { formatoSaludo, formatoError } from '@/lib/formatoSaludo'
import { getSaludo } from '@/services/fetchRepo'

export default function SaludoCSR() {
  const [msn, setMsn] = useState('cargando...')

  useEffect(() => {
    getSaludo()
      .then((data) => setMsn(formatoSaludo(data)))
      .catch((err) => setMsn(formatoError(err)))
  }, [])

  return (
    <div className="p-6 bg-white border border-neutral-200">
      <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-3">
        hola Gustavo que tal?
      </p>
      <pre className="text-neutral-700 text-sm font-mono">{msn}</pre>
    </div>
  )
}